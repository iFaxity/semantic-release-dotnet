module.exports = {
  message: 'chore(release): v${nextRelease.version}\n\n${nextRelease.notes}',
  branches: [
    'main',
    { name: 'next', channel: 'next', prerelease: 'rc' },
  ],
  plugins: [
    [
      '@semantic-release/commit-analyzer', {
        preset: 'angular',
        releaseRules: [
          { type: 'refactor', release: 'patch' },
          { type: 'style', release: 'patch' },
          { type: 'break', release: 'major' },
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/github',
  ]
};
