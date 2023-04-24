# Contribution Guide and Governance

This document describes how to contribute to the repository and specifications
contained herein. It also specifies how we function as a collaborative unit.

All changes made to the repository are to be considered "inbound=outbound,"
meaning licensing follows the existing repository. All contributions accept this
premise.

## Governance

Specifications are merged with the highest compatibility mode in mind. This
means there should be consensus between all parties. In this work, we will also
try to maximize compatibility with actors such as Ruter, and as such, there
might be changes we need to make to ensure that.

All proposed specifications should be sent in as Pull Requests and presented at
a common meeting and potentially approved by all parties. There is no need for a
reference implementation before the merge. Consensus is shown as checkboxes in
the pull request.

## Versioning

Versioning of the specification is handled by semantic versioning. This
versioning of the standard follows the specifications and not CLI tooling or
test clients. CLI and test clients will always follow the supported standard.

Versioning is specified strictly to ensure stability and predictability around
breaking. We focus on backwards compatibility as a default.

We have format `vX.Y.Z` in the standard defined as:

- `X`: Breaking changes. When we break with the existing contract. Will cause
  tests to break and no longer work as before. Changes include renaming fields,
  changing types, or changing topics.
- `Y`: Features. Backwards-compatible changes. Such as allowing for additional
  fields or adding fields. Also adding a new topic is considered a feature and
  will bump the `Y` flag.
- `Z`: Patches that don't introduce new features. Likely not used as much.

Here, we've defined things like typos and name changes as breaking changes and
not patch fixes. This means that there might be a lot of major version bumps.
But the main goal is to ensure predictability on versioning. If you stay on
supported major version, this will work no matter what.

## Conventional Commits

We try to follow conventional commits to indicate versioning:

- `breaking-changes:` Major release. Breaks existing functioning and requires
  changes by hardware devices.
- `spec:` introduces a new specification.
- `feat:` introduces a new field or new possibilities.
- `docs:` adds documentation
- `code:` changes code for the client or CLI to match a specific version.
- `ci:` updates to building or tests
- `chore:` other potential changes.
