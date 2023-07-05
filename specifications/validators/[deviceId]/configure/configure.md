---
version: 1.0.0
lastUpdated: 2023-07-05
---

# Specification: Configure specific device

A method for setting specific configuration for specific device. Can set one or
many options at once. Will only overwrite the passed configuration.

- Topic: `validators/[deviceId]/configure`
- Direction: Consume (Outbound from client)
- JSON Schema: [configure.schema.json](./configure.schema.json)
- MQTT QoS: 1 (at least once)
- Trigger: Client setting configuration through UI or automated requests.

## Settings

- `dumpCardMode`: See NFC flow chart for implications of card dump mode.
- `timeout`: Settings for timeout behavior with timout in seconds and message
  when it is timed out. Timeout of 0 will be no timeout (not recommended)

## Related

- Request for sending current: `/validators/[deviceId]/configure/request`
- List current configuration: `/validators/[deviceId]/configure/current`
- Setting configuration for all devices: `/validators/configure`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",

  "dumpCardMode": true
}
```

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",

  "timeout": {
    "timeInSeconds": 10,
    "message": "Ingen kontakt med tjeneste. Gå på bussen"
  }
}
```

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z",

  "dumpCardMode": true,
  "timeout": {
    "timeInSeconds": 10,
    "message": "Ingen kontakt med tjeneste. Gå på bussen"
  }
}
```
