import { Config, Context } from 'semantic-release';
import { normalizeArgs, PluginOptions, resolveOptions, stringifyArgs } from './options';
import execa from 'execa';

export async function prepare(
  options: Config & PluginOptions,
  context: Context
): Promise<void> {
  // Resolve the options and make sure we have them all populated.
  const resolved = await resolveOptions(options, context);
  const { args, project, ...build } = resolved;

  const { logger } = context;

  // We need to clean and rebuild.
  logger.info(`Running the 'dotnet clean' command`);

  const cleanCommand = await execa('dotnet', [ 'clean' ]);

  if (cleanCommand.failed) {
    throw new Error(`Cannot run 'dotnet clean'\n\n${cleanCommand.stdout}`);
  }

  // Run the build command.
  logger.info(`Running the 'dotnet build' command`);

  const buildArgs = normalizeArgs(
    'build',
    project,
    ...stringifyArgs(build),
    ...args,
    `-p:Version=${context.nextRelease?.version}`
  );
  const buildCommand = await execa('dotnet', buildArgs);

  if (buildCommand.failed) {
    throw new Error(`Cannot run 'dotnet build'\n\n${buildCommand.stdout}`);
  }
}
