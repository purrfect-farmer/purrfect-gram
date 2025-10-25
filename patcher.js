import fs from "fs";

function safeReplace(file, replacements) {
  if (!fs.existsSync(file)) {
    console.warn(`[WARN] File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, "utf8");

  for (const [target, replacement] of replacements) {
    if (!content.includes(target)) {
      console.warn(`[WARN] Text not found in ${file}: ${target}`);
    }
    content = content.replaceAll(target, replacement);
  }

  fs.writeFileSync(file, content);
  console.log(`[OK] Patched ${file}`);
}

/** Web-A */
safeReplace("web-a/src/limits.ts", [
  [
    "moreAccounts: [3, MULTIACCOUNT_MAX_SLOTS]",
    "moreAccounts: [10_000, 100_000]",
  ],
]);

/** Web-K */
safeReplace("web-k/src/lib/accounts/constants.ts", [
  [
    "export const MAX_ACCOUNTS_FREE = 3;",
    "export const MAX_ACCOUNTS_FREE = 10_000;",
  ],
  [
    "export const MAX_ACCOUNTS_PREMIUM = 4;",
    "export const MAX_ACCOUNTS_PREMIUM = 100_000;",
  ],
]);

safeReplace("web-k/src/lib/accounts/types.d.ts", [
  [
    "export type ActiveAccountNumber = 1 | 2 | 3 | 4;",
    `export type ActiveAccountNumber = ${Array.from(
      { length: 500 },
      (_, i) => i + 1
    ).join(" | ")};`,
  ],
]);

safeReplace("web-k/src/lib/accounts/accountController.ts", [
  [
    "([1, 2, 3, 4] as const)",
    `([${Array.from({ length: 500 }, (_, i) => i + 1).join(", ")}] as const)`,
  ],
]);

safeReplace("web-k/src/lib/mtproto/apiManager.ts", [
  [
    "([1, 2, 3, 4] as ActiveAccountNumber[])",
    `([${Array.from({ length: 500 }, (_, i) => i + 1).join(
      ", "
    )}] as ActiveAccountNumber[])`,
  ],
]);

safeReplace("web-k/src/lib/appManagers/utils/state/loadState.ts", [
  [
    "[1, 2, 3, 4]",
    `[${Array.from({ length: 500 }, (_, i) => i + 1).join(", ")}]`,
  ],
  [
    "loadStateForAccount(4)",
    `${Array.from(
      { length: 500 - 3 },
      (_, i) => `loadStateForAccount(${i + 4})`
    ).join(", ")}`,
  ],
  [
    "4: rest[2]",
    `${Array.from(
      { length: 500 - 3 },
      (_, i) => `${i + 4}: rest[${i + 2}]`
    ).join(", ")}`,
  ],
]);

safeReplace("web-k/src/lib/accounts/getValidatedAccount.ts", [
  ["input <= 4", "input <= 500"],
]);

safeReplace("web-k/src/lib/sessionStorage.ts", [
  [
    "'account4',",
    `${Array.from({ length: 500 - 3 }, (_, i) => `'account${i + 4}',`).join(
      " "
    )}`,
  ],
  [
    "account4: AccountSessionData,",
    `${Array.from(
      { length: 500 - 3 },
      (_, i) => `account${i + 4}: AccountSessionData,`
    ).join(" ")}`,
  ],
]);

safeReplace("web-k/src/lib/appManagers/appManagersManager.ts", [
  [
    "4: new AppStateManager(4)",
    `${Array.from(
      { length: 500 - 3 },
      (_, i) => `${i + 4}: new AppStateManager(${i + 4})`
    ).join(", ")}`,
  ],
]);

console.log("✅ All patches applied successfully.");
