# Module 8 — Trace “URL Typed → Web Page Appears”

## Objectives / State

### Immediate problem

Nova's internal network now works:

```text
Laptop
  ↓
WAP
  ↓
Switch
  ↓
Router
  ↓
Internet
```

But if a student types:

```text
https://learn.nova.example/course/module1.html
```

into a browser, we still need to explain:

- what the browser does with the URL;
- how the domain name becomes an IP address;
- what DNS does;
- what the ISP does;
- how Internet and World Wide Web differ;
- when traffic leaves Nova's private network;
- how the web server returns the requested resource.

### Knowledge needed now

- Internet;
- World Wide Web (WWW);
- browser;
- ISP;
- URL;
- domain name;
- DNS;
- public IP;
- Internet access requirements;
- browser → DNS → web server trace;
- optional extension: client-side vs server-side scripting.

### Verifiable artifact

**Artifact M8 — End-to-End Web Request Trace** must show:

```text
URL
↓
Browser
↓
DNS lookup
↓
IP address
↓
Router / ISP / Internet
↓
Web server
↓
Web response
↓
Browser renders page
```

---

## Just-in-time Theory

### 1. Internet ≠ World Wide Web

The source treats these as different concepts.

#### Internet

The **Internet** is the network infrastructure: a vast network of interconnected networks using protocols such as TCP/IP.

```text
LAN ─┐
WAN ─┼── INTERNET ── other networks
ISP ─┘
```

#### World Wide Web

The **WWW** is a collection of web pages and web resources that use the Internet as communication infrastructure.

```text
Internet
= network infrastructure

WWW
= web resources/services using that infrastructure
```

Other services such as email, VoIP and streaming can also use the Internet. Therefore the WWW is not the Internet itself.

**Source:** Chapter 2, textbook pp.52–54.

### 2. Web browser

A **web browser** is software on the user's device that:

- accepts a URL/request;
- participates in obtaining the destination address;
- requests web resources;
- interprets received web data such as HTML;
- displays the result to the user.

Conceptually:

```text
user request
    ↓
browser
    ↓
network request
    ↓
server response
    ↓
interpret/render
```

**Source:** Chapter 2, textbook pp.53–54.

### 3. ISP — Internet Service Provider

An **ISP** is the provider that gives a user or organisation connectivity to the Internet.

```text
Laptop
 ↓
Campus network
 ↓
Nova router
 ↓
ISP
 ↓
Internet
```

Browser and ISP have different responsibilities:

```text
Browser
→ application software that requests/displays web content

ISP
→ connectivity provider
```

**Source:** Chapter 2, textbook pp.53–54.

### 4. Basic Internet access components

The source lists elements such as:

- a computer/tablet/phone;
- communication connection;
- router or router/modem;
- an ISP;
- a web browser.

Nova already designed most of these in Modules 4 and 5.

### 5. URL

**URL — Uniform Resource Locator** identifies a resource on the Web.

Example:

```text
https://www.example.com/courses/networking.html
```

The source describes a structure such as:

```text
protocol://website-address/path/filename
```

Website-address components may include:

- host;
- domain name;
- domain type;
- country code.

**Source:** Chapter 2, textbook p.61.

### 6. Decompose a URL

Example:

```text
https://learn.nova.example/courses/module8.html
```

Conceptually:

```text
https://
│
└─ protocol

learn.nova.example
│
└─ host/domain information

/courses/
│
└─ path

module8.html
│
└─ resource/file
```

In exam questions, you may be asked to identify the protocol, domain name or filename.

### 7. URL ≠ IP address

The source contains an inaccurate/ambiguous sentence suggesting a URL is represented by four numbers, then immediately gives the correct URL structure. Keep the concepts separate:

```text
URL/domain:
https://www.example.com/page.html

IP:
203.0.113.20
```

A URL/domain is a human-readable locator/name. An IP address is a network address. DNS links the name to an IP address.

### 8. Why DNS is needed

Humans can remember:

```text
learn.nova.example
```

more easily than an IP address.

Networks route using IP addresses. **DNS — Domain Name Service/System** resolves a host/domain name to an IP address.

```text
learn.nova.example
        ↓ DNS
203.0.113.25
```

**Source:** Chapter 2, textbook pp.61–62.

### 9. Source DNS process

The source's Figure 2.25 describes a five-step pattern:

1. the user enters a URL and the browser asks a DNS server for the IP address;
2. if that DNS server does not know it, it sends a request onward;
3. another DNS server finds the mapping and returns the IP address;
4. the IP address reaches the user's computer;
5. the computer communicates with the web server and the browser displays the received page.

A DNS server can also use a cache/database so that known mappings can be returned more quickly.

**Source:** Chapter 2, textbook p.62.

---

## Activity / Example

### Step 1 — Prediction

Student enters:

```text
https://learn.nova.example/course1.html
```

Order these events:

```text
A. Web server sends HTML
B. DNS returns an IP address
C. Browser reads/parses the URL
D. Browser contacts web server
E. Browser renders HTML
F. DNS lookup occurs
```

Write:

```text
__ → __ → __ → __ → __ → __
```

### Step 2 — Start from the student laptop

The student is connected to Nova's WLAN:

```text
Student laptop
     |
    WNIC
     )))
    WAP
     |
   Switch
     |
   Router
     |
    ISP
     |
 Internet
```

The student enters:

```text
https://learn.nova.example/course1.html
```

### Step 3 — Browser parses the URL

Conceptual result:

```text
Protocol:
https

Host/domain:
learn.nova.example

Resource:
course1.html
```

At this point, the browser/system still needs a destination IP address.

### Step 4 — DNS lookup

The resolver is asked:

```text
What is the IP address for learn.nova.example?
```

#### Case A — cache hit

The resolver already has:

```text
learn.nova.example
→ 203.0.113.25
```

and returns it.

#### Case B — cache miss

The resolver queries further DNS infrastructure until the mapping is found, matching the textbook's multi-server example.

### Step 5 — Public/private addressing joins the trace

Suppose the student device has a private address:

```text
192.168.20.70
```

and the public-facing web service has:

```text
203.0.113.25
```

The path from Module 6 becomes:

```text
Student
private IP
    ↓
Nova router / NAT boundary
    ↓
public Internet
    ↓
public server IP
```

This demonstrates why Module 6 was a dependency for this module.

### Step 6 — Router and ISP forwarding

Once the destination IP is known, the request must leave the local network:

```text
Student
 ↓
Switch
 ↓
Router
 ↓
ISP
 ↓
Internet routers/networks
 ↓
Destination network
 ↓
Web server
```

The router uses network addressing to forward the packet toward the destination network. The ISP provides Internet connectivity beyond Nova.

### Step 7 — Server response

The web server receives the request for:

```text
/course1.html
```

and returns the requested page/resource.

```text
Web server
   ↓
Internet
   ↓
ISP
   ↓
Nova router
   ↓
Switch/WAP
   ↓
Student laptop
```

### Step 8 — Browser renders the page

The browser receives and interprets web content such as HTML. A real page may trigger additional resource requests for images, stylesheets, scripts or media.

The chapter-level result is:

```text
URL typed
→ webpage visible
```

### Step 9 — Full end-to-end trace

```text
1. User types URL
          ↓
2. Browser parses protocol/domain/path
          ↓
3. DNS query for the domain
          ↓
4. DNS returns the IP address
          ↓
5. Browser sends request toward that IP
          ↓
6. Nova router forwards traffic outside the private network
          ↓
7. ISP provides Internet connectivity
          ↓
8. Traffic reaches the destination web server
          ↓
9. Server returns the requested resource
          ↓
10. Browser interprets and displays the page
```

### Step 10 — Combine hardware and logical services

```text
Student Laptop
192.168.20.70
     |
    WNIC
     )))
    WAP
     |
   Switch
     |
   Router
     |
     | DNS query
     v
  DNS service
     |
     | returns 203.0.113.25
     v
   Router
     |
    ISP
     |
 Internet
     |
203.0.113.25
 Web Server
```

This integrates hardware, addressing, DNS, Internet and Web concepts into one trace.

### Step 11 — Use the trace to prove Internet ≠ WWW

In the flow:

```text
Router → ISP → Internet → destination network
```

is communication/network infrastructure.

```text
URL → HTML → browser → web page
```

belongs to Web use.

Therefore:

```text
WWW uses the Internet
```

not:

```text
WWW = Internet
```

### Step 12 — Browser vs ISP in the same trace

```text
Browser
→ runs on the user device and interprets web content

ISP
→ provides connectivity beyond Nova's network
```

The browser does not replace the ISP, and the ISP does not render HTML for the user's screen.

### Step 13 — DNS failure scenario

Assume:

- Wi-Fi works;
- router works;
- Internet connectivity works;
- the web server is online;
- DNS resolution fails.

If the user enters a domain name, the browser may not obtain the server's IP address.

Therefore:

```text
Internet connection working
≠ DNS resolution working
```

They are separate dependencies.

### Step 14 — Cached DNS result

If a resolver has already stored:

```text
learn.nova.example
→ 203.0.113.25
```

then a later lookup can be answered from cache, reducing lookup work/time.

### Step 15 — Source URL activity

The source uses:

```text
https://www.exampleofaurl.co.de/computer_logic.html
```

and asks for protocol, domain and filename.

A source-aligned decomposition is:

```text
Protocol:
https

Host/domain:
www.exampleofaurl.co.de

Filename:
computer_logic.html
```

More detailed components can include host (`www`), domain component, type component (`co`) and country code (`de`). Use the terminology expected by the question.

### Optional Extension — Client-side vs server-side scripting

The source explicitly marks its HTML/JavaScript/PHP section as beyond the syllabus and includes it only to aid understanding.

#### Client-side

A client-side script runs on the requesting user's computer/browser.

```text
Server sends page/script
        ↓
Browser/device executes script
```

The source uses JavaScript as its example.

#### Server-side

A server-side script runs on the web server and sends the processed result back to the client.

```text
Client request
      ↓
Server executes code
      ↓
Server returns result
```

The source uses PHP as its example.

This extension reconnects to Module 2's discussion of where processing occurs, but it remains optional rather than core Chapter 2 content.

### Artifact M8 — End-to-End Web Request Trace

```text
Student types:
https://learn.nova.example/course1.html
              |
              v
           Browser
              |
        extract domain
              |
              v
          DNS query
              |
       learn.nova.example
              |
              v
      DNS returns public IP
          203.0.113.25
              |
              v
Student private IP
192.168.20.70
              |
             WAP
              |
            Switch
              |
            Router
          NAT / edge
              |
             ISP
              |
          Internet
              |
        Destination network
              |
          Web Server
       203.0.113.25
              |
       requested HTML
              |
              v
           Browser
              |
        interpret/render
              |
           Web page
```

### Artifact M8 — Responsibility table

| Component | Responsibility |
|---|---|
| URL | Identifies the requested web resource |
| Browser | Sends request and interprets/displays the response |
| DNS | Resolves domain name to IP address |
| IP address | Identifies destination for network communication |
| Router | Moves traffic toward another network |
| ISP | Provides Internet connectivity |
| Internet | Network infrastructure connecting networks |
| Web server | Stores/serves requested web resources |
| WWW | Web resources accessed using Internet infrastructure |

---

## Explanation / Understand from the Result

### DNS does not store the website

Incorrect:

```text
DNS → stores web pages
```

Correct:

```text
DNS
→ domain name → IP address

Web server
→ provides the requested web resource
```

### Router does not route using the URL path

The router does not need to interpret:

```text
/course1.html
```

in order to choose the network path.

Conceptually:

```text
DNS:
name → IP

Routing:
IP → network/path

Web server:
path → resource
```

### DNS vs router

```text
DNS asks:
What IP corresponds to this domain?

Router asks:
Where should traffic for this IP/network go next?
```

### ISP ≠ DNS

An ISP may offer a DNS resolver, but the terms are not equivalent.

```text
ISP
→ connectivity provider

DNS
→ name-resolution system
```

### Internet supports more than WWW

VoIP, streaming and other services also use the Internet. Therefore Web browsing is only one use of Internet infrastructure.

### Public Nova website need not be physically on campus

Module 2 allowed a cloud-hosted public service. The client only needs DNS and network routing to reach the correct server; the server does not need to be located inside the Main Building.

### One page load can involve many requests

A single HTML page can reference images, stylesheets, scripts and media, each of which may create additional network requests. This is useful context, but full Web protocol behaviour is outside the chapter scope.

---

## Practice / Checks

### Task 1 — Trace DNS

A student enters:

```text
https://portal.nova.example/results.html
```

Write a sequence containing:

```text
Browser
DNS
IP
Router
ISP
Web server
HTML
```

Use the correct order and state exactly what DNS does.

### Task 2 — URL decomposition

Analyse:

```text
https://www.nova.edu.vn/students/timetable.html
```

Identify:

```text
Protocol:
Host:
Domain:
Country code:
Path:
Filename:
```

### Task 3 — Find the error

> “DNS downloads the website and sends it to the browser.”

Correct the statement using:

```text
DNS does ...
Web server does ...
```

### Task 4 — Internet vs WWW

Consider:

```text
A. Viewing a web page
B. Making a VoIP call
C. Streaming live video
```

Answer:

1. Which use the Internet?
2. Which definitely belongs to WWW usage?
3. Why are Internet and WWW not synonyms?

### Task 5 — Failure diagnosis

A Nova student:

- connects to Wi-Fi;
- can reach the router;
- has working Internet connectivity;
- cannot resolve domain names.

Which subsystem should be investigated first? Explain using the Module 8 trace.

### Cambridge-style checks

**Q1 — Explain**

> Explain the difference between the Internet and the World Wide Web. [4]

Strong answer:

```text
Internet
→ network infrastructure / network of networks

WWW
→ web pages/resources

WWW uses Internet infrastructure
```

**Q2 — Describe**

> Describe how DNS is used when a user enters a URL into a web browser. [4]

Expected chain:

```text
domain
→ DNS query
→ IP lookup
→ IP returned
→ browser communicates with server
```

**Q3 — Identify**

Given:

```text
https://www.example.com/files/report.html
```

identify the protocol, domain and filename.

**Q4 — Explain**

> Explain the different roles of a web browser and an ISP. [4]

**Q5 — Apply**

> A user knows the correct URL, but DNS cannot resolve the domain name. Explain why the page may fail to load even though the web server is operational. [3]

---

## Contribution to the Big Problem

The project now answers:

```text
M1: WHAT needs communication?                    ✅
M2: WHERE do data and processing live?           ✅
M3: HOW are networks interconnected?             ✅
M4: WHAT carries the signals?                    ✅
M5: WHICH hardware forwards the data?            ✅
M6: HOW are devices/networks addressed?          ✅
M7: HOW does local Ethernet handle problems?     ✅
M8: HOW does a URL reach the correct web server? ✅
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
└── M9 Service Validation               ⬜
```

One final question remains: **Can the architecture actually deliver useful real services such as VoIP, live streaming and video-on-demand without unacceptable interruption or capacity problems?** Module 9 validates the whole design using real communication services.
