import { writeFile } from "fs/promises";
import { join } from "path";
import listSpecifications from "./fs-to-topics";

generate().then(() => {
  console.log("Generated types");
});

async function generate() {
  const topics = await listSpecifications();
  const schemaNames = topics.map((i) => `'${i}'`).join(" | ");

  const types = `
export type TopicName = ${schemaNames};
export const availableTopics = ${JSON.stringify(
    topics
  )} as readonly TopicName[];
`;

  await writeFile(join(__dirname, "types.ts"), types);
}
