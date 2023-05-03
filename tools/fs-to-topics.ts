import { fdir } from "fdir";
import { dirname } from "path";

const crawler = new fdir().withRelativePaths().glob("./**/*.schema.json");

export default async function listSpecifications(): Promise<
  Record<string, string>
> {
  const data = await crawler.crawl("specifications").withPromise();

  const obj: Record<string, string> = {};
  for (let schema of data) {
    obj[dirname(schema)] = schema;
  }
  return obj;
}
