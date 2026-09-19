# Module 2 — Storage Strategy

## Objectives / State

### Inherited artifact

From Module 1:

```text
CPU
├── SRAM cache
├── DRAM main memory
└── ROM-family firmware
```

This solves volatile working memory and persistent firmware, but not long-term operational data.

### Problem

The station must retain sensor logs, alarm history, configuration backups and training media after power-off, and technicians need a practical way to move diagnostic files.

### Module question

**Which secondary storage technologies fit each workload, and why?**

### Artifact

```text
Storage Architecture v1
├── Internal operational storage → ?
├── Removable transfer / backup  → ?
└── Long-term/archive medium     → ?
```

---

## Just-in-time Theory

### 1. Secondary storage

The source defines secondary storage as non-volatile storage that is not directly accessed by the CPU in the same way as primary memory. It is generally much larger than primary memory but slower to access. The chapter divides it into three broad categories: **magnetic, solid state and optical**. **Source: p. 73.**

```text
Secondary Storage
│
├── Magnetic
│    └── HDD
│
├── Solid state
│    ├── SSD
│    └── Flash memory
│
└── Optical
     ├── CD
     ├── DVD
     └── Blu-ray
```

### 2. HDD — magnetic storage

The source describes HDDs as magnetic storage using rotating platters, tracks, sectors and read/write heads. A sector contains a fixed number of bytes. **Source: p. 73.**

```text
Platter
  │
  ├── Track
  │     ├── Sector
  │     ├── Sector
  │     └── Sector
  │
  └── Track
```

#### Latency

The read/write head must reach the required area and the required sector must rotate into position. The source defines latency as the delay while a required block rotates to the read/write head. **Source: p. 73.**

```text
request data
    ↓
move head / wait for rotation
    ↓
sector reaches read/write head
    ↓
read data
```

#### Fragmentation

As files are edited and deleted, their sectors may become non-consecutive. The source explains that increasing fragmentation can worsen performance because more movement is required. Defragmentation reorganises sectors to improve this situation. **Source: p. 73.**

```text
File A
Sector 1 ✓
Sector 2 ✗
Sector 3 ✓
Sector 4 ✗
Sector 5 ✓
```

### 3. Removable HDD

The source describes removable HDDs as external HDDs connected through USB, suitable for backup and transferring files between systems. **Source: p. 74.**

### 4. SSD

The source contrasts SSDs with HDDs by emphasising that SSDs have **no moving parts**. It describes common solid-state storage in terms of electronic storage using NAND chips and also discusses EEPROM/NOR technology. **Source: p. 74.**

Source advantages of SSD over HDD include:

- greater reliability because there are no moving parts;
- lower mass;
- no spin-up requirement;
- lower power consumption;
- cooler operation;
- thinner construction;
- faster data access.

**Source: p. 74.**

For an embedded station that reads/writes operational data frequently and benefits from compact, low-power hardware, these properties are important.

### 5. NAND flash and EEPROM

The source's chapter framing distinguishes common flash memory using NAND from EEPROM using NOR. It notes that EEPROM can support smaller-granularity operations but is more expensive, whereas NAND is widely used for solid-state storage. **Source: p. 74.**

Do not confuse flash storage with RAM. Both are electronic technologies, but flash is non-volatile secondary storage.

### 6. SSD endurance

The source warns that solid-state devices have finite write endurance and discusses this as a trade-off. The specific numerical example in the textbook reflects the technology context of the source; the chapter-level principle we retain is simply that **write endurance is a design consideration**. **Source: p. 74.**

### 7. USB flash memory

Memory sticks use solid-state technology, are small and lightweight, usually connect via USB, and are well suited to file transfer and small backups. The source also mentions dongle-style use for software authorisation. **Source: p. 75.**

### 8. Optical media

CDs, DVDs and Blu-ray discs use laser light. CDs and DVDs use a spiral track with pits/bumps and are divided into sectors. The source explains DVD dual-layering and the relationship between laser wavelength and achievable data density. **Source: pp. 75–76.**

| Medium | Laser colour | Wavelength in source |
|---|---|---:|
| CD | Red | 780 nm |
| DVD | Red | 650 nm |
| Blu-ray | Blue | 405 nm |

The source's intended relationship is:

```text
shorter wavelength
      ↓
smaller features
      ↓
higher data density
      ↓
greater capacity
```

Blu-ray is also described as using a different physical construction from DVD and avoiding the same birefringence issue discussed for sandwiched DVD layers. **Source: p. 76.**

---

## Activity / Example

### Prediction

The station records sensor logs continuously. Compare HDD and SSD against these requirements:

```text
fast access
low power
compact construction
few mechanical failure points
```

Which technology is easier to justify for the station's internal operational storage?

### Decision 1 — Operational logs

The station stores:

```text
temperature logs
gas readings
alarm history
system events
```

The workload is frequent and integrated into the embedded system. Based on the source properties, **SSD** is the stronger fit for this PBL design because it offers fast access, low power and no moving parts.

### Decision 2 — Technician transfer

Technicians may need to export configuration or diagnostic files and physically carry them to another computer.

```text
Technician
    │
    └── USB flash memory
          ├── configuration export
          ├── diagnostic report
          └── small package transfer
```

The source explicitly associates memory sticks with small, lightweight USB file transfer. **Source: p. 75.**

### Decision 3 — Backup / archive

A removable HDD can support large external backups. Optical media can support physical distribution or archive scenarios where write frequency is low and physical media are acceptable.

### Storage Decision Matrix

| Requirement | HDD | SSD | Flash stick | Optical |
|---|---:|---:|---:|---:|
| Fast random access | △ | ✓ | ✓ | △ |
| No moving parts | ✗ | ✓ | ✓ | ✓ |
| Portable | △ | △ | ✓ | ✓ |
| Frequent operational access | ✓ | ✓✓ | △ | ✗ |
| Physical distribution/archive | △ | △ | ✓ | ✓ |
| Compact embedded use | ✗ | ✓ | △ | ✗ |

This decision matrix is a PBL synthesis of the source properties rather than a copied textbook table.

### Storage Architecture v1

```text
SMART FACTORY SAFETY STATION
│
├── Operational data
│      └── SSD
│
├── Technician transfer
│      └── USB flash memory
│
└── Backup / archive
       ├── removable HDD
       └── optical media where appropriate
```

---

## Explanation

### Why not use HDD as main memory?

Secondary storage is slower than primary memory and does not replace the CPU's directly accessible working memory. Capacity alone is not the determining property.

### Why does HDD have mechanical latency that SSD does not share in the same way?

HDD access depends on moving a read/write head and rotating a platter to the required location. SSD access is electronic and has no rotating platter/head mechanism.

### Are an SSD and a USB flash drive the same thing?

They can both use flash/solid-state technology, but the chapter's usage roles differ. An SSD is a main secondary storage device; a memory stick is primarily a small portable/removable device. Shared underlying technology does not mean identical best use cases.

### Why still learn optical storage?

It demonstrates another storage mechanism and makes the learner compare **magnetic vs electronic vs optical** rather than assuming one universal device is best.

---

## Practice / Checks

### Challenge M2.1 — Choose storage

| Data | Storage you choose | Reason |
|---|---|---|
| 30 days of sensor logs | ? | ? |
| 15 MB diagnostic file moved to a laptop | ? | ? |
| 2 TB full-system backup | ? | ? |
| Training-video archive | ? | ? |

Each justification must use a relevant property, not only capacity.

### Challenge M2.2 — Explain a trade-off

An engineer says: **"SSD is always better than HDD, so HDD is no longer needed."** Explain why this is too simple using at least two trade-off considerations.

### Challenge M2.3 — Trace fragmentation

A file is stored as:

```text
Track A: [F1][--][F3][--]
Track B: [--][F2][--][F4]
```

Explain:

1. what extra work the read/write mechanism may need to perform;
2. what happens to access time;
3. what defragmentation is intended to improve.

### Source extensions

The source's Extension Activity 3B asks how manufacturers cope with differing track lengths on HDDs. Extension Activity 3C asks a related question for optical discs. These remain extensions because they are not required for the next project dependency. **Source: pp. 74–75.**

---

## Contribution to the Big Problem

After Modules 1 and 2:

```text
SMART FACTORY SAFETY STATION

CPU / Memory
├── SRAM cache
├── DRAM
└── ROM-family firmware

Storage
├── SSD
├── USB flash memory
└── backup/archive medium
```

The station can now compute and retain information, but it cannot yet interact effectively with a human operator. Module 3 solves that problem.
