# Module 1 — Define the Communication Requirements

## Objectives / State

### Immediate problem

Before Nova Learning Campus chooses a topology, cable type, wireless technology, switch, or router, it must first determine:

> **Who needs to communicate with whom, over what geographical range, and what type of network is appropriate for each connection?**

This is the requirements stage. A wrong classification here can lead to wrong topology, hardware, addressing and cost decisions later.

### Inherited context

The chapter Big Problem has already established the following scenario:

- a 20-floor main building;
- several academic and administrative departments;
- multiple buildings in the same city;
- staff, students, laboratories and mobile devices;
- internal services and Internet access;
- a public website, cloud services, streaming and remote communication.

### Knowledge needed now

This module uses only:

- benefits and drawbacks of networking;
- LAN;
- WLAN;
- MAN;
- WAN;
- PAN;
- public network;
- private network;
- the distinction between a WAN and the Internet.

Client-server, topology, cable choice, router/switch design and subnetting are deliberately postponed because they are not yet needed.

### Verifiable artifact

By the end of the module you will produce **Artifact M1 — Network Requirements Sheet**, containing:

- communication zones;
- users/devices in each zone;
- approximate geographical scope;
- network classification;
- public/private access requirement;
- purpose of communication;
- evidence for the classification.

This becomes direct input to Modules 2–5.

---

## Just-in-time Theory

### 1. Why network computers and devices?

Stand-alone computers manage their own resources independently. A network allows users and devices to cooperate and share resources.

The source identifies benefits such as:

- sharing printers and other devices;
- cheaper network software licensing in some situations;
- sharing files and data;
- using a reliable central source such as a file server;
- central backup;
- communication through services such as email and messaging;
- central administration and access control.

The same decision also creates costs and risks:

- servers and cabling can have a high initial cost;
- a large network can be complex to manage;
- failure of a critical server or device can affect many users;
- malware or unauthorised access can affect a larger connected system.

Therefore the design question is not simply “Is networking useful?” It is:

> **Which networking benefits justify the cost, complexity and risk in this scenario?**

**Source:** Chapter 2, textbook p.30.

### 2. LAN — Local Area Network

A **LAN** covers a small geographical area, commonly one building or a small site. A LAN typically connects computers and shared devices such as printers.

For example:

```text
Nova Main Building

[Admin PCs]
     |
[Teaching Labs]
     |
[Printers]
     |
[Local network]
```

Think of LAN when devices:

- are in one building or a small area;
- communicate frequently;
- need shared local resources.

The textbook provides an approximate guide of **10 m to 1000 m** for a LAN. Treat this as a guide rather than a universal hard boundary.

**Source:** Chapter 2, textbook pp.31–32.

### 3. WLAN — Wireless LAN

A **WLAN** is still a LAN, but devices connect wirelessly over a relatively short distance.

```text
Student laptop
      )))
Student phone   )))  [WAP] ---- campus network
Tablet          )))
```

The source describes Wireless Access Points (WAPs) connected to the wired network so that wireless devices can access the LAN.

A common mistake is to treat WLAN as a completely separate size category from LAN. It is better understood as a **wireless form or wireless part of a LAN**.

**Source:** Chapter 2, textbook p.31.

### 4. PAN — Personal Area Network

A **PAN** is centred around a person or very small workspace.

```text
Student
 ├─ laptop
 ├─ phone
 └─ wireless headset
```

The textbook gives an approximate guide of **1 m to 10 m**.

PAN is appropriate for a small personal cluster of devices. It is not the right label for an entire campus Wi-Fi system.

**Source:** Chapter 2, textbook p.32.

### 5. MAN — Metropolitan Area Network

A **MAN** is larger than a LAN but smaller than a WAN. It can connect smaller networks in different buildings within one city; the source specifically gives a university campus as an example.

```text
Building A LAN
       \
        \
      City-scale link
        /
       /
Building B LAN
```

If Nova has a Main Campus, Research Centre and Sports Centre several kilometres apart in the same city, a MAN is a useful classification for the connection between those sites.

The textbook gives an approximate guide of **1 km to 100 km**.

**Source:** Chapter 2, textbook pp.30–32.

### 6. WAN — Wide Area Network

A **WAN** is used when computers or networks are separated by a large geographical distance, such as different cities, countries or continents.

```text
Nova HCMC campus LAN
          |
      long distance
          |
Nova Hanoi office LAN
```

A WAN can connect multiple LANs or MANs. The source gives an approximate guide of **100 km to over 1000 km**.

**Source:** Chapter 2, textbook p.32.

### 7. Networks can be nested

A real organisation does not need one label for its entire communication system.

```text
                         WAN
         ┌─────────────────────────────────┐
         │                                 │
       MAN                               LAN
   one city                         remote office
    /         \
  LAN         LAN
Main campus  Research centre
```

A device can also take part in different relationships at the same time. A student's phone might use a PAN connection to a smartwatch while also using a WLAN connection to the campus network.

### 8. Public network vs private network

LAN/MAN/WAN mainly classify geographical scope. **Public/private** is a different dimension concerned with ownership, access and control.

The source describes a **private network** as one owned by an organisation, often with restricted access, while a **public network** is owned by a communications carrier and used by many organisations.

Examples for Nova:

```text
Private:
Nova Staff Internal Network

Public-facing:
Nova public website reachable through the Internet
```

An organisation can therefore have a private LAN, private MAN or private WAN while still offering selected public-facing services.

**Source:** Chapter 2, textbook p.31.

### 9. Internet ≠ WAN

The source makes an important distinction: a WAN may be a private organisation-wide network, whereas the Internet is a vast decentralised network of networks. Therefore, for this textbook scope, avoid the oversimplified statement:

> “The Internet is simply the world's largest WAN.”

The Internet is revisited in depth in Module 8.

**Source:** Chapter 2, textbook p.29.

---

## Activity / Example

### Step 1 — Prediction

Before looking at the worked reasoning, classify each situation as **PAN, LAN, WLAN, MAN or WAN**, or as **public/private** where asked.

| Situation | Prediction |
|---|---|
| A. A student's laptop connects to a wireless headset | ? |
| B. 40 PCs in one computer laboratory | ? |
| C. Student phones and laptops use wireless networking in the library | ? |
| D. Main Building and Research Centre are 5 km apart in the same city | ? |
| E. Nova's HCMC campus connects to an office in Hanoi | ? |
| F. A staff database is available only to authorised employees | public or private? |

Use three questions:

```text
How far apart are the devices/networks?
Who needs to communicate?
Who is allowed to access the resource?
```

### Step 2 — Identify communication zones

#### Zone A — Personal devices

A student uses:

```text
phone
laptop
headphones
smartwatch
```

The devices are centred around one person and are only a few metres apart.

**Candidate:** PAN.

#### Zone B — Main building internal devices

The building contains:

- admin PCs;
- teaching computers;
- printers;
- servers;
- classroom devices.

They are within a single building and need local resource sharing.

**Candidate:** LAN.

#### Zone C — Mobile access in the building

Students and lecturers use phones, tablets and laptops while moving around the building.

**Candidate:** WLAN operating as part of the LAN.

```text
            Main Building LAN
        ┌──────────┴──────────┐
     wired                 WLAN
       |                      |
     PCs                   phones
   printers                tablets
                           laptops
```

### Step 3 — Multi-building requirement

Suppose the Research Centre is 5 km from the Main Campus in the same city.

```text
[Main Campus LAN]
         |
        MAN
         |
[Research Centre LAN]
```

At this stage we do not choose the cable or provider. We only classify the communication requirement.

### Step 4 — Long-distance requirement

Nova also has an office in Hanoi.

```text
HCMC networks
      |
     WAN
      |
Hanoi LAN
```

The geographical scope changes, so the classification changes.

### Step 5 — Identify the public/private boundary

Internal systems include:

- staff records;
- examination documents;
- internal file storage;
- administration systems.

These require restricted/private access.

The public website must be reachable from outside Nova through the Internet.

```text
             OUTSIDE
          Internet users
               |
       [public services]
---------------boundary---------------
          Nova private
             network
       /       |       \
   staff     labs     servers
```

Do not insert a firewall or router just because such devices are common. Hardware is chosen later when the requirements justify it.

### Step 6 — Build Artifact M1

| Zone / requirement | Devices/users | Geographic scope | Network classification | Access | Reason |
|---|---|---|---|---|---|
| Student personal workspace | Phone, laptop, headset | ~1–10 m | PAN | Personal | Devices clustered around one user |
| Main building | PCs, printers, local systems | Single building | LAN | Mostly private | Shared local resources and communication |
| Mobile access in main building | Laptops, tablets, phones | Building/local area | WLAN within LAN | Controlled | Wireless mobility is required |
| Main Campus ↔ Research Centre | Two site LANs | ~5 km, same city | MAN | Private organisational traffic | Connects local networks across a metropolitan area |
| HCMC ↔ Hanoi office | Site networks | Hundreds of km | WAN | Private organisational traffic | Long-distance inter-network connection |
| Public website access | External users ↔ Nova service | Global | Internet-facing | Public | Must be reachable by external users |
| Staff records | Staff/internal systems | Organisation | Private network/resource | Restricted | Confidential organisational data |

This is **Artifact M1 — Version 1**.

---

## Explanation / Understand from the Result

### Why is the Main Building not simply called a WLAN?

Because the building may simultaneously contain wired PCs, wireless laptops, servers and printers. The whole local network can be a LAN while one part of it is a WLAN.

### Why is Main Campus ↔ Research Centre not automatically a WAN?

Because the sites are in the same metropolitan area. The textbook explicitly describes MANs as connecting smaller networks in different buildings within a city.

### Why does public/private not replace LAN/WAN?

These are different dimensions:

```text
Geographical scope:
PAN → LAN → MAN → WAN

Access/ownership:
private ↔ public
```

### Requirement-level trace

Suppose a lecturer in the Main Campus sends a file to staff in the Research Centre:

```text
Lecturer device
      ↓
Main Campus LAN
      ↓
Metropolitan connection
      ↓
Research Centre LAN
      ↓
Staff device
```

We still do not know the exact hardware or medium. This is intentional. We must first know **which networks need to connect** before designing how the connection works.

### Edge cases

**Two buildings only 50 m apart:** different buildings do not automatically mean MAN; the organisation may still design them as one LAN depending on the physical and administrative architecture.

**A company-wide global network used only by employees:** it can still be a private WAN. Large geographical scale does not mean public access.

**A phone connected to both a smartwatch and campus Wi-Fi:** one device can participate in a PAN and WLAN relationship at the same time.

---

## Practice / Checks

### Task 1 — Classification

Nova opens:

1. a robotics laboratory 300 m from the main building;
2. a campus in Da Nang;
3. a lecturer laptop connected by Bluetooth to a projector 3 m away;
4. wireless student access in the cafeteria;
5. an admin payroll system.

For each case write:

```text
Network type:
Public/private:
Reason:
```

Your justification must use at least one of:

- geographical range;
- users/devices;
- mobility;
- ownership/access;
- communication purpose.

### Task 2 — Find the error

A student writes:

> “Nova uses Wi-Fi, therefore its network is a WLAN rather than a LAN.”

Explain what is wrong, rewrite the statement, and describe the relationship between LAN and WLAN.

### Task 3 — Design decision

A company has:

- 15 employees;
- one office;
- 15 desktop PCs;
- one shared printer;
- no mobile devices;
- no remote branches.

Answer only at Module 1 level:

1. What network scope is most appropriate?
2. Is WLAN necessary?
3. Why is networking still useful compared with stand-alone computers?

Do not choose topology or hardware yet.

### Cambridge-style checks

**Q1 — Describe**

> Describe two benefits of networking computers in Nova Campus. [4]

A strong response develops each point as:

```text
benefit
→ mechanism
→ scenario consequence
```

**Q2 — Explain**

> Explain why connecting Nova's HCMC campus to its Hanoi office would require a WAN rather than a LAN. [2]

**Q3 — Compare**

> Explain the difference between a LAN and a MAN. [2]

Do not write only “a MAN is bigger”. Refer to geographical scope and connection of networks/buildings.

**Q4 — Justify**

> Nova has three buildings within the same city. Justify whether a MAN could be appropriate. [3]

---

## Contribution to the Big Problem

Module 1 has answered:

> **What actually needs to be connected?**

The Dossier now contains:

```text
Communication Architecture & Validation Dossier
│
├── M1 Network Requirements Sheet          ✅
├── Logical service architecture           ⬜
├── Topology design                        ⬜
├── Physical-link plan                     ⬜
├── Hardware architecture                  ⬜
├── IP addressing plan                     ⬜
├── Ethernet validation                    ⬜
├── Web request trace                      ⬜
└── Service validation                     ⬜
```

The outputs of this module — communication zones, geographical scope, users/devices and public/private requirements — are the inputs to **Module 2 — Decide Where Data and Processing Live**.
