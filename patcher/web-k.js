import { range } from "./range.js";
import { safeReplace } from "./replace.js";

/** Number of account slots; also the free and premium account limit. */
const MAX_ACCOUNTS = 500;

const allAccounts = range(1, MAX_ACCOUNTS);
const extraAccounts = range(4, MAX_ACCOUNTS);

safeReplace("web-k/src/lib/accounts/constants.ts", [
  [
    "export const MAX_ACCOUNTS_FREE = 3;",
    `export const MAX_ACCOUNTS_FREE = ${MAX_ACCOUNTS};`,
  ],
  [
    "export const MAX_ACCOUNTS_PREMIUM = 4;",
    `export const MAX_ACCOUNTS_PREMIUM = ${MAX_ACCOUNTS};`,
  ],
]);

safeReplace("web-k/src/lib/appManagers/appAttachMenuBotsManager.ts", [
  ["const platform = 'web';", "const platform = 'android';"],
]);

safeReplace("web-k/src/lib/accounts/types.d.ts", [
  [
    "export type ActiveAccountNumber = 1 | 2 | 3 | 4;",
    `export type ActiveAccountNumber = ${allAccounts.join(" | ")};`,
  ],
]);

safeReplace("web-k/src/lib/accounts/accountController.ts", [
  ["([1, 2, 3, 4] as const)", `([${allAccounts.join(", ")}] as const)`],
]);

safeReplace("web-k/src/lib/apiManagerProxy.ts", [
  ["i <= 4;", `i <= ${MAX_ACCOUNTS};`],
]);

[
  "web-k/src/lib/appManagers/apiManager.ts",
  "web-k/src/lib/appManagers/appManagersManager.ts",
  "web-k/src/lib/appManagers/appStoragesManager.ts",
].forEach((path) => {
  safeReplace(path, [
    [
      "2, 3, 4] as ActiveAccountNumber[])",
      `${range(2, MAX_ACCOUNTS).join(", ")}] as ActiveAccountNumber[])`,
    ],
  ]);
});

safeReplace("web-k/src/lib/appManagers/utils/state/loadState.ts", [
  ["[1, 2, 3, 4]", `[${allAccounts.join(", ")}]`],
  [
    "loadStateForAccount(4)",
    extraAccounts.map((n) => `loadStateForAccount(${n})`).join(", "),
  ],
  ["4: rest[2]", extraAccounts.map((n) => `${n}: rest[${n - 2}]`).join(", ")],
]);

safeReplace("web-k/src/lib/accounts/getValidatedAccount.ts", [
  ["input <= 4", `input <= ${MAX_ACCOUNTS}`],
]);

safeReplace("web-k/src/lib/sessionStorage.ts", [
  ["'account4',", extraAccounts.map((n) => `'account${n}',`).join(" ")],
  [
    "account4: AccountSessionData,",
    extraAccounts.map((n) => `account${n}: AccountSessionData,`).join(" "),
  ],
]);

safeReplace("web-k/src/lib/appManagers/appManagersManager.ts", [
  [
    "4: new AppStateManager(4)",
    extraAccounts.map((n) => `${n}: new AppStateManager(${n})`).join(", "),
  ],
]);
