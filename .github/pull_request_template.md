# Proposal: {SpecificationName}

{Short description}

## Context and known limitations

{Important context like hardware notes, limitations etc.}

---

## Checklist

- [ ] Includes documentation file with description, topics and examples.
- [ ] Includes JSON Schema
- [ ] Includes passing and failing tests.

### Required fields

- [ ] `traceId` is unique ID (UUID v4) that is created when message is sent.
      Meaning traceId is unique per message.
- [ ] `eventTimestamp` is in UTC (RFC3339 format), created when the actual event
      is triggered not when it is sent.

## Confirmed and verified by parties

- [ ] MT Buss
- [ ] Consat
- [ ] Fara
