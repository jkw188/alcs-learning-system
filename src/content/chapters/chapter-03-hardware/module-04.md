# Module 4 — Sense the Physical World

## Objectives / State

### Inherited state

The station now has memory, storage and human I/O, but it still cannot interpret real-world temperature, gas level, pressure, movement, sound, light or acidity.

### Problem

A digital computer cannot directly process a continuously changing physical quantity as if it were already binary data. The system needs a sensing and conversion path, and it also needs a way to convert processor decisions back into physical actions.

### Module question

**How does physical data become digital data, and how can digital decisions become physical actions?**

### Artifact

```text
Physical I/O Architecture v1

Physical condition
      ↓
Sensor
      ↓
Analogue signal
      ↓
ADC
      ↓
Processor
      ↓
Decision
      ↓
DAC / actuator
      ↓
Physical action
```

---

## Just-in-time Theory

### 1. Analogue vs digital

The source describes real-world physical data such as temperature and pressure as analogue: it can change continuously and may have many possible values depending on measurement precision. Computers require a digital representation. **Source: p. 84.**

```text
20.0°C
20.1°C
20.11°C
20.111°C
...
```

### 2. Sensor

The source defines a sensor as an input device that reads/measures a physical property. A sensor does not have the same role as an ADC. **Source: pp. 69, 84–85.**

```text
Sensor
→ measure/detect a physical property

ADC
→ convert an analogue signal into digital data
```

### 3. ADC

The source explains the standard path:

```text
analogue data
      ↓
     ADC
      ↓
digital data
```

An analogue-to-digital converter produces discrete digital values that the computer can process. **Source: p. 84.**

### 4. Common sensors and applications

The source provides a table of sensor types and example applications. **Source: p. 85.**

#### Temperature

Used in central heating, chemical processes and greenhouses. In the project it monitors machine/environment temperature.

#### Moisture / humidity

Used to monitor/control moisture in greenhouses and dampness in industrial applications. In the project it could monitor environmental conditions affecting materials or equipment.

#### Light

Used for street lighting, greenhouse lighting and automatic headlights. In the project it could monitor workplace illumination.

#### Infrared / motion

Used for motion/intruder detection and counting people. In the project it can detect entry into a restricted zone.

#### Pressure

Used for intrusion, weight measurement and industrial gas-pressure processes. In the project it monitors pipes/vessels.

#### Acoustic / sound

Used for burglar-alarm noises and detecting leaking/dripping sounds. In the project it can support abnormal-machine-noise detection.

#### Gas

Used to measure O₂/CO₂, pollution or dangerous leaks. This is a central safety sensor in the project.

#### pH

Used for acidity/alkalinity and pollution monitoring. It can be mapped to a chemical-process liquid in the PBL context.

#### Magnetic field

The source links this to applications including anti-lock braking systems. **Source: p. 85.**

### 5. Actuators

The source describes actuators as electromechanical output devices such as relays, solenoids and motors. A processor decision can cause an actuator to change the physical system. **Source: p. 84.**

```text
CPU decision
   ↓
motor / valve / relay / solenoid
   ↓
physical action
```

### 6. DAC

Some output devices require analogue electrical current. The source explains that a DAC may be used between a digital computer and motors/valves. **Source: p. 84.**

```text
processor
   ↓
digital output
   ↓
DAC
   ↓
analogue electrical signal
   ↓
motor / valve
```

### 7. Not every actuator requires a DAC

The source notes that a solenoid can operate as a digital actuator, opening/closing a circuit. A continuously variable motor/valve may need analogue control and therefore a DAC. **Source: p. 84.**

Conceptually:

```text
ON / OFF actuator
→ digital control may be enough

variable output
→ DAC may be required
```

---

## Activity / Example

### Prediction

A gas sensor detects CO₂ in the factory. Which order is correct?

```text
A. ADC → sensor → CPU
B. sensor → ADC → CPU
C. CPU → ADC → sensor
```

The correct dependency is **measure first, convert second**:

```text
sensor → ADC → CPU
```

### Activity 1 — Select sensors

| Factory requirement | Sensor |
|---|---|
| Detect overheating | Temperature |
| Detect dangerous CO₂ | Gas |
| Detect excessive pipeline pressure | Pressure |
| Detect movement in a restricted zone | Infrared/motion |
| Detect abnormal machine noise | Acoustic |
| Detect corrosive liquid condition | pH |

### Activity 2 — ADC or DAC?

Temperature sensing:

```text
temperature
→ sensor
→ ADC
→ processor
```

Variable fan speed:

```text
processor
→ DAC
→ motor
→ fan
```

Simple on/off device:

```text
processor
→ digital output
→ digital actuator/device
```

A DAC is not automatically required for every output.

### Activity 3 — End-to-end temperature control path

Requirement: keep temperature at or below `80°C`.

```text
Physical temperature
        ↓
Temperature sensor
        ↓
Analogue signal
        ↓
ADC
        ↓
Digital value
        ↓
Processor compares with threshold
        ↓
IF temperature > 80°C
        ↓
DAC if analogue fan control is required
        ↓
fan motor
        ↓
cooling increases
```

### Physical I/O Architecture v1

```text
SMART FACTORY SAFETY STATION

PHYSICAL INPUT
├── Temperature sensor
├── Gas sensor
├── Pressure sensor
├── Motion sensor
├── Acoustic sensor
└── pH sensor

             ↓
            ADC
             ↓
         PROCESSOR
             ↓
     decision / threshold
             ↓
OUTPUT
├── DAC → motor
├── valve actuator
├── speaker alarm
└── display warning
```

---

## Explanation

### Why is a sensor alone not a complete computer input path?

Because the sensor measures the physical quantity, while the computer needs a digital representation. If the sensor produces an analogue signal, the path is:

```text
sensor → ADC → processor
```

### Why is the ADC after the sensor?

The ADC needs an analogue signal to convert. The measurement must exist before conversion can occur.

### Why is the DAC after the processor?

The processor makes a digital decision first. A DAC then converts a digital output into an analogue electrical signal where the actuator requires one.

### Why does sensor selection depend on the measured property?

A gas sensor is not generally "better" than a pressure sensor. The correct device is the one that measures the required physical quantity.

---

## Practice / Checks

### M4.1 — Sensor selection

| Scenario | Sensor | Why? |
|---|---|---|
| Detect CO₂ leak | ? | ? |
| Detect excessive boiler pressure | ? | ? |
| Detect low light | ? | ? |
| Detect movement at a restricted door | ? | ? |
| Detect abnormal machinery noise | ? | ? |
| Detect highly acidic liquid | ? | ? |

### M4.2 — Complete the path

```text
Room temperature
     ↓
[ A ]
     ↓
analogue signal
     ↓
[ B ]
     ↓
digital data
     ↓
processor
```

and:

```text
processor
     ↓
digital output
     ↓
[ C ]
     ↓
analogue current
     ↓
motor
```

### M4.3 — Find the mistake

An engineer draws:

```text
temperature
   ↓
ADC
   ↓
sensor
   ↓
CPU
```

Correct the order and explain why.

### M4.4 — Is a DAC needed?

For each output, answer **YES / NO / DEPENDS** and justify:

```text
1. Solenoid lock: LOCKED / UNLOCKED
2. Cooling fan: variable speed
3. Warning LED: ON / OFF
```

### M4.5 — Explain

Why can a computer not directly treat a continuously varying physical temperature as if it were already a digital value?

---

## Contribution to the Big Problem

The station now has a physical interface:

```text
Physical World
     ↓
Sensors
     ↓
ADC
     ↓
Processor
     ↓
Decision
     ↓
DAC / actuator
     ↓
Physical World
```

However, this still does not distinguish a system that merely watches from one that automatically changes the process. Module 5 turns this path into monitoring and control architectures with feedback.
