---
version: 1.0.0
lastUpdated: 2023-06-13
qos: 0
---

# Specification: Requets Diagnostics on specific Device

Request diagnostics from a specific device. Can be called periodically by
polling from sales client. A request will cause a diagnostics event to be passed
from device specidied by `deviceId` in topic.

- Topic: `/device/[deviceId]/diagnostics/request`
- Direction: Consume (Outbound from client)
- JSON Schema: [request.schema.json](./request.schema.json)
- MQTT QoS: 0 (Default)

## Description

Request diagnostics check from specific device. See related topics in next
section.

## Related topics

- Subscribing to topic on device level: `/device/[deviceId]/diagnostics`
- Subscribing to all diagnostics: `/device/diagnostics`
- See related topic for requesting on all devices `/device/diagnostics/request`

## Examples

```json
{
  "traceId": "543070fe-ef32-11ed-a05b-0242ac120003",
  "eventTimestamp": "2023-04-22T10:28:37.337Z"
}
```
