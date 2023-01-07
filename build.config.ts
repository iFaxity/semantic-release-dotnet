import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    'src/index'
  ],
  externals: [
    'semantic-release',
    'execa',
    'lodash',
  ],
  clean: true,
  declaration: true,
  rollup: {
    emitCJS: true,
    inlineDependencies: true,
  },
});
