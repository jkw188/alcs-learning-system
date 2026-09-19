# RAW Master — Chapter 3: Hardware

> Nguồn chuẩn cho Finalize Chapter. File này thu thập lại nội dung học Chapter 3 theo đúng dependency đã triển khai trong hội thoại hiện tại: PBL Setup → Module 1–8 → Final Challenge A–I. Các ID kỹ thuật của code block/UI trong chat không phải nội dung học nên không được giữ; lý thuyết, ví dụ, bảng, sơ đồ, trace, bài tập, câu hỏi, đáp án/hướng dẫn và tham chiếu nguồn được giữ lại.

# PBL Setup

## Phạm vi, nền và môi trường

Chapter 3 — Hardware bao phủ: primary storage/memory devices; secondary storage và removable devices; embedded systems; input/output/storage hardware; RAM, ROM, SRAM, DRAM, PROM, EPROM; monitoring/control systems; NOT, AND, OR, NAND, NOR, XOR; truth tables; logic circuits, logic expressions và real-world logic information. Nguồn chính: Chapter 3, pp. 68–106.

Kiến thức nền cần có: binary 0/1, CPU, data/file/application, và khác biệt cơ bản giữa memory và storage. Chapter không yêu cầu coding project; hoạt động chính gồm architecture diagram, decision matrix, hardware trace, control-flow diagram, Boolean expression, logic circuit, truth table và test cases.

## Big Problem — Smart Factory Safety & Training Station

Thiết kế một **Smart Factory Safety & Training Station** có khả năng:

- khởi động đáng tin cậy;
- xử lý sensor data nhanh;
- lưu firmware, logs và training media;
- cung cấp operator interface;
- thu nhận điều kiện vật lý bằng sensors + ADC;
- điều khiển ventilation/valves bằng actuator/DAC khi cần;
- cảnh báo bằng speaker/display;
- in incident report;
- prototype component bằng 3D printer;
- hỗ trợ VR safety training;
- hoạt động như embedded system;
- tự shutdown khi tổ hợp hazard xảy ra;
- chứng minh safety circuit đúng bằng truth table và test cases.

Final artifact là **Hardware Design Dossier** gồm Memory Architecture, Storage Strategy, Human I/O Architecture, Monitoring & Control Architecture, Safety Interlock và Verification/Design Review.

## Dependency Chain

```text
M1  Station cần memory gì?
          ↓
M2  Data/firmware/logs phải lưu ở đâu?
          ↓
M3  Con người tương tác với station bằng hardware nào?
          ↓
M4  Station quan sát physical world như thế nào?
          ↓
M5  Monitoring khác Control ở đâu?
          ↓
M6  Safety conditions được biểu diễn bằng binary logic thế nào?
          ↓
M7  Từ conditions xây logic circuit và trace như thế nào?
          ↓
M8  Validate + optimise + integrate toàn hệ thống
```

Cầu nối quan trọng:

```text
Sensor
  ↓
binary condition
  ↓
Boolean expression
  ↓
logic gates
  ↓
logic circuit
  ↓
truth table
  ↓
verified safety action
```

## Module Map

| Module | Vấn đề | Kiến thức | Activity | Artifact |
|---|---|---|---|---|
| M1 Memory Architecture | Firmware và live data ở đâu? | RAM, ROM, SRAM, DRAM, PROM, EPROM, cache, embedded systems | so sánh + lựa chọn | Memory Architecture |
| M2 Storage Strategy | Logs/media/backups lưu thế nào? | HDD, SSD, flash, optical | decision matrix | Storage Plan |
| M3 Human I/O Station | Operator tương tác thế nào? | printer, 3D printer, audio, screen, touch, VR | trace + selection | I/O Architecture |
| M4 Sense the Physical World | Physical quantities vào máy tính thế nào? | sensors, ADC, DAC, actuator | signal path | Sensor Architecture |
| M5 Close the Control Loop | Chỉ quan sát hay tự hành động? | monitoring, control, feedback | control trace | Feedback Diagram |
| M6 Encode Safety Rules | “Nguy hiểm” thành 0/1 thế nào? | six gates, Boolean notation, truth tables | gate experiments | Logic Specification |
| M7 Build the Safety Interlock | Kết hợp nhiều conditions thế nào? | circuit construction, intermediate values | circuit + trace | Safety Circuit |
| M8 Verify & Optimise | Chứng minh system đúng thế nào? | equivalence, NAND, simplification, extension | verification audit | Final Dossier |

---

# Module 1 — Memory Architecture

## A. Mục tiêu & trạng thái

Safety Station phải boot hệ thống, run chương trình, xử lý sensor readings liên tục, giữ temporary values và phản ứng nhanh với danger condition. Câu hỏi của module: **Ta nên dùng RAM, ROM, SRAM hay DRAM ở đâu?**

Artifact:

```text
Smart Factory Station
├── Boot/Firmware       → ?
├── Main working memory → ?
└── Processor cache     → ?
```

## B. Lý thuyết cần dùng ngay

### Memory ≠ Storage

Primary memory được CPU truy cập trực tiếp; secondary storage không trực tiếp accessible theo cách primary memory hoạt động, thường lớn hơn và chậm hơn. Với project:

```text
Sensor data đang xử lý → MEMORY
Historical logs        → STORAGE
```

### RAM

RAM read/write và volatile; dùng cho data/program/part of OS đang hoạt động. Trong station: current temperature, gas level, pressure, alarm state, temporary results → RAM.

### ROM

ROM non-volatile; phù hợp với dữ liệu phải tồn tại sau power-off, ví dụ startup information. Station cần startup instructions không biến mất khi tắt điện → ROM-family memory.

### DRAM

DRAM dùng transistors/capacitors, phải refresh. Source nêu lower cost, higher capacity; thường dùng làm main memory.

### SRAM

SRAM dùng flip-flops, không cần refresh; nhanh hơn DRAM và phù hợp processor cache.

```text
CPU
 ↓
SRAM cache
 ↓
DRAM main memory
```

### DRAM vs SRAM

| | DRAM | SRAM |
|---|---|---|
| Refresh | cần | không cần |
| Speed | thấp hơn | cao hơn |
| Capacity | cao hơn | thấp hơn |
| Cost | thấp hơn | cao hơn |
| Typical role | main memory | cache |

Không phải “cái nào tốt hơn”, mà là trade-off.

### PROM và EPROM

PROM programmed once; EPROM có thể reprogram sau erase. Insight: stable final firmware khác firmware đang development.

### Embedded system

Embedded system dedicated purpose, small, low cost/power, fast response/real time nhưng khó upgrade/troubleshoot và network-connected device có security risks. Safety controller được thiết kế như embedded system.

## C. Dự đoán & thực hiện

Dự đoán:

| Requirement | ROM | DRAM | SRAM |
|---|---:|---:|---:|
| Startup firmware | ? | ? | ? |
| Sensor working data | ? | ? | ? |
| CPU cache | ? | ? | ? |

Trace:

```text
Power ON
 ↓
ROM-family chứa startup instructions
 ↓
Processor starts
 ↓
Sensor reading arrives
 ↓
DRAM giữ temporary working data
 ↓
Frequently used instructions/data
 ↓
SRAM cache
```

Artifact:

```text
SMART FACTORY SAFETY STATION

              CPU
               │
          SRAM Cache
               │
          DRAM Main Memory

Boot/startup
     │
ROM-family firmware
```

## D. Hiểu từ kết quả

- Chỉ ROM: không có writable working area tiện dụng.
- Chỉ DRAM: mất startup data khi power off.
- Dùng SRAM cho toàn bộ main memory: nhanh nhưng trade-off cost/capacity không hợp lý.

Kết luận:

```text
ROM-family → persistent startup instructions
DRAM       → normal working memory
SRAM       → high-speed cache
```

## E. Tự vận dụng

Emergency ventilation controller có:

A. startup program
B. current temperature
C. current gas value
D. frequently executed control instructions
E. calibration firmware đang development

Chọn memory và giải thích. Trả lời thêm:

1. Vì sao SRAM cache không thể bị thay bằng HDD chỉ vì HDD capacity lớn?
2. Khi mất điện, phần nào không nên phụ thuộc DRAM?
3. Vì sao reprogrammable ROM hữu ích trong prototype?

Source Extension Activity 3A áp dụng RAM/ROM cho microwave, refrigerator và remote-controlled model aeroplane.

---

# Module 2 — Storage Strategy

## A. Mục tiêu & trạng thái

Kế thừa: CPU + SRAM + DRAM + ROM-family. Vấn đề: sensor logs, alarm history, configuration backups và media phải tồn tại sau power-off.

Artifact:

```text
Storage Architecture
├── Internal operational storage → ?
├── Removable transfer/backup    → ?
└── Long-term/archive media      → ?
```

## B. Lý thuyết cần dùng ngay

Secondary storage: non-volatile, capacity lớn hơn primary memory nhưng chậm hơn; categories: magnetic, solid state, optical.

### HDD

Magnetic platters, tracks, sectors, read/write heads. Latency do head movement/rotation. Fragmentation là data nằm ở non-consecutive sectors; nhiều head movement hơn → access time tăng; defragmentation sắp xếp lại.

### Removable HDD

External HDD, USB, dùng backup/file transfer.

### SSD

No moving parts; source nêu reliable, lighter, no spin-up, lower power, cooler, thinner, faster access. Solid-state storage commonly uses NAND; source cũng nói EEPROM/NOR. Có write-endurance trade-off.

### USB flash

Small, lightweight, portable, USB, phù hợp file transfer/small backup.

### Optical

CD/DVD/Blu-ray dùng laser. CD/DVD spiral track, pits/bumps. DVD dual layering. Source đưa wavelength:

| Medium | Laser | Wavelength |
|---|---|---:|
| CD | red | 780 nm |
| DVD | red | 650 nm |
| Blu-ray | blue | 405 nm |

```text
shorter wavelength
→ smaller pits/features
→ higher density
→ greater capacity
```

## C. Activity — Decision Matrix

| Requirement | HDD | SSD | Flash stick | Optical |
|---|---:|---:|---:|---:|
| Fast random access | △ | ✓ | ✓ | △ |
| No moving parts | ✗ | ✓ | ✓ | ✓ |
| Portable | △ | △ | ✓ | ✓ |
| Frequent operational access | ✓ | ✓✓ | △ | ✗ |
| Physical archive | △ | △ | ✓ | ✓ |
| Compact embedded use | ✗ | ✓ | △ | ✗ |

Decision:

```text
Operational logs     → SSD
Technician transfer  → USB flash
Backup/archive       → removable HDD / optical where appropriate
```

## D. Hiểu từ kết quả

- HDD capacity lớn không có nghĩa dùng làm RAM.
- HDD mechanical latency do head+platter; SSD electronic access.
- SSD và flash stick có underlying technology tương tự nhưng form factor/use case khác.
- Optical giúp so sánh magnetic vs electronic vs optical.

## E. Tự vận dụng

Chọn storage cho:

1. 30 ngày sensor logs
2. diagnostic 15 MB mang sang laptop
3. backup 2 TB
4. training video archive

Giải thích engineer nói “SSD luôn tốt hơn HDD” là quá đơn giản. Trace effect của fragmentation. Extension 3B/3C về track geometry giữ ở mức extension.

---

# Module 3 — Human I/O Station

## A. Mục tiêu & trạng thái

Station đã compute/store nhưng chưa giao tiếp tốt với operator. Cần display, touch, alarm, microphone, printer, prototype, VR.

Artifact:

```text
Human I/O Architecture
├── Operator display      → ?
├── Operator input        → ?
├── Audio output          → ?
├── Audio input           → ?
├── Incident reporting    → ?
├── Physical prototyping  → ?
└── Safety training       → ?
```

## B. Lý thuyết cần dùng ngay

### Laser printer

Dry toner + static electricity. Sequence:

```text
Document
→ printer driver
→ format/check availability
→ printer buffer
→ charged drum
→ laser changes charge pattern
→ toner attaches
→ transfer to paper
→ fuser fixes toner
→ drum reset
```

### Inkjet printer

Print head/nozzles, cartridges, stepper motor, paper feed. Thermal bubble: heat → bubble → droplet; piezoelectric: charge → crystal vibrates → ink ejected. Sequence có driver, buffer, paper sensor, head side-to-side, paper advance, interrupt when buffer empty.

PBL choice:

```text
High-volume reports → laser
Occasional image-rich output → inkjet
```

### 3D printing

Additive manufacturing layer-by-layer vs subtractive removing material. Direct 3D printing: moving head. Binder printing: powder pass + binder pass. Project: prototype sensor/valve housings.

### Speaker

```text
digital sound
→ DAC
→ small current
→ amplifier
→ speaker
→ sound
```

Speaker: varying current → changing magnetic field → cone vibrates → sound.

### Microphone

```text
sound waves
→ microphone
→ analogue electrical signal
→ ADC
→ digital values
→ computer
```

### OLED

Organic layers, self-emissive/no backlight. Pixel = RGB subpixels; resolution = horizontal × vertical pixel count.

### Touchscreen

Capacitive: electrical field, good sunlight visibility, multi-touch, durable; source notes bare finger/special stylus constraints.

Resistive: layers contact to complete circuit; inexpensive, supports bare/gloved finger/stylus; weaker sunlight visibility, no multi-touch, less durable.

Factory operator wearing gloves → resistive is easy to justify from source.

### VR

Dual visual feeds/lenses, field of view, frame rate, gyroscope/accelerometer, LEDs/cameras, binaural sound, possible eye tracking. Used for dangerous-environment training.

## C. Activity

Audio round trip:

```text
voice
→ microphone
→ analogue signal
→ ADC
→ digital audio
→ SSD
→ retrieve
→ DAC
→ amplifier
→ speaker
→ sound
```

Human I/O Architecture:

```text
Human Operator
├── touch → resistive touchscreen
├── voice → microphone → ADC
└── vision ← OLED display

Processor outputs
├── DAC → amplifier → speaker
├── printer
└── VR system

CAD/design → 3D printer → prototype
```

## D. Hiểu từ kết quả

- printer buffer tách CPU khỏi cơ chế in chậm;
- ADC và DAC ngược hướng;
- touchscreen là hardware choice chịu requirement vật lý;
- 3D printer biến digital model → physical object;
- VR là interactive I/O system, không chỉ screen.

## E. Tự vận dụng

Sắp xếp laser print stages; phân loại ADC/DAC; chọn capacitive/resistive theo requirement; chọn device cho VR/prototype/voice/report/dashboard; giải thích vì sao microphone không trực tiếp gửi sound waves dưới dạng bits.

---

# Module 4 — Sense the Physical World

## A. Mục tiêu & trạng thái

Station cần hiểu temperature, gas, pressure, movement, sound, pH... và tác động lại physical world.

Artifact:

```text
Physical condition
→ Sensor
→ Analogue signal
→ ADC
→ Processor
→ Decision
→ DAC / actuator
→ Physical action
```

## B. Lý thuyết cần dùng ngay

Real-world data thường analogue/continuous. Computer cần digital representation.

### Sensor ≠ ADC

```text
Sensor → detects/measures physical property
ADC    → analogue signal → digital data
```

### Sensor types

- temperature: heating/chemical/greenhouse;
- humidity: greenhouse/industrial dampness;
- light: street lights/headlights;
- infrared/motion: intruder/counting;
- pressure: weight/process pressure;
- acoustic: noise/leak detection;
- gas: O2/CO2/pollution/leaks;
- pH: acidity/alkalinity;
- magnetic field: including ABS.

### Actuator

Relay, solenoid, motor, valve. Processor decision → physical action.

### DAC

```text
processor digital output
→ DAC
→ analogue electrical current
→ motor/valve
```

Không phải actuator nào cũng cần DAC. Solenoid on/off có thể digital; variable motor/valve có thể cần analogue control.

## C. Activity

Sensor map:

| Requirement | Sensor |
|---|---|
| overheating | temperature |
| CO2 danger | gas |
| pipeline pressure | pressure |
| restricted-zone movement | infrared/motion |
| abnormal machine noise | acoustic |
| corrosive liquid | pH |

Control path:

```text
Temperature sensor
→ ADC
→ CPU
→ DAC
→ Cooling fan
```

## D. Hiểu từ kết quả

Sensor alone chưa đủ; ADC sau sensor vì phải có analogue signal trước; DAC sau processor vì decision digital xuất hiện trước. Sensor choice dựa measured property.

## E. Tự vận dụng

Chọn sensor cho 6 scenarios; điền sensor/ADC/DAC vào signal path; sửa sai `temperature → ADC → sensor → CPU`; quyết định DAC cho solenoid/fan/LED; giải thích physical temperature continuous cần conversion.

---

# Module 5 — Close the Control Loop

## A. Mục tiêu & trạng thái

Phân biệt monitoring và control; hoàn thiện feedback loop.

Artifact:

```text
Sensor
→ ADC
→ Processor
→ Compare stored values
├── Monitoring → warning/alarm
└── Control → actuator → process changes → sensor again
```

## B. Lý thuyết cần dùng ngay

Monitoring: sensor → convert → analyse → compare → warn; computer không thay process.

Control: cùng các bước trên nhưng processor điều khiển motor/valve; output làm thay đổi next sensor input.

| | Monitoring | Control |
|---|---|---|
| sensor/ADC/analysis | ✓ | ✓ |
| warning | có thể | có thể |
| changes physical process | ✗ | ✓ |
| feedback loop | không bắt buộc | ✓ |

Feedback trong chapter = output system ảnh hưởng next input, không phải user comments.

Processor cần stored thresholds/reference.

## C. Activity

Temperature loop:

```text
temperature
→ sensor
→ ADC
→ processor compares 80°C
→ DAC/control output
→ fan
→ temperature changes
→ sensor again
```

Monitoring/control classification:

- display gas only → monitoring;
- sound alarm only → monitoring;
- open ventilation → control;
- log pressure → monitoring;
- reduce pump speed → control.

ABS case study:

```text
wheel speed
→ magnetic sensor
→ processor compares wheels
→ adjust brake pressure
→ wheel speed changes
→ sensor again
```

Flicker problem: single threshold có thể ON/OFF liên tục. PBL bổ sung two-threshold/hysteresis-style solution:

```text
if light < 40 → ON
if light > 60 → OFF
between 40..60 → keep state
```

## D. Hiểu từ kết quả

Alarm không tự động biến monitoring thành control. Control có thể có display. Feedback đóng khi actuator changes process → sensor reads new state. Repeated sensing cho biết action có hiệu quả không.

## E. Tự vận dụng

Classify 5 systems; complete pressure control loop; add feedback path; fix fan threshold oscillation; exam-style street lamp description.

---

# Module 6 — Encode Safety Rules

## A. Mục tiêu & trạng thái

Chuyển natural-language safety rules thành binary variables, gates, Boolean expressions, truth tables.

Definitions:

```text
T=0 safe temperature; T=1 high
G=0 safe gas;         G=1 high
P=0 safe pressure;    P=1 high
```

`1` không tự động nghĩa “safe”; phải đọc definition.

## B. Lý thuyết cần dùng ngay

Truth table rows = `2^n`.

Six gates:

### NOT

| A | X |
|---:|---:|
| 0 | 1 |
| 1 | 0 |

### AND

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

### OR

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

### NAND

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### NOR

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

### XOR

| A | B | X |
|---:|---:|---:|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

OR khác XOR ở `1,1`.

Boolean notation: `.` AND, `+` OR, overbar/NOT inversion.

Truth table là verification tool cho mọi input combination.

## C. Activity

Examples:

```text
Alarm if T AND G → X = T.G
Warning if G OR T → X = G+T
Warning if ventilation OFF, V=1 means ON → X = NOT V
Test if exactly one of A,B active → X = A XOR B
```

Safety Logic Specification v1:

```text
H = T
C = T AND G
W = G OR P
```

3 inputs → 8 rows:

`000,001,010,011,100,101,110,111`.

## D. Hiểu từ kết quả

- `1` meaning depends on definition.
- OR includes both-high; XOR does not.
- NAND is inverse AND; NOR inverse OR.
- Requirement → relation → gate, không chọn gate trước.
- 3 inputs → exhaustive 8 cases.

## E. Tự vận dụng

Identify six gates from behaviours; build AND/NOR/XOR tables; translate T/P/V rules; sửa engineer chọn XOR khi requirement là inclusive OR; tính rows cho 4 inputs.

---

# Module 7 — Build the Safety Interlock

## A. Mục tiêu & trạng thái

Final safety policy của project:

> Emergency shutdown nếu ít nhất hai trong ba hazard conditions cùng high.

## B. Lý thuyết cần dùng ngay

Complex circuit phải chia intermediate parts. Workflow:

```text
Requirement
→ logic statement
→ Boolean expression
→ intermediate gates
→ circuit
→ truth table
→ compare requirement
```

## C. Thực hiện

Conditions:

```text
① T AND G
② G AND P
③ T AND P
```

Expression:

```text
X = T.G + G.P + T.P
```

Intermediate:

```text
A = T.G
B = G.P
C = T.P
D = A+B
X = D+C
```

Circuit:

```text
T ─────┐
       AND ─ A ───┐
G ─────┘          │
                  OR ─ D ───┐
G ─────┐          │         │
       AND ─ B ───┘         OR ─ X
P ─────┘                    │
                            │
T ─────┐                    │
       AND ─ C ─────────────┘
P ─────┘
```

Truth table:

| T | G | P | A | B | C | D | X |
|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

Verification:

- 0 hazards → 0
- exactly 1 → 0
- exactly 2 → 1
- all 3 → 1

Full hardware connection:

```text
Temperature/Gas/Pressure sensors
→ ADC
→ threshold comparison
→ T/G/P
→ logic circuit
→ X
→ alarm/shutdown/control
```

## D. Hiểu từ kết quả

Intermediate columns hỗ trợ debugging. Boolean expression và circuit phải cùng truth table. Test 000/111 thôi chưa đủ. Parentheses/order gates quan trọng. Requirement phải measurable và binary-define rõ.

## E. Tự vận dụng

- Secondary alarm: temperature high AND gas NOT high OR gas high AND pressure high → expression/circuit/table.
- Trace `A=T AND P; B=G OR P; X=A AND B`.
- Chứng minh `T AND (G OR P)` không equivalent với `(T AND G) OR P` bằng một input.
- Chemical safety `R AND T OR T AND C` theo workflow Cambridge.

---

# Module 8 — Verify, Optimise & Integrate

## A. Mục tiêu & trạng thái

Circuit hiện tại đúng logic; cần review equivalence, fabrication, component count, NAND building blocks, simplification rationale và integrate whole chapter.

Source nêu real-world design considerations: component cost, ease of fabrication, time constraints, off-the-shelf building blocks, simplify circuit.

## B. Lý thuyết cần dùng ngay

### Functional equivalence

Hai circuits nhìn khác nhưng equivalent nếu same output cho mọi `2^n` combinations.

### NAND universal building block

NOT từ NAND:

```text
X = A NAND A
```

AND từ NAND:

```text
P = A NAND B
X = P NAND P
```

OR từ NAND:

```text
P = A NAND A
Q = B NAND B
X = P NAND Q
```

### Simplification

Fewer components có thể reduce cost, improve reliability, simplify fault tracing. Detailed Boolean simplification sang Chapter 15.

### Multi-input gates

3/4-input AND/OR là extension; source nói AS students không expected trả lời phần này.

## C. Activity

Safety interlock audit:

```text
X = T.G + G.P + T.P
```

Implementation `3 AND + 2 OR`. Correctness verified; traceability good; NAND-only possible; không tự ý mở sang Boolean algebra simplification sâu.

Full system trace với `T=1,G=0,P=1`:

```text
X = 1×0 + 0×1 + 1×1 = 1
```

→ emergency shutdown.

Final architecture:

```text
Embedded Controller
├── ROM-family firmware
├── DRAM working memory
├── SRAM cache
└── SSD operational storage

Human I/O + Sensors
        ↓
       ADC
        ↓
    Processor
        ↓
  thresholds T/G/P
        ↓
 Logic Interlock
        ↓
        X
   ├── warning
   └── control → DAC/actuator → process → sensors again
```

## D. Hiểu từ kết quả

Hardware chapter không phải list devices; nó tạo chain `store → execute → sense → process → decide → output → control`. Faster không tự động better. Input/output labels chưa đủ; cần signal path. Monitoring vs control phân biệt ở effect on process. Logic circuit phải verified bằng exhaustive truth table.

## E. Tự vận dụng

- NAND-only NOT/AND + truth tables.
- Compare OR with NAND-only OR.
- Phản biện “fewest gates always best”.
- Extension four-input AND: rows, output 1, lý do extension.

---

# Chapter Integration & Source Coverage

Core source coverage đã đi qua: primary memory, secondary/removable storage, embedded systems, input/output, RAM/ROM/SRAM/DRAM/PROM/EPROM, printers, 3D printing, speaker/microphone, OLED/touchscreen/VR, sensors, ADC/DAC/actuator, monitoring/control/feedback, six gates, truth tables, logic circuit tracing, requirement→circuit, real-world safety logic, NAND building blocks, simplification rationale. Multi-input gates giữ extension.

Extensions retained: HDD/optical track geometry, PRAM/PCRAM, keyboard/mouse, QLED, alternative XOR expressions, advanced NAND and multi-input exercises.

Common mistakes retained:

- RAM ≠ permanent storage.
- SRAM faster không đồng nghĩa dùng thay toàn bộ DRAM.
- Physical input uses sensor → ADC → CPU, không phải DAC.
- Alarm alone không chắc là control.
- OR ≠ exactly one; XOR mới là exactly one.
- `1` meaning depends on variable definition.
- 3 inputs → 8 rows, không phải 6.
- Circuit diagram alone không chứng minh correctness; cần truth table.

---

# Final Challenge — Smart Chemical Production Cell

Production cell có:

```text
T = 1 if temperature > safe limit
G = 1 if dangerous gas level detected
P = 1 if pressure > safe limit
```

Requirements:

```text
R1 Shutdown if temperature AND gas dangerous.
R2 Shutdown if gas AND pressure dangerous.
R3 Shutdown if pressure dangerous while temperature NOT dangerous.
```

Ngoài ra system phải lưu logs, giữ live data, có cache, giữ startup firmware, display status, audible alarm, automatic ventilation và portable diagnostic export.

## Part A — Memory

Chọn:

```text
startup firmware  → ROM-family
live process data → DRAM
processor cache   → SRAM
```

Justify bằng non-volatility, writable working data, speed/cost/capacity trade-offs.

## Part B — Storage

```text
Main process logs          → SSD
Portable diagnostic files → USB flash
```

Justify bằng non-volatile, speed/no moving parts, portability.

## Part C — Audible Alarm

```text
Safety logic
→ X=1
→ processor/controller
→ DAC
→ analogue signal
→ amplifier
→ speaker
→ sound waves
```

DAC converts; amplifier strengthens; speaker produces sound.

## Part D — Sensor Input

```text
physical temperature
→ temperature sensor
→ analogue signal
→ ADC
→ digital value
→ processor
```

Sensor measures; ADC converts.

## Part E — Feedback Control

```text
physical condition
→ sensor
→ ADC
→ processor
→ compare stored threshold
→ control decision
→ actuator/ventilation
→ physical condition changes
→ sensor again
```

## Part F — Logic Specification

```text
R1 = T.G
R2 = G.P
R3 = P.(NOT T)
```

Therefore:

```text
X = T.G + G.P + P.(NOT T)
```

## Part G — Logic Circuit

```text
A = NOT T
B = T.G
C = G.P
D = P.A
E = B+C
X = E+D
```

Circuit:

```text
T ── NOT ── A ────┐
                   AND ─ D ────────┐
P ─────────────────┘               │
                                   OR ─ X
T ─────┐                            │
       AND ─ B ───┐                │
G ─────┘          OR ─ E ──────────┘
G ─────┐          │
       AND ─ C ───┘
P ─────┘
```

## Part H — Verification

| T | G | P | A=NOT T | B=T.G | C=G.P | D=P.A | E=B+C | X=E+D |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |

Verification by requirements:

- R1 true at 110, 111.
- R2 true at 011, 111.
- R3 true at 001, 011.
- Other rows output 0.

## Part I — Engineering Review

Current design:

```text
1 × NOT
3 × AND
2 × OR
Total = 6 gates
```

Correctness verified. Intermediate values help fault tracing. NAND-only implementation possible. To verify an alternative NAND-only circuit, compare output columns for all 8 inputs. Fewer components can reduce cost and improve reliability/fault tracing, nhưng không phải tiêu chí duy nhất.

Final status:

```text
Requirement coverage     ✓
Memory design            ✓
Storage design           ✓
Human/output path        ✓
Sensor input path        ✓
Feedback control         ✓
Boolean specification    ✓
Logic circuit            ✓
8-row verification       ✓
Engineering review       ✓
```

Final chapter chain:

```text
physical requirement
→ hardware choice
→ sensor / I/O path
→ monitoring or control
→ binary conditions
→ Boolean expression
→ logic circuit
→ truth table
→ verified system behaviour
```
