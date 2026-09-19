# Chapter 3 — Hardware

## Overview

This chapter is organised around one continuous engineering problem rather than the textbook section order. The source chapter covers primary and secondary storage, embedded systems, input/output/storage hardware, RAM/ROM/SRAM/DRAM/PROM/EPROM, monitoring and control systems, NOT/AND/OR/NAND/NOR/XOR gates, truth tables, and the construction of logic circuits and logic expressions. The source also contains worked traces, printer sequences, sensor/control diagrams, real-world logic-system examples, end-of-chapter questions, and extensions such as NAND-only circuits and multi-input gates. **Primary source:** *Chapter 3 — Hardware*, pp. 68–106.

### Scope, prerequisites, and environment

You should already be comfortable with binary 0/1, the role of the CPU, files/data/applications, and the basic distinction between memory and storage. No programming environment is required. The chapter uses architecture diagrams, decision matrices, process traces, Boolean expressions, truth tables, and small design exercises instead of a coding project.

## Big Problem — Smart Factory Safety & Training Station

A factory wants a **Smart Factory Safety & Training Station** that can boot reliably, process sensor readings quickly, retain firmware and logs, support operator input/output, detect physical conditions, control ventilation/valves, issue alarms, print reports, prototype components, support VR training, and automatically shut down when hazardous combinations occur.

The final outcome is a **Hardware Design Dossier** containing:

1. Memory Architecture
2. Storage Strategy
3. Human I/O Architecture
4. Sensor and Physical I/O Architecture
5. Monitoring and Control Loop
6. Safety Logic Specification
7. Verified Safety Interlock
8. Engineering Review and Chapter Integration

A design decision is only considered complete when it is justified by hardware properties, and the safety circuit is only accepted when a complete truth table confirms its behaviour.

## Learning Objectives

By the end of the chapter, you should be able to:

- distinguish primary memory from secondary storage and justify suitable uses;
- compare RAM, ROM, DRAM, SRAM, PROM and EPROM;
- explain why cache commonly uses SRAM and main memory commonly uses DRAM;
- compare magnetic, solid-state and optical storage technologies;
- trace the operation of laser and inkjet printers and explain the role of printer buffers;
- explain additive manufacturing and distinguish direct and binder 3D printing;
- trace digital-to-analogue and analogue-to-digital audio paths;
- compare OLED, capacitive and resistive touchscreen technologies;
- select appropriate sensors for physical quantities;
- explain ADC, DAC, actuators, monitoring, control and feedback loops;
- use NOT, AND, OR, NAND, NOR and XOR correctly;
- construct and use truth tables with `2^n` input combinations;
- translate requirements into Boolean logic and logic circuits;
- trace circuits using intermediate values;
- verify circuit behaviour exhaustively;
- explain why NAND can be used as a building block and why circuit simplification can matter in real hardware.

## Dependency Chain

```text
M1  What memory does the station need?
          ↓
M2  Where should firmware, logs, media and backups be stored?
          ↓
M3  How should people interact with the station?
          ↓
M4  How does the station sense and affect the physical world?
          ↓
M5  When is the system monitoring, and when is it controlling?
          ↓
M6  How are safety conditions represented as binary logic?
          ↓
M7  How are multiple conditions combined into a verified interlock?
          ↓
M8  How do we verify, review and integrate the whole design?
```

The critical second-half dependency is:

```text
Sensor
  ↓
Binary condition
  ↓
Boolean expression
  ↓
Logic gates
  ↓
Logic circuit
  ↓
Truth table
  ↓
Verified safety action
```

## Module Map

| Module | Problem to solve | Key knowledge | Main activity | Artifact |
|---|---|---|---|---|
| 1. Memory Architecture | Where do firmware, live data and frequently used instructions belong? | RAM, ROM, SRAM, DRAM, PROM, EPROM, cache, embedded systems | Compare and justify memory roles | Memory Architecture v1 |
| 2. Storage Strategy | Where should logs, transfers and archives live? | HDD, SSD, flash, optical storage | Decision matrix | Storage Architecture v1 |
| 3. Human I/O Station | How will an operator see, hear, enter, print and train? | printers, 3D printing, audio, OLED, touchscreens, VR | Process traces and device selection | Human I/O Architecture v1 |
| 4. Sense the Physical World | How does physical data enter and leave the computer system? | sensors, ADC, DAC, actuators | Signal-path diagrams | Physical I/O Architecture v1 |
| 5. Close the Control Loop | When does the station merely observe, and when does it automatically act? | monitoring, control, thresholds, feedback | Closed-loop trace | Monitoring & Control Architecture v1 |
| 6. Encode Safety Rules | How do real conditions become 0/1 logic? | six logic gates, Boolean notation, truth tables | Gate tests and translations | Safety Logic Specification v1 |
| 7. Build the Safety Interlock | How do multiple hazard rules become one circuit? | circuit construction, intermediate values, exhaustive testing | circuit + truth table | Verified Safety Interlock |
| 8. Verify, Optimise & Integrate | How can the design be checked and reviewed as a real hardware system? | NAND building blocks, equivalence, simplification rationale, multi-input extension | design audit | Final Hardware Design Dossier |

## Coverage Map

| Source knowledge | Module | Status |
|---|---:|---|
| RAM / ROM | 1 | Core source |
| SRAM / DRAM | 1 | Core source |
| PROM / EPROM | 1 | Core source |
| Embedded systems | 1 | Core source |
| HDD | 2 | Core source |
| SSD / flash / EEPROM | 2 | Core source |
| Optical media | 2 | Core source |
| Laser / inkjet printers | 3 | Core source |
| 3D printing | 3 | Core source |
| Speakers / microphones | 3 | Core source |
| OLED / touchscreen | 3 | Core source |
| VR headsets | 3 | Core source |
| Sensors | 4 | Core source |
| ADC / DAC / actuators | 4 | Core source |
| Monitoring / control / feedback | 5 | Core source |
| NOT / AND / OR / NAND / NOR / XOR | 6 | Core source |
| Truth tables | 6–8 | Core source |
| Circuit tracing | 7 | Core source |
| Requirement → circuit | 7 | Core source |
| Real-world safety logic | 7 | Core source |
| NAND-only building blocks | 8 | Source extension/core reinforcement |
| Simplification rationale | 8 | Source reinforcement |
| Multi-input gates | 8 Extension | Source explicitly marks as beyond AS requirement |
| Smart Factory context and design dossier | All | PBL addition |

## Source vs PBL additions

The **hardware facts, comparisons, device processes, sensor applications, monitoring/control distinctions, gate behaviour, truth-table rules, worked logic methods, and extensions** come from the supplied Chapter 3 source. The **Smart Factory context, design dossier, decision matrices, integrated architecture, and the specific safety policy used for the project** are PBL additions designed to make the source knowledge operate as one dependency-driven engineering problem.

The source extensions on HDD/optical track geometry, PRAM/PCRAM, keyboard/mouse operation, QLED, alternative XOR expressions, NAND constructions, and multi-input gates are retained as extensions rather than forced into the critical path.
