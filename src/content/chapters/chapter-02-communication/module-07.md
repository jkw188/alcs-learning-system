# Module 7 — Make Local Transmission Reliable

## Objectives / State

### Immediate problem

Nova now has a hardware path and an IP plan:

```text
PC / Laptop
    ↓
NIC / WNIC
    ↓
Switch / Router
    ↓
correct subnet
```

However, two different local-network problems can still occur:

```text
1. Two devices use the same IP address
   → IP address conflict

2. Two devices transmit over the same shared medium at the same time
   → data collision
```

The module asks:

> **How does Ethernet carry local data, what is the difference between conflict and collision, and how does CSMA/CD handle shared-medium collisions?**

### Knowledge needed now

- Ethernet / IEEE 802.3;
- node and transmission medium;
- Ethernet frame;
- source/destination MAC addresses;
- broadcast;
- IP address conflict;
- collision;
- CSMA/CD;
- jam signal;
- random backoff;
- retry counter;
- flowchart/state trace.

### Verifiable artifact

**Artifact M7 — Ethernet Reliability Validation** must contain:

1. a local Ethernet frame trace;
2. an IP-conflict diagnosis;
3. a collision trace;
4. a CSMA/CD state trace;
5. a corrected flowchart with a termination condition.

---

## Just-in-time Theory

### 1. Ethernet and IEEE 802.3

The source defines **Ethernet** as a protocol used by many wired LANs and associates it with IEEE 802.3. An Ethernet network can be discussed in terms of nodes, the transmission medium and frames.

**Source:** Chapter 2, textbook pp.49–50.

### 2. Ethernet frames

Ethernet carries local data in **frames**. At this chapter's level, the important conceptual fields are:

```text
┌─────────────────────┐
│ Destination MAC     │
├─────────────────────┤
│ Source MAC          │
├─────────────────────┤
│ Data                │
├─────────────────────┤
│ Other control data  │
└─────────────────────┘
```

You do not need the full modern Ethernet frame specification here. The important idea is that local transmission contains enough addressing information to identify the sender and intended receiver.

### 3. MAC address vs IP address

Example:

```text
PC A
IP:  192.168.20.70
MAC: AA-AA-AA-AA-AA-AA

Server B
IP:  192.168.20.75
MAC: BB-BB-BB-BB-BB-BB
```

Conceptually:

```text
IP
→ logical/network addressing

MAC
→ local interface identification
```

A switch can use destination MAC information to send a frame toward the appropriate local interface.

### 4. Normal local frame trace

```text
PC A
 |
 | Ethernet frame
 | src MAC = AA...
 | dst MAC = BB...
 v
Switch
 |
 v
Server B
```

This adds detail to Module 5's statement that the switch forwards toward the intended local destination.

### 5. IP address conflict

An **IP address conflict** occurs when two devices use the same IP address on the same network.

```text
PC A
192.168.20.70

PC B
192.168.20.70
```

This is an addressing/configuration problem. The source notes that conflicts can arise when static and dynamically allocated addresses overlap.

**Source:** Chapter 2, textbook p.50.

### 6. Conflict ≠ collision

```text
IP conflict
→ duplicate logical address
→ addressing/configuration problem

Ethernet collision
→ simultaneous transmissions interfere
→ shared-medium transmission problem
```

Do not use CSMA/CD to “fix” a duplicate IP address.

### 7. Data collision

In the shared-medium Ethernet model used by the source, if two stations transmit on the same communication channel at the same time, the signals can interfere.

```text
A ────────>
              shared medium
B ────────>
```

```text
A ─────X──── B
        ↑
    collision
```

**Source:** Chapter 2, textbook pp.50–51.

### 8. Collision is easiest to see on a shared medium

Example bus:

```text
PC A ─── PC B ─── PC C ─── PC D
```

If A transmits toward D while C transmits toward B at the same time, both use the common medium and a collision can occur.

This helps explain why Module 3 rated a shared bus poorly for Nova's heavy-traffic LANs.

### 9. Switched star greatly reduces collision exposure

A switch-based star separates traffic much more effectively than a bus or hub-based shared medium.

```text
A ─┐
B ─┤
   Switch
C ─┤
D ─┘
```

For this chapter, CSMA/CD is taught according to the **shared-medium Ethernet model in the source**. Do not generalise that every modern full-duplex switched Ethernet network continuously experiences collisions.

### 10. CSMA/CD

**CSMA/CD** stands for:

> **Carrier Sense Multiple Access with Collision Detection**

Break the name down:

#### Carrier Sense

Before transmitting, the station checks whether the shared medium is busy.

```text
Is the line idle?
```

#### Multiple Access

Multiple devices are allowed to use the shared medium.

#### Collision Detection

While transmitting, the station checks whether a collision has occurred.

The source describes the recovery sequence as:

1. detect the collision;
2. stop transmitting;
3. send a jam signal;
4. wait for a random period;
5. retry.

**Source:** Chapter 2, textbook pp.50–51.

### 11. Why carrier sensing alone is not enough

Two stations can both sense an idle medium almost simultaneously:

```text
time t0
A: line idle ✓
B: line idle ✓
```

Both then begin transmitting:

```text
time t1
A ──────>
B ──────>

COLLISION
```

So:

```text
sense idle
≠ guaranteed collision-free transmission
```

Collision detection is still required in the shared-medium model.

### 12. Jam signal

After detecting a collision:

```text
collision detected
        ↓
stop transmitting
        ↓
send jam signal
```

The jam signal informs relevant stations that the transmission has failed because of a collision.

### 13. Random backoff

If both stations retried after exactly the same fixed delay, they could collide again.

Random waiting periods reduce this risk:

```text
A waits 2 time units
B waits 5 time units
```

A retries first; B retries later.

---

## Activity / Example

### Step 1 — Prediction

Given:

```text
A────────B────────C────────D
```

A and C both detect an idle shared medium and begin transmitting almost simultaneously.

Predict the sequence:

```text
1. ______________________
2. ______________________
3. ______________________
4. ______________________
5. ______________________
```

### Step 2 — Trace the CSMA/CD state

Initial condition:

```text
transmission counter = 1
```

#### State 1 — Frame ready

A has a frame to send.

#### State 2 — Sense the medium

```text
Is line idle?
```

If **No**:

```text
wait
→ check again
```

If **Yes**:

```text
start transmitting
```

#### State 3 — Monitor transmission

```text
collision detected?
```

If **No**, continue until the frame is sent.

If **Yes**:

```text
stop transmission
send jam signal
increment counter
```

#### State 4 — Back off and retry

```text
wait random period
→ retry
```

This matches the logic of the source's CSMA/CD flowchart.

### Step 3 — State table

Suppose PC A repeatedly retries one frame.

| Step | State | Counter |
|---|---|---:|
| 1 | Frame ready | 1 |
| 2 | Line idle | 1 |
| 3 | Start sending | 1 |
| 4 | Collision detected | 1 |
| 5 | Jam signal | 1 |
| 6 | Increment counter | 2 |
| 7 | Random wait | 2 |
| 8 | Retry | 2 |
| 9 | Collision again | 2 |
| 10 | Increment | 3 |

Now a new problem appears: what if the channel remains faulty and the algorithm retries forever?

### Step 4 — Source Extension 2D: prevent endless retry

The source explicitly asks learners to modify the flowchart so that the transmission cannot loop forever.

Add a retry limit:

```text
transmission_counter > MAX_RETRIES?
```

Corrected conceptual flowchart:

```text
             ┌───────────────┐
             │ Assemble frame│
             └───────┬───────┘
                     ↓
              Is line idle?
               /         \
             No           Yes
             ↓             ↓
           Wait        Start send
             ↑             ↓
             └───── Collision?
                      /       \
                    No         Yes
                    ↓           ↓
               Frame sent?   Stop send
                /     \       + jam
              No      Yes       ↓
              ↑        ↓      counter++
          continue    END        ↓
                              counter >
                              max retries?
                              /         \
                            Yes          No
                             ↓            ↓
                           ABORT      Random wait
                                         ↓
                                      retry
```

This is part of **Artifact M7**.

### Step 5 — Why the maximum counter matters

If hardware or cabling is genuinely faulty, retrying forever wastes resources and never reports a clean failure.

A termination rule allows:

```text
if retries > limit
→ abort
→ report error
```

### Step 6 — Nova collision trace

Suppose a legacy/shared-medium training segment has A and C transmitting together.

```text
A senses idle
C senses idle

↓ both transmit

collision

↓
A stops
C stops

↓
jam signal

↓
A waits random period 2
C waits random period 5

↓
A retries first

↓
A succeeds

↓
C later retries
```

This is the kind of state sequence you should be able to describe in an exam.

### Step 7 — Broadcast

A broadcast is sent to all relevant devices in a broadcast domain rather than one intended destination.

```text
        ┌→ B
A → network → C
        └→ D
```

Compare with one-destination forwarding:

```text
A → D only
```

### Step 8 — Hub and collision domain

A hub repeats traffic to all connected ports and does not isolate collisions as effectively as a switch-based design. This reinforces Nova's choice from Module 5:

```text
switch-based LAN
→ better traffic isolation
→ lower collision exposure
```

Dependency chain:

```text
M3 topology choice
        ↓
M5 switch choice
        ↓
M7 lower collision exposure
```

### Step 9 — IP conflict trace

Suppose:

```text
PC A
IP 192.168.20.70
```

and a printer is accidentally configured with:

```text
Printer
IP 192.168.20.70
```

This is:

```text
IP conflict
→ address configuration failure
```

It is not solved by CSMA/CD. The correct area to investigate is IP configuration/address management.

### Artifact M7 — Ethernet Reliability Validation

#### Test 1 — Normal local transmission

```text
PC A
 |
 | Ethernet frame
 | src MAC = A
 | dst MAC = B
 ↓
Switch
 ↓
PC B
```

Result: **PASS**.

#### Test 2 — Different subnet

```text
PC A
 ↓
Switch
 ↓
Router
 ↓
another subnet
```

Result: **PASS**, using Modules 5 and 6.

#### Test 3 — Duplicate IP

```text
PC A      Printer
.70       .70
```

Result:

```text
IP conflict
→ addressing/configuration problem
```

#### Test 4 — Simultaneous shared-medium transmission

```text
A → shared channel ← C
```

Result:

```text
collision
→ detect
→ stop
→ jam
→ random wait
→ retry
```

#### Test 5 — Persistent collision/fault

```text
retry
retry
retry
...
```

Correction:

```text
retry counter
+
maximum retry limit
```

Result:

```text
terminate / abort after limit
```

---

## Explanation / Understand from the Result

### Conflict and collision are different

| IP conflict | Data collision |
|---|---|
| Duplicate IP addresses | Overlapping transmissions |
| Addressing/configuration problem | Shared-medium transmission problem |
| Fixed through address management | Handled by collision protocol such as CSMA/CD |
| Can exist before transmission | Happens during transmission |

### Why random wait instead of a fixed wait?

If both stations wait exactly one second, both can retry together and collide again. Random backoff breaks the synchronisation.

### Why does CSMA/CD include collision detection after carrier sensing?

Because two stations may both observe an idle medium before the other's signal has reached them. Carrier sensing reduces collision probability but does not guarantee that collisions cannot occur.

### Star does not automatically remove all collision problems

A star built around a **hub** still creates a shared collision environment. A switch-based star isolates traffic much more effectively. Topology alone is not enough; central hardware matters.

### Ethernet frame ≠ IP packet

At this chapter's level:

```text
Ethernet frame
→ local data-link transmission

IP addressing
→ logical network addressing and routing
```

A deeper protocol-layer treatment belongs elsewhere. We only need enough distinction to explain Nova's path correctly.

---

## Practice / Checks

### Task 1 — Trace CSMA/CD

Complete:

```text
1. Both sense __________________.
2. Both start __________________.
3. A __________________ occurs.
4. Both stop and send a __________________.
5. Each waits for a __________________ time.
6. They then attempt to __________________.
```

Then explain why random timing matters.

### Task 2 — Conflict or collision?

Classify:

**A.** Two PCs have `192.168.10.20`.

**B.** Two PCs transmit simultaneously on a shared cable.

**C.** A PC cannot reach a server because its subnet mask is wrong.

For each:

```text
Type of problem:
Evidence:
Likely area to investigate:
```

### Task 3 — Flowchart fix

Design a condition that prevents endless CSMA/CD retries. Use at least:

```text
counter
maximum
abort
```

and write:

```text
IF __________________
THEN _________________
```

### Task 4 — Find the error

> “CSMA/CD prevents all collisions because devices check the cable before transmitting.”

Explain why this is wrong.

### Task 5 — Architecture reasoning

Compare:

```text
Proposal A:
Star + hub

Proposal B:
Star + switch
```

Use:

- packet delivery;
- bandwidth;
- collision exposure;
- privacy/security.

Then justify one for a 40-PC teaching laboratory.

### Cambridge-style checks

**Q1 — Define**

> Explain what is meant by a data collision. [2]

Include two transmissions, the same channel and the same time.

**Q2 — Describe**

> Describe how CSMA/CD detects and resolves a collision. [4]

Useful sequence:

```text
detect
→ stop
→ jam signal
→ random wait
→ retransmit
```

**Q3 — Explain**

> Explain why a random waiting period is used before retransmission. [2]

**Q4 — Distinguish**

> Explain the difference between an IP address conflict and a data collision. [4]

**Q5 — Flowchart reasoning**

> A CSMA/CD algorithm retries forever whenever the channel repeatedly fails. Describe one modification that ensures the algorithm terminates. [2]

This directly reflects Extension Activity 2D in the source.

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs communication?                   ✅
M2: WHERE do data and processing live?          ✅
M3: HOW are networks interconnected?            ✅
M4: WHAT carries the signals?                   ✅
M5: WHICH hardware moves the data?              ✅
M6: HOW are devices/networks addressed?         ✅
M7: HOW does local Ethernet handle problems?    ✅
```

Dossier status:

```text
Communication Architecture & Validation Dossier
│
├── M1 Network Requirements Sheet       ✅
├── M2 Logical Service Architecture     ✅
├── M3 Topology Design                  ✅
├── M4 Physical-Link Plan               ✅
├── M5 Hardware Architecture            ✅
├── M6 IP Addressing Plan               ✅
├── M7 Ethernet Validation              ✅
├── M8 Web Request Trace                ⬜
└── M9 Service Validation               ⬜
```

Nova now has a working internal communication design. Module 8 follows a real external request from a URL in the browser through DNS, the ISP and the Internet to a web server.
