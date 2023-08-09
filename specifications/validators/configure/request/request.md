---
version: 1.0.0
lastUpdated: 2023-07-05
qos: 0
direction: sub
---

# Specification: Request Current Configuration

Request currently set configuration from all devices.

- Topic: `/validators/configure/request`
- Direction: Consume (Outbound from client)
- JSON Schema: [request.schema.json](./request.schema.json)
- MQTT QoS: 0

## Related

- Response sent from devices: `/validators/configure/current`
- Setting new configuration for all devices: `/validators/configure`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z"
}
```
