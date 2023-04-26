import { fdir } from "fdir";

const crawler = new fdir().withRelativePaths().glob("./**/*.json");

export default async function listSpecifications(): Promise<string[]> {
  const data = await crawler.crawl("specifications").withPromise();
  return data.map((file) => file.replace(/\.json$/, ""));
}
