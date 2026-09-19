# Module 1 — Memory Architecture

## Objectives / State

### Problem

The Smart Factory Safety & Training Station must boot reliably, process sensor readings continuously, hold temporary values, and react quickly to hazardous conditions. One memory technology should not be assumed suitable for every role.

### Inherited state

This is the first dependency in the chapter. No previous artifact exists yet.

### Module question

**Where should startup firmware, live working data, and frequently reused processor data/instructions be kept?**

### Artifact

At the end of this module you will produce **Memory Architecture v1**:

```text
Smart Factory Station
│
├── Boot / firmware       → ?
├── Main working memory   → ?
└── Processor cache       → ?
```

This module deliberately does not solve long-term log storage. That is the dependency of Module 2.

---

## Just-in-time Theory

### 1. Memory is not the same as storage

The source describes primary memory as memory directly accessible by the CPU. It includes RAM and ROM. Secondary storage is non-volatile, normally larger, and slower to access. The chapter also notes that registers are part of the processor and that cache stores data/instructions the processor is likely to use again. **Source: pp. 68–70.**

For this project:

```text
Data currently being processed
        ↓
     MEMORY

Historical logs / media / backups
        ↓
     STORAGE
```

### 2. RAM

RAM is read/write primary memory and is volatile. The source explains that it stores data, files, parts of applications and parts of the operating system that are currently in use. As working memory fills, the system may need to move data between RAM and secondary storage more often, which reduces performance. **Source: p. 70.**

Typical live project data includes:

```text
Current temperature
Current gas reading
Current pressure reading
Current alarm state
Temporary calculation values
```

These values change frequently and are only needed while the system is operating, so RAM is appropriate.

### 3. ROM

ROM is non-volatile and is used for information that must still exist after power-off. The source links ROM to startup data such as BIOS information. **Source: pp. 71–72.**

For the station:

```text
POWER ON
   ↓
load startup instructions
   ↓
initialise sensors and controller
   ↓
start normal operation
```

The startup instructions must not disappear when the power is removed, so a ROM-family non-volatile memory is appropriate.

### 4. DRAM

The source describes DRAM as memory built from transistors and capacitors. Capacitors store bits and must be refreshed because charge leaks away. The source notes DRAM's lower manufacturing cost and higher capacity compared with SRAM, and identifies DRAM as the common technology for main memory. **Source: p. 71.**

A useful design interpretation is:

```text
DRAM
→ large read/write working area
→ suitable for main memory
```

### 5. SRAM

SRAM uses flip-flops and does not require periodic refreshing. The source states that SRAM has faster access than DRAM and is used where speed is critical, such as processor cache. **Source: p. 71.**

The simplest hierarchy for this chapter is:

```text
CPU
 │
 ▼
SRAM cache
 │
 ▼
DRAM main memory
```

Cache is effective because programs often reuse the same instructions and data. Keeping these in faster SRAM avoids some slower DRAM accesses.

### 6. DRAM vs SRAM is a trade-off, not a winner/loser comparison

| Property | DRAM | SRAM |
|---|---|---|
| Refresh required | Yes | No |
| Typical speed | Lower | Higher |
| Typical capacity | Higher | Lower |
| Typical cost | Lower | Higher |
| Typical role | Main memory | Processor cache |

The learning goal is to justify **why both are used together**.

### 7. PROM and EPROM

The source describes PROM as programmable once and EPROM as reprogrammable after erasure. PROM uses a fuse-based method; EPROM uses floating-gate technology and the source describes ultraviolet light as the erasing/programming mechanism used in the textbook example. **Source: p. 72.**

Engineering implication:

```text
stable final firmware
        ≠
firmware still being developed
```

A reprogrammable device can be useful while a design is changing repeatedly.

### 8. Embedded systems

The source describes embedded systems as systems in which microprocessors are built into devices to perform dedicated control tasks. Advantages include small size, relatively low cost, low power use, simple interfaces and fast real-time reaction. Drawbacks include difficulty upgrading, specialist fault-finding, possible confusing interfaces, security exposure for networked devices, and waste when devices are difficult to repair. **Source: p. 72.**

The Smart Factory controller fits the embedded-system model because it has a dedicated purpose and must react quickly to physical inputs.

---

## Activity / Example

### Prediction

Before checking the explanation, choose a suitable memory role:

| Requirement | ROM family | DRAM | SRAM |
|---|---:|---:|---:|
| Startup firmware | ? | ? | ? |
| Sensor working data | ? | ? | ? |
| CPU cache | ? | ? | ? |

### Trace one start-up cycle

```text
Power ON
   ↓
[ ? ] contains startup instructions
   ↓
Processor begins execution
   ↓
Sensor reading arrives
   ↓
[ ? ] stores temporary live data
   ↓
CPU repeatedly uses important data/instructions
   ↓
[ ? ] supplies very fast repeated access
```

Reasoning:

- startup information requires non-volatility → **ROM-family memory**;
- live read/write working data requires main RAM → **DRAM**;
- frequently reused data/instructions need very fast access → **SRAM cache**.

### Memory Architecture v1

```text
SMART FACTORY SAFETY STATION

              ┌───────────────┐
              │      CPU      │
              └───────┬───────┘
                      │
               ┌──────▼──────┐
               │ SRAM Cache  │
               └──────┬──────┘
                      │
               ┌──────▼──────┐
               │ DRAM        │
               │ Main Memory │
               └─────────────┘

Boot/startup
     │
     ▼
┌─────────────┐
│ ROM-family  │
│ firmware    │
└─────────────┘
```

### Embedded-system decision

The controller is treated as an embedded system because it is dedicated to the safety station, is expected to react quickly, and should be compact and power-efficient. The trade-offs noted by the source—upgrade difficulty, specialist troubleshooting and security concerns—remain part of the design review rather than being ignored.

---

## Explanation

If the station used only ROM, it would not have a convenient writable working area for changing live values. If it used only volatile DRAM, persistent startup information would disappear when power was lost. If all main memory were SRAM, the design would gain speed but lose the cost/capacity advantages that make DRAM suitable as main memory.

A reasonable chapter-level architecture is therefore:

```text
ROM-family
→ persistent startup instructions

DRAM
→ normal working memory

SRAM
→ high-speed cache
```

The key idea is not memorising three labels; it is matching a memory property to a requirement.

---

## Practice / Checks

### Mini Challenge M1

An emergency ventilation controller stores:

```text
A. startup program
B. current temperature
C. current gas sensor value
D. frequently executed control instructions
E. calibration firmware still under development
```

Complete the table:

| Data / purpose | Memory you choose | Why? |
|---|---|---|
| A | ? | ? |
| B | ? | ? |
| C | ? | ? |
| D | ? | ? |
| E | ? | ? |

Explain:

1. Why should an HDD not replace SRAM cache even if the HDD has greater capacity?
2. If the station suddenly loses power, which information in the architecture must not depend on DRAM?
3. During prototyping, why can a reprogrammable ROM technology be more useful than a once-programmable device?

The source's Extension Activity 3A asks learners to apply RAM/ROM roles to a microwave oven, refrigerator and remote-controlled model aircraft. These are useful transfer examples after the factory scenario. **Source: p. 73.**

---

## Contribution to the Big Problem

Module 1 establishes the station's computing-memory layer:

```text
CPU
├── SRAM cache
├── DRAM working memory
└── ROM-family firmware
```

The next dependency is persistent data: logs, training media, backups and portable transfer. That is the problem solved in Module 2.
