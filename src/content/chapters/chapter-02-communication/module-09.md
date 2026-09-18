# Module 9 — Prove the Network Can Deliver Real Services

## Objectives / State

### Immediate problem

Nova now has a complete network architecture on paper:

```text
Requirements
   ↓
Client-server / cloud
   ↓
Topology
   ↓
Wired + wireless media
   ↓
Switch / router / WAP
   ↓
IP addressing
   ↓
Ethernet
   ↓
DNS / Internet / WWW
```

The design is only successful if it can support Nova's real communication services:

- internal/remote voice calls;
- recorded lecture streaming;
- live lecture streaming;
- long-distance communication.

The final module therefore asks:

> **Can the network deliver these services without unacceptable delay, interruption or capacity problems?**

### Knowledge needed now

- PSTN;
- VoIP;
- circuit switching;
- packet-based communication;
- bit streaming;
- buffering;
- bit rate;
- low/high water marks;
- on-demand streaming;
- real-time streaming;
- GEO/MEO/LEO satellites;
- buffer calculation.

### Verifiable artifact

**Artifact M9 — Service Validation Report** must validate:

1. voice service;
2. recorded-video service;
3. live-video service;
4. buffer behaviour;
5. long-distance communication;
6. the whole Communication Architecture & Validation Dossier.

---

## Just-in-time Theory

### 1. PSTN

**PSTN — Public Switched Telephone Network** is the traditional telephone network model discussed in the source.

A conventional telephone call uses **circuit switching**:

```text
Caller
  |
  | dedicated communication circuit
  |
Receiver
```

Conceptually:

```text
call begins
    ↓
circuit established
    ↓
circuit remains allocated
    ↓
call ends
    ↓
circuit released
```

The source notes that the circuit remains dedicated during the call, even during periods when neither person is speaking.

**Source:** Chapter 2, textbook pp.54–55.

### 2. VoIP

**VoIP — Voice over Internet Protocol** carries voice over an IP network.

Conceptually:

1. voice is captured;
2. converted/encoded into digital data;
3. divided into packets;
4. transmitted across the network/Internet;
5. reconstructed at the destination.

```text
Voice
 ↓
Digital encoding
 ↓
Packets
 ↓
Internet/IP network
 ↓
Reassembly
 ↓
Voice
```

The source contrasts this with a dedicated PSTN circuit and explains that VoIP uses packet-based network transmission.

**Source:** Chapter 2, textbook pp.55–56.

### 3. PSTN vs VoIP

```text
PSTN
→ dedicated circuit for the call

VoIP
→ packet-based traffic sharing IP-network resources
```

The source uses the idea that a 10-minute call may contain only a few minutes of actual speaking, while a traditional circuit remains reserved for the whole call. Packet communication can use shared network resources more efficiently.

### 4. Why VoIP is a candidate for Nova

Nova already has:

- LANs;
- WAN connectivity;
- Internet connectivity;
- routers;
- high-capacity wired links.

The same IP infrastructure can therefore support voice/video communication as well as ordinary data.

Trade-offs include dependence on:

- network availability;
- sufficient capacity;
- acceptable packet delivery timing.

The Cambridge-level core distinction remains circuit-based PSTN vs packet-based VoIP.

### 5. Bit streaming

**Bit streaming** is a contiguous sequence of digital bits transmitted over a network/Internet so that media can begin playing before the complete file has been downloaded.

The source connects streaming with:

- high-speed communication links;
- compression;
- buffering.

**Source:** Chapter 2, textbook pp.51–52.

### 6. Compression

Large media files require high data rates. Compression reduces the amount of data that must be transmitted.

```text
Large media
    ↓
compression/encoding
    ↓
smaller stream
    ↓
network
```

### 7. Buffer

A **buffer** is temporary storage between the incoming stream and the media player.

```text
Server
  |
  | incoming stream
  v
[ BUFFER ]
  |
  | playback data
  v
Media Player
```

If network delivery temporarily slows, the player can continue using data already stored in the buffer.

A buffer does not make the Internet connection faster. It absorbs short-term differences between arrival and consumption rates.

### 8. Low and high water marks

The source describes lower and upper buffer levels.

```text
0%                           100%
|-------------------------------|
     ↑                   ↑
    low                 high
```

Near the low mark:

```text
risk of playback interruption increases
```

Near the high mark:

```text
incoming transfer may need to be slowed/paused
```

The goal is to keep the buffer in a safe range rather than constantly emptying or overflowing.

### 9. On-demand streaming

For **on-demand streaming**, the media already exists on the server and the user chooses when to play it.

```text
Stored lecture
   ↓
Server
   ↓
Student requests it
   ↓
stream
```

The source associates on-demand content with user control such as pause/rewind/fast-forward because the content has already been recorded and stored.

**Source:** Chapter 2, textbook pp.52–53.

### 10. Real-time streaming

For **real-time streaming**, content is generated while the event is taking place.

```text
Camera + microphone
        ↓
     computer
        ↓
      encode
        ↓
streaming server
        ↓
students
```

The key distinction is:

```text
On-demand
→ stored before the user requests it

Real-time
→ created while the event is happening
```

### 11. Long-distance communication and satellite categories

From Module 4, satellite communication can be considered when terrestrial communication is unavailable or impractical.

The source compares:

- **GEO** — highest of the three, about 35,800 km, ~24-hour orbital period;
- **MEO** — intermediate altitude, about 5,000–12,000 km;
- **LEO** — low orbit, about 500–2,500 km.

The source links GEO with long-distance communications, MEO with GPS, and LEO with mobile communications.

**Source:** Chapter 2, textbook pp.55–56.

---

## Activity / Example

### Step 1 — Classify Nova's streaming services

**Requirement A:** a student watches a lecture recorded last week.

```text
→ On-demand streaming
```

**Requirement B:** a student watches a lecture while it is happening.

```text
→ Real-time streaming
```

### Step 2 — Recorded lecture trace

Modules 2, 4, 5 and 8 now combine:

```text
Stored lecture
      ↓
encoded/compressed file
      ↓
streaming server/cloud
      ↓
Internet/network
      ↓
Nova router
      ↓
WAP
      ↓
student buffer
      ↓
media player
```

### Step 3 — Live lecture trace

```text
Camera + microphone
        ↓
Lecturer computer
        ↓
encoding
        ↓
streaming server
        ↓
Internet/network
        ↓
student buffers
        ↓
media players
```

The essential difference is when the content is created.

### Step 4 — What if incoming rate is lower than playback rate?

Suppose:

```text
incoming = 400 kbps
playback = 600 kbps
```

Net buffer change:

\[
400-600=-200\text{ kbps}
\]

The buffer loses data over time.

```text
buffer decreases
→ eventually empty
→ playback pauses
```

### Step 5 — What if incoming rate is higher than playback rate?

The source end-of-chapter calculation gives:

```text
incoming stream = 1.5 Mbps
playback rate   = 600 kbps
```

The buffer fills because the incoming rate is higher than the consumption rate.

### Step 6 — Source buffer calculation: given data

The source specifies:

```text
Buffer size      = 2 MiB
Lower limit      = 200 KiB
Higher limit     = 1.8 MiB
Incoming stream  = 1.5 Mbps
Playback rate    = 600 kbps
```

and explicitly tells us to assume:

```text
1 megabit = 1,048,576 bits
1 kilobit = 1024 bits
```

Use the units exactly as the question instructs, even though networking prefixes are treated differently in many modern contexts.

**Source:** Chapter 2, textbook p.67, Question 4.

### Step 7 — Convert incoming rate

\[
1.5\times1,048,576
=1,572,864\text{ bits/s}
\]

### Step 8 — Convert playback rate

\[
600\times1024
=614,400\text{ bits/s}
\]

### Step 9 — Net buffer fill rate

\[
1,572,864-614,400
=958,464\text{ bits/s}
\]

Convert to bytes per second:

\[
\frac{958,464}{8}=119,808\text{ bytes/s}
\]

Convert to KiB/s:

\[
\frac{119,808}{1024}=117\text{ KiB/s}
\]

Therefore:

\[
\boxed{117\text{ KiB/s}}
\]

### Step 10 — Buffer contents after 2 seconds

Initial buffer:

\[
200\text{ KiB}
\]

Increase after 2 seconds:

\[
117\times2=234\text{ KiB}
\]

New buffer content:

\[
200+234=434\text{ KiB}
\]

\[
\boxed{434\text{ KiB}}
\]

### Step 11 — Time to reach the high limit

High limit:

\[
1.8\text{ MiB}
\]

Using:

\[
1\text{ MiB}=1024\text{ KiB}
\]

\[
1.8\times1024=1843.2\text{ KiB}
\]

Buffer increase required:

\[
1843.2-200=1643.2\text{ KiB}
\]

At `117 KiB/s`:

\[
t=\frac{1643.2}{117}\approx14.04\text{ s}
\]

Therefore the high limit is reached after approximately:

\[
\boxed{14.0\text{ seconds}}
\]

### Step 12 — State-table check

| Time | Buffer content |
|---:|---:|
| 0 s | 200 KiB |
| 2 s | 434 KiB |
| 4 s | 668 KiB |
| 6 s | 902 KiB |
| 8 s | 1136 KiB |
| 10 s | 1370 KiB |
| 12 s | 1604 KiB |
| 14 s | 1838 KiB |

The high limit is `1843.2 KiB`, so 14 seconds is slightly too early; approximately 14.04 seconds is required.

### Step 13 — What happens after the high limit?

The incoming stream is faster than playback, so the buffer will keep filling unless transfer behaviour changes.

A conceptual control strategy is:

```text
high mark reached
       ↓
reduce/pause incoming transfer
       ↓
player consumes buffered data
       ↓
buffer level falls
       ↓
resume transfer
```

This is the idea required by the source question about avoiding frequent interruption during a long video.

### Step 14 — Streaming benefits and problems

Benefits identified by the source include:

- playback can begin before the whole file downloads;
- the user does not need to store the entire media file locally;
- on-demand content can be accessed when required.

Potential problems include:

- loss of connection stops streaming;
- slow delivery can empty the buffer and pause playback;
- high-quality media can consume substantial bandwidth.

### Step 15 — Long-distance validation

For normal urban/campus links:

```text
terrestrial fibre/provider infrastructure
```

is the preferred candidate.

For a very remote location with no realistic terrestrial path:

```text
satellite communication
```

may be justified.

Do not select satellite automatically. The medium must match geography, capacity, cost and availability constraints.

### Artifact M9 — Service Validation

#### Test 1 — Internal/remote voice

Requirement:

```text
staff voice/video communication
```

Candidate solution:

```text
VoIP
→ uses Nova's existing IP infrastructure
→ packet-based communication
```

Validation:

```text
PASS
```

provided network availability/capacity is adequate.

#### Test 2 — Recorded lectures

Requirement:

```text
student watches stored lecture when required
```

Solution:

```text
On-demand streaming
```

Architecture:

```text
Stored video
→ server/cloud
→ network
→ buffer
→ media player
```

Validation:

```text
PASS
```

#### Test 3 — Live lectures

Requirement:

```text
student watches event as it happens
```

Solution:

```text
Real-time streaming
```

Architecture:

```text
camera/mic
→ encoding
→ streaming server
→ users
```

Validation:

```text
PASS
```

provided sufficient capacity is available.

#### Test 4 — Buffer behaviour

Given source rates:

```text
Input    = 1.5 Mbps
Playback = 600 kbps
```

Result:

```text
Net fill = 117 KiB/s
After 2 s = 434 KiB
High mark ≈ 14.04 s
```

Validation:

```text
PASS WITH BUFFER/RATE CONTROL
```

#### Test 5 — Remote geography

```text
Ordinary sites
→ terrestrial WAN/fibre

Very remote site
→ satellite may be justified
```

Validation:

```text
PASS
```

when medium selection matches the actual geographical constraint.

---

## Explanation / Understand from the Result

### Downloading vs streaming

Traditional full download:

```text
whole file
↓
stored
↓
play
```

Streaming:

```text
some data arrives
↓
buffer
↓
play begins
while more data continues arriving
```

### Buffer does not make the network faster

A larger buffer provides more temporary reserve. If the **average** incoming rate remains below the playback rate for a long period, the buffer still eventually empties.

A simplified condition for sustained playback is:

\[
\text{average incoming rate}\ge\text{playback consumption rate}
\]

If:

\[
\text{incoming}<\text{playback}
\]

for long enough:

```text
buffer drains
→ playback stalls
```

### On-demand ≠ full download

On-demand means the user chooses when to request stored content. The content can still be streamed rather than fully downloaded.

### Real-time ≠ “fast Internet”

Real-time describes **when the content is created** relative to the user watching it.

```text
real-time
→ content generated now

on-demand
→ stored content requested later
```

### VoIP and streaming depend on the same infrastructure

Both turn media into digital data and depend on network capacity and packet delivery. This shows why the chapter's physical, hardware, addressing and Internet topics are all dependencies of real communication services.

---

## Practice / Checks

### Task 1 — Streaming calculation

A stream has:

```text
Incoming rate = 2.0 Mbps
Playback rate = 1.2 Mbps
Initial buffer = 300 KiB
```

Use:

```text
1 megabit = 1,048,576 bits
1 kilobit = 1024 bits
```

Calculate:

1. incoming bits/s;
2. playback bits/s;
3. net fill rate;
4. buffer content after 5 seconds.

Do not use an answer key yet.

### Task 2 — Buffer diagnosis

A live lecture has:

```text
average incoming = 700 kbps
playback = 1 Mbps
```

The buffer starts with a significant amount of data.

Predict:

1. whether the buffer grows or shrinks;
2. what happens in the long term;
3. whether increasing buffer capacity completely solves the problem;
4. which factor must ultimately improve.

### Task 3 — On-demand or real-time?

Classify:

1. watching yesterday's match recording;
2. watching a live graduation ceremony;
3. listening to a recorded podcast;
4. watching a live security camera feed.

For each:

```text
Type:
Reason:
```

### Task 4 — PSTN vs VoIP

A company already has a high-speed Internet connection between offices.

Explain why it might choose VoIP instead of separate traditional telephone circuits. Use at least:

- packet-based communication;
- existing network infrastructure;
- efficiency.

### Task 5 — Satellite choice

Nova opens a research station on a remote island where terrestrial fibre is not practical.

Explain:

1. why satellite becomes a candidate;
2. how GEO/MEO/LEO differ at source level;
3. why Nova must still consider trade-offs rather than choosing satellite automatically.

### Cambridge-style checks

**Q1 — Explain**

> Explain why a buffer is required when streaming video. [2]

Include temporary storage and rate variation/difference.

**Q2 — Compare**

> Explain the difference between on-demand and real-time bit streaming. [4]

**Q3 — Calculate**

When a buffer receives data faster than the media player consumes it:

```text
incoming rate
− playback rate
= net rate

net rate × time
= buffer change
```

Always state the bit/byte and kilo/mega conversion rules used by the question.

**Q4 — Compare**

> Compare PSTN and VoIP communication. [4]

Use:

```text
PSTN → circuit switching / dedicated connection
VoIP → packets / IP network
```

**Q5 — Compare**

> Explain one difference between GEO, MEO and LEO satellites. [3]

Possible dimensions: altitude, orbital period or source-level application.

---

## Contribution to the Big Problem

All nine dependent steps are now complete:

```text
M1
WHAT needs communication?
        ✅
        ↓
M2
WHERE do data and processing live?
        ✅
        ↓
M3
HOW should nodes be interconnected?
        ✅
        ↓
M4
WHAT carries the signals?
        ✅
        ↓
M5
WHICH hardware forwards data?
        ✅
        ↓
M6
HOW are networks/devices addressed?
        ✅
        ↓
M7
HOW does local Ethernet handle problems?
        ✅
        ↓
M8
HOW does a URL reach a web server?
        ✅
        ↓
M9
CAN the design deliver real communication services?
        ✅
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
├── M8 Web Request Trace                ✅
└── M9 Service Validation               ✅
```

---

## Chapter Completion

### Integrated Nova Architecture

```text
                              INTERNET
                                 |
                          ISP / Provider
                                 |
                       Public IP / Edge
                                 |
                         Router / Gateway
                                 |
                    ======================
                    NOVA CAMPUS CORE
                    ======================
                         /           \
                        /             \
              Private services      Public services
                  /                       \
        Academic / Admin DB          Website / Streaming
        Private cloud                Public cloud/service
              |
        Client-server model
              |
   ┌──────────┼───────────┐
   │          │           │
 Admin     Teaching     Research
 subnet     subnet       subnet
   │          │           │
 Switch     Switch       Switch
 / | \       / | \        / | \
PC PC PC   PC WAP PC    PC WAP Server
             )))
          laptops/phones
```

Inter-building:

```text
Main Campus
    |
    | high-capacity fibre
    |
Research Centre
```

Remote branch:

```text
HCMC Campus
     |
     | WAN / provider infrastructure
     |
Hanoi Office
```

Very remote location if terrestrial access is not practical:

```text
Nova network
     |
Satellite communication
     |
Remote station
```

### End-to-end trace across the whole chapter

A student opens:

```text
https://learn.nova.example/lecture1.html
```

The chapter can now explain the whole path:

```text
Student Laptop
     |
    WNIC
     )))
    WAP
     |
  Floor Switch
     |
     | fibre backbone
     v
 Campus Core
     |
   Router
     |
 private/public boundary
     |
    ISP
     |
 Internet
```

DNS resolves:

```text
learn.nova.example
        ↓
       DNS
        ↓
public IP address
```

The request reaches the server, and a recorded lecture can return as:

```text
Web/Streaming Server
      ↓
compressed stream
      ↓
Internet
      ↓
Nova network
      ↓
student buffer
      ↓
media player
```

One practical request therefore connects:

```text
WLAN
→ topology
→ medium
→ WNIC/WAP/switch/router
→ private/public IP
→ DNS
→ Internet
→ WWW
→ streaming
→ buffer
```

This is why the chapter is one dependent project rather than nine unrelated textbook sections.

### Final Requirements Validation

| Nova requirement | Architecture decision | Evidence |
|---|---|---|
| 20-floor building | Hybrid wired/WLAN design | M1, M3, M4 |
| Fixed lab computers | Star + switch + wired links | M3–M5 |
| Mobile students | WLAN + WNIC + WAP | M4–M5 |
| Multiple city buildings | MAN-scale interconnection | M1 |
| Remote office | WAN | M1, M4 |
| Shared files/apps | Client-server | M2 |
| Confidential records | Private services/storage | M2 |
| Public website | Public-facing Internet service | M2, M8 |
| Eight departments | Eight `/27` subnets | M6 |
| Reliable local LAN | Switched star + Ethernet validation | M3, M5, M7 |
| Web access | DNS + URL + browser + ISP | M8 |
| Recorded lectures | On-demand streaming | M9 |
| Live lectures | Real-time streaming | M9 |
| Remote calls | VoIP candidate | M9 |
| Very remote locations | Satellite candidate | M4, M9 |
| Scalability | Star segments + hybrid topology + subnet separation | M3, M6 |
| Fault tolerance | Isolated star failures + redundant critical paths | M3 |

### Coverage Check

| Source knowledge/activity | Module | Covered |
|---|---:|---|
| Networking benefits/drawbacks | M1 | ✅ |
| LAN/WLAN/MAN/WAN/PAN | M1 | ✅ |
| Public/private networks | M1 | ✅ |
| Client-server / P2P | M2 | ✅ |
| Thin/thick clients | M2 | ✅ |
| Cloud computing | M2 | ✅ |
| Bus/star/mesh/hybrid | M3 | ✅ |
| Routing/flooding | M3 | ✅ |
| Wi-Fi/Bluetooth | M4 | ✅ |
| Radio/microwave/IR | M4 | ✅ |
| `f = c / λ` | M4 | ✅ |
| Twisted/coax/fibre | M4 | ✅ |
| Wired vs wireless | M4 | ✅ |
| Satellite communication | M4/M9 | ✅ |
| Hub/switch/repeater/bridge/router/gateway/modem | M5 | ✅ |
| NIC/WNIC/WAP | M5 | ✅ |
| Infrastructure/ad hoc | M5 | ✅ |
| IPv4/classful addressing | M6 | ✅ |
| CIDR | M6 | ✅ |
| Subnetting | M6 | ✅ |
| Public/private IP | M6 | ✅ |
| IPv6 | M6 | ✅ |
| Ethernet | M7 | ✅ |
| IP conflict | M7 | ✅ |
| Collision + CSMA/CD | M7 | ✅ |
| Internet vs WWW | M8 | ✅ |
| ISP/browser | M8 | ✅ |
| URL | M8 | ✅ |
| DNS | M8 | ✅ |
| PSTN vs VoIP | M9 | ✅ |
| Bit streaming | M9 | ✅ |
| Buffer calculation | M9 | ✅ |
| On-demand/real-time | M9 | ✅ |
| HTML/JavaScript/PHP | M8 optional extension | ✅ optional |

Core-source coverage is complete.

### Important Source Corrections

#### Correction 1 — IPv4 class example

The source table defines:

```text
Class B = 128–191
Class C = 192–223
```

Therefore `190.15.25.240` is **Class B**, even though a nearby source example labels it Class C.

#### Correction 2 — Frequency formula units

For:

\[
f=\frac{c}{\lambda}
\]

use:

```text
f → Hz
λ → m
c → m/s
```

The source explanatory text around this formula contains an inconsistent label/unit description.

#### Correction 3 — URL vs IP

A URL is not a four-number IP address.

```text
URL/domain
→ human-readable resource locator/name

IP address
→ network address

DNS
→ resolves a domain/host name to an IP address
```

### Design Limitations / Assumptions

This is a Cambridge-level conceptual architecture, not a production deployment plan. The scenario does not provide:

- exact floor plans;
- exact user counts per floor;
- measured cable lengths;
- ISP contracts;
- real public IP allocation;
- wireless site-survey measurements;
- actual attenuation data;
- required bandwidth per user;
- a selected cloud provider;
- a full security architecture;
- VLAN/firewall/VPN design;
- enterprise routing-protocol requirements.

Therefore decisions such as WAP count, exact fibre route, link capacity and production subnet sizes require additional engineering data.

### Chapter Summary

The chapter's reusable workflow is:

```text
1. Identify communication requirements
2. Determine network scope
3. Decide service/data architecture
4. Design topology
5. Select communication media
6. Select networking devices
7. Plan addressing
8. Validate local transmission
9. Trace Internet/web connectivity
10. Validate real communication services
```

Do not begin with “Which router should I buy?” before defining what the system must actually do.

---

## Final Challenge — Nova Expansion Project

Do not use an answer key yet.

Nova opens an **International Innovation Centre** with:

```text
Location:
40 km from Main Campus

Users:
600 students
120 staff

Facilities:
6 computer labs
20 classrooms
1 server room
public guest Wi-Fi

Services:
staff records
research files
public website
live lectures
recorded lectures
VoIP calls

Additional requirement:
A remote field station has no reliable terrestrial fibre access.
```

Nova receives private IPv4 block:

```text
10.20.0.0/20
```

The Innovation Centre requires at least:

```text
8 logical subnets
```

### Deliverable

Create a **Nova Expansion Communication Proposal**.

#### Part A — Network scope

Identify where PAN, LAN/WLAN, MAN and WAN appear and distinguish public/private traffic.

#### Part B — Service model

Choose and justify:

- client-server vs P2P;
- thin/thick clients;
- public/private/hybrid cloud.

#### Part C — Topology

Draw the labs, classrooms, server room, campus core and Main-Campus connection. Choose bus/star/mesh/hybrid where appropriate and analyse at least **two failure scenarios**.

#### Part D — Communication medium

Choose a medium for:

- lab desktops;
- classroom mobile access;
- building backbone;
- Innovation Centre ↔ Main Campus;
- remote field station.

Justify using:

```text
distance
capacity/bandwidth
mobility
interference
attenuation
cost
```

#### Part E — Hardware

Use only devices that the design actually needs. Your diagram should correctly place NIC/WNIC, WAP, switch and router, and may include repeater/bridge/gateway only if justified.

#### Part F — IPv4 subnetting

Starting from:

```text
10.20.0.0/20
```

create at least eight equal subnets.

For each subnet give:

```text
network address
CIDR prefix
subnet mask
first usable
last usable
broadcast
```

Show the binary method for at least one subnet.

#### Part G — IPv6

Give one valid IPv6 example, identify its 128-bit structure and demonstrate valid zero compression.

#### Part H — Ethernet

Trace one frame inside a local laboratory. Then explain:

- what a collision is;
- how IP conflict differs from collision;
- what CSMA/CD does;
- why a switched star is suitable.

#### Part I — Web request

Trace:

```text
student types URL
→ webpage appears
```

Your trace must correctly use:

```text
browser
URL
DNS
IP
router
ISP
Internet
web server
```

#### Part J — Streaming calculation

A live lecture has:

```text
Incoming stream = 3.0 Mbps
Playback rate   = 2.2 Mbps
Initial buffer  = 250 KiB
```

Use:

```text
1 megabit = 1,048,576 bits
1 kilobit = 1024 bits
```

Calculate:

1. incoming bits/s;
2. playback bits/s;
3. net buffer rate;
4. buffer content after 8 seconds.

Then state whether the buffer is filling or draining and explain why.

#### Part K — Final justification

Write a justified conclusion answering:

> **Why is this architecture suitable for Nova's expansion, and what are its two most important limitations?**

A successful submission should show the dependency:

```text
requirements
→ design decision
→ technical evidence
→ artifact/result
→ validation
```

A visually attractive network diagram without technical reasoning is not a complete solution.
