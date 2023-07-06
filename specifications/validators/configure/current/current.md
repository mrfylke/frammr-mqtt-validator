---
version: 1.0.0
lastUpdated: 2023-07-05
---

# Specification: List Current Configuration

Subscribe to topic to get list of currently set configuration for specific
device. Payload will be similar to `/validators/configure` and
`/validators/[deviceId]/configure`.

- Topic: `/validators/configure/current`
- Direction: Publish (Inbound to client)
- JSON Schema: [current.schema.json](./current.schema.json)
- MQTT QoS: 0
- Trigger: Sales client requesting configuration

## Related

- Request for sending current: `/validators/[configure/request`
- Setting new configuration: `/validators/configure`
- For specific device: `/validators/[deviceId]/configure/current`

## Examples

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
