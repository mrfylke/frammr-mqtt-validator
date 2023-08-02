import type { TopicName } from "@frammr/mqtt-types";
import { dirname } from "node:path";

export type TopicNode = {
  url: string;
  topic?: string;
  children: {
    [key: string]: TopicNode;
  };
};

export function createTopicTree(filenames: string[]): TopicNode {
  const root: TopicNode = {
    url: "",
    children: {},
  };

  filenames.forEach((path) => {
    const relativePath = path.split("specifications/")[1];
    const parts = relativePath.split("/");
    let node = root;
    parts.forEach((part, index) => {
      if (node.children && !node.children[part]) {
        if (part.replace(".md", "") === parts[index - 1]) {
          node.topic = dirname(relativePath) as TopicName;
          node.url = relativePath;
        } else {
          node.children[part] = {
            url: parts.slice(0, index + 1).join("/"),
            children: {},
          };
        }
      }
      node = (node.children?.[part] as TopicNode) ?? {};
    });
  });

  return root;
}

export function printHtmlTree(node: TopicNode, indent = ""): string {
  if (!node.children && node.topic) {
    return `${indent}└── <a href="/topic/${val.topic}">${node.topic}</a>\n`;
  }
  if (!node.children && !node.topic) {
    return ``;
  }
  let result = node.url === "" ? "/\n" : "";
  Object.entries(node.children).forEach(([key, val], index, all) => {
    const isLast = index == all.length - 1;
    const sign = isLast ? "└──" : "├──";
    if (val.topic) {
      result += `${indent}${sign} <a href="/topic/${val.topic}">${key}</a>\n`;
    } else {
      result += `${indent}${sign} ${key}\n`;
    }

    if (val.children) {
      const prefixSign = isLast ? " " : "│";
      result += printHtmlTree(val, `${indent}${prefixSign}    `);
    }
  });
  return result;
}
