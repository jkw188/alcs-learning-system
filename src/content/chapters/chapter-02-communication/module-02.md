# Module 2 — Decide Where Data and Processing Live

## Objectives / State

### Immediate problem

Module 1 identified Nova's communication zones and network scope. We still have not decided:

> **Where should data be stored, where should processing take place, and which service model should Nova use?**

Examples:

- Should staff documents live on individual laptops or on a central server?
- Should laboratory computers keep their own copies of software and data?
- Should confidential staff records and a public website use the same environment?
- Should Nova use public, private or hybrid cloud computing?
- Which users can work effectively with thin clients, and which need thick clients?

### Knowledge needed now

- client-server model;
- peer-to-peer model;
- file server;
- thin client;
- thick client;
- public cloud;
- private cloud;
- hybrid cloud;
- data redundancy;
- cloud security and cloud-hosted software.

Topology, cable choice, hardware and IP addressing are deliberately postponed until the logical service architecture is clear.

### Verifiable artifact

**Artifact M2 — Logical Service Architecture** must show:

1. which services use client-server;
2. where peer-to-peer might be acceptable;
3. whether data is local, server-based or cloud-based;
4. where processing occurs;
5. where thin or thick clients are appropriate;
6. which cloud model is suitable for each type of data;
7. the reasons based on security, availability and management.

---

## Just-in-time Theory

### 1. Client-server model

In a **client-server** model, a client sends a request to one or more dedicated servers.

```text
       request
Client ────────> Server
       <────────
        result
```

The source describes benefits such as:

- central file/data storage;
- central access control;
- central security;
- central backup;
- easier scaling than peer-to-peer;
- shared resources under administrative control.

A file server provides central storage and makes files available to authorised network users.

**Source:** Chapter 2, textbook pp.32–34.

### 2. Why client-server fits many Nova requirements

The textbook recommends client-server especially when:

- there is a large user base;
- access to resources must be controlled;
- strong security is required;
- central backup is important.

Nova has student accounts, staff accounts, shared teaching files, administrative records and confidential data. These requirements make client-server a strong candidate for Nova's core services.

### 3. Peer-to-peer model

In **peer-to-peer (P2P)** networking there is no dedicated central server. Each node may provide resources and consume resources from other peers.

```text
PC A <----> PC B
  \          /
   \        /
     PC C
```

A peer can act as both provider and consumer. The source notes that P2P is most suitable when:

- the number of users is small;
- robust central security is not required;
- workstation-based applications are suitable;
- frequent direct cooperation between users is acceptable.

The source warns that management and performance become problematic as the number of nodes grows, and central authentication/security is weak compared with client-server.

**Source:** Chapter 2, textbook pp.34–35.

### 4. Peer-to-peer is not a topology

P2P answers:

```text
Who provides services and resources?
```

Topology answers:

```text
How are devices interconnected?
```

A P2P service model can exist on different topologies, and a mesh topology does not automatically mean peer-to-peer. This distinction is revisited in Module 3.

### 5. Thin client

A **thin client** depends heavily on a remote server or powerful computer for processing and/or data.

```text
Thin client
    |
    | input/request
    v
  Server
    |
    | processing/result
    v
Thin client
```

Typical properties from the source:

- strong dependence on the network/server;
- few local resources required;
- software and data can be managed centrally;
- if the server or communication link is unavailable, the client may not work.

Examples include browser-dependent applications and POS terminals.

**Source:** Chapter 2, textbook pp.35–36.

### 6. Thick client

A **thick client** has significant local processing and storage capability. It can often continue to perform useful work when it is disconnected from a server.

```text
Laptop
├── local OS
├── local application
├── local processing
└── optional server connection
```

The source contrasts thick clients with thin clients:

- thick clients are more tolerant of a slow or unavailable network;
- they require more local resources;
- software/data updates may need to be managed on individual devices;
- local data creates additional security and consistency responsibilities.

**Source:** Chapter 2, textbook pp.35–36.

### 7. Thin vs thick is a per-use-case decision

Nova does not need one client type for every user.

```text
Library kiosk
→ thin-client oriented

Lecturer laptop
→ thick client

Computer lab
→ depends on the workload
```

A browser-only assessment lab can be thin-client oriented. A programming or engineering lab using local IDEs, compilers or simulators needs more local processing.

### 8. Cloud storage and data redundancy

Cloud storage stores data on off-site servers. The source explains that the same data can be held on several servers, providing **data redundancy** so that services can remain available when one server is maintained or repaired.

```text
Nova user
    |
 Internet
    |
Cloud provider
 ├─ copy A
 ├─ copy B
 └─ copy C
```

**Source:** Chapter 2, textbook pp.39–40.

### 9. Public cloud

In a **public cloud**, the infrastructure is provided by an external cloud provider and shared across customers under the provider's service model.

Possible Nova uses include public teaching resources or highly scalable public-facing content, provided that confidentiality and security requirements are satisfied.

### 10. Private cloud

A **private cloud** is dedicated to one organisation and gives the organisation greater control over access and infrastructure policy.

Possible candidates include:

- confidential academic systems;
- sensitive research information;
- administrative data.

Private cloud does **not** mean that every server must physically sit in the same building as Nova.

### 11. Hybrid cloud

A **hybrid cloud** combines public and private cloud approaches.

The source gives the conceptual pattern:

```text
sensitive data     → private cloud
less-sensitive data → public cloud
```

For Nova:

```text
                 Nova
                  |
        ┌─────────┴─────────┐
        |                   |
 Private environment   Public environment
        |                   |
 staff records          public videos
 exam material          public website
 payroll                public resources
```

This is a strong candidate because Nova has both highly sensitive and highly public workloads.

**Source:** Chapter 2, textbook pp.39–40.

### 12. Cloud computing is more than storage

The source also describes cloud-hosted software, databases, networking and analytical services. A user may access an application through a browser while the provider hosts and maintains the underlying service.

```text
User browser
     |
 Internet
     |
Cloud-hosted application
```

### 13. Cloud trade-offs

The source identifies benefits such as:

- access from different locations;
- remote backup;
- recovery;
- scalable storage;
- reduced need to carry physical storage.

It also identifies drawbacks such as:

- dependence on Internet connectivity;
- storage/data-transfer cost;
- risk if the provider fails;
- reduced direct control over the physical/security environment.

The correct design question is therefore:

> **Which data should be placed in which environment, and which risks are acceptable?**

---

## Activity / Example

### Step 1 — Prediction

Before the worked design, classify these Nova cases:

| Nova service | Prediction |
|---|---|
| Payroll database | Client-server or peer-to-peer? |
| Student examination files | Local PCs or central server? |
| Lecturer's presentation editor | Thin or thick client? |
| Public learning videos | Public/private/hybrid cloud? |
| Library information kiosk | Thin or thick client? |
| Temporary three-person research file sharing | Client-server or P2P? |

Do not force one answer across all services. Use the requirements.

### Step 2 — Classify data by sensitivity

#### Category A — Highly sensitive

Examples:

```text
payroll
student grades
exam papers
staff personal records
```

Requirements:

- restricted access;
- central management;
- backup;
- accountability;
- availability.

Candidate architecture:

```text
client-server
+
private controlled storage
```

#### Category B — Internal collaborative data

Examples:

```text
department documents
lesson plans
research working files
```

Requirements:

- authorised sharing;
- version management;
- backup;
- remote access.

Candidate:

```text
client-server
+
private / controlled cloud
```

#### Category C — Public content

Examples:

```text
public course information
campus news
marketing assets
public learning resources
```

Requirements:

- scalable access;
- broad availability;
- low confidentiality requirement.

Candidate:

```text
public-facing server/cloud
```

### Step 3 — Choose the core network model

Nova has a large number of users and requires:

```text
authentication
central data
permissions
backups
consistent records
```

These are strong reasons to choose:

```text
Core Nova services
→ CLIENT-SERVER
```

### Step 4 — Identify limited P2P use

P2P can still be useful in a narrow scenario, for example:

```text
Temporary research group
3 laptops
same room
non-sensitive draft files
short-lived collaboration
```

This is a limited local use. It is not the architecture for Nova's core records or services.

### Step 5 — Choose thin/thick clients

#### Library kiosk

Requirements:

- log in;
- search a catalogue;
- display results;
- little or no offline work.

Candidate:

```text
Thin-client oriented
```

#### Lecturer laptop

Requirements:

- presentation editing;
- programming tools;
- offline work;
- local file access;
- access to remote services.

Candidate:

```text
Thick client
```

#### Computer laboratory

Do not decide from the device name alone.

- Local compiler/IDE/simulator → thick-client capability is needed.
- Browser-based assessment environment → thin-client orientation may be suitable.

The workload determines the design.

### Step 6 — Cloud decision matrix

| Data/service | Sensitivity | Availability requirement | Proposed location |
|---|---:|---:|---|
| Payroll | Very high | High | Private controlled infrastructure |
| Examination papers | Very high | High | Private controlled infrastructure |
| Student grades | High | High | Private server/cloud |
| Shared internal documents | Medium | High | Private cloud |
| Public website | Low confidentiality | Very high | Public-facing cloud/server |
| Public recorded lectures | Low/medium | Very high | Public cloud/content service |
| Confidential research data | High | High | Private environment |
| Non-sensitive collaboration | Low/medium | High | Public cloud may be acceptable |

The design does not name a specific provider because the chapter does not provide procurement, legal or provider-specific requirements.

### Step 7 — Choose a hybrid approach

The decision matrix shows that “everything public” is too weak for Nova's sensitive data, while “everything private” may waste scalability and public-delivery benefits.

Therefore:

```text
                    NOVA
                      |
       ┌──────────────┴──────────────┐
       |                             |
 PRIVATE ENVIRONMENT           PUBLIC ENVIRONMENT
       |                             |
 payroll                       public website
 student records               public video
 exam data                     public resources
 confidential research
```

### Step 8 — Consider redundancy

If student records exist only on one server:

```text
Server A fails
→ service unavailable
```

Conceptual redundancy:

```text
             Student DB
                |
       ┌────────┴────────┐
       |                 |
    Copy A             Copy B
```

However, **redundancy is not identical to backup**. If an accidental deletion is immediately replicated to all redundant copies, the organisation still needs backup/version recovery.

### Step 9 — Build Artifact M2

```text
                           NOVA USERS
                  ┌────────────┼────────────┐
                  │            │            │
              Students     Lecturers       Staff
                  │            │            │
                  └───────┬────┴────┬───────┘
                          │
                   Client-server
                    core services
                          │
             ┌────────────┼─────────────┐
             │            │             │
         Identity      Academic       Admin
         services       services      services
             │            │             │
             └────────────┼─────────────┘
                          │
                  PRIVATE SERVICES
                          │
             ┌────────────┴───────────┐
             │                        │
       Private storage          Private cloud
       / databases              collaboration
             │
             └─────────┬──────────────┘
                       │
                controlled boundary
                       │
                 PUBLIC SERVICES
             ┌─────────┴─────────┐
             │                   │
        Public website      Public streaming
             │                   │
             └──── Public cloud ─┘
```

### Artifact M2 — Decision table

| Requirement | Decision | Reason |
|---|---|---|
| Core campus services | Client-server | Central authentication, data control, backup and scalability |
| Confidential records | Central/private storage | Strong access control required |
| Lecturer laptops | Thick clients | Need local processing and offline capability |
| Library kiosks | Thin-client oriented | Mainly server-based application access |
| Small temporary sharing | P2P may be permitted | Small group and limited security requirement |
| Public website/content | Public-facing cloud/server | Broad external accessibility |
| Confidential cloud services | Private cloud/environment | Greater organisational control |
| Overall cloud approach | Hybrid | Separate sensitive and public workloads |
| Critical databases | Redundancy + backup | Availability plus recovery |

---

## Explanation / Understand from the Result

### Why not use P2P for the whole campus?

Because Nova needs:

```text
many users
+
central permissions
+
confidential information
+
central backup
+
consistent data
```

P2P is not “bad”; it simply does not match these requirements as well as a centrally managed client-server architecture.

### Why does client-server not imply thin client?

A lecturer can use a thick laptop while still accessing a client-server system.

```text
client-server
→ relationship between requester and service provider

thin/thick
→ amount of local processing/storage and network dependence
```

### Why does cloud not replace client-server?

A cloud-hosted server can still participate in a client-server relationship:

```text
client
   ↓
cloud-hosted server
```

Cloud describes the delivery/infrastructure environment. Client-server describes the service relationship.

### Public cloud does not mean public data

A public-cloud service can still store data protected by authentication, access controls, encryption and organisational policy. “Public cloud” describes the service/infrastructure model, not whether every file is publicly visible.

### Private cloud does not mean private network

A private network describes network ownership/access. A private cloud describes a cloud infrastructure model. They may work together, but the terms are not interchangeable.

### Redundancy does not solve every recovery problem

If a deletion is replicated across all copies, redundancy alone may not restore the previous data. Backup/versioning provides a different form of protection.

### Source Activity 2A connection

The source asks learners to choose a network model for organisations such as a 20-person battery-development company. The correct approach is not to memorise one answer. Use criteria such as:

```text
number of users
security sensitivity
sharing requirements
central backup
access control
```

For valuable research, security and central control become strong evidence for client-server.

**Source:** Chapter 2, textbook p.36, Activity 2A.

---

## Practice / Checks

### Task 1 — Client-server or P2P?

A start-up has:

- 6 employees;
- one office;
- temporary design files;
- no sensitive customer data;
- very limited budget.

Write:

```text
Recommended model:
Reason 1:
Reason 2:
Main drawback:
```

### Task 2 — Thin or thick?

Classify:

**A. Exam kiosk**

- browser-based exam system;
- no offline work.

**B. Engineering laptop**

- IDE;
- simulator;
- compiler;
- offline work.

**C. Information terminal**

- displays room schedules only.

For each:

```text
Thin / Thick:
Evidence:
Main risk:
```

### Task 3 — Cloud decision

Nova has:

```text
A. public lecture videos
B. unpublished examination questions
C. department collaboration documents
```

Choose public cloud, private cloud or a hybrid arrangement and justify using confidentiality, accessibility, availability and management.

### Task 4 — Find the error

> “Because Nova uses client-server networking, all its computers must be thin clients.”

Explain why this is incorrect.

### Cambridge-style checks

**Q1 — Explain**

> Explain two reasons why a client-server network may be more suitable than a peer-to-peer network for Nova Campus. [4]

Develop each point as:

```text
feature
→ how it works
→ why Nova benefits
```

**Q2 — Compare**

> Compare thin client software with thick client software. [4]

Possible comparison dimensions: network dependence, local processing, local storage and offline operation.

**Q3 — Justify**

> Nova wishes to store confidential examination data and public teaching videos using cloud computing. Justify the use of a hybrid cloud. [4]

Do not stop at “private for private data, public for public data”. Explain why and include at least one trade-off.

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs to communicate?          ✅
M2: WHERE should data/processing live? ✅
```

Dossier status:

```text
Communication Architecture & Validation Dossier
│
├── M1 Network Requirements Sheet       ✅
├── M2 Logical Service Architecture     ✅
├── M3 Topology design                  ⬜
├── M4 Physical-link plan               ⬜
├── M5 Hardware architecture            ⬜
├── M6 IP addressing plan               ⬜
├── M7 Ethernet validation              ⬜
├── M8 Web request trace                ⬜
└── M9 Service validation               ⬜
```

Because Nova now has a client-server core, private/public service boundaries, large numbers of clients and availability requirements, Module 3 can ask the next dependent question:

> **How should those nodes and systems be connected so that the network handles traffic and survives failures?**
