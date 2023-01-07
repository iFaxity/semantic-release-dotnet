import { Context } from 'semantic-release';

export interface PluginOptions {
    /**
     * The arguments to the `dotnet pack` command. Defaults to '-s Release'.
     */
    buildArguments?: string[];
}

export interface ResolvedPluginOptions {
    buildArguments: string[];
}

function ensureArray(input: undefined|string|string[]): string[]|null {
    if (input == null) {
        return null;
    }

    return typeof input == 'string'
        ? input.split(/\s+/g)
        : input;
}

export function resolveOptions(
    options: PluginOptions,
    context: Context
): ResolvedPluginOptions {
    const { env } = context;
    const { buildArguments } = options;

    return {
        buildArguments: ensureArray(buildArguments) ?? [ ],
    };
}
