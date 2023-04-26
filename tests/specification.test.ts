import { expect, test } from "vitest";
import { TopicName, availableTopics } from "../tools/types";
import validate from "../tools/validate";

if (!availableTopics.length) {
  test("No tests", () => expect(true).toBe(true));
}

for (let spec of availableTopics) {
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
async function helper_validate(spec: TopicName, failOrOk: "fail" | "ok") {
  const valid = await validate(
    spec,
    require(`./fixtures/${spec}/${failOrOk}.json`)
  );
  return valid.error;
}
