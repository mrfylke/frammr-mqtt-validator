---
version: 1.0.0
lastUpdated: 2023-07-05
qos: 0
---

# Specification: Request Current Configuration

Request currently set configuration from specific device.

- Topic: `/validators/[deviceId]/configure/request`
- Direction: Consume (Outbound from client)
- JSON Schema: [request.schema.json](./request.schema.json)
- MQTT QoS: 0

## Related

- Response sent from device: `/validators/[deviceId]/configure/current`
- Setting new configuration: `/validators/[deviceId]/configure`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z"
}
```
