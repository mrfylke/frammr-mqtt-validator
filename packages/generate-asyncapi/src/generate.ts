import { TopicName, availableTopics } from "@frammr/mqtt-types";
import type { JSONSchema7 } from "json-schema";
import { basename, join } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import frontmatter, { FrontMatterResult } from "front-matter";

const meta = require("../../../package.json");

generateDescription().then(function (content) {
  const filename = process.argv[2];
  if (!filename) {
    throw new Error("Provide filename");
  }
  saveToOutput(filename, content.trim());
});

async function saveToOutput(filename: string, content: string) {
  await writeFile(join(__dirname, "../../../", filename), content);
  console.log(`Saved to ${filename}`);
}

async function generateDescription() {
  const topicDescriptions = await getTopicDescriptions();

  const intro = await readMarkdown("intro");

  const yaml = `
asyncapi: 2.3.0
info:
  title: HWB Standard
  description: |
${indent(intro.body, 4)}
  license:
    name: Apache 2.0
    url: https://frammr.no
  version: ${meta.version}

defaultContentType: application/json
channels:
${indent(topicDescriptions, 2)}
`;
  return yaml;
}

async function getTopicDescriptions() {
  const resultP = availableTopics.map(async function (topic) {
    const schemaFile = getSchemaFile(topic);
    const schema = readJsonSchema(schemaFile);
    const descFile = getDescription(topic);
    const desc = await readFrontmatter(descFile);

    return `
${topic}:
  description: |
${indent(desc.body, 4)}
  ${desc.attributes.direction == "pub" ? "publish" : "subscribe"}:
    message:
      name: ${schema.title}
      schemaFormat: application/schema+json;version=draft-07
      payload:
        $ref: ${schemaFile}
      examples:
        - payload:
            $ref: ${getExampleFile(topic)}
      bindings:
        mqtt:
          qos: ${desc.attributes.qos}
          retain: false
`;
  });

  const data = await Promise.all(resultP);
  return data.join("");
}

function getExampleFile(topic: TopicName) {
  return `specifications/${topic}/${basename(topic)}.example.json`;
}
function getDescription(topic: TopicName) {
  return `specifications/${topic}/${basename(topic)}.md`;
}
function getSchemaFile(topic: TopicName) {
  return `specifications/${topic}/${basename(topic)}.schema.json`;
}
async function readMarkdown(file: string) {
  const fileContents = (
    await readFile(join(__dirname, "../../../markdown", `${file}.md`))
  ).toString("utf-8");
  return frontmatter(fileContents);
}

function readJsonSchema(file: string) {
  return require(join(__dirname, "../../../", file)) as JSONSchema7;
}

type FrontmatterData = {
  qos: number;
  direction: "pub" | "sub";
};
async function readFrontmatter(
  file: string
): Promise<FrontMatterResult<FrontmatterData>> {
  const fileContents = (
    await readFile(join(__dirname, "../../../", file))
  ).toString("utf-8");

  const matter = frontmatter<FrontmatterData>(fileContents);
  return matter;
}

function indent(str: string, spaces: number) {
  const whitespace = new Array(spaces + 1).join(" ");
  return str.replace(/^(?!$)/gm, whitespace);
}
