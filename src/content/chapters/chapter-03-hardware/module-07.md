# Module 7 — Build the Safety Interlock

## Objectives / State

### Inherited state

The project uses three binary hazard inputs:

```text
T = 1 → temperature above safety threshold
G = 1 → gas above safety threshold
P = 1 → pressure above safety threshold
```

The learner now knows individual gate behaviour and truth-table construction.

### Problem

Real safety decisions normally depend on combinations of conditions, not one gate at a time. The station needs a complete interlock and evidence that it behaves correctly for every input state.

### Module question

**How do we translate a multi-condition safety policy into a Boolean expression, circuit, intermediate trace and complete truth table?**

### Artifact

```text
Safety requirements
       ↓
Boolean expression
       ↓
Logic circuit
       ↓
Intermediate outputs
       ↓
Truth table
       ↓
Verification
```

The source's Examples 3.1–3.3 progressively demonstrate circuit → truth table, statement → circuit, and real-world safety scenario → circuit/truth table. **Source: pp. 92–98.**

---

## Just-in-time Theory

### 1. Split complex circuits into intermediate parts

The source's Example 3.1 calculates intermediate values before the final output. This reduces errors and makes tracing/debugging possible. **Source: pp. 92–94.**

Example:

```text
X = (A AND B) OR (B AND C)
```

Use:

```text
Q = A AND B
R = B AND C
X = Q OR R
```

### 2. Translate requirements systematically

Look for the logical relationships in the language:

```text
AND → AND gate
OR  → OR gate
NOT / OFF → NOT
```

The source uses exactly this strategy when converting wind-turbine safety conditions into logic statements. **Source: p. 97.**

### 3. Circuit and specification should check each other

The source notes that a truth table can be produced by tracing the circuit or by evaluating the original logic statement. If both methods agree for all rows, confidence increases. **Source: p. 95.**

---

## Activity / Example — Final Safety Interlock v1

### Safety policy

For the PBL factory design:

> **Emergency shutdown occurs when at least two of the three hazard conditions are high.**

This is a PBL integration requirement, not copied from the source. The source's wind-turbine example provides the method.

### Step 1 — Convert the requirement

Possible two-hazard combinations:

```text
① Temperature high AND gas high
② Gas high AND pressure high
③ Temperature high AND pressure high
```

Therefore:

```text
X = (T AND G)
    OR (G AND P)
    OR (T AND P)
```

Boolean form:

```text
X = T.G + G.P + T.P
```

### Step 2 — Define intermediate outputs

```text
A = T AND G
B = G AND P
C = T AND P
D = A OR B
X = D OR C
```

Dependency:

```text
T,G → A
G,P → B
T,P → C
A,B → D
D,C → X
```

### Step 3 — Circuit

```text
T ─────────┐
           AND ─── A ───────┐
G ─────────┘                 │
                             OR ─── D ─────┐
G ─────────┐                 │             │
           AND ─── B ───────┘             OR ─── X
P ─────────┘                               │
                                           │
T ─────────┐                               │
           AND ─── C ─────────────────────┘
P ─────────┘
```

Current gate count:

```text
3 × AND
2 × OR
```

### Step 4 — Build truth-table columns

```text
T
G
P
A = T.G
B = G.P
C = T.P
D = A+B
X = D+C
```

Three inputs require eight rows.

### Step 5 — Trace representative rows

For `T,G,P = 0,0,0`:

```text
A = 0
B = 0
C = 0
D = 0
X = 0
```

For `0,1,1`:

```text
A = 0
B = 1
C = 0
D = 1
X = 1
```

Gas and pressure are both high, so the shutdown requirement is met.

### Step 6 — Complete truth table

| T | G | P | A=`T.G` | B=`G.P` | C=`T.P` | D=`A+B` | X=`D+C` |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| 0 | 0 | 1 | 0 | 0 | 0 | 0 | **0** |
| 0 | 1 | 0 | 0 | 0 | 0 | 0 | **0** |
| 0 | 1 | 1 | 0 | 1 | 0 | 1 | **1** |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | **0** |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 | **1** |
| 1 | 1 | 0 | 1 | 0 | 0 | 1 | **1** |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | **1** |

### Step 7 — Verify the requirement directly

```text
0 hazards high: 000 → 0
1 hazard high: 001, 010, 100 → 0
2 hazards high: 011, 101, 110 → 1
3 hazards high: 111 → 1
```

The circuit therefore implements the stated policy.

### Step 8 — Reconnect to the physical system

Each binary input is produced by the earlier sensing path:

```text
Temperature sensor
→ ADC
→ threshold comparison
→ T

Gas sensor
→ ADC
→ threshold comparison
→ G

Pressure sensor
→ ADC
→ threshold comparison
→ P
```

Then:

```text
T / G / P
    ↓
Safety logic circuit
    ↓
X
```

If `X=1`, the controller may issue an alarm and initiate defined shutdown/control actions through the output/actuator architecture.

---

## Source Method Connections

### Example 3.1 — circuit → intermediate values → truth table

The source splits a circuit into parts, calculates intermediate outputs and combines them into a final truth table. **Source: pp. 92–94.**

### Example 3.2 — requirement → expression → circuit

The source translates an alarm requirement into a logic statement/Boolean expression, builds the gates, then checks the result. **Source: pp. 95–96.**

### Example 3.3 — real safety system

The source gives a wind-turbine shutdown scenario using speed, temperature and wind velocity, translates the conditions, combines intermediate circuits with OR gates, and builds a complete truth table. **Source: pp. 96–98.**

The PBL safety interlock deliberately follows this method.

---

## Explanation

### Why use intermediate columns?

If only `T,G,P,X` are shown and `X` is wrong, the failure location is unclear. Intermediate columns make it possible to trace each stage like debugging a program.

### Are a Boolean expression and a circuit different algorithms?

They are two representations of the same logical function. If their truth tables differ, at least one representation is wrong.

### Why not test only `000` and `111`?

A faulty circuit can still get those two extremes correct. Intermediate states such as `011`, `101` and `110` are essential.

### Why do parentheses matter?

```text
(A AND B) OR C
```

is not generally equal to:

```text
A AND (B OR C)
```

For `A=0, B=0, C=1`, the first produces `1`, the second `0`.

### Why must real requirements be precise?

"Shutdown when dangerous" is not implementable until "dangerous" is converted into measurable binary conditions with defined thresholds and relationships.

---

## Practice / Checks

### M7.1 — Circuit with NOT

Given the same `T,G,P` definitions, a secondary alarm `Y` activates if:

- temperature is high AND gas is NOT high; OR
- gas is high AND pressure is high.

Produce:

1. logic statement;
2. Boolean expression;
3. intermediate variables;
4. circuit;
5. complete eight-row truth table.

### M7.2 — Trace a circuit

```text
A = T AND P
B = G OR P
X = A AND B
```

Complete:

| T | G | P | A | B | X |
|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | ? | ? | ? |
| 0 | 0 | 1 | ? | ? | ? |
| 0 | 1 | 0 | ? | ? | ? |
| 0 | 1 | 1 | ? | ? | ? |
| 1 | 0 | 0 | ? | ? | ? |
| 1 | 0 | 1 | ? | ? | ? |
| 1 | 1 | 0 | ? | ? | ? |
| 1 | 1 | 1 | ? | ? | ? |

### M7.3 — Find the design error

Requirement:

```text
X = 1 if (temperature high AND gas high) OR pressure high
```

An engineer builds:

```text
X = T AND (G OR P)
```

Find one input combination that proves the two functions are not equivalent.

### M7.4 — Exam-style chemical safety system

Let:

```text
R = reaction rate high
T = temperature high
C = concentration high
```

Alarm if:

```text
(R AND T) OR (T AND C)
```

Follow the full source workflow: define → logic statement → circuit → truth table → verify.

The source's Activity 3D provides similar chemical-process and power-station safety scenarios. **Source: pp. 98–99.**

---

## Contribution to the Big Problem

The station now connects the complete chain:

```text
Physical world
      ↓
Sensors
      ↓
ADC
      ↓
Threshold comparison
      ↓
T / G / P
      ↓
Boolean logic
      ↓
Logic circuit
      ↓
Verified X
      ↓
Alarm / shutdown action
```

Module 8 audits this design, explores NAND equivalence, explains simplification trade-offs, integrates the entire hardware system and completes the chapter challenge.
