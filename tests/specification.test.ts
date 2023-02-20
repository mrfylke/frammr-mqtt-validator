import { expect, test } from "vitest";
import { SchemaNames, schemas } from "../tools/types";
import validate from "../tools/validate";

for (let spec of schemas) {
  test.each`
    outcome   | expected
    ${"fail"} | ${true}
    ${"ok"}   | ${false}
  `(
    `[specification: ${spec}]: case $outcome -> $expected`,
    async ({ outcome, expected }) => {
      expect(await helper_validate(spec, outcome)).toBe(expected);
    }
  );
}
async function helper_validate(spec: SchemaNames, failOrOk: "fail" | "ok") {
  const valid = await validate(
    spec,
    require(`./fixtures/${spec}.${failOrOk}.json`)
  );
  return valid.error;
}
