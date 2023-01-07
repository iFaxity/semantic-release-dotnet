import { Config, Context } from 'semantic-release';
import { PluginOptions, resolveOptions } from './options';
import { execa } from 'execa';

const DOTNET_CLI_VERSION_REGEX = /^+([0-9.]+)$/m;

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

export async function verifyConditions(
  options: Config & PluginOptions,
  context: Context
): Promise<void> {
  const errors: string[] = [];

  // Resolve the options and make sure we have them all populated.
  const resolved = resolveOptions(options, context);

  // Set up debugging.
  const { logger } = context;

  logger.debug('options', resolved);

  // Make sure we have access to the `dotnet` command.
  try {
    const output = await execa('dotnet', [ '--version' ]);

    if (output.failed) {
      errors.push(`The 'dotnet --version' responded with an error code`);
    } else {
      const { stdout } = output;
      const match = DOTNET_CLI_VERSION_REGEX.exec(stdout);

      if (match != null && match.length == 2) {
        logger.info(`Using dotnet-cli version ${match[1]}`);
      } else {
        errors.push(`'dotnet --version' didn't respond as expected: ${stdout}`);
      }
    }
  } catch {
    errors.push(`Cannot run the 'dotnet' process`);
  }

  if (errors.length) {
    errors.forEach((x) => logger.error(x));

    throw new Error('Could not verify conditions for dotnet-cli');
  }
}
