# Module 3 — Build a Topology That Survives Failure

## Objectives / State

### Immediate problem

Modules 1 and 2 established:

- which areas must communicate;
- where data and processing should live.

The next design decision is:

> **How should Nova's devices, clients, servers and site networks be interconnected so that the system can handle traffic and remain useful when components fail?**

The decision must be justified using:

- traffic;
- cost;
- scalability;
- security;
- fault tolerance;
- failure impact.

### Knowledge needed now

- bus topology;
- star topology;
- mesh topology;
- routing and flooding in mesh networks;
- hybrid topology;
- simple packet behaviour;
- the distinction between a network model and a network topology.

Media, hardware models and IP addressing are deliberately postponed until the connection structure is known.

### Verifiable artifact

**Artifact M3 — Topology Design & Failure Analysis** must contain:

1. a topology choice for each Nova zone;
2. a logical topology diagram;
3. at least several failure cases;
4. traffic reasoning;
5. security/scalability reasoning;
6. an overall topology decision for the organisation.

---

## Just-in-time Theory

### 1. What does topology describe?

Topology answers:

> **How are nodes interconnected?**

This is different from the service model.

```text
Network model:
client-server

Topology:
star
```

Client-server/P2P describes service roles. Star/mesh/bus/hybrid describes connection structure.

### 2. Bus topology

A **bus topology** uses one main cable to which all devices connect.

```text
[T]──PC──PC──PC──Printer──PC──[T]
```

`[T]` represents a terminator.

The source identifies these characteristics:

- one central cable;
- relatively little cabling;
- easy expansion for small networks;
- only one device should transmit at a time on the shared bus;
- heavy traffic reduces performance;
- if the main cable fails, the whole network is affected;
- packets pass the nodes, which inspect the destination address.

Advantages include low cabling requirements and the fact that one node can fail without necessarily stopping other nodes. A major weakness is the central cable: its failure can bring down the network.

**Source:** Chapter 2, textbook p.37.

### 3. Star topology

A **star topology** connects each device to a central hub or switch.

```text
        PC
         |
PC ── Central ── Server
       node
         |
      Printer
```

The source identifies these properties:

- traffic goes through the central hub/switch;
- failure of one individual link normally affects only that node;
- failure of the central hub/switch affects the whole star;
- adding or removing devices is straightforward;
- star is more suitable than bus for heavier traffic;
- a switch can improve efficiency and privacy compared with a hub.

**Source:** Chapter 2, textbook pp.37–38.

### 4. Hub-based vs switch-based star

A hub behaves conceptually like this:

```text
packet
  ↓
 hub
 ↙ ↓ ↘
all nodes
```

A switch behaves conceptually like this:

```text
packet
  ↓
switch
  ↓
intended destination
```

The detailed hardware behaviour is taught in Module 5, but this difference matters when evaluating a star topology.

### 5. Mesh topology

A **mesh topology** provides multiple interconnections between nodes.

```text
 A────B
 |\  /|
 | \/ |
 | /\ |
 |/  \|
 C────D
```

If one direct link fails, an alternative path can be used.

```text
A → B link fails
A → C → D → B may still work
```

The source describes two approaches in mesh communication: **routing** and **flooding**.

**Source:** Chapter 2, textbook pp.38–39.

### 6. Routing in a mesh

Routing uses logic to choose a path toward the destination.

```text
A ── B ── D
 \       /
   C ───
```

If:

```text
A → B → D
```

fails because B or its link fails, an alternative path can be:

```text
A → C → D
```

This gives resilience and fault tolerance.

### 7. Flooding in a mesh

Flooding sends data through multiple possible neighbouring paths rather than selecting one normal route.

```text
        B
       / \
A ────    D
       \ /
        C
```

Possible copies might travel:

```text
A → B → D
A → C → D
```

Flooding can improve the chance that data reaches a destination, but it generates extra traffic and can be inefficient.

### 8. Mesh trade-off

Advantages:

- a broken link does not necessarily disconnect the network;
- alternate routes can exist;
- fault tolerance can be high;
- dedicated links can support privacy/security;
- the network can be expanded.

Disadvantages:

- many connections are required;
- cabling/communication links are expensive;
- configuration and maintenance are more complex.

### 9. Why full mesh scales badly

For a full mesh with `n` nodes, the number of direct links is:

\[
\text{connections}=\frac{n(n-1)}{2}
\]

For 5 nodes:

\[
\frac{5(5-1)}{2}=10
\]

For 10 nodes:

\[
\frac{10(10-1)}{2}=45
\]

The number of links grows quickly. Therefore a real organisation often uses partial mesh, hierarchy, or a hybrid architecture rather than full mesh everywhere.

### 10. Hybrid topology

A **hybrid topology** combines multiple topology types.

```text
       Star LAN
          |
          |
      backbone
       /      \
 Star LAN    Mesh links
```

The source notes that hybrid networks can support large amounts of traffic and large networks, but are more complex to install and maintain. Its example connects different hotel-chain networks using different topologies.

**Source:** Chapter 2, textbook pp.39–40.

---

## Activity / Example

### Step 1 — Prediction

Choose an initial topology for each case:

| Zone | Prediction |
|---|---|
| 40-PC computer laboratory | Bus / Star / Mesh? |
| Main Building | Bus / Star / Mesh / Hybrid? |
| Main Campus ↔ Research Centre | Single link / redundant mesh-like links? |
| Whole Nova organisation | One topology / Hybrid? |

Do not answer “star” merely because it is common. Justify it against the requirements.

### Step 2 — Computer laboratory

Requirements:

- 40 PCs;
- heavy traffic;
- devices may be added or removed;
- one PC/link failure should not take down the whole lab;
- central management is useful.

#### Candidate A — Bus

```text
PC──PC──PC──PC──PC──...
```

Problems:

- heavy traffic causes degradation;
- failure of the main cable affects the whole lab;
- all nodes share the main medium;
- scaling is less attractive for this workload.

#### Candidate B — Star

```text
           PC
           |
PC ─── central ─── PC
       device
           |
           PC
```

If one device cable fails:

```text
PC ──X── central
```

only that device is normally isolated.

**Decision:**

```text
Computer Lab
→ STAR
```

### Step 3 — Main building

The 20-floor main building contains laboratories, admin areas, staff areas, servers and WLAN zones. A single enormous flat star is not the only possible design.

A more scalable conceptual structure uses several star segments:

```text
Lab Star ──────┐
               |
Admin Star ─── Core
               |
Staff Star ────┤
               |
Wi-Fi zone ────┘
```

**Decision:**

```text
Main Building
→ multiple star segments
→ integrated as a hybrid/hierarchical structure
```

### Step 4 — Failure analysis of the building core

If all building segments depend on one central point:

```text
             Central
            /   |   \
         Lab   Admin  Staff
```

then central failure can affect the entire building.

A more resilient conceptual design may add redundant core paths:

```text
             Core A
            /      \
        segments   Core B
            \      /
```

The exact enterprise implementation is outside the chapter, but the lesson is important:

> **Failure analysis must influence topology decisions.**

### Step 5 — Main Campus ↔ Research Centre

A single link:

```text
Main ───────── Research
```

creates a critical failure case:

```text
Main ───X──── Research
```

If the connection is important, Nova may justify redundant paths:

```text
      Route A
Main ========= Research
 \             /
  === Route B =
```

This is a partial-mesh/redundancy idea rather than a full mesh.

### Step 6 — Multi-site design

Suppose Nova has:

- Main Campus;
- Research Centre;
- Sports Centre;
- Hanoi Office.

A full mesh would require every site to connect directly to every other site. That may provide resilience, but cost and complexity can be excessive.

The design question is:

```text
resilience
vs
cost/complexity
```

### Step 7 — Decision matrix

| Criterion | Bus | Star | Mesh | Hybrid |
|---|---:|---:|---:|---:|
| Low cabling cost | Strong | Medium | Weak | Depends |
| Easy expansion | Medium | Strong | Medium | Strong |
| Fault isolation | Weak | Strong | Very strong | Strong |
| Heavy traffic | Weak | Strong | Strong | Strong |
| Simple maintenance | Medium | Strong | Weak | Medium/weak |
| Redundant paths | Weak | Weak by default | Strong | Can be strong |
| Large-campus suitability | Weak | Good locally | Good for critical links | Very strong |

Do not mechanically total scores. Different requirements have different importance.

### Step 8 — Choose Nova's topology

#### End-user LANs

Computer labs, staff areas and admin areas:

```text
→ STAR
```

Reasons:

- scalability;
- fault isolation;
- support for heavy traffic;
- central management.

#### Building level

Multiple star segments are integrated:

```text
Lab Star ──────┐
Admin Star ────┼── Building Core
Staff Star ────┤
WLAN Segment ──┘
```

```text
→ HYBRID
```

#### Critical inter-site links

Where availability justifies the cost:

```text
→ PARTIAL MESH / REDUNDANT PATHS
```

#### Whole organisation

```text
Local access:       STAR
Building integration: HYBRID
Critical inter-site: PARTIAL MESH / REDUNDANCY
Overall:            HYBRID
```

### Step 9 — Packet-path trace at topology level

Suppose a student PC accesses an academic server:

```text
Student PC
    ↓
Local star segment
    ↓
Building core
    ↓
Server segment
    ↓
Academic server
```

At this stage we know the connection layers but have not yet selected the exact forwarding hardware.

### Step 10 — Failure traces

#### Case A — One student link fails

```text
Student PC ─X─ central point
```

Expected result:

```text
Student PC offline
others continue
```

#### Case B — One lab segment fails

```text
Lab segment X
```

Expected result:

```text
Lab affected
Admin/Staff continue
```

#### Case C — Primary inter-site path fails

```text
Main =====X===== Research
```

If a backup path exists:

```text
Main ------------ Research
       backup
```

traffic can use an alternative route.

### Artifact M3 — Topology Design

```text
                        NOVA NETWORK
                             |
              ┌──────────────┴──────────────┐
              │                             │
         Main Campus                 Research Centre
              │                             │
         Hybrid design                 Star LANs
        /      |      \                     |
   Lab Star Admin Star Staff Star           |
        \      |      /                     |
          Building Core =====================
                 \        redundant path
                  ===========================
```

A remote site adds a WAN connection rather than changing every local LAN topology.

### Artifact M3 — Decision table

| Scope | Chosen topology | Evidence |
|---|---|---|
| Computer labs | Star | Heavy traffic, easy expansion, individual-link fault isolation |
| Staff/Admin areas | Star | Central management and easier fault isolation |
| Main Building | Hybrid of star segments | Different zones can scale independently |
| Critical campus links | Partial mesh/redundant paths | Availability and fault tolerance |
| Whole Nova system | Hybrid | Different areas have different requirements |

---

## Explanation / Understand from the Result

### Why not use mesh everywhere?

Mesh provides resilience, but it also increases cabling, cost, configuration and maintenance complexity. A topology with the most links is not automatically the best design.

### Why is bus weak for Nova's core network?

Bus is useful for a small number of devices and light traffic. Nova has many devices, heavy traffic, critical services and strong scalability requirements.

### Is star completely fault tolerant?

No.

Individual-link failure:

```text
one node affected
```

Central-device failure:

```text
whole star may be affected
```

Therefore star improves fault isolation without removing every single point of failure.

### Is “hybrid” just an unclear answer?

No. Nova deliberately uses different structures at different levels because requirements differ.

```text
star
+
star
+
partial mesh
→ hybrid architecture
```

### Peer-to-peer ≠ mesh

```text
       Server
      /  |  \
    PC  PC  PC
```

can be client-server + star.

```text
A────B
|\  /|
| \/ |
| /\ |
|/  \|
C────D
```

is a mesh topology. Service model and topology are separate concepts.

### Routing vs flooding

```text
Routing
→ choose a suitable path

Flooding
→ send through multiple possible paths
```

Flooding can improve reachability but increases traffic overhead.

---

## Practice / Checks

### Task 1 — Topology choice

Nova opens a temporary training room with:

- 6 PCs;
- only 2 months of use;
- low traffic;
- very low budget;
- non-critical downtime.

Choose bus, star or mesh and write:

```text
Choice:
Reason 1:
Reason 2:
Main risk:
```

### Task 2 — Failure analysis

Given:

```text
      PC1
       |
PC2──Switch──PC3
       |
      PC4
```

Explain what happens if:

- the PC2-to-central link fails;
- the central node fails.

### Task 3 — Mesh reasoning

A system has 6 buildings. Calculate the number of direct links required by a full mesh:

\[
\frac{n(n-1)}{2}
\]

Then explain why a partial mesh might be more suitable.

### Task 4 — Find the error

> “Mesh networks are always better than star networks because they have more connections.”

Identify at least two missing considerations and one scenario in which star is more suitable.

### Cambridge-style checks

**Q1 — State**

> State one benefit and one drawback of a star topology. [2]

**Q2 — Explain**

> Explain why a mesh topology may continue operating when one network link fails. [2]

Your explanation should include the idea of an **alternative route**.

**Q3 — Compare**

> Compare star and bus topologies for a network with heavy traffic. [4]

Possible dimensions: central connection, traffic/collisions, failure and scalability.

**Q4 — Justify**

> Nova has several departments and requires its network to remain partially operational if one department connection fails. Justify the use of star-based segments rather than a single bus. [4]

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs to communicate?               ✅
M2: WHERE should data/processing live?      ✅
M3: HOW should nodes/networks be connected? ✅
```

Dossier status:

```text
Communication Architecture & Validation Dossier
│
├── M1 Network Requirements Sheet       ✅
├── M2 Logical Service Architecture     ✅
├── M3 Topology Design                  ✅
├── M4 Physical-link plan               ⬜
├── M5 Hardware architecture            ⬜
├── M6 IP addressing plan               ⬜
├── M7 Ethernet validation              ⬜
├── M8 Web request trace                ⬜
└── M9 Service validation               ⬜
```

Topology now tells Nova **which links must exist**. Module 4 asks what should physically carry those links: twisted pair, fibre, Wi-Fi, Bluetooth, terrestrial wireless or satellite.
