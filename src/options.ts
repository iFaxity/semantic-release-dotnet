import { Context } from 'semantic-release';
import { z } from 'zod';

const SNAKE_CASE_REGEX = /(?=[A-Z])/;

const PluginOptions = z.object({
    project: z.string().optional(),
    arch: z.string().optional(),
    configuration: z.string().default('Release'),
    framework: z.string().optional(),
    force: z.boolean().optional(),
    noDependencies: z.boolean().optional(),
    noIncremental: z.boolean().optional(),
    noRestore: z.boolean().default(true),
    noSelfContained: z.boolean().optional(),
    output: z.string().optional(),
    os: z.string().optional(),
    runtime: z.string().optional(),
    source: z.string().optional(),
    verbosity: z.string().optional(),
    versionSuffix: z.string().optional(),
    args: z.array(z.string()).default([]),
});

export type PluginOptions = z.infer<typeof PluginOptions>;

export async function resolveOptions(
    options: Partial<PluginOptions>,
    context: Context
): Promise<PluginOptions> {
    const { env } = context;

    return PluginOptions.parseAsync({
        arch: env.BUILD_ARCH,
        configuration: env.BUILD_CONFIGURATION,
        os: env.BUILD_OS,
        output: env.BUILD_OUTPUT,
        runtime: env.BUILD_RUNTIME,
        ...options,
    });
}

export function stringifyArgs<T extends object>(obj: T): string[] {
    return Object.keys(obj).reduce<string[]>((acc, key) => {
        const value = obj[key as keyof T];
        const str = String(value || '');

        if (str) {
            const snakeKey = key.split(SNAKE_CASE_REGEX).join('-').toLowerCase();

            // if a boolean is used use toggle flag
            if (value === true) {
                acc.push(`--${snakeKey}`);
            } else {
                acc.push(`--${snakeKey}`, str);
            }
        }

        return acc;
    }, []);
}

export function normalizeArgs(...args: any[]): string[] {
    return args
        .filter(x => x)
        .reduce((acc, x) => {
            if (Array.isArray(x)) {
                return [ ...acc, ...x ];
            }
            if (typeof x == 'object') {
                return [ ...acc, ...stringifyArgs(x) ];
            }

            return [ ...acc, String(x) ];
        });
}
