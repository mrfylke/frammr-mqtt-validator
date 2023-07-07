import type { TopicName } from "@frammr/mqtt-types";

type TopicNode = {
  url: string;
  topic?: TopicName;
  children: TopicNode[];
};

export function createTopicTree(filenames: string[]): TopicNode {
  const topicMap: { [key: string]: TopicNode } = {};
  return { url: "", children: [] };
}
