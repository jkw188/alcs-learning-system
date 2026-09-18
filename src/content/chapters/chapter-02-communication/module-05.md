# Module 5 — Turn the Design into Real Network Hardware

## Objectives / State

### Immediate problem

After Module 4, Nova has links such as:

```text
Desktop PCs ── twisted pair
Mobile devices ))) Wi-Fi
Floors ══ fibre backbone
Main Campus ══ Research Centre
HCMC ── WAN ── Hanoi
```

But links alone do not forward data. Nova must now answer:

> **Which hardware receives, forwards, regenerates, connects and routes data through the architecture?**

### Knowledge needed now

- NIC / WNIC;
- Wireless Access Point (WAP);
- hub;
- switch;
- repeater;
- bridge;
- router;
- gateway;
- modem;
- infrastructure mode and ad hoc mode;
- MAC addressing at local-network level.

The source notes that hub and gateway are included to complete the picture even though they were not compulsory syllabus content in that edition. We retain them because they are part of the source and help explain device roles.

### Verifiable artifact

**Artifact M5 — Hardware Architecture & Packet-Forwarding Trace** must show:

1. which hardware is placed at each part of Nova;
2. the function of each device;
3. packet paths through the devices;
4. distinctions between easily confused devices;
5. a complete hardware-level architecture.

---

## Just-in-time Theory

### 1. NIC — Network Interface Card

A device needs a network interface to connect to a network. A **NIC** provides that interface and is associated with a MAC address.

```text
PC
 |
[NIC]
 |
network cable
```

A NIC does not decide routes between networks. It connects one device to the network.

**Source:** Chapter 2, textbook p.49.

### 2. WNIC — Wireless Network Interface Card

A **WNIC** provides the corresponding function for wireless communication.

```text
Laptop
  |
[WNIC]
  )))
 Wi-Fi
```

The source describes two modes.

#### Infrastructure mode

```text
Laptop )))
          WAP
Phone  )))
```

Wireless devices connect through an access point. This is the main model for Nova's managed WLAN.

#### Ad hoc mode

```text
Laptop ))) Laptop
```

Devices communicate directly without a WAP. This may be useful in a small temporary connection but is not Nova's main campus design.

**Source:** Chapter 2, textbook pp.49–50.

### 3. WAP — Wireless Access Point

A WAP connects wireless clients to the wired LAN.

```text
Student laptop )))
Student phone  ))) [WAP] ─── wired LAN
Lecturer tablet)))
```

A WAP is not “the Internet”. Its role is to bridge wireless access into the local network.

### 4. Hub

A hub connects multiple devices but forwards received traffic to **all connected ports/devices**.

```text
          packet
            ↓
          [HUB]
        /   |   \
      PC1  PC2  PC3
```

If PC1 sends data intended for PC3:

```text
PC1 → HUB
       ├─→ PC2
       ├─→ PC3 ✓
       └─→ PC4
```

This wastes bandwidth and exposes traffic more widely than necessary.

**Source:** Chapter 2, textbook pp.46–47.

### 5. Switch

A switch also connects devices in a LAN, but it forwards data only toward the intended destination based on local addressing information such as MAC addresses.

```text
PC1 → SWITCH ───→ PC3
          X
          ├── PC2
          └── PC4
```

For Nova's star LANs, a switch is therefore a better central device than a hub.

**Source:** Chapter 2, textbook pp.46–47.

### 6. Hub vs switch

| Hub | Switch |
|---|---|
| Forwards traffic to all connected devices | Forwards toward the intended destination |
| More unnecessary traffic | More efficient forwarding |
| Weaker traffic privacy | Better traffic isolation |
| Simpler forwarding behaviour | Uses destination information |

### 7. Repeater

A **repeater** receives a weakened signal and regenerates/boosts it so that communication can continue over a longer distance.

```text
Strong signal
     ↓
----distance----
     ↓
 weak signal
     ↓
 [Repeater]
     ↓
 regenerated signal
```

The source allows repeaters for wired and wireless systems.

A repeater does not choose routes. It solves a signal-strength/distance problem.

**Source:** Chapter 2, textbook pp.47–48.

### 8. Bridge

A **bridge** connects LANs or LAN segments that use the same protocols.

```text
LAN A ─── [BRIDGE] ─── LAN B
          same protocol
```

This can conceptually combine segments into a larger local network.

**Source:** Chapter 2, textbook p.48.

### 9. Router

A **router** forwards packets between different networks.

```text
LAN A ── [ROUTER] ── LAN B
```

or:

```text
Campus LAN
    |
 [Router]
    |
 Internet
```

The source describes the router as a device that can:

- forward packets between networks;
- restrict a broadcast to a LAN rather than automatically extending it everywhere;
- act as the path/default gateway toward other networks;
- choose a route toward the destination.

**Source:** Chapter 2, textbook pp.48–49.

### 10. Switch vs router

A useful conceptual distinction is:

```text
Switch:
Which local device/port should receive this frame?

Router:
Which network/path should this packet use?
```

The exact relationship becomes clearer after Module 6 introduces subnetting.

### 11. MAC vs IP in the journey

Within a LAN, switches use local addressing such as MAC destination information. Routers use logical network addressing such as IP information to forward packets between networks.

Conceptually:

```text
Router gets packet to the correct network
        ↓
Switch gets local frame toward the correct interface
```

### 12. Gateway

The source defines a **gateway** as a device used to connect networks that use different protocols and that may perform protocol conversion.

```text
Network A
protocol A
    |
 [Gateway]
    |
Network B
protocol B
```

A simple source-level memory aid is:

```text
Bridge
→ same protocol

Gateway
→ different protocols / conversion
```

**Source:** Chapter 2, textbook pp.48–49.

### 13. Router vs gateway

At source level:

- router: examines a packet and forwards it between networks;
- gateway: provides an entry/exit point and may translate between incompatible protocol environments.

Real hardware can combine several logical functions, but exam answers should distinguish the roles.

### 14. Modem

The textbook model defines a **modem** (modulator-demodulator) as converting between digital and analogue data where the communication channel requires analogue transmission.

```text
Computer/network
     |
   Router
     |
   Modem
     |
communication provider
```

The source also notes that router and modem functions can be combined in one physical device.

**Source:** Chapter 2, textbook pp.48–49.

---

## Activity / Example

### Step 1 — Prediction

Fill the missing devices:

```text
Student laptop
      )))
      [?]
       |
      [?]
       |
Campus backbone
       |
      [?]
       |
Internet
```

Now build the path one decision at a time.

### Step 2 — Computer laboratory

Module 3 chose a star topology for the 40-PC lab.

Each PC needs a NIC:

```text
PC + NIC
```

The central device should be a switch:

```text
 PC1 ─┐
 PC2 ─┤
 PC3 ─┼── [SWITCH]
 ...  ┤
PC40 ─┘
```

If PC1 sends to PC20:

```text
Switch:
PC1 → Switch → PC20
```

rather than the hub behaviour:

```text
Hub:
PC1 → Hub → every connected port
```

**Decision:** lab central device = switch.

### Step 3 — WLAN hardware

A student laptop uses a WNIC.

```text
Laptop[WNIC]
      )))
```

Nova's infrastructure-mode WLAN uses a WAP, which connects to the wired LAN through a switch.

```text
Laptop )))
Phone  ))) [WAP] ─── [Switch]
Tablet )))              |
                        LAN
```

**Decision:**

```text
mobile device
→ WNIC
→ WAP
→ switch
```

### Step 4 — Building backbone

Each floor has a local network segment:

```text
Floor 3 Switch ──┐
Floor 2 Switch ──┼── Core
Floor 1 Switch ──┘
```

Bridge is a concept we must understand, but we do not add a bridge merely because the source contains one. The project uses only hardware justified by the architecture.

### Step 5 — Main Campus → Research Centre

These are separate networks. A local switch alone is not enough.

```text
Main Campus network
        |
     Router
        |
inter-site network
        |
     Router
        |
Research Centre network
```

Routers forward traffic between the networks.

### Step 6 — Internet connection

A simplified source-compatible edge is:

```text
Campus LAN
    |
 [Router]
    |
 [Modem/provider termination]
    |
  ISP / Internet
```

Internet-service details are taught in Module 8.

### Step 7 — Repeater decision

Suppose a remote WLAN area has a weak signal:

```text
WAP ))) )))  ... weak ...   X
```

A repeater may help:

```text
WAP ))) [Repeater] ))) user
```

But do not treat a repeater as the automatic solution. Additional WAPs, better placement or wired backhaul may be better depending on the real environment.

### Step 8 — Gateway source activity

The source Extension Activity 2C asks learners to connect LANs using different protocols.

Conceptually:

```text
LAN A
protocol A
   \
    \
   [Gateway]
    /      \
LAN B      LAN C
protocol B protocol C
```

The purpose is to understand that gateways can connect incompatible protocol environments through conversion/translation.

### Step 9 — Packet trace: same LAN

PC A sends data to PC B in the same lab:

```text
PC A
 |
NIC
 |
Switch
 |
NIC
 |
PC B
```

Trace:

1. PC A creates the data/frame.
2. Its NIC places the frame onto the network.
3. The switch examines the destination.
4. The switch forwards toward the correct port.
5. PC B's NIC receives the frame.

No router is required because the devices are in the same local network.

### Step 10 — Packet trace: wireless student → campus server

```text
Laptop
  |
 WNIC
  )))
 WAP
  |
Switch
  |
Campus network
  |
Server
```

If the server is in the same logical network, the simplified path may not require routing.

### Step 11 — Packet trace: student → Research Centre server

```text
Student Laptop
      |
     WNIC
      )))
     WAP
      |
    Switch
      |
    Router
      |
Inter-site network
      |
    Router
      |
    Switch
      |
Research Server
```

Now the route crosses a network boundary, so routers are required.

### Step 12 — Packet trace: student → Internet

```text
Laptop
  ↓
WNIC
  ↓
WAP
  ↓
Switch
  ↓
Router
  ↓
Provider/Modem
  ↓
Internet
```

Module 8 later adds DNS, URL, public IP, web server and browser behaviour.

### Artifact M5 — Nova Hardware Architecture

```text
                    INTERNET
                       |
                 ISP / provider
                       |
               [Modem/termination]
                       |
                    [Router]
                       |
               ===== CORE =====
               /       |       \
              /        |        \
       [Switch]    [Switch]    [Router]
         Lab       Staff/Admin     |
       / | \          |         Research
      PC PC PC       WAP          Centre
       |              )))           |
      NIC           laptops       Switch
                     WNIC         / | \
                                 PCs Server
```

### Artifact M5 — Hardware decision table

| Requirement | Device | Function |
|---|---|---|
| Connect desktop to LAN | NIC | Network interface |
| Connect mobile device wirelessly | WNIC | Wireless network interface |
| Allow Wi-Fi devices onto LAN | WAP | Connect WLAN to wired network |
| Connect devices in star LAN | Switch | Forward toward intended destination |
| Extend a weak signal | Repeater | Regenerate/boost signal |
| Join same-protocol LAN segments | Bridge | Interconnect LAN segments |
| Move data between networks | Router | Route packets |
| Connect dissimilar protocol networks | Gateway | Protocol conversion / entry-exit point |
| Connect to provider channel in the textbook model | Modem | Signal/data conversion |

---

## Explanation / Understand from the Result

### Why not use a hub for Nova's core LANs?

A hub can connect devices, but it sends incoming data to all connected devices. In a large campus this wastes bandwidth and exposes traffic more widely. Switches fit Nova's requirements better.

### Why can a switch not replace a router?

```text
Switch
→ local destination inside a LAN

Router
→ destination network / path between networks
```

Module 6 makes this distinction concrete with subnets.

### Why is a router unnecessary for PC A → PC B in the same LAN?

Because the traffic does not need to leave the local network.

```text
PC A → Switch → PC B
```

When the destination belongs to another network:

```text
PC A → Switch → Router → another network
```

### WAP ≠ wireless router

A WAP provides wireless access to a LAN. A physical “wireless router” may combine routing, switching and wireless access in one box. The chapter separates the logical functions so you can explain each role.

### A repeater does not “make the Internet faster”

A repeater solves a signal-strength/range problem. It does not increase ISP capacity, server speed or Internet bandwidth.

### Device-role hierarchy

A useful conceptual view is:

```text
NIC/WNIC
→ connect one device

WAP/Switch
→ connect local devices

Bridge
→ connect same-protocol LAN segments

Router
→ connect different networks

Gateway
→ connect/translate dissimilar protocol environments

Modem
→ interface with the provider communication channel in the textbook model
```

Ask:

> **What kind of boundary must the data cross?**

---

## Practice / Checks

### Task 1 — Choose the device

For each situation, identify a suitable device and justify it:

1. A laptop needs to connect wirelessly to the campus LAN.
2. 30 PCs need a central device in a star topology.
3. Two separate IP networks need to exchange data.
4. A signal becomes too weak after a long transmission distance.
5. Two same-protocol LAN segments must work as one larger LAN.
6. Two networks use incompatible communication protocols.

Format:

```text
Device:
Reason:
```

### Task 2 — Trace the packet

Given:

```text
Laptop ))) WAP ── Switch ── Router ── Network B ── Switch ── Server
```

Explain the role of:

- WNIC;
- WAP;
- first switch;
- router;
- second switch.

Do not only repeat definitions; explain each device's role in this trace.

### Task 3 — Find the error

> “A switch and a router do the same job because both send packets to the correct destination.”

Correct the statement. Use the distinction:

```text
device destination
vs
network destination
```

### Task 4 — Hardware design

A branch office has:

- 12 wired PCs;
- 6 Wi-Fi laptops;
- one printer;
- Internet access;
- a connection back to Main Campus.

Draw a minimum architecture using:

- NIC/WNIC;
- WAP;
- switch;
- router.

Do not assign IP addresses yet.

### Cambridge-style checks

**Q1 — Compare**

> Explain two differences between a hub and a switch. [4]

Include packet behaviour and its consequence.

**Q2 — Explain**

> Explain the function of a router in a network. [3]

Include different networks, packet forwarding and route/destination.

**Q3 — Describe**

> Describe the function of a repeater. [2]

**Q4 — Compare**

> Explain the difference between a bridge and a gateway. [4]

Source-level distinction:

```text
bridge → LANs using the same protocol
gateway → networks using different protocols / protocol conversion
```

**Q5 — Apply**

> A wireless laptop needs to access a server located on another network. Name three different networking devices the data may pass through and explain the function of each. [6]

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs communication?                ✅
M2: WHERE do data and processing live?       ✅
M3: HOW are nodes connected?                 ✅
M4: WHAT medium carries the signals?         ✅
M5: WHICH hardware moves/enables the data?   ✅
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
├── M6 IP Addressing Plan               ⬜
├── M7 Ethernet Validation              ⬜
├── M8 Web Request Trace                ⬜
└── M9 Service Validation               ⬜
```

A major gap remains. We say a switch forwards toward the correct device and a router forwards toward the correct network, but we have not yet designed **how networks and hosts are addressed**. Module 6 solves that problem.
