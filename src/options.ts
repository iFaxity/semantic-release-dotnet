import { Context } from 'semantic-release';
import { z } from 'zod';

const PluginOptions = z.object({
    buildArguments: z.array(z.string()).default([]),
});

export type PluginOptions = z.infer<typeof PluginOptions>;

export async function resolveOptions(
    options: Partial<PluginOptions>,
    context: Context
): Promise<PluginOptions> {
    return PluginOptions.parseAsync(options);
}
