# Module 6 — Encode Safety Rules

## Objectives / State

### Inherited state

The station can now sense, compare, warn and control a physical process. The remaining problem is how to represent safety rules precisely in binary hardware logic.

### Module question

**How do real-world safety conditions become 0/1 variables, logic gates, Boolean expressions and truth tables?**

### Artifact

```text
Safety Logic Specification v1

Physical condition
      ↓
Binary variable
      ↓
Logic statement
      ↓
Boolean expression
      ↓
Truth table
```

The source introduces six gates—NOT, AND, OR, NAND, NOR and XOR—and uses truth tables to check gate/circuit outputs. **Source: pp. 89–92.**

---

## Just-in-time Theory

### 1. Define binary meaning first

For the project:

```text
T = temperature state
G = gas state
P = pressure state
```

Define them explicitly:

```text
T = 0 → temperature safe
T = 1 → temperature high

G = 0 → gas safe
G = 1 → gas high

P = 0 → pressure safe
P = 1 → pressure high
```

A binary `1` does not universally mean "good" or "ON". It means whatever the variable definition says.

The source follows the same pattern in its real-world logic examples: define parameter values first, then translate conditions. **Source: pp. 96–98.**

### 2. Truth-table size

For `n` binary inputs:

```text
number of combinations = 2^n
```

The source gives the standard cases:

```text
1 input  → 2 rows
2 inputs → 4 rows
3 inputs → 8 rows
4 inputs → 16 rows
```

**Source: p. 90.**

With `T`, `G`, `P`, a complete table therefore needs eight input rows.

### 3. NOT

NOT has one input and inverts it. **Source: p. 90.**

| A | NOT A |
|---:|---:|
| 0 | 1 |
| 1 | 0 |

Example: if `V=1` means ventilation ON, `NOT V` represents ventilation not ON.

### 4. AND

AND outputs `1` only when both inputs are `1`. **Source: p. 91.**

```text
X = A AND B
X = A.B
```

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Safety example:

```text
X = T AND G
```

Alarm only if temperature and gas are both high.

### 5. OR

OR outputs `1` when at least one input is `1`. **Source: p. 91.**

```text
X = A OR B
X = A + B
```

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

Safety example:

```text
X = P OR G
```

### 6. NAND

NAND is NOT-AND. It outputs `0` only for inputs `1,1`. **Source: p. 91.**

| A | B | NAND |
|---:|---:|---:|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### 7. NOR

NOR is NOT-OR. It outputs `1` only when both inputs are `0`. **Source: p. 91.**

| A | B | NOR |
|---:|---:|---:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

### 8. XOR

XOR outputs `1` when the two inputs are different. **Source: p. 92.**

| A | B | XOR |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

This is the major distinction:

```text
1 OR 1  = 1
1 XOR 1 = 0
```

### 9. Boolean notation

The source introduces:

```text
.   → AND
+   → OR
overbar → NOT
```

**Source: p. 92.**

In plain-text lessons, `NOT A` may be used where an overbar would be awkward.

### 10. Truth tables are verification tools

A truth table is not only a memorisation aid for single gates. It checks whether an expression/circuit matches required behaviour for every possible binary input combination. **Source: pp. 89–90.**

---

## Activity / Example

### Prediction

If:

```text
T = 1 → temperature high
G = 1 → gas high
```

and the rule says the alarm activates only when **both** are high, the correct gate is AND.

### Activity 1 — Compare AND and OR policies

Policy A:

```text
Shutdown if T AND P
```

Policy B:

```text
Shutdown if T OR P
```

For `T=1, P=0`:

```text
1 AND 0 = 0
1 OR 0  = 1
```

One word in a safety requirement can completely change system behaviour.

### Activity 2 — XOR application

Two manual test buttons:

```text
A = button A pressed
B = button B pressed
```

Requirement: test mode is active only if **exactly one** button is pressed.

```text
X = A XOR B
```

### Activity 3 — Translate requirements

Definitions:

```text
T = 1 → temperature high
G = 1 → gas high
V = 1 → ventilation ON
```

Requirement 1:

```text
Alarm if temperature high AND gas high
X = T.G
```

Requirement 2:

```text
Warning if gas high OR temperature high
X = G + T
```

Requirement 3:

```text
Warning if ventilation is OFF
X = NOT V
```

Requirement 4:

```text
Test signal if exactly one of two sensors is active
X = A XOR B
```

### Activity 4 — Safety Logic Specification v1

Inputs:

```text
T = 1 → temperature > safety threshold
G = 1 → gas > safety threshold
P = 1 → pressure > safety threshold
```

Outputs:

```text
H = T
C = T AND G
W = G OR P
```

Prepare the three-input combinations:

| T | G | P |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |
| 1 | 1 | 1 |

This list becomes the foundation of Module 7 circuit verification.

---

## Explanation

### Does `1` always mean safe?

No. `G=1` might mean dangerous gas, while `V=1` might mean ventilation is running. Always read the variable definition.

### Is OR "exactly one"?

No. OR includes the `1,1` case. XOR is the common gate for "exactly one of two".

### Is NAND just another form of AND?

It is the inverse of AND. The `1,1` case distinguishes them directly.

### Why start from the requirement?

The correct workflow is:

```text
requirement
→ identify AND / OR / NOT relationship
→ Boolean logic
→ gate selection
```

The source uses this approach in its worked logic problems. **Source: pp. 95–98.**

### Why is a truth table exhaustive testing?

For three binary inputs, the table covers all eight possible states. Testing only a normal case and an all-danger case is not enough.

---

## Practice / Checks

### M6.1 — Identify the gate

| Requirement | Gate |
|---|---|
| Output 1 only when both inputs are 1 | ? |
| Output 1 when at least one input is 1 | ? |
| Invert the input | ? |
| Output 1 only when both inputs are 0 | ? |
| Output 0 only when both inputs are 1 | ? |
| Output 1 when inputs are different | ? |

### M6.2 — Build truth tables

Create complete tables for:

```text
A. X = A AND B
B. Y = A NOR B
C. Z = A XOR B
```

### M6.3 — Translate to logic

Given:

```text
T = temperature high
P = pressure high
V = ventilation ON
```

Write logic for:

1. alarm if temperature high AND pressure high;
2. warning if temperature high OR pressure high;
3. fault if ventilation is NOT ON;
4. test signal when exactly one of T or P is high.

### M6.4 — Find the error

Requirement: alarm if temperature is high or gas is high, **including when both are high**. An engineer chooses XOR. Explain the error and choose the correct gate.

### M6.5 — Binary combinations

A circuit has four inputs `A,B,C,D`. How many truth-table input rows are required? Explain using `2^n`.

The source's Activity 3B asks learners to produce truth tables for several circuits and recommends intermediate parts. Activity 3C asks learners to construct circuits/truth tables from logic statements. **Source: pp. 94–96.** These become the direct dependency of Module 7.

---

## Contribution to the Big Problem

The station now has a formal decision language:

```text
REAL CONDITION
      ↓
BINARY STATE
      ↓
BOOLEAN RELATIONSHIP
      ↓
LOGIC GATE / EXPRESSION
      ↓
TRUTH TABLE
```

Module 7 combines several hazard conditions into one complete safety interlock and verifies the final output.
