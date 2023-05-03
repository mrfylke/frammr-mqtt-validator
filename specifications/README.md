# Generate new specs

1. Create folder in same structure as topic, e.g. `full/topic/spec-name`
2. Create contents:
   1. `<spec-name>.schema.json` - JSON Schema for topic
   1. `<spec-name>.example.json` - Valid example json
   1. `<spec-name>.fail.json` - Invalid example json for testing fail
   1. `<spec-name>.md` - Documentation for topic in the template as specified in
      this document

## Template for new docs

    ---
    version: x.0.0
    lastUpdated: 2023-05-01
    ---

    # Specification: {Specification}

    {Use case description in natural text}

    - Topic: `full/topic/path`
    - Direction: Publish (Inbound to client) / Subscribe (Out from client)
    - JSON Schema: [location.json](./location.json)
    - MQTT QoS: 0 (Default)
    - Interval: Atleast once per second


    ## Examples

    ```json
    {}
    ```
