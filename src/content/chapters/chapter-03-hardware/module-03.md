# Module 3 — Human I/O Station

## Objectives / State

### Inherited state

The station already has memory and storage:

```text
CPU / Memory
├── SRAM cache
├── DRAM
└── ROM-family firmware

Storage
├── SSD
├── USB flash
└── backup/archive
```

### Problem

The station must let an operator see live status, enter commands, hear alarms, record audio when needed, print reports, prototype components and train safely for hazardous environments.

### Module question

**Which input/output devices fit each role, and what data path does each device use?**

### Artifact

```text
Human I/O Architecture v1
├── Operator display      → ?
├── Operator input        → ?
├── Audio output          → ?
├── Audio input           → ?
├── Incident reporting    → ?
├── Physical prototyping  → ?
└── Safety training       → ?
```

The source section covers laser printers, inkjet printers, 3D printers, speakers, microphones, screens and sensors; this module uses the human-facing devices first. **Source: pp. 77–83.**

---

## Just-in-time Theory

### 1. Input, output, and devices that do both

Simple classifications include:

```text
Microphone → input
Speaker    → output
Printer    → output
```

A touchscreen acts as both input and output: the screen displays information while touch provides input. **Source: p. 82.**

The engineering question is therefore not only "what category is this device?" but also "how does information flow through it?"

### 2. Laser printer

The source explains that laser printers use dry toner and static electricity. The printing process is page-oriented and includes the printer driver, printer availability checks, a printer buffer, a charged drum, toner, transfer to paper, a fuser and discharge/reset of the drum. **Source: p. 77.**

Simplified sequence:

```text
Document
   ↓
Printer driver
   ↓
Format conversion / availability check
   ↓
Printer buffer
   ↓
Charged drum
   ↓
Laser creates charge pattern
   ↓
Toner attaches
   ↓
Toner transfers to paper
   ↓
Fuser fixes toner
   ↓
Drum reset
```

The printer buffer is temporary printer memory. It allows print data to be held while the mechanism works.

### 3. Inkjet printer

The source identifies a print head with nozzles, ink cartridges, a stepper motor/belt and paper feed. It describes **thermal bubble** and **piezoelectric** methods for producing ink droplets. **Source: p. 78.**

Thermal bubble:

```text
resistor heats ink
→ vapour bubble forms
→ droplet expelled
→ bubble collapses
→ fresh ink drawn in
```

Piezoelectric:

```text
electric charge
→ crystal vibrates
→ pressure ejects ink
→ fresh ink drawn in
```

The print sequence again begins with driver, format, availability and buffer. The paper is fed, a sensor checks paper availability, the head moves across the page, the paper advances, and the cycle repeats. When the buffer becomes empty, the printer can interrupt the processor to request more data. **Source: p. 78.**

### 4. Choosing laser vs inkjet

A PBL decision for the station is:

```text
High-volume routine text reports
→ laser printer

Occasional image-rich/photo output
→ inkjet printer
```

This matches the source's learning goal of comparing the operations and justifying appropriate applications; it is not a claim that one technology is universally better.

### 5. 3D printing

The source describes 3D printing as **additive manufacturing**, where a solid object is built layer by layer. This contrasts with subtractive manufacturing, where material is removed. **Source: p. 79.**

```text
Additive
material → layer → layer → object

Subtractive
solid block → remove material → object
```

Direct 3D printing uses a moving print head to build layers. Binder 3D printing uses two passes for each layer: powder first, then binder. **Source: p. 79.**

For the project, the 3D printer supports prototype sensor/valve housings and maintenance engineering rather than safety control itself.

### 6. Speaker path: digital to analogue

The source's audio-output path is:

```text
digital sound data
      ↓
DAC
      ↓
small electrical current
      ↓
amplifier
      ↓
loudspeaker
      ↓
sound
```

The amplifier is needed because the DAC output current is initially too small to drive the speaker. **Source: p. 80.**

The physical speaker mechanism is described as a varying current through a coil producing a changing magnetic field, making the iron core/cone vibrate and producing sound waves. **Source: p. 80.**

### 7. Microphone path: analogue to digital

The source describes sound waves making a diaphragm vibrate. The diaphragm/coil/magnet arrangement generates an analogue electrical current. A sound card/ADC can convert this analogue signal into digital values for storage or processing. **Source: p. 81.**

```text
sound waves
   ↓
microphone
   ↓
analogue electrical signal
   ↓
ADC
   ↓
digital values
   ↓
computer
```

This establishes a major chapter pattern:

```text
REAL WORLD
   ↕
analogue
   ↕
ADC / DAC
   ↕
digital computer
```

### 8. OLED and screen resolution

The source describes OLED as using organic films between charged electrodes. OLED pixels emit their own light and therefore do not require a separate backlight. **Source: p. 82.**

The source also explains that display pixels contain red, green and blue sub-pixels, and that screen resolution is the horizontal × vertical number of pixels. Resolution is not the same as the physical size of a screen. **Source: p. 82.**

### 9. Capacitive touchscreen

The source describes layered glass acting like a capacitor. Touch changes the electrical condition and an onboard processor determines coordinates. Source benefits include good visibility in strong sunlight, multi-touch and high durability. **Source: p. 82.**

### 10. Resistive touchscreen

The source describes a polyester upper layer and glass lower layer. Pressing makes the layers contact, completing a circuit so the touch position can be calculated. Benefits include lower cost and support for finger, gloved finger or stylus. Drawbacks include poorer visibility in strong sunlight, no multi-touch and lower durability. **Source: p. 83.**

For the PBL factory where operators may wear protective gloves, resistive touch is easy to justify from the source properties.

### 11. VR headset

The source presents VR as useful for safely exploring dangerous environments. It describes left/right visual feeds, display/lenses, field of view, frame rate, gyroscopic/accelerometer sensing, LED/camera tracking, binaural sound and possible eye tracking. **Source: pp. 83–84.**

VR is therefore not merely a display. It combines output with movement sensing and interaction.

---

## Activity / Example

### Activity 1 — Compare printing mechanisms

Laser:

```text
page data
→ charged drum
→ toner
→ paper
→ fuser
```

Inkjet:

```text
print head moves across page
→ droplets sprayed
→ paper advances
→ repeat
```

Use the mechanism and workload to justify the printer choice rather than saying one printer is simply "better".

### Activity 2 — Trace audio recording and playback

An operator records and then replays the message "Emergency test complete":

```text
Operator voice
     ↓
sound waves
     ↓
microphone
     ↓
analogue electrical signal
     ↓
ADC
     ↓
digital audio
     ↓
SSD
     ↓
digital audio retrieved
     ↓
DAC
     ↓
amplifier
     ↓
speaker
     ↓
sound waves
```

The ADC and DAC sit at the boundary between analogue physical signals and the digital computer system.

### Activity 3 — Build the Human I/O Architecture

Requirements:

- show live sensor readings;
- allow operator input while wearing protective gloves;
- issue an audible alarm;
- record spoken maintenance notes;
- print many routine incident reports;
- prototype component housings;
- train staff for dangerous scenarios.

PBL selections:

```text
Live visual status     → OLED display
Gloved touch input     → resistive touchscreen
Alarm output           → DAC + amplifier + speaker
Voice input            → microphone + ADC
Routine reports        → laser printer
Prototype components   → 3D printer
Hazardous training     → VR headset
```

### Human I/O Architecture v1

```text
                  HUMAN OPERATOR
                       │
          ┌────────────┼────────────┐
          │            │            │
       TOUCH         VOICE        VISION
          │            │            │
          ▼            ▼            ▼
   Resistive       Microphone     OLED
   Touchscreen         │         Display
          │            ▼
          │           ADC
          └──────┬─────┘
                 ▼
          ┌────────────┐
          │ PROCESSOR  │
          └──────┬─────┘
                 │
        ┌────────┼─────────┐
        │        │         │
        ▼        ▼         ▼
       DAC     Printer   VR system
        │
        ▼
    Amplifier
        │
        ▼
     Speaker
```

Engineering support:

```text
CAD / design data
       ↓
3D printer
       ↓
prototype component
```

---

## Explanation

### Why is a printer buffer important?

The CPU does not need to control every physical printing action directly. Data can be stored temporarily in printer memory while the mechanism works. The inkjet sequence in the source also shows the printer using an interrupt when it needs more data.

### Why does a speaker need a DAC while a microphone path needs an ADC?

```text
COMPUTER → WORLD
Digital → Analogue
        DAC

WORLD → COMPUTER
Analogue → Digital
         ADC
```

### Why is touchscreen technology an engineering decision?

Because physical operating conditions matter. Gloves, multi-touch requirements, sunlight, durability and cost can change which technology is more appropriate.

### Why is a 3D printer in a hardware chapter?

It is an output device that converts a digital model into a physical object through additive manufacturing.

### Why is VR more than a screen?

A VR system combines visual/audio output with sensor-based movement input, and may also track eye movement.

---

## Practice / Checks

### M3.1 — Printer trace

Put these laser-printing stages into a valid conceptual order:

```text
A. Fuser fixes toner
B. Data enters printer buffer
C. Printer driver formats data
D. Toner attaches to drum
E. Laser changes the charge pattern on the drum
F. Toner transfers to paper
```

### M3.2 — ADC or DAC?

| Situation | ADC / DAC | Why? |
|---|---|---|
| Microphone → computer | ? | ? |
| Computer → speaker | ? | ? |
| Physical sensor → processor | ? | ? |
| Processor → analogue motor control | ? | ? |

### M3.3 — Capacitive vs resistive

The factory later removes the glove requirement and now wants multi-touch, good outdoor visibility and high durability. Decide whether to keep resistive touch or change to capacitive, and justify with at least two source properties.

### M3.4 — Device selection

| Requirement | Device | Justification |
|---|---|---|
| Train staff without entering a hazardous area | ? | ? |
| Create a prototype valve housing | ? | ? |
| Record a spoken maintenance note | ? | ? |
| Print high-volume text reports | ? | ? |
| Display a live control dashboard | ? | ? |

### M3.5 — Explain

Why can a microphone not send real-world sound waves directly to the processor as binary 0s and 1s?

The source also contains comparison questions for laser vs inkjet and an application question about making a 3D replica of a fragile painting. These support the same compare/justify pattern used here. **Source: pp. 87–88.**

---

## Contribution to the Big Problem

After Module 3 the station can compute, store and interact:

```text
1. COMPUTE
   ├── CPU
   ├── SRAM
   ├── DRAM
   └── ROM-family firmware

2. STORE
   ├── SSD
   ├── USB flash
   └── backup/archive

3. INTERACT
   ├── OLED display
   ├── touchscreen
   ├── microphone + ADC
   ├── DAC + amplifier + speaker
   ├── printer
   ├── 3D printer
   └── VR headset
```

The next dependency is physical sensing and actuation: how a real temperature, pressure or gas concentration becomes computer data, and how the computer affects motors or valves.
