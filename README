@ifaxity/semantic-release-dotnet
===================================

[**semantic-release**](https://github.com/semantic-release/semantic-release) plugin to build a dotnet project using the dotnet-cli.

[![Codacy grade](https://img.shields.io/codacy/grade/a0c628b128c044269faefc1da74382f7?style=for-the-badge&logo=codacy)](https://www.codacy.com/gh/iFaxity/semantic-release-dotnet/dashboard)
[![npm (scoped)](https://img.shields.io/npm/v/semantic-release-dotnet?style=for-the-badge&logo=npm)](https://npmjs.org/package/@ifaxity/semantic-release-dotnet)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/semantic-release-dotnet?label=Bundle%20size&style=for-the-badge)](https://npmjs.org/package/@ifaxity/semantic-release-dotnet)
[![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/semantic-release-dotnet?label=Bundle%20size%20%28gzip%29&style=for-the-badge)](https://npmjs.org/package/@ifaxity/semantic-release-dotnet)

| Step               | Description                                                                                             |
|--------------------|---------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify that the dotnet-cli is installed and prints its version.                                         |
| `prepare`          | Executes `dotnet clean` followed by `dotnet build` which builds a specified project.                    |


Install
--------------------------

```bash
$ npm i --save-dev @ifaxity/semantic-release-dotnet
```


Usage
--------------------------

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@ifaxity/semantic-release-dotnet" {

    }],
  ]
}
```

With this example:
- The projects output will be cleaned
- The project will be built and versioned


Configuration
--------------------------

### Environment variables

| Variable              | Description                                                             |
| ----------------------|-------------------------------------------------------------------------|
| `BUILD_PROJECT`       | Sets the `project` options default value to the specified value.        |
| `BUILD_CONFIGURATION` | Sets the `configuration` options default value to the specified value.  |
| `BUILD_OUTPUT`        | Sets the `output` options default value to the specified value.         |
| `BUILD_RUNTIME`       | Sets the `runtime` options default value to the specified value.        |
| `BUILD_OS`            | Sets the `os` options default value to the specified value.             |
| `BUILD_ARCH`          | Sets the `arch` options default value to the specified value.           |
| `PUBLISH_PROFILE`     | Sets the `publishProfile` options default value to the specified value. |

### Options


#### project

- **Type:** `string`
- **Related:** [dotnet build arguments](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#arguments)

The project or solution file to build. If a project or solution file isn't specified, MSBuild searches the current working directory for a file that has a file extension that ends in either proj or sln and uses that file.

#### configuration

- **Type:** `string`
- **Default:** `Release`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Defines the build configuration. The default for most projects is Debug, but you can override the build configuration settings in your project.

#### output

- **Type:** `string`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Directory in which to place the built binaries. If not specified, the default path is ./bin/{configuration}/{framework}/. For projects with multiple target frameworks (via the TargetFrameworks property), you also need to define --framework when you specify this option.

#### publish

- **Type:** `boolean`
- **Default:** `false`
- **Related:** [dotnet publish options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-publish#options)

If true then the "build" command is swapped out ot instead use "publish" instead.

#### publishProfile

- **Type:** `string`
- **Related:** [dotnet publish options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-publish#options)

Name of the publish profile to use when publishing. Requires the option `publish` to be true.

#### restore

- **Type:** `boolean`
- **Default:** `false`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Doesn't execute an implicit restore during build.

#### force

- **Type:** `boolean`
- **Default:** `false`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the project.assets.json file.

#### source

- **Type:** `string[]`
- **Default:** `[]`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

The URI of the NuGet package source to use during the restore operation.

#### properties

- **Type:** `Record<string, string>`
- **Default:** `{}`
- **Related:** [MSBuild properties](https://learn.microsoft.com/en-us/nuget/reference/msbuild-targets#pack-target)

MSBuild properties to override when building the project. See the MSBuild properties reference for a list of properties that can be set.


#### os

- **Type:** `string`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Specifies the target operating system (OS). This is a shorthand syntax for setting the [Runtime Identifier (RID)](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog), where the provided value is combined with the default RID. For example, on a win-x64 machine, specifying --os linux sets the RID to linux-x64. If you use this option, don't use the -r|--runtime option. Available since .NET 6.

#### runtime

- **Type:** `string`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Specifies the target runtime. For a list of Runtime Identifiers (RIDs), see the [RID catalog](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog). If you use this option with .NET 6 SDK, use --self-contained or --no-self-contained also. If not specified, the default is to build for the current OS and architecture.

#### arch

- **Type:** `string`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Specifies the target architecture. This is a shorthand syntax for setting the [Runtime Identifier (RID)](https://learn.microsoft.com/en-us/dotnet/core/rid-catalog), where the provided value is combined with the default RID. For example, on a win-x64 machine, specifying --arch x86 sets the RID to win-x86. If you use this option, don't use the -r|--runtime option. Available since .NET 6 Preview 7.

#### selfContained

- **Type:** `string`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

When the option is true then the .net runtime is packaged when publishing. The default is true if a runtime identifier is specified. Available since .NET 6 SDK.
When the option is false then the application is published without the .net runtime and requires any target machiene to install a .net runtime to run the application. Available since .NET 6 SDK.

The default is to not apply either, so set this explicitly to ensure the desired outcome.


#### buildArguments

- **Type:** `string[]`
- **Default:** `[]`
- **Related:** [dotnet build options](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-build#options)

Generic build arguments to send, can be used if there is a specific option that needs to be configured that is not in the config above.


License
--------------------------

[MIT](./LICENSE)
