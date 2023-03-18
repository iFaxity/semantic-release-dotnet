import { Config, Context } from 'semantic-release';
import { z } from 'zod';

const PluginOptions = z.object({
    // Build setup
    project: z.string().optional(),
    configuration: z.string().default('Release'),
    output: z.string().optional(),
    // Publish
    publish: z.boolean().default(false),
    publishProfile: z.string().optional(),
    // Restore
    restore: z.boolean().default(false),
    force: z.boolean().optional(),
    source: z.string().optional(),
    // Build runtime
    os: z.string().optional(),
    runtime: z.string().optional(),
    arch: z.string().optional(),
    selfContained: z.boolean().optional(),
    // Other
    buildArguments: z.array(z.string()).default([]),
    properties: z.record(z.union([ z.string(), z.number(), z.boolean() ])),
});

export type PluginOptions = z.infer<typeof PluginOptions>;

export async function resolveOptions(
    options: Config & Partial<PluginOptions>,
    context: Context
): Promise<PluginOptions> {
    const { env, nextRelease } = context;
    const properties = options?.properties ?? {};

    // Force Version property to be set to nextRelease.version
    if (nextRelease?.version) {
        properties.Version = nextRelease.version;
    }

    return PluginOptions.parseAsync({
        project: env.BUILD_PROJECT,
        arch: env.BUILD_ARCH,
        configuration: env.BUILD_CONFIGURATION,
        os: env.BUILD_OS,
        output: env.BUILD_OUTPUT,
        runtime: env.BUILD_RUNTIME,
        publishProfile: env.PUBLISH_PROFILE,
        ...options,
        properties,
    });
}
