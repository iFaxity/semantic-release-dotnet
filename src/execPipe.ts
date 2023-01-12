import { Config } from 'semantic-release';
import execa from 'execa';

export function execPipe(command: string, args: readonly string[], options: Config): execa.ExecaChildProcess<string> {
  const { env, cwd, stdout, stderr } = options;
  const process = execa(command, args, {
    env: env,
    cwd: cwd,
  });

  if (stdout != null && process.stdout != null) {
    process.stdout.pipe(stdout, { end: false });
  }

  if (stderr != null && process.stderr != null) {
    process.stderr.pipe(stderr, { end: false });
  }

  return process;
}
