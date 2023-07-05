---
version: 1.0.0
lastUpdated: 2023-06-19
---

# Specification: List Current Configuration

Subscribe to topic to get list of currently set configuration for specific
device. Payload will be similar to `/validators/configure` and
`/validators/[deviceId]/configure`.

- Topic: `/validators/[deviceId]/configure/current`
- Direction: Publish (Inbound to client)
- JSON Schema: [current.schema.json](./current.schema.json)
- MQTT QoS: 0
- Trigger: Sales client requesting configuration

## Related

- Request for sending current: `/validators/[deviceId]/configure/request`
- Setting new configuration: `/validators/[deviceId]/configure`

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
