# Module 6 — Give Every Network and Device an Address

## Objectives / State

### Immediate problem

Module 5 established a hardware path such as:

```text
Laptop
  ↓
WAP
  ↓
Switch
  ↓
Router
  ↓
another network
```

But the router still needs a logical method to determine:

> **Which network contains the destination, which host is being addressed, and how Nova should divide its address space across departments.**

### Knowledge needed now

- IPv4;
- decimal ↔ binary for IPv4 octets;
- classful IPv4 as presented in the source;
- `netID` and `hostID`;
- CIDR prefix notation;
- subnetting;
- subnet mask;
- bitwise AND;
- public vs private IPv4;
- IPv6;
- hexadecimal IPv6;
- zero compression;
- NAT as a source extension.

### Verifiable artifact

**Artifact M6 — Nova IP Addressing & Subnet Plan** must contain:

1. a private address block for Nova;
2. eight departmental subnets;
3. prefix and subnet mask;
4. usable host ranges;
5. public/private boundary;
6. an IPv6 example;
7. evidence showing how a router identifies the destination network.

---

## Just-in-time Theory

### 1. IPv4 uses 32 bits

Example:

```text
192.168.10.25
```

The address contains four **octets**:

```text
192 . 168 . 10 . 25
 8     8     8     8 bits
```

Total:

\[
8+8+8+8=32\text{ bits}
\]

Each 8-bit octet can represent decimal values from 0 to 255 because:

\[
2^8=256
\]

possible bit patterns exist.

**Source:** Chapter 2, textbook pp.57–58.

### 2. Decimal → binary using bit weights

For one octet use:

| Bit weight | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|

For `192`:

\[
192=128+64
\]

so:

```text
128 64 32 16 8 4 2 1
 1   1  0  0 0 0 0 0
```

\[
192_{10}=11000000_2
\]

### 3. Full IPv4 conversion example

Convert:

```text
192.168.10.25
```

#### 192

\[
128+64=192
\]

```text
11000000
```

#### 168

\[
128+32+8=168
\]

```text
10101000
```

#### 10

\[
8+2=10
\]

```text
00001010
```

#### 25

\[
16+8+1=25
\]

```text
00011001
```

Therefore:

```text
192.168.10.25
=
11000000.10101000.00001010.00011001
```

### 4. `netID` and `hostID`

An IPv4 address needs to identify:

```text
which network?
which device/host in that network?
```

Conceptually:

```text
IP address
├── netID
└── hostID
```

A router first needs the network portion so it can forward toward the correct network. Once traffic reaches that network, the host portion identifies the destination within it.

**Source:** Chapter 2, textbook p.57.

### 5. Classful IPv4 in the source

The source presents the historical classful ranges:

| Class | First-octet range | Network portion in the source model | Host portion |
|---|---:|---:|---:|
| A | 0–127 | 8 bits | 24 bits |
| B | 128–191 | 16 bits | 16 bits |
| C | 192–223 | 24 bits | 8 bits |
| D | 224–239 | multicast | — |
| E | 240–255 | experimental | — |

**Source:** Chapter 2, textbook p.57.

Example:

```text
29.68.0.43
```

First octet `29` lies in Class A.

```text
netID  = 29
hostID = 68.0.43
```

### 6. Source inconsistency: `190.15.25.240`

The source later labels `190.15.25.240` as Class C, but its own table says:

```text
Class B = 128–191
Class C = 192–223
```

Because `190` is in the range 128–191, the address is **Class B** by the source's own rule.

When working from a source, do not memorise an example that contradicts the rule table.

### 7. Why fixed classes are inflexible

Suppose an organisation needs roughly 300 host addresses. A traditional Class C block is too small, while a Class B block provides vastly more addresses than needed.

This motivates the more flexible **CIDR — Classless Inter-Domain Routing** model.

**Source:** Chapter 2, textbook p.58.

### 8. CIDR prefix

Example:

```text
200.35.254.25/18
```

`/18` means the first 18 bits are the network prefix.

Remaining host bits:

\[
32-18=14
\]

```text
32 bits total
┌──────────────────┬──────────────┐
│ 18 network bits  │ 14 host bits │
└──────────────────┴──────────────┘
```

CIDR is more flexible than fixed `/8`, `/16` and `/24` class boundaries.

### 9. `/24` and subnet mask

Example:

```text
192.168.20.0/24
```

There are:

```text
24 network bits
8 host bits
```

Binary mask:

```text
11111111.11111111.11111111.00000000
```

Decimal mask:

```text
255.255.255.0
```

### 10. Nova needs eight departmental subnets

The source uses a university with eight departments to introduce subnetting. Nova uses the same structural problem because the Big Problem also contains eight academic/administrative divisions.

We will allocate:

```text
192.168.20.0/24
```

and divide it into eight equal subnets.

**Source:** Chapter 2, textbook pp.59–60.

---

## Activity / Example

### Step 1 — How many subnet bits are needed?

Nova needs:

\[
8\text{ subnets}
\]

Find `n` such that:

\[
2^n\ge8
\]

\[
n=3
\]

Borrow 3 bits from the host portion.

Original prefix:

```text
/24
```

New prefix:

\[
24+3=27
\]

Therefore each subnet is:

### `/27`

### Step 2 — How many host bits remain?

IPv4 has 32 bits:

\[
32-27=5
\]

So each subnet contains:

\[
2^5=32
\]

addresses.

Using the conventional network/broadcast reservation:

\[
32-2=30
\]

usable host addresses.

### Step 3 — Find the `/27` subnet mask

Binary:

```text
11111111.11111111.11111111.11100000
```

Last octet:

\[
128+64+32=224
\]

Subnet mask:

```text
255.255.255.224
```

### Step 4 — Find the block size

Last-octet mask value:

```text
224
```

Block size:

\[
256-224=32
\]

Network addresses therefore begin at:

```text
0
32
64
96
128
160
192
224
```

### Step 5 — Nova subnet plan

| Department | Network | Usable hosts | Broadcast |
|---|---|---|---|
| Admin & Finance | `192.168.20.0/27` | `.1 – .30` | `.31` |
| Humanities | `192.168.20.32/27` | `.33 – .62` | `.63` |
| Mathematics | `192.168.20.64/27` | `.65 – .94` | `.95` |
| Science | `192.168.20.96/27` | `.97 – .126` | `.127` |
| Arts | `192.168.20.128/27` | `.129 – .158` | `.159` |
| Engineering | `192.168.20.160/27` | `.161 – .190` | `.191` |
| Computing | `192.168.20.192/27` | `.193 – .222` | `.223` |
| Business | `192.168.20.224/27` | `.225 – .254` | `.255` |

This is a clearer CIDR form of the eight-subnet idea demonstrated in the source.

### Step 6 — See the subnet bits in binary

Take Science:

```text
192.168.20.96/27
```

Last octet:

\[
96=64+32
\]

```text
01100000
```

Split the borrowed subnet bits from host bits:

```text
011 | 00000
↑      ↑
subnet host
bits   bits
```

The three subnet bits are `011`.

### Step 7 — Bitwise AND

The source uses an AND mask to identify a subnet.

Rules:

| A | B | A AND B |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

Take:

```text
192.168.20.110/27
```

Last octet:

\[
110=01101110_2
\]

`/27` mask last octet:

```text
11100000
```

Apply AND:

```text
01101110
AND
11100000
--------
01100000
```

\[
01100000_2=96
\]

Therefore the device belongs to:

```text
192.168.20.96/27
```

which is the Science subnet in our plan.

### Step 8 — Connect subnetting to the router

Suppose:

```text
Student PC:
192.168.20.70/27
```

and:

```text
Server:
192.168.20.105/27
```

The PC belongs to:

```text
192.168.20.64/27
```

The server belongs to:

```text
192.168.20.96/27
```

They are on different subnets.

The path therefore includes routing:

```text
PC
 ↓
Switch
 ↓
Router
 ↓
Switch
 ↓
Server
```

This is the dependency between Modules 5 and 6.

### Step 9 — Public vs private IPv4

The source lists the standard private ranges:

```text
10.0.0.0     – 10.255.255.255
172.16.0.0   – 172.31.255.255
192.168.0.0  – 192.168.255.255
```

Nova's example block `192.168.20.0/24` is therefore private.

Internal model:

```text
Internal users
→ private IP addresses
```

Internet-facing edge/services require public addressing appropriate to the Internet connection.

**Source:** Chapter 2, textbook p.61.

### Step 10 — NAT extension

The source Extension Activity 2E asks learners to investigate **Network Address Translation (NAT)**.

Conceptually:

```text
Private network
192.168.20.x
      |
    Router
     NAT
      |
 Public IP
      |
 Internet
```

NAT allows private-addressed devices to communicate through a public-facing boundary without assigning a separate globally routed public IPv4 address to each internal client.

This is an extension, not a deep implementation exercise in this chapter.

### Step 11 — IPv6

IPv6 uses **128-bit** addresses represented in hexadecimal groups separated by colons.

Example from the source style:

```text
A8FB:7A88:FFF0:0FFF:3D21:2085:66FB:F0FA
```

Each hexadecimal digit represents 4 bits. Four hex digits form a 16-bit group. Eight groups give:

\[
8\times16=128\text{ bits}
\]

**Source:** Chapter 2, textbook p.58.

### Step 12 — IPv4 vs IPv6

| IPv4 | IPv6 |
|---|---|
| 32 bits | 128 bits |
| Dotted decimal | Hexadecimal groups separated by colons |
| Example `192.168.1.5` | Example `2001:db8::1` |
| Much smaller address space | Much larger address space |

The source also associates IPv6 with reduced dependence on NAT and more efficient routing/authentication features. Treat those statements at the textbook level rather than expanding beyond the syllabus.

### Step 13 — IPv6 zero compression

Example:

```text
900B:3E4A:AE41:0000:0000:AFF7:DD44:F1FF
```

can be written as:

```text
900B:3E4A:AE41::AFF7:DD44:F1FF
```

The key rule from the source is:

> `::` can be used only once in one IPv6 address.

Otherwise the number of omitted zero groups becomes ambiguous.

**Source:** Chapter 2, textbook pp.58–59.

### Artifact M6 — Nova IP Addressing Plan

```text
NOVA PRIVATE ADDRESS SPACE
192.168.20.0/24
        |
        +-- 192.168.20.0/27     Admin & Finance
        +-- 192.168.20.32/27    Humanities
        +-- 192.168.20.64/27    Mathematics
        +-- 192.168.20.96/27    Science
        +-- 192.168.20.128/27   Arts
        +-- 192.168.20.160/27   Engineering
        +-- 192.168.20.192/27   Computing
        +-- 192.168.20.224/27   Business
```

Internet edge:

```text
Nova private subnets
        |
      Router
     /  NAT  \
        |
   Public IP
        |
     Internet
```

### Artifact M6 — Addressing decisions

| Requirement | Decision | Reason |
|---|---|---|
| Internal Nova devices | Private IPv4 | Internal devices do not each need a directly routed public IPv4 address |
| 8 departments | `/27` subnets from `/24` | 3 borrowed bits create 8 equal subnets |
| Hosts per department | Up to 30 conventional usable addresses | 5 host bits |
| Inter-subnet traffic | Router | Devices belong to different IP networks |
| Internet-facing communication | Public addressing at the edge | Public routing is required outside the private network |
| Larger long-term address space | IPv6 awareness | 128-bit addressing |
| Private → public communication | NAT extension | Translates private addressing at the public edge |

---

## Explanation / Understand from the Result

### `/27` does not mean 27 devices

Incorrect:

```text
/27 = 27 hosts
```

Correct:

```text
/27 = 27 prefix/network bits
```

Host bits:

\[
32-27=5
\]

### Why are there 32 addresses but 30 conventional usable hosts?

\[
2^5=32
\]

One address identifies the network and one is the conventional broadcast address, leaving 30 usable host addresses in the standard model taught here.

### When is a router required?

Example:

```text
192.168.20.10/27
192.168.20.20/27
```

Both belong to:

```text
192.168.20.0/27
```

Local switching can be sufficient.

But:

```text
192.168.20.10/27
```

and:

```text
192.168.20.40/27
```

belong to `.0/27` and `.32/27` respectively.

They are on different subnets, so routing is needed.

### Why subnet?

The source explains that subnetting divides a larger LAN/network into smaller networks, helping reduce traffic and complexity. In Nova, Engineering traffic does not need to share one logical local network with every other department.

### Public IP ≠ public data

A public IP address describes Internet addressing/reachability. It does not mean that every file on the device or server is publicly readable.

### Private IP addresses are not globally unique

Two unrelated organisations can both use an address such as:

```text
192.168.1.10
```

inside their own private networks because private IPv4 ranges are not used as ordinary globally routed public addresses.

### Classful addressing vs CIDR

The source still requires knowledge of historical Class A/B/C boundaries, but CIDR uses explicit prefix lengths such as `/18`, `/20` and `/27`, making the network/host boundary more flexible.

### Exam interpretation of `/18`

For:

```text
200.35.254.25/18
```

an appropriate explanation is:

> The first 18 bits form the network prefix and the remaining 14 bits are available for the host portion.

Do not ignore the `/18` merely because the first octet looks like a classful Class C value.

---

## Practice / Checks

### Task 1 — Binary conversion

Convert:

```text
172.16.5.200
```

Write all 8 bits in every octet:

```text
172 = ________
16  = ________
5   = ________
200 = ________

IPv4 binary:
________.________.________.________
```

### Task 2 — CIDR

Given:

```text
10.20.30.40/20
```

Find:

1. network-prefix bits;
2. host bits;
3. binary subnet mask;
4. decimal subnet mask.

### Task 3 — Subnet design

Nova receives:

```text
192.168.50.0/24
```

and needs **4 equal subnets**.

Find:

```text
Borrowed bits:
New prefix:
Host bits:
Addresses/subnet:
Usable hosts/subnet:
Subnet mask:
```

Then list the four network addresses.

### Task 4 — AND operation

Given:

```text
192.168.20.150/27
```

Use binary AND to determine the network address. Show:

```text
IP last octet
Mask last octet
AND result
Decimal result
```

### Task 5 — IPv6 zero compression

Compress:

```text
A123:45FF:0000:0000:0000:78AB:9000:1111
```

Then explain why `::` cannot be used twice in one address.

### Task 6 — Find the error

A student says:

> “192.168.20.40 and 192.168.20.10 are on the same network because the first three octets are identical.”

Both use `/27`.

Check the statement. Remember:

```text
/27 ≠ /24
```

### Cambridge-style checks

**Q1 — Convert**

> Write `192.0.128.64` in binary. [4]

Use 8 bits per octet.

**Q2 — Explain**

> An IPv4 address is written as `200.35.254.25/18`. Explain the significance of `18`. [2]

**Q3 — Compare**

> Give two differences between IPv4 and IPv6. [4]

Use paired comparisons such as `32 bits` whereas `128 bits`.

**Q4 — Explain**

> Explain the difference between a public IP address and a private IP address. [4]

**Q5 — Apply**

A university has:

```text
192.168.100.0/24
```

and requires eight equal departmental subnets.

> Determine an appropriate prefix and the maximum conventional number of usable host addresses in each subnet. [4]

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs communication?               ✅
M2: WHERE do data and processing live?      ✅
M3: HOW are networks interconnected?        ✅
M4: WHAT carries the signals?               ✅
M5: WHICH hardware forwards the data?       ✅
M6: HOW are networks/devices addressed?     ✅
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
├── M7 Ethernet Validation              ⬜
├── M8 Web Request Trace                ⬜
└── M9 Service Validation               ⬜
```

Nova can now determine the network and host involved in a communication path. Module 7 tests what happens when local Ethernet transmission encounters address conflicts or simultaneous transmissions.
