# Module 5 — Close the Control Loop

## Objectives / State

### Inherited state

From Module 4:

```text
Physical condition
      ↓
Sensor
      ↓
ADC
      ↓
Processor
      ↓
DAC / actuator
      ↓
Physical action
```

This shows where data moves, but not whether the system merely observes the process or automatically changes it.

### Module question

**When is the station monitoring, and when is it controlling? How does feedback close the loop?**

### Artifact

```text
Monitoring & Control Architecture v1

Sensor
  ↓
ADC
  ↓
Processor
  ↓
Compare with stored values
  ├── Monitoring branch
  │      └── warning / alarm
  │
  └── Control branch
         └── actuator
              ↓
           process changes
              ↓
           new sensor input
```

The source explicitly contrasts monitoring and control systems and shows the feedback path. **Source: pp. 85–86.**

---

## Just-in-time Theory

### 1. Monitoring system

The source's monitoring flow is:

```text
sensor sends signal
→ ADC if required
→ processor analyses data
→ compare with stored values
→ if outside acceptable range, warn/display/alarm
→ monitored process is not changed by the computer
```

A monitoring system can therefore contain alarms and displays without automatically becoming a control system.

### 2. Control system

A control system also senses, converts, analyses and compares data, but if the data is outside the acceptable range the processor sends outputs to motors, valves or other actuators. The action changes the physical process. **Source: p. 86.**

```text
sensor
→ ADC
→ processor
→ compare
→ actuator
→ physical process changes
```

### 3. Monitoring vs control

| Feature | Monitoring | Control |
|---|---|---|
| Uses sensors | Yes | Yes |
| Uses ADC if needed | Yes | Yes |
| Processor analyses data | Yes | Yes |
| Compares with stored values | Yes | Yes |
| Can warn/display | Yes | Yes |
| Automatically changes the process | No | Yes |
| Feedback loop | Not required | Central feature |

### 4. Feedback

The source describes feedback as a situation in which the system's output affects a later input. For example, a motor or valve changes the physical process and the next sensor reading reflects that change. **Source: p. 84.**

```text
temperature = 85°C
      ↓
fan speed increases
      ↓
environment cools
      ↓
next temperature reading = 82°C
```

Feedback here means **system feedback**, not comments from a human user.

### 5. Stored thresholds

The processor must compare incoming data with stored reference values. A sensor can report a value, but the system still needs a rule for what counts as safe/unsafe. **Source: p. 86.**

PBL illustration:

```text
IF sensor_value outside acceptable_range
THEN take action
```

This pseudocode is an instructional addition; the source describes the comparison and control flow conceptually rather than as program code.

---

## Activity / Example

### Prediction — classify three systems

```text
A. Hospital system reads heart rate and only alerts staff.
B. Air-conditioning system reads temperature and changes cooling.
C. River sensor records pollution and sends a report.
```

Expected classification:

```text
A → monitoring
B → control
C → monitoring
```

The source gives similar examples: patient/pollution systems for monitoring, and heating/air-conditioning, traffic lights and greenhouse systems for control. **Source: p. 86.**

### Activity 1 — Trace temperature control

Requirement:

```text
Safe range: temperature ≤ 80°C
```

Trace:

```text
1. Temperature sensor measures the physical temperature.
2. Sensor provides an analogue signal.
3. ADC converts it to a digital value.
4. Processor compares it with the stored threshold.
5. If temperature > 80°C, the processor sends an output.
6. DAC is used if analogue motor control is required.
7. Fan speed increases.
8. Environment cools.
9. Sensor measures again.
```

Closed loop:

```text
temperature
   ↓
sensor
   ↓
ADC
   ↓
processor
   ↓
DAC
   ↓
fan
   ↓
temperature changes
   └───────────────┐
                   ↓
                sensor
```

### Activity 2 — Monitoring or control?

| Scenario | Classification | Reason |
|---|---|---|
| Display gas concentration only | Monitoring | Does not alter process |
| Sound alarm when gas is high | Monitoring | Warns but does not itself alter the process |
| Open ventilation valve when gas is high | Control | Actuator changes process |
| Log pressure values to SSD | Monitoring | Records only |
| Reduce pump speed if pressure exceeds limit | Control | Output changes physical system |

A real system can contain both branches: for example, it may warn the operator and automatically open ventilation.

### Activity 3 — Source case study: ABS

The source uses anti-lock braking as a control example. Magnetic-field sensors monitor wheel rotation; the microprocessor compares wheel speeds; braking pressure is changed; wheel speed changes; the sensors measure again. **Source: p. 87.**

```text
Wheel speed
    ↓
Magnetic-field sensor
    ↓
Processor
    ↓
Compare wheels
    ↓
Adjust braking pressure
    ↓
Wheel speed changes
    ↓
Sensor reads again
```

This is the same control pattern as temperature/fan control:

```text
measure → compare → act → measure again
```

### Activity 4 — Avoid rapid on/off switching

The source's street-light activity asks the learner to avoid flicker when conditions temporarily change due to clouds or car headlights. **Source: p. 88.**

A PBL solution is to use two thresholds instead of one:

```text
if light < 40
    turn ON

if light > 60
    turn OFF
```

Between 40 and 60, keep the current state. This is a design addition used to solve the source requirement.

Apply the same idea to gas ventilation:

```text
HIGH = 80
SAFE = 60

Gas = 85 → fan ON
Gas = 70 → fan stays ON
Gas = 55 → fan OFF
```

This avoids repeated toggling around a single threshold.

---

## Explanation

### Can a monitoring system have an alarm?

Yes. An alarm can simply notify a person. The system becomes control when it automatically changes the physical process.

### Can a control system have a display?

Yes. Control systems can also monitor, log and display values. The defining difference is whether they act on the process.

### Where is the feedback loop closed?

At the point where the actuator changes the physical state and the sensor measures that changed state again.

### Why must the sensor be read repeatedly?

Because the controller must know whether its previous action worked and whether the system has returned to the acceptable range.

---

## Practice / Checks

### M5.1 — Classify

| System | Monitoring / Control |
|---|---|
| Hospital machine displays patient temperature | ? |
| Greenhouse opens a window when too hot | ? |
| Security sensor sounds an alarm on movement | ? |
| Pump reduces speed when pressure is too high | ? |
| River sensor sends pollution data to a control room | ? |

### M5.2 — Complete the loop

```text
Pressure
   ↓
[ A ]
   ↓
ADC
   ↓
[ B ]
   ↓
compare with stored limit
   ↓
[ C ]
   ↓
valve position changes
   ↓
pressure changes
   ↓
[ D ]
```

### M5.3 — Explain feedback

A cooling system is drawn only as:

```text
sensor → processor → fan
```

Add the missing path that makes this a true feedback loop.

### M5.4 — Find the design flaw

```text
IF Temperature > 80
    Fan = ON
ELSE
    Fan = OFF
```

Sensor values repeatedly fluctuate around 80°C. Explain what can happen and propose a two-threshold approach.

### M5.5 — Exam-style describe question

Describe how a light sensor, ADC, microprocessor, stored values and lamp control can automatically switch a street light, and include a method to avoid rapid flicker. The source sets this task in Activity 3A. **Source: p. 88.**

---

## Contribution to the Big Problem

The station now implements:

```text
sense
→ convert
→ compare
→ act
→ sense again
```

The next dependency is decision logic. The processor/controller needs a precise way to represent statements such as:

```text
Alarm if temperature is high AND gas is high.
Shutdown if pressure is high OR temperature is high while ventilation is OFF.
```

Module 6 converts these real conditions into binary logic.
