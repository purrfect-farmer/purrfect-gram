import fs from "fs";

const failures = [];

export function safeReplace(file, replacements) {
  if (!fs.existsSync(file)) {
    failures.push(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, "utf8");

  for (const [target, replacement] of replacements) {
    if (!content.includes(target)) {
      failures.push(`Text not found in ${file}: ${target}`);
      continue;
    }
    content = content.replaceAll(target, replacement);
  }

  fs.writeFileSync(file, content);
  console.log(`[OK] Patched ${file}`);
}

/** Prints any failed patches and exits with an error code if there were any. */
export function report() {
  if (failures.length > 0) {
    failures.forEach((failure) => console.error(`[ERROR] ${failure}`));
    console.error(`❌ ${failures.length} patch(es) failed.`);
    process.exit(1);
  }

  console.log("✅ All patches applied successfully.");
}
