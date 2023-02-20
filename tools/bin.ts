#!/usr/bin/env node

import { readFile } from "fs/promises";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { SchemaNames, schemas } from "./types";
import validate from "./validate";

main();

async function main() {
  const opts = await yargs(hideBin(process.argv))
    .usage("Usage: $0 -s [position] -f [file]")
    .example(
      "$0 -s position -f foo.json",
      "Validate foo.json with position specification"
    )
    .option("file", {
      alias: "f",
      describe: "file to validate",
    })
    .option("schema", {
      alias: "s",
      describe: "choose a schema",
      choices: schemas as SchemaNames[],
    })
    .demandOption(
      ["file", "schema"],
      "Please provide both scheme and file arguments"
    )
    .help("h")
    .alias("h", "help")
    .coerce("file", readLocalFile)
    .parse();

  const validationData = await validate(opts.schema, opts.file);

  if (!validationData.error) {
    console.log("");
    console.log("   ✅ Valid JSON Document");
    console.log("");

    process.exit(0);
  } else {
    console.log("");
    validationData.errorData
      ?.map((error) => `   ❌ Error: ${error.instancePath} ${error.message}`)
      .forEach((l) => console.log(l));
    console.log("");

    process.exit(1);
  }
}

async function readLocalFile(filename: string): Promise<any> {
  const spec = await readFile(filename, "utf8");
  try {
    return JSON.parse(spec.toString());
  } catch (err) {
    console.error(`error: ${err}`);
    process.exit(2);
  }
}
