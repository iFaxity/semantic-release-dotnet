import { Config, Context } from 'semantic-release';
import { execPipe } from './execPipe';
import { PluginOptions, resolveOptions } from './options';

const DOTNET_CLI_VERSION_REGEX = /^([0-9.]+)$/g;

export async function verifyConditions(
  options: Config & PluginOptions,
  context: Context
): Promise<void> {
  const errors: string[] = [];

  // Resolve the options and make sure we have them all populated.
  const resolved = await resolveOptions(options, context);

  // Set up debugging.
  const { logger } = context;

  async function verifyDotnet() {
    // Make sure we have access to the `dotnet` command.
    const output = await execPipe('dotnet', [
      '--version',
    ], options);

    if (output.failed) {
      errors.push(`The 'dotnet --version' responded with an error code!`);
    } else {
      const { stdout } = output;
      const match = DOTNET_CLI_VERSION_REGEX.exec(stdout);

      if (match != null && match.length == 2) {
        logger.info(`Using dotnet-cli version ${match[1]}.`);
      } else {
        logger.warn(`'dotnet --version' didn't respond as expected!`);
      }
    }
  }

  logger.debug('options', resolved);

  // Make sure we have access to the `dotnet` command.
  try {
    await verifyDotnet();
  } catch {
    errors.push(`Cannot run the 'dotnet' process!`);
  }

  if (errors.length) {
    errors.forEach((x) => logger.error(x));

    throw new Error('Could not verify conditions for dotnet-cli!');
  }
}
