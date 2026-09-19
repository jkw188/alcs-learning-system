# Module 8 — Verify, Optimise & Integrate

## Objectives / State

### Inherited artifact

The current safety interlock is:

```text
X = T.G + G.P + T.P
```

with the verified output:

| T | G | P | X |
|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

### Problem

A logically correct circuit still has to be reviewed as real hardware. Two circuits can look different but be functionally equivalent, and hardware designers care about fabrication, component count, cost, reliability and fault tracing.

### Module question

**How do we verify equivalent implementations, understand NAND as a building block, review simplification trade-offs, and integrate the whole chapter into one system?**

### Artifact

The final **Hardware Design Dossier**:

```text
├── Memory Architecture
├── Storage Strategy
├── Human I/O Architecture
├── Sensor / Physical I/O Architecture
├── Monitoring & Control Architecture
├── Safety Logic Specification
├── Verified Safety Interlock
└── Engineering Review
```

The source discusses real-world logic design considerations, NAND building blocks, simplification and multi-input gates. **Source: pp. 99–103.**

---

## Just-in-time Theory

### 1. Functional equivalence

Two circuits do not need to look the same. They are equivalent if they produce the same output for every possible input combination.

For `n` inputs:

```text
verify all 2^n input combinations
```

### 2. NAND as a building block

The source states that NAND gates can be combined to construct other logic gates. It explicitly demonstrates AND, OR and NOT using NAND-based structures. **Source: p. 100.**

#### NOT from NAND

Connect the same signal to both NAND inputs:

```text
X = A NAND A
```

| A | X |
|---:|---:|
| 0 | 1 |
| 1 | 0 |

Therefore:

```text
NAND(A,A) = NOT A
```

#### AND from NAND

```text
P = A NAND B
X = P NAND P
```

`P` is `NOT(A AND B)`, and the second NAND inverts it again, producing `A AND B`.

#### OR from NAND

Create `NOT A` and `NOT B` with NANDs, then NAND those results:

```text
P = A NAND A
Q = B NAND B
X = P NAND Q
```

This is equivalent to OR.

### 3. Why use building blocks?

The source notes that hardware companies may use off-the-shelf logic units and build larger circuits from standard blocks. **Source: p. 99.** A standardised implementation may help fabrication, but it is not automatically superior in every design.

### 4. Circuit simplification

The source says reducing components can reduce production cost, improve reliability and make faults easier to trace. Detailed Boolean simplification is deferred to Chapter 15. **Source: p. 101.**

Therefore the Chapter 3 goal is to understand **why** simplification matters, not to introduce a new algebra-simplification syllabus prematurely.

### 5. Multi-input gates are an extension

The source shows 3-input and 4-input AND/OR gates and demonstrates equivalence with networks of 2-input gates. However, it explicitly states that students are not expected to answer questions on multi-input gates at Cambridge International AS Level; the content is included for completeness and as a bridge to later material. **Source: pp. 101–103.**

In ALCS, this is marked **Extension**.

---

## Activity / Example

### Activity 1 — Verify NAND building blocks

The source's Activity 3E asks learners to use truth tables to prove NAND constructions are equivalent to AND, OR and NOT, and to build additional circuits such as XOR from NAND gates. **Source: p. 100.**

Verification pattern:

```text
Original gate
      ↓
truth table A

NAND-only circuit
      ↓
truth table B

Compare final outputs for all rows
```

If the final columns match completely, functional equivalence is verified.

### Activity 2 — Audit the safety interlock

Current design:

```text
X = T.G + G.P + T.P
```

Implementation:

```text
3 × AND
2 × OR
```

Audit:

- **Correctness:** verified by the eight-row truth table.
- **Traceability:** good because `A,B,C,D,X` intermediate values can be inspected.
- **Fabrication:** uses more than one gate type; a NAND-only alternative is possible in principle.
- **Simplification:** detailed algebra is outside this chapter, so the verified expression is retained.

### Activity 3 — Multi-input thought experiment (Extension)

For:

```text
X = A AND B AND C
```

output is `1` only for `111`.

For a 3-input OR, output is `0` only for `000`.

The source provides the corresponding multi-input tables and equivalent 2-input constructions. **Source: pp. 101–102.**

### Activity 4 — Full-system trace

Suppose:

```text
Temperature dangerous
Gas safe
Pressure dangerous
```

Then:

```text
T = 1
G = 0
P = 1
```

For the Module 7 safety policy:

```text
X = T.G + G.P + T.P
  = 1×0 + 0×1 + 1×1
  = 0 + 0 + 1
  = 1
```

End-to-end trace:

```text
physical conditions
       ↓
sensors
       ↓
ADC
       ↓
digital readings
       ↓
threshold comparison
       ↓
T=1, G=0, P=1
       ↓
logic circuit
       ↓
X=1
       ↓
alarm + shutdown control
       ↓
actuators
       ↓
physical system changes
       ↓
new sensor readings
```

---

## Explanation

### The chapter is not a list of devices

The modules connect into one computing/control architecture:

```text
store instructions
→ execute
→ sense
→ process
→ decide
→ output
→ control
```

### Faster is not automatically better

SRAM is faster than DRAM, but DRAM remains useful for main memory because of different cost/capacity trade-offs. SSD can offer faster electronic access than HDD, but storage choice still depends on workload and other constraints.

### Input/output labels are not enough

Knowing "speaker = output" is less useful than understanding:

```text
digital data → DAC → amplifier → speaker
```

Knowing "sensor = input" is less useful than understanding:

```text
physical quantity → sensor → ADC → processor
```

### Monitoring and control differ in effect on the process

```text
Monitoring:
measure → analyse → warn

Control:
measure → analyse → act → process changes → measure again
```

### A circuit must be verified

A diagram that looks plausible is not enough. The truth table provides exhaustive evidence over the binary input space.

---

## Practice / Checks

### M8.1 — NAND equivalence

Using NAND gates only, construct:

```text
a. NOT
b. AND
```

Then verify each with a truth table.

### M8.2 — Compare two designs

Design A:

```text
X = A OR B
```

Design B:

```text
P = A NAND A
Q = B NAND B
X = P NAND Q
```

Build both truth tables and decide whether the two designs are functionally equivalent.

### M8.3 — Engineering trade-off

Respond to the claim: **"The circuit with the fewest gates is always the best circuit."** Use at least two real hardware considerations from the source.

### M8.4 — Extension

For a four-input AND gate:

1. how many truth-table rows are required?
2. which row(s) produce `1`?
3. why is this material classified as an extension in this chapter?

---

## Contribution to the Big Problem — Final Architecture

```text
                 SMART FACTORY
          SAFETY & TRAINING STATION

┌──────────────────────────────────────────┐
│           EMBEDDED CONTROLLER            │
│                                          │
│ ROM-family → firmware                    │
│ DRAM       → working memory              │
│ SRAM       → processor cache             │
│ SSD        → operational storage         │
└────────────────────┬─────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   Human I/O      Sensors      Storage I/O
        │            │
        │         analogue
        │            │
        │           ADC
        │            │
        └────────────┼──────────────┐
                     ▼              │
                 PROCESSOR          │
                     │              │
             threshold tests       │
                     │              │
                 T / G / P          │
                     │              │
                     ▼              │
             LOGIC INTERLOCK        │
                     │
                     X
              ┌──────┴──────┐
              │             │
              ▼             ▼
           Warning       Control
              │             │
        display/speaker   DAC /
                          actuator
                             │
                             ▼
                     Physical process
                             │
                             └──→ sensors again
```

---

# Chapter Integration & Final Challenge

## Final Challenge — Smart Chemical Production Cell

A production cell has three safety inputs:

```text
T = 1 if temperature > safe limit
G = 1 if dangerous gas level is detected
P = 1 if pressure > safe limit
```

It must also store logs, keep live data in primary memory, provide fast cache, retain startup firmware after power-off, display status, produce an audible alarm, automatically operate ventilation, and allow portable diagnostic export.

### Safety requirements

```text
R1: Shutdown if temperature AND gas are dangerous.
R2: Shutdown if gas AND pressure are dangerous.
R3: Shutdown if pressure is dangerous while temperature is NOT dangerous.
```

`X = 1` means shutdown.

## Part A — Memory Architecture

Choose and justify:

```text
startup firmware
live process data
processor cache
```

from:

```text
ROM-family
DRAM
SRAM
```

Expected architecture target:

```text
Startup firmware  → ROM-family
Live process data → DRAM
Processor cache   → SRAM
```

The justification must use non-volatility/read-write/speed/capacity trade-offs rather than labels alone.

## Part B — Storage Strategy

Choose storage for:

```text
1. Main process logs
2. Portable diagnostic transfer
```

A suitable design uses SSD for integrated operational storage and USB flash for portable diagnostics, justified using source properties such as non-volatility, access speed, no moving parts, compactness and portability.

## Part C — Audible Alarm Output

Trace:

```text
Safety logic
→ X = 1
→ processor/controller selects alarm output
→ DAC
→ analogue electrical signal
→ amplifier
→ speaker
→ sound waves
```

The DAC converts digital information to analogue electrical output; the amplifier increases the signal enough to drive the speaker.

## Part D — Sensor Input

Trace physical temperature:

```text
physical temperature
→ temperature sensor
→ analogue signal
→ ADC
→ digital value
→ processor
```

The sensor measures; the ADC converts.

## Part E — Feedback Control

Build the closed loop:

```text
physical condition
→ sensor
→ ADC
→ processor
→ compare with stored threshold
→ control decision
→ actuator / ventilation
→ physical condition changes
→ sensor reads again
```

The repeated measurement is what closes the feedback loop.

## Part F — Logic Specification

Translate the requirements:

```text
R1 = T.G
R2 = G.P
R3 = P.(NOT T)
```

Therefore:

```text
X = T.G + G.P + P.(NOT T)
```

## Part G — Logic Circuit

Use intermediate variables:

```text
A = NOT T
B = T.G
C = G.P
D = P.A
E = B+C
X = E+D
```

Circuit structure:

```text
T ── NOT ── A ───────┐
                      AND ── D ─────────────┐
P ────────────────────┘                    │
                                           OR ── X
T ─────────┐                                │
           AND ── B ────┐                  │
G ─────────┘             OR ── E ──────────┘
G ─────────┐             │
           AND ── C ─────┘
P ─────────┘
```

## Part H — Verification

Complete trace:

| T | G | P | A=`NOT T` | B=`T.G` | C=`G.P` | D=`P.A` | E=`B+C` | X=`E+D` |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |
| 0 | 0 | 1 | 1 | 0 | 0 | 1 | 0 | **1** |
| 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |
| 0 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | **1** |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | **0** |
| 1 | 1 | 0 | 0 | 1 | 0 | 0 | 1 | **1** |
| 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | **1** |

Verify directly against the requirements:

- `R1 = T.G` is true for `110`, `111`;
- `R2 = G.P` is true for `011`, `111`;
- `R3 = P.NOT T` is true for `001`, `011`;
- all other rows output `0`.

This proves the circuit behaviour across all eight possible states.

## Part I — Engineering Review

Current implementation:

```text
1 × NOT
3 × AND
2 × OR
Total = 6 gates
```

Review:

- correctness is verified;
- intermediate values make fault tracing easier;
- NAND-only implementation is possible because NAND can construct NOT/AND/OR;
- an alternative implementation must be checked by comparing complete truth tables;
- fewer components can reduce cost and improve reliability/fault tracing, but component count is not the only engineering criterion.

## Final Design Status

```text
Requirement coverage     ✓
Memory design            ✓
Storage design           ✓
Human/output path        ✓
Sensor input path        ✓
Feedback control         ✓
Boolean specification    ✓
Logic circuit            ✓
8-row verification       ✓
Engineering review       ✓
```

The final chapter chain is:

```text
physical requirement
        ↓
hardware choice
        ↓
sensor / I/O path
        ↓
monitoring or control
        ↓
binary conditions
        ↓
Boolean expression
        ↓
logic circuit
        ↓
truth table
        ↓
verified system behaviour
```
