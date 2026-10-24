import { safeReplace } from "./replace.js";

safeReplace("web-a/src/limits.ts", [
  [
    "moreAccounts: [3, MULTIACCOUNT_MAX_SLOTS]",
    "moreAccounts: [450, 500]",
  ],
]);

safeReplace("web-a/src/api/gramjs/methods/bots.ts", [
  ["platform: WEB_APP_PLATFORM,", "platform: 'android',"],
]);

safeReplace("web-a/src/util/browser/globalEnvironment.ts", [
  ["'SharedWorker' in globalThis", "true"],
]);
