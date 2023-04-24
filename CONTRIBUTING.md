# Contribution guide and Governance

This document describes how to contribute to the repository and specifications
here in. It also specifies how we function as a collaborational unit.

All changes made to the repo is to be considered `inbound=outbound`. Meaning
licensing follows the existing repository. All contributions accepts this
premise.

## Governance

Specifications are merged in highest compatibility mode in mind. This means
there should be concensus between all parties. In this work we will also try to
maximise compatibility with actors such as Ruter and as such there might be
changes we need to make to ensure that.

All proposed specifications should be sent in as Pull Requests and at a common
meeting presented and potentially approved by all parties. There is no need for
a reference implementation before merge. Consensus is shown as checkboxes in the
pull request.

## Versioning

Versioning of the specification is handled by semantic versioning. This
versioning of the standard follows the specifications and not CLI tooling or
test client. CLI and test client will always follow supported standard.

Versioning is specified strictly to ensure stability and predictability around
breaking. Focusing on backwards compatibility as a default.

We have format `vX.Y.Z` in the standard defined as:

- `X`: Breaking changes. When we break with existing contract. Will cause tests
  to break and no longer work as before. Changes includes renaming fields,
  changing types or changing topics.
- `Y`: Features. Backwords compatible changes. Such as allowing for additional
  fields or adding fields. Also adding a new topic is considered a feature and
  will bump the `Y` flag.
- `Z`: Patches which doesn't introduce new features. Likely not used as much.

Here we've defined things like typos and name-changes as breaking changes and
not patch fixes. This means that there might be a lot of major version bumps.
But the main goal is to ensure predictability on versioning. If you stay on
supported major-version this will work no matter what.

## Conventional commits

We try to follow conventional commits to indicate versioning:

- `breaking-changes:` Major release. Breaks existing functioning and requires
  change by hardware devices.
- `spec:` introduces a new specification.
- `feat:` introduces a new field or new possibilites.
- `docs:` adds documentation
- `code:` changes code for client or CLI to match a specific version.
- `ci:` updates to building or tests
- `chore:` other potential changes.
