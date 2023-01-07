import { Config, Context } from 'semantic-release';
import { PluginOptions, resolveOptions } from './options';
import { execa } from 'execa';

export async function prepare(
  options: Config & PluginOptions,
  context: Context
): Promise<void> {
  // Resolve the options and make sure we have them all populated.
  const resolved = resolveOptions(options, context);

  const { logger } = context;

  // We need to clean and rebuild.
  logger.info(`Running the 'dotnet clean' command`);

  const clean = await execa('dotnet', [ 'clean' ]);

  if (clean.failed) {
    throw new Error(`Cannot run 'dotnet clean'\n\n${clean.stdout}`);
  }

  logger.info(`Running the 'dotnet build' command`);

  // Run the build command.
  const build = await execa('dotnet', [ 'build', ...resolved.buildArguments ]);

  if (build.failed) {
    throw new Error(`Cannot run 'dotnet build'\n\n${build.stdout}`);
  }
}
