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

  const properties = Object.keys(resolved.properties)
    .map(key => `-p:${key}=${resolved.properties[key]}`);

  if (resolved.project) {
    args.push(resolved.project);
  }

  if (resolved.configuration) {
    args.push('--configuration', resolved.configuration);
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
  logger.info(`Running the 'dotnet clean' command.`);

  const cleanCommand = await execPipe('dotnet', [
    'clean',
  ], options);

  if (cleanCommand.failed) {
    throw new Error(`Cannot run 'dotnet clean'!`);
  }

  // Run the build command.
  logger.info(`Running the 'dotnet build' command.`);

  const buildCommand = await execPipe('dotnet', [
    'build',
    ...args,
    ...resolved.buildArguments,
    ...properties,
  ], options);

  if (buildCommand.failed) {
    throw new Error(`Cannot run 'dotnet build'!`);
  }
}
