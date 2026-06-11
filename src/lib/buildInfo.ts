const version = __APP_VERSION__.trim();
const commit = __APP_COMMIT__.trim();

function shortCommit(value: string) {
  return value ? value.slice(0, 7) : '';
}

export const buildVersion = shortCommit(commit) ? `${version}-${shortCommit(commit)}` : version;
