import Ajv from "ajv";
import type { ValidateFunction } from "ajv/dist/core";
import { readFile } from "fs/promises";
import { join } from "path";

import addFormats from "ajv-formats";
import type { TopicName } from "./types";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

type ValidationOutput =
  | {
      error: false;
    }
  | {
      error: true;
      errorData: ValidateFunction["errors"];
    };
export default async function validate(
  topic: TopicName,
  json: any
): Promise<ValidationOutput> {
  const doValidate = await readSpecification(topic);
  const isValid = doValidate(json);
  if (isValid) {
    return {
      error: false,
    };
  } else {
    return {
      error: true,
      errorData: doValidate.errors,
    };
  }
}

async function readSpecification(topic: TopicName): Promise<ValidateFunction> {
  const spec = await readFile(
    join(__dirname, "..", "specifications", `${topic}.json`)
  );
  try {
    const parsed = JSON.parse(spec.toString());
    const previous = ajv.getSchema(parsed["$id"]);
    if (previous) {
      return previous;
    } else {
      return ajv.compile(parsed);
    }
  } catch (err) {
    throw new Error(`Unable to load or parse ${err}`);
  }
}
