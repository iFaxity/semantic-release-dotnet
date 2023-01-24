import { Config, Context } from 'semantic-release';
import { PluginOptions, resolveOptions } from './options';
import { execPipe } from './execPipe';

export async function prepare(
  options: Config & PluginOptions,
  context: Context
): Promise<void> {
  // Resolve the options and make sure we have them all populated.
  const { logger } = context;
  const resolved = await resolveOptions(options, context);
  const args: string[] = [];

  if (resolved.publish) {
    if (resolved.publishProfile) {
      resolved.properties.PublishProfile = resolved.publishProfile;
    }
  }

  const properties = Object.keys(resolved.properties)
    .map(key => `-p:${key}=${resolved.properties[key]}`);

  if (resolved.project) {
    args.push(resolved.project);
  }

  if (resolved.configuration) {
    args.push('--configuration', resolved.configuration);
  }

  if (resolved.selfContained === true) {
    args.push('--self-contained');
  } else if (resolved.selfContained === false) {
    args.push('--no-self-contained');
  }

  if (resolved.os || resolved.arch) {
    if (resolved.os) {
      args.push('--os', resolved.os);
    }

    if (resolved.arch) {
      args.push('--arch', resolved.arch);
    } 
  } else if (resolved.runtime) {
    args.push('--runtime', resolved.runtime);
  }

  if (resolved.output) {
    args.push('--output', resolved.output);
  }

  if (resolved.restore) {
    if (resolved.force) {
      args.push('--force');
    }

    if (resolved.source) {
      args.push('--source', resolved.source);
    }
  } else {
    args.push('--no-restore');
  }

  // We need to clean and rebuild.
  logger.info(`Running the 'dotnet clean' command`);

  const cleanCommand = await execPipe('dotnet', [
    'clean',
  ], options);

  if (cleanCommand.failed) {
    throw new Error(`Cannot run 'dotnet clean'\n\n${cleanCommand.stdout}`);
  }

  const command = resolved.publish
    ? 'publish'
    : 'build';

  // Run the build command.
  logger.info(`Running the 'dotnet ${command}' command`);

  const buildCommand = await execPipe('dotnet', [
    command,
    ...args,
    ...resolved.buildArguments,
    ...properties,
  ], options);

  if (buildCommand.failed) {
    throw new Error(`Cannot run 'dotnet build'\n\n${buildCommand.stdout}`);
  }
}
