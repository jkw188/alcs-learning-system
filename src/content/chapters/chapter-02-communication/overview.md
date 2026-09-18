# Chapter 2 — Communication

## Overview

This chapter is taught as one Project-Based Learning problem rather than a sequence of disconnected textbook sections. You will design, justify, and validate the communication infrastructure for a fictional organisation called **Nova Learning Campus**.

The source scope is **Chapter 2: Communication** in `chapter2.pdf`, textbook pages 27–67. The source covers networking benefits, LAN/WAN, client-server and peer-to-peer models, thin/thick clients, network topologies, cloud computing, wired/wireless communication, LAN hardware, routers, Ethernet and collisions, bit streaming, Internet vs World Wide Web, Internet support hardware, IPv4/IPv6, public/private IP addresses, URL, and DNS.

A few source inconsistencies are explicitly corrected during the chapter instead of being silently repeated: the example `190.15.25.240` is Class B by the source's own class table; in `f = c / λ`, `f` is measured in hertz and `λ` in metres; and a URL is not the same thing as an IP address.

## PROJECT - NOVA LEARNING CAMPUS

> **Design and validate the communication infrastructure for Nova Learning Campus so that it supports local, metropolitan and long-distance communication, secure internal services, Internet access, web services, voice communication, recorded learning, and live learning.**

Nova has:

- a 20-floor main building;
- multiple academic and administrative departments;
- several buildings in the same city;
- staff, students, computer laboratories, and mobile devices;
- shared files and applications;
- confidential administrative and academic data;
- a public website;
- recorded lectures and live lectures;
- internal and remote voice communication;
- a remote office and possible very remote sites;
- reliability, security, scalability, and availability requirements.

The final chapter artifact is a **Communication Architecture & Validation Dossier** containing:

1. a Network Requirements Sheet;
2. a Logical Service Architecture;
3. a Topology Design and Failure Analysis;
4. a Physical-Link Plan;
5. a Hardware Architecture and packet-forwarding traces;
6. an IPv4/IPv6 Addressing and Subnet Plan;
7. Ethernet and CSMA/CD validation;
8. an end-to-end web request trace;
9. voice, streaming, buffering, and long-distance service validation.

## Learning Objectives

By the end of the chapter, you should be able to:

- explain benefits and drawbacks of networking rather than using stand-alone devices;
- distinguish PAN, LAN, WLAN, MAN and WAN, and distinguish public and private networks;
- compare client-server and peer-to-peer models;
- compare thin and thick clients;
- compare bus, star, mesh and hybrid topologies and justify a topology for a scenario;
- explain public, private and hybrid cloud approaches and data redundancy;
- compare wired and wireless communication and choose suitable communication media;
- explain Wi-Fi, Bluetooth, spread spectrum frequency hopping, attenuation and penetration;
- compare twisted pair, coaxial and fibre optic cable;
- explain the roles of NIC/WNIC, WAP, hub, switch, repeater, bridge, router, gateway and modem;
- convert IPv4 octets between decimal and binary and explain netID/hostID;
- explain classful addressing as presented in the source, CIDR, subnet masks and subnetting;
- use a bitwise AND mask to identify a subnet;
- distinguish public and private IP addresses;
- describe IPv6 and apply valid zero compression;
- explain Ethernet, frames, IP conflicts, collisions and CSMA/CD;
- distinguish the Internet from the World Wide Web;
- explain the roles of a browser and an ISP;
- decompose a URL and trace DNS resolution;
- compare PSTN and VoIP;
- explain bit streaming, buffering, bit rate, on-demand streaming and real-time streaming;
- calculate buffer changes using the units and conversion rules given in an exam question;
- compare GEO, MEO and LEO satellites at the level required by the source;
- justify technical decisions using requirements, evidence, trade-offs and failure cases.

## Dependency Chain

```text
Communication requirements
        ↓
Where data and processing live
        ↓
How nodes and networks are connected
        ↓
Which medium carries each link
        ↓
Which hardware implements each path
        ↓
How networks and hosts are addressed
        ↓
How local Ethernet handles contention
        ↓
How a URL reaches the correct web server
        ↓
How real services behave on the design
        ↓
Integrated validation of the whole architecture
```

## Module Map

| Module | Problem to solve | Knowledge used | Main activity | Verified artifact | Depends on |
|---|---|---|---|---|---|
| 1. Define the Communication Requirements | What must communicate, and over what geographical scope? | Networking benefits/drawbacks; PAN/LAN/WLAN/MAN/WAN; public/private networks | Classify Nova links and access boundaries | Network Requirements Sheet + scope diagram | Big Problem only |
| 2. Decide Where Data and Processing Live | Where should data, services and processing be placed? | Client-server/P2P; thin/thick clients; public/private/hybrid cloud; redundancy | Service and cloud decision matrix | Logical Service Architecture | M1 |
| 3. Build a Topology That Survives Failure | How should nodes and networks be interconnected? | Bus/star/mesh/hybrid; routing/flooding | Compare alternatives and trace failures | Topology Design + Failure Analysis | M1–M2 |
| 4. Choose the Communication Medium | What should carry each link? | Wired/wireless; Wi-Fi/Bluetooth; radio/microwave/IR; attenuation; cables; satellite | Medium decision matrix and `f = c / λ` calculation | Physical-Link Plan | M3 |
| 5. Turn the Design into Real Network Hardware | Which devices make the paths real? | NIC/WNIC, WAP, hub, switch, repeater, bridge, router, gateway, modem | Packet-forwarding traces | Hardware Architecture | M3–M4 |
| 6. Give Every Network and Device an Address | How will routers and hosts identify destinations? | IPv4, binary, classful addressing, CIDR, subnetting, masks, IPv6, public/private IP | Eight-subnet university-style calculation | IP Addressing & Subnet Plan | M5 |
| 7. Make Local Transmission Reliable | What happens when addressing or shared transmission fails? | Ethernet, frames, broadcasts, IP conflict, collisions, CSMA/CD | State trace and corrected flowchart | Ethernet Reliability Validation | M5–M6 |
| 8. Trace “URL Typed → Web Page Appears” | How does a human-readable URL reach the correct web server? | Internet vs WWW, browser, ISP, URL, DNS, public IP | DNS and end-to-end request trace | Web Request Trace | M5–M6 |
| 9. Prove the Network Can Deliver Real Services | Can the design support voice, live and recorded media? | PSTN/VoIP, streaming, buffering, bit rate, GEO/MEO/LEO | Buffer calculation and service stress test | Service Validation Report + completed Dossier | M4–M8 |

## Source Activity Mapping

The source activities are embedded in the project rather than taught as isolated exercises:

- Activity 2A → Module 2 client-server/P2P decision;
- Extension 2A → Module 3 P2P vs mesh distinction;
- Extension 2B → Module 4 `f = c / λ` calculation;
- Extension 2C → Module 5 gateway diagram;
- Extension 2D → Module 7 corrected CSMA/CD flowchart;
- Activity 2B → Modules 1–4 and 9;
- Extension 2E → Module 6 NAT extension;
- Extension 2F → Module 8 optional JavaScript/PHP extension;
- Activity 2C → Modules 4, 6, 8 and 9;
- end-of-chapter Questions 1–5 → distributed across Modules 2–9.

> **Primary source:** `chapter2.pdf`, Chapter 2 “Communication”, textbook pages 27–67.
