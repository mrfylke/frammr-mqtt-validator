## Hardware topology

All communication happens through a local MQTT Broker, eg. a hardware gateway.
Newer versions of ITxPT also specifies MQTT as a standard way of interacting
with devices.

```mermaid
---
title: Component connections w/protocols
---

graph TB

    subgraph terminal
    A("Sales Client\n(Client)")
    end
    A <--MQTT--> B("Gateway\n(Broker)")

    subgraph READERS
        D("Barcode/NFC\n(Device)")
        E("Barcode/NFC\n(Device)")
        F("Barcode/NFC\n(Device)")
    end

    B <--MQTT--> READERS
    B<--MQTT-->G("GPS\n(Device)")

    B<-.MQTT.->C("APC\n(Device)")

    style C opacity:0.7,stroke-dasharray: 4
```

### Terminology

- **Client**: Sales client used by operators.
- **Broker**: Local running MQTT Broker that relays all messages.
- **Device**: Hardware devices in bus communicating with sales client.
