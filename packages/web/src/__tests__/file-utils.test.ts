import { test, expect } from "vitest";
import { createTopicTree, printHtmlTree, type TopicNode } from "../file-utils";

test("file-utils", () => {
  const tree = createTopicTree([
    "specifications/a/b/c/c.md",
    "specifications/a/b/b.md",
    "specifications/a/foo/foo.md",
    "specifications/a/bar/bar.md",
    "specifications/foo/bar/bar.md",
  ]);

  const expected = {
    url: "",
    children: {
      a: {
        url: "a",
        children: {
          b: {
            url: "a/b/b.md",
            topic: "a/b",
            children: {
              c: {
                url: "a/b/c/c.md",
                topic: "a/b/c",
                children: {},
              },
            },
          },
          foo: {
            url: "a/foo/foo.md",
            topic: "a/foo",
            children: {},
          },
          bar: {
            url: "a/bar/bar.md",
            topic: "a/bar",
            children: {},
          },
        },
      },
      foo: {
        url: "foo",
        children: {
          bar: {
            url: "foo/bar/bar.md",
            topic: "foo/bar",
            children: {},
          },
        },
      },
    },
  } as TopicNode;

  expect(tree).toEqual(expected);
});
test("file-utils print", () => {
  const tree = createTopicTree([
    "specifications/a/a.md",
    "specifications/foo/foo.md",
    "specifications/foo/bar/bar.md",
    "specifications/foo/baz/baz.md",
  ]);

  const expected = `/
├── <a href="/topic/a">a</a>
└── <a href="/topic/foo">foo</a>
     ├── <a href="/topic/foo/bar">bar</a>
     └── <a href="/topic/foo/baz">baz</a>
`;

  const result = printHtmlTree(tree);
  console.log(result);
  expect(result).toEqual(expected);
});
