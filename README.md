# MT Buss MQTT Validator

> OBS: This repo is a work in progress and will change in the comming weeks.

This repo contains a test validation client for MQTT communication for hardware
devices intended for busses in Møre og Romsdal by FRAM. You can use the code and
specification files here to test implementations on hardware or software. See
details on running the project as a JSON validator or a MQTT client below.

## Structure of this repo

- All specification descriptions found in [/documents](./documents/)
  - See also template: [/documents/\_template.md](./documents/_template.md)
- All specification found in [/specifications](./specifications/)

### Topic tree

<pre>
/
└── sensors
    └── <a href="./specifications/sensors/location/">location</a>
└── validators
    ├── [deviceId]
    │   └── <a href="./specifications/validators/%5BdeviceId%5D/response">response</a>
    └── <a href="./specifications/validators/barcode/">barcode</a>
</pre>

## CLI tooling

Given that you have installed Node.js on your system, you can use this package
as a CLI for validationg local JSON-files. See documentation on usage

### Usage

```
Usage: npx @frammr/mqtt-validator -t [topic] -f [file]

Options:
      --version  Show version number                                   [boolean]
  -f, --file     file to validate                                     [required]
  -t, --topic    choose a topic                         [required] [choices: ""]
  -h, --help     Show help                                             [boolean]

Examples:
  Validate foo.json with location specification

    npx @frammr/mqtt-validator -t sensors/gnss/location -f foo.json
```

## MQTT Client

Running the validator and test client as a service connecting to a MQTT Broker
(e.g. a hub or gateway in a bus test rig).

### Requirements

- Node.js 18

### Getting started

```shell
# 1. Get repo
git clone https://github.com/mrfylke/frammr-mqtt-validator.git

# 2. Install dependencies
yarn install

# 3. Copy .env.example and configure
cp .env.example .env

# 4. Start MQTT client
yarn start
```

This will add a subscriber to the Broker as specified in `.env`.

## Hardware and Communications

This shows an example component overview as it could be connected in a bus. All
protocols here are MQTT, with the option of multiple Barcode and NFC devices.

```mermaid
---
title: Component connections w/protocols
---

graph TB

    subgraph terminal
    A(MT Buss)
    end
    A(MT Buss) <--MQTT--> B(Gateway)

    subgraph READERS
        D(Barcode/NFC)
        E(Barcode/NFC)
        F(Barcode/NFC)
    end

    B <--MQTT--> READERS
    B<--MQTT-->G(GPS)

    B<-.MQTT.->C(APC)

    style C opacity:0.7,stroke-dasharray: 4

```

The Gateway in this example is the MQTT broker and components and the terminal
are producers/consumers.

---

## Communication

The following is a pseudo-example of how the communication will go with message
passing using MQTT. All payload will be expected to be JSON. See example models
further down in this document.

```mermaid
---
title: Example communication flow
---
sequenceDiagram
    participant MT Buss
    participant Gateway

    Gateway->>Barcode: connect()
    Barcode-->>Gateway: ack

    MT Buss->>Gateway: connect()
    Gateway-->>MT Buss: ack

    MT Buss->>Gateway: subscribe(/barcode/validation/request)
    activate Gateway

    Barcode->>Gateway: publish(/barcode/validation/request)
    Gateway-->>MT Buss: :validation-request
    deactivate Gateway

    activate Gateway
    MT Buss->>Gateway: publish(/barcode/validation/confirm)
    Gateway-->>Barcode: :validation-confirm

    deactivate Gateway
```

### Example topics and payloads

The following are examples of what topics and layloads might look like. This
will be under continuous change and will be updated as development progresses.
For the final source of truth check out the [specifications](./specifications).

#### Topic `/gps/position/`

```json
{
  "atDateTime": "2023-02-06T12:45:50+01:00",
  "position": {
    "latitude": 0,
    "longitude": 0
  }
}
```

#### Topic `/barcode/validation/request/`

```json
{
  "type": "aztec",
  "deviceId": "<id>",
  "code": "<base64-encoded-code>"
}
```

## Adding new Specifications

See documentation [specifications/README.md](./specifications/README.md).

## Prior work

Other similar work that is used as inspiration.

- Ruter
  - https://ruter.atlassian.net/wiki/spaces/DS/pages/1961689089/Salg+billettering+3.0
  - https://github.com/RuterNo/adt-doc/tree/master/docs/v2.6.0/json-schemas
  - https://github.com/RuterNo/adt-doc
- ITxPT
  - https://wiki.itxpt.org/index.php/S02P10-APC-2_preview#MQTT_parameters
- Samverkansgruppen Validation Services messages
  - https://github.com/mobileticket/vals-schemata
