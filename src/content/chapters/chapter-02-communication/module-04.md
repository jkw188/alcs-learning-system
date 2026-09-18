# Module 4 — Choose the Communication Medium

## Objectives / State

### Immediate problem

Module 3 established the links that Nova needs:

```text
End devices → local star segments
Local segments → building core
Main Campus ↔ Research Centre
HCMC ↔ Hanoi
Mobile devices → campus network
```

A line on a topology diagram is not yet a real communication system. Nova must now decide:

> **What should physically carry each link: cable, Wi-Fi, Bluetooth, terrestrial wireless, or satellite?**

The decision must use:

- distance;
- bandwidth/capacity;
- mobility;
- interference;
- penetration;
- attenuation;
- reliability;
- security;
- cost and installation constraints.

### Knowledge needed now

- wired vs wireless networking;
- Wi-Fi;
- Bluetooth;
- spread spectrum frequency hopping;
- radio waves, microwaves and infrared;
- frequency/wavelength relationship;
- penetration;
- attenuation;
- twisted pair;
- coaxial cable;
- fibre optic cable;
- satellite communication;
- GEO, MEO and LEO at the level needed for communication decisions.

### Verifiable artifact

**Artifact M4 — Physical-Link Plan** must identify:

1. a communication medium for each important Nova link;
2. wired/wireless justification;
3. cable type where wired;
4. wireless technology where wireless;
5. a long-distance approach;
6. trade-offs and limitations.

---

## Just-in-time Theory

### 1. Wired vs wireless is a trade-off

The source identifies wireless advantages such as:

- mobility;
- easier expansion;
- reduced need for a physical cable to every mobile device.

It also identifies disadvantages:

- greater susceptibility to interference;
- possible security exposure if transmissions are not properly protected;
- signal blocking/dead spots;
- often lower predictability than a wired connection.

Wired links are generally strong where Nova values stability, predictable capacity and low interference, but they reduce mobility and require physical installation.

Therefore Nova should not ask “wired or wireless for everything?” The better question is:

> **Which medium matches each link's requirements?**

**Source:** Chapter 2, textbook pp.45–46.

### 2. Wi-Fi

Wi-Fi is wireless networking using radio/microwave frequencies and IEEE 802.11 protocols. It is suitable for short-range network access and supports mobile devices through WAPs.

For Nova, likely Wi-Fi users include:

- students;
- lecturers;
- phones;
- tablets;
- laptops.

Likely locations include classrooms, the library, cafeteria and common areas.

**Source:** Chapter 2, textbook pp.40–42.

### 3. Bluetooth

Bluetooth is a short-range wireless technology operating around the 2.45 GHz band. The source describes it as using many channels and changing channel when necessary to reduce interference.

Typical Nova examples:

```text
Laptop ↔ wireless mouse
Phone ↔ headset
Tablet ↔ nearby peripheral
```

Bluetooth is not a replacement for campus Wi-Fi because its range and use case are different.

### 4. Spread spectrum frequency hopping

The source explains that Bluetooth devices can select among multiple channels and change frequency repeatedly.

Conceptually:

```text
chosen channel busy
       ↓
choose another channel
       ↓
continue communication
```

This reduces the chance of persistent interference on one fixed frequency.

**Source:** Chapter 2, textbook pp.40–41.

### 5. Radio waves, microwaves and infrared

The source compares these wireless regions using bandwidth, penetration and attenuation.

#### Bandwidth

In the source comparison, infrared is shown with higher bandwidth than microwave, and microwave higher than radio.

#### Penetration

**Penetration** describes how well a signal passes through physical materials and obstacles. The source presents radio waves as having better penetration than microwave or infrared.

#### Attenuation

**Attenuation** is the reduction in signal strength as a signal travels.

```text
strong signal
     ↓ distance / obstacles
weaker signal
```

A critical distinction:

```text
penetration
→ can the signal pass through the obstacle?

attenuation
→ how much signal strength is lost?
```

**Source:** Chapter 2, textbook pp.40–42.

### 6. Frequency and wavelength

The source uses:

\[
f=\frac{c}{\lambda}
\]

where the correct quantities/units are:

- `f` = frequency in **Hz**;
- `λ` = wavelength in **m**;
- `c` = speed of electromagnetic radiation, approximately `3 × 10^8 m/s`.

The source explanatory text around this formula has a unit-label inconsistency. Use the correct physics notation above.

**Source:** Chapter 2, textbook pp.40–41.

#### Worked calculation — microwave example

Given:

\[
\lambda=10^{-1}m
\]

then:

\[
f=\frac{3\times10^8}{10^{-1}}
=3\times10^9Hz
=3GHz
\]

#### Worked calculation — infrared-scale example

Given:

\[
\lambda=10^{-3}m
\]

then:

\[
f=\frac{3\times10^8}{10^{-3}}
=3\times10^{11}Hz
=300GHz
\]

The relationship is:

```text
wavelength decreases
→ frequency increases
```

Do not infer from this equation alone that network data rate doubles when carrier frequency doubles. Data rate depends on many additional engineering factors.

### 7. Twisted pair cable

Twisted pair uses copper conductors twisted together. The source describes it as:

- relatively cheap;
- lower in transfer capability than the other cable types in its comparison;
- more affected by external interference;
- available in shielded and unshielded forms.

It is a strong candidate for short local endpoint connections where cost matters.

```text
Desktop PC ── twisted pair ── local switch
```

**Source:** Chapter 2, textbook pp.42–43.

### 8. Coaxial cable

Coaxial cable contains:

- a central copper conductor;
- insulation;
- shielding;
- an outer protective layer.

The source presents it as more expensive than twisted pair, with better transfer characteristics and less external interference, while still being subject to attenuation.

Nova does not need to use every textbook cable. The purpose is to understand the characteristics and choose only when justified.

### 9. Fibre optic cable

Fibre optic cable transmits pulses of light through glass fibres.

The source highlights:

- high data transfer capacity;
- low attenuation;
- strong resistance to external electromagnetic interference;
- suitability for longer-distance/high-capacity links;
- higher cost.

This makes fibre a strong candidate for:

```text
building backbone
high-capacity server/core links
site-to-site connections
```

**Source:** Chapter 2, textbook pp.42–43.

### 10. Single-mode vs multi-mode fibre

The source distinguishes:

**Single-mode fibre**

- smaller core;
- less internal reflection;
- useful for longer-distance/high-speed communication.

**Multi-mode fibre**

- multiple light paths/reflections;
- suited to shorter distances such as many LAN applications.

The chapter does not require a full optical-engineering treatment. Use this distinction only when it improves the design decision.

### 11. Satellite communication

Terrestrial radio/microwave communication can be constrained by line-of-sight and the curvature of the Earth. Satellite communication allows a signal to travel to a satellite and back to a distant point on Earth.

```text
Ground A
   ↑ uplink
Satellite
   ↓ downlink
Ground B
```

**Source:** Chapter 2, textbook pp.41–42 and pp.55–56.

### 12. GEO, MEO and LEO

The source gives approximate categories:

- **GEO**: about 35,800 km; orbital period about 24 hours; associated with long-distance telephone/network communication;
- **MEO**: about 5,000–12,000 km; associated in the source with GPS;
- **LEO**: about 500–2,500 km; associated with mobile communication systems.

At this stage, the key design lesson is not “satellite is best”. Satellite is a candidate when geography or lack of terrestrial infrastructure justifies it.

---

## Activity / Example

### Step 1 — Prediction

Choose an initial medium:

| Link | Prediction |
|---|---|
| Desktop PC → local network | Twisted pair / fibre / Wi-Fi? |
| Lecturer laptop in a classroom | Wired / Wi-Fi? |
| Floor network → building core | Copper / fibre? |
| Main Campus → Research Centre | Copper / fibre / wireless? |
| Phone → headset | Wi-Fi / Bluetooth? |
| Very remote long-distance site | terrestrial / satellite possible? |

Then justify the choice against requirements.

### Step 2 — Computer laboratory

Requirements:

- fixed desktop PCs;
- high traffic;
- stable connection;
- mobility not required.

Wireless adds little benefit for fixed desktops.

**Decision:**

```text
PC
 |
twisted pair
 |
local network
```

Reasoning:

- inexpensive endpoint cabling;
- stable local connection;
- short LAN distances;
- no need for user mobility.

### Step 3 — Lecturer/student mobile devices

Requirements:

- users move around;
- devices include phones, tablets and laptops;
- connection must be convenient and temporary.

**Decision:**

```text
Laptop  )))
Tablet  ))) WAP
Phone   )))
```

Use Wi-Fi for access mobility.

### Step 4 — Personal peripheral communication

A lecturer connects a laptop to a headset and wireless mouse over a few metres.

**Decision:** Bluetooth.

Reasoning:

- very short range;
- low bandwidth requirement;
- personal-device communication.

### Step 5 — 20-floor building backbone

Each floor aggregates traffic from wired devices and WLAN users. The backbone therefore needs:

- high capacity;
- low attenuation;
- resistance to interference;
- room for future growth.

```text
Floor 20 ┐
Floor 19 │
...      ├── Fibre backbone ── Core
Floor 2  │
Floor 1  ┘
```

**Decision:** fibre optic backbone.

### Step 6 — Main Campus ↔ Research Centre

Distance is about 5 km and the link carries organisational traffic.

Requirements:

- high capacity;
- reliability;
- potentially redundant paths;
- support for important services.

**Primary candidate:** fibre optic communication.

```text
Main Campus
     ║
     ║ fibre
     ║
Research Centre
```

If physical cable installation is not possible due to geography, permission or cost, a point-to-point wireless service may be considered. The source explicitly notes that laying cables may require permission from authorities or landowners.

### Step 7 — HCMC ↔ Hanoi

This is a long-distance WAN problem, not a LAN cabling problem.

At the chapter level the design records:

```text
long-distance WAN communication
→ telecom/provider infrastructure
→ fibre/other carrier links
→ satellite only where justified
```

### Step 8 — WLAN coverage in a 20-floor building

One WAP is not enough for a 20-floor building because walls/floors, distance and attenuation create weak-signal areas.

```text
Floor 20 → WAP
Floor 19 → WAP
...
Floor 2  → WAP
Floor 1  → WAP
```

The exact number and placement require a real site survey. The textbook also notes that commercial WLANs need several WAPs because wireless range is limited.

### Step 9 — Medium decision matrix

| Link | Mobility | Capacity | Distance | Reliability | Choice |
|---|---:|---:|---:|---:|---|
| Desktop → local network | Low | Medium/high | Short | High | Twisted pair |
| Server → core | None | Very high | Short/medium | Very high | Fibre candidate |
| Floor → core | None | Very high | Medium | Very high | Fibre |
| Student/lecturer mobile devices | High | Medium/high | Local | Medium/high | Wi-Fi |
| Laptop → headset | High | Low | Very short | Medium | Bluetooth |
| Main Campus ↔ Research Centre | None | Very high | ~5 km | Very high | Fibre primary |
| HCMC ↔ Hanoi | None | Very high | Long distance | Very high | WAN carrier infrastructure |
| Very remote site | None | Variable | Very long | Context-dependent | Satellite candidate |

### Step 10 — Source Activity 2B: 20-floor building

The source asks whether a 20-floor building LAN should be wired or wireless.

A wireless-only solution provides mobility but risks interference, dead spots, signal penetration problems and shared wireless capacity.

A wired-only solution provides stable high-capacity links but does not support mobile users well and creates cabling constraints.

Nova therefore uses:

### **Hybrid wired + wireless**

```text
            Fibre backbone
                  |
       ┌──────────┼──────────┐
       |          |          |
     Floor      Floor      Floor
       |          |          |
   wired PCs   wired PCs   wired PCs
       |          |          |
      WAP        WAP        WAP
      )))        )))        )))
```

### Step 11 — Source Extension 2B calculation

Given:

\[
\lambda=100m
\]

\[
f=\frac{3\times10^8}{100}
=3\times10^6Hz
=3MHz
\]

The important method is to show substitution, powers of ten and units clearly.

### Artifact M4 — Physical-Link Plan

```text
                       INTERNET / WAN
                              |
                  Provider infrastructure
                              |
                    NOVA MAIN CAMPUS
                              |
                       Fibre backbone
                 ┌────────────┼────────────┐
                 │            │            │
               Floor 1      Floor 2      ...
                 │            │
           ┌─────┴─────┐ ┌────┴─────┐
           │           │ │          │
       Wired PCs      WAP          WAP
      twisted pair    )))          )))
                       │
                  mobile devices

Main Campus ================= Research Centre
             Fibre link
          + redundancy if needed

Personal devices:
Laptop ~~~ Bluetooth ~~~ Headset
```

### Artifact M4 — Decision table

| Requirement | Medium | Justification |
|---|---|---|
| Fixed classroom/lab PCs | Twisted pair | Cheap, stable, short LAN distances |
| Building backbone | Fibre optic | High capacity, low attenuation, interference resistance |
| Servers/core | Fibre candidate | High capacity and reliability |
| Student/lecturer mobile access | Wi-Fi | Mobility and convenient local access |
| Personal peripherals | Bluetooth | Short range, low bandwidth |
| Main Campus–Research Centre | Fibre | High-capacity reliable metropolitan link |
| Remote WAN | Carrier infrastructure | Long-distance networking |
| Very remote communication | Satellite where justified | Overcomes terrestrial/geographical limitations |

---

## Explanation / Understand from the Result

### Why not use fibre for every endpoint?

Fibre provides high performance but also higher cost and installation complexity. A desktop a few metres from its access switch may be fully served by twisted pair.

### Why not use Wi-Fi for everything?

Wi-Fi solves a mobility problem. Fixed infrastructure often prioritises stability, capacity and predictable performance. Therefore Nova uses wireless access over a wired backbone.

### Wi-Fi vs Bluetooth

```text
Wi-Fi
→ network access

Bluetooth
→ short-range personal/peripheral communication
```

The difference is not just range; the intended use is different.

### Attenuation vs penetration

```text
Penetration:
Can the signal pass through the obstacle?

Attenuation:
How much signal strength is lost?
```

A signal may penetrate an obstacle while still losing considerable strength.

### Higher frequency does not automatically mean higher network speed

The equation `f = c / λ` describes the relationship between frequency and wavelength. Actual data rate also depends on protocol, allocated bandwidth, modulation, interference and hardware.

### Satellite is not “the best wireless medium”

Satellite solves very-long-distance/geographical coverage problems. Local campus networking is usually better served by fibre, copper and Wi-Fi. Choose satellite only when the requirement justifies its trade-offs.

---

## Practice / Checks

### Task 1 — Medium selection

Nova opens an 8-floor building with:

- 300 desktop PCs;
- 500 mobile users;
- a server room on Floor 1;
- high traffic;
- many concrete walls.

Choose a medium for:

1. desktop → floor network;
2. floor → server room;
3. mobile users;
4. lecturer → wireless headset.

For each:

```text
Medium:
Reason:
Main limitation:
```

### Task 2 — Frequency calculation

Use:

\[
f=\frac{c}{\lambda}
\]

and:

\[
c=3\times10^8m/s
\]

Calculate `f` when:

- `λ = 1 m`;
- `λ = 0.01 m`;
- `λ = 10^-6 m`.

Show substitution, power of ten, final hertz and a suitable MHz/GHz/THz conversion.

### Task 3 — Decision problem

A research facility is 6 km from the Main Campus. Compare fibre optic cable and a point-to-point wireless link using:

- capacity;
- interference;
- reliability;
- installation;
- permission;
- cost.

Then justify your choice.

### Task 4 — Find the error

> “Infrared is always the best wireless technology because it has the highest bandwidth.”

Identify at least three factors this statement ignores.

### Cambridge-style checks

**Q1 — Describe**

> Describe two differences between fibre optic and twisted pair cable. [4]

Useful dimensions include transmission method, capacity, interference, attenuation and cost.

**Q2 — Explain**

> Explain what is meant by attenuation of a signal. [2]

**Q3 — Explain**

> Explain how spread spectrum frequency hopping reduces interference when Bluetooth devices communicate. [3]

**Q4 — Justify**

> Nova is installing a network in a 20-floor building. Justify the use of both wired and wireless communication rather than using only one. [4]

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs to communicate?              ✅
M2: WHERE should data/processing live?     ✅
M3: HOW should networks be interconnected? ✅
M4: WHAT should carry the signals?         ✅
```

Dossier status:

```text
Communication Architecture & Validation Dossier
│
├── M1 Network Requirements Sheet       ✅
├── M2 Logical Service Architecture     ✅
├── M3 Topology Design                  ✅
├── M4 Physical-Link Plan               ✅
├── M5 Hardware architecture            ⬜
├── M6 IP addressing plan               ⬜
├── M7 Ethernet validation              ⬜
├── M8 Web request trace                ⬜
└── M9 Service validation               ⬜
```

Nova now has real media choices, but a path such as `Laptop → ? → ? → Internet` still contains missing devices. Module 5 turns the topology and media into hardware.
