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
{}
```

## Notes:

- Videre har vi lyst til å fastsette hvordan vi vet om device vi får dette fra
  er en "hovedleser" eller ikke. Om dette skal være en del av meldingen eller om
  det skal gjøres en form for handshake når device kobles til.
- Hardware må ha innebygget timeout på N sek, og viser en venterskjerm med en
  gang. Bruke konfigurasjon til å spesifisere meldinger som skal brukes? Også
  konfigurere melding dersom timeout forekommer.
- Konfigurasjon av device til spesifikk lokasjon i bussen (foran, bak, osv)
