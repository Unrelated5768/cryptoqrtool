export const appVersion = __APP_VERSION__.trim();
export const appCommit = __APP_COMMIT__.trim();

function shortCommit(value: string) {
  return value ? value.slice(0, 7) : '';
}

export const buildVersion = shortCommit(appCommit) ? `${appVersion}-${shortCommit(appCommit)}` : appVersion;
export const buildId = appCommit || appVersion;
