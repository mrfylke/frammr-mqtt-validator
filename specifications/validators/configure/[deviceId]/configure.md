---
version: 1.0.0
lastUpdated: 2023-06-19
---

# Specification: Configuration

A method for setting specific configuration for all devices. Messages on this
topic should be sent to all validators connected to the local system.

- Topic: `validators/configure`
- Direction: Consume (Outbound from client)
- JSON Schema: [barcode.schema.json](./barcode.schema.json)
- MQTT QoS: 1 (at least once)
- Trigger: Client setting configuration through UI or automated requests.

## Related

See topic [validators/configure/[deviceId]](./[deviceId]) for setting
configuration for a specific validator.

## Examples

```json
{
  "dumpCardMode": true
}
```

```json
{
  "timeout": {
    "timeInSeconds": 10,
    "message": "Ingen kontakt med tjeneste. Gå på bussen"
  }
}
```

```json
{
  "dumpCardMode": true,
  "timeout": {
    "timeInSeconds": 10,
    "message": "Ingen kontakt med tjeneste. Gå på bussen"
  }
}
```
