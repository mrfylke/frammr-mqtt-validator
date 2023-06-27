import { expect, test } from "vitest";
import { TopicName, availableTopics, topicSet } from "../tools/types";
import validate, { type ValidationOutput } from "../tools/validate";

if (!availableTopics.length) {
  test("No tests", () => expect(true).toBe(true));
}

for (let spec of availableTopics) {
  test.each`
    outcome      | expected
    ${"fail"}    | ${true}
    ${"example"} | ${false}
  `(
    `[specification: ${spec}]: case $outcome -> $expected`,
    async ({ outcome, expected }) => {
      const valid = await helper_validate(spec, outcome);
      if (valid.error && outcome !== "fail") {
        console.log(spec, valid.errorData);
      }
      expect(valid.error).toBe(expected);
    }
  );
}
async function helper_validate(
  spec: TopicName,
  failOrExample: "fail" | "example"
): Promise<ValidationOutput> {
  const fixture = `../specifications/${topicSet[spec]}`.replace(
    "schema.json",
    `${failOrExample}.json`
  );
  const valid = await validate(spec, require(fixture));
  return valid;
}
