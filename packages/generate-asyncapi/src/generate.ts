import { TopicName, availableTopics } from "@frammr/mqtt-types";
import type { JSONSchema7 } from "json-schema";
import { basename, join } from "node:path";
import { readFile } from "node:fs/promises";
import frontmatter from "front-matter";

const meta = require("../../../package.json");

generateDescription().then(console.log);

async function generateDescription() {
  const topicDescriptions = await getTopicDescriptions();
  const yaml = `
asyncapi: 2.3.0
info:
  title: HWB Standard
  description:
    $ref: markdown/intro.md
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
    const matter = await readFrontmatter(descFile);

    return `
${topic}:
  description: Melding
    $ref: ${descFile}
  publish:
    message:
      name: ${schema.title}
      schemaFormat: application/schema+json;version=draft-07
      payload:
        $ref: ${schemaFile}
      examples:
        - $ref: ${getExampleFile(topic)}
      bindings:
        mqtt:
          qos: ${matter.qos}
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

function readJsonSchema(file: string) {
  return require(join(__dirname, "../../../", file)) as JSONSchema7;
}

type FrontmatterData = {
  qos: number;
};
async function readFrontmatter(file: string): Promise<FrontmatterData> {
  const fileContents = (
    await readFile(join(__dirname, "../../../", file))
  ).toString("utf-8");

  const matter = frontmatter<FrontmatterData>(fileContents);
  return matter.attributes;
}

function indent(str: string, spaces: number) {
  const whitespace = new Array(spaces + 1).join(" ");
  return str.replace(/^(?!$)/gm, whitespace);
}
