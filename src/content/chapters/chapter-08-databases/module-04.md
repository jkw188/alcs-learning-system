# Module 4 — Normalisation: From Raw Data to 3NF

This module is one of the core parts of Chapter 8. We will continue using the **School Database** from the source material and transform one large table containing repeated data into a relational database that reaches **Third Normal Form (3NF)**.

The source material defines the purpose of normalisation as reducing **data redundancy** and helping the database maintain **integrity**; tables that are not normalised become harder to update and query as the amount of data increases. fileciteturn0file0L403-L407

---

## A. Learning Objectives

By the end of this module, you should be able to carry out the sequence:

```text
Unnormalised data
       ↓
      1NF
       ↓
      2NF
       ↓
      3NF
```

More importantly, you should understand **why tables need to be separated**, rather than merely memorising:

```text
1NF = ...
2NF = ...
3NF = ...
```

We will focus on four main ideas:

- **repeating groups**
- **composite key**
- **partial dependency**
- **non-key dependency**

The final outcome of this module is a normalised School Database.

---

## B. Theory Needed Now

### 1. Why normalise a database?

Suppose the school stores everything in one table:

```text
STUDENT
---------------------------------------------------------
StudentID
FirstName
SecondName
DateOfBirth
SubjectName
SubjectTeacher
ClassID
Location
TeacherName
LicenceNumber
Address
TeacherDateOfBirth
```

For example, two students in Class `7A` might be stored as:

```text
S1276 | Noor  | ... | 7A | Room 3 | Mr Khan | 37952 | ...
S1299 | Tahir | ... | 7A | Room 3 | Mr Khan | 37952 | ...
```

The information:

```text
Room 3
Mr Khan
37952
...
```

is repeated.

The source material points out three practical problems:

- when a new Student is added, Teacher/Class information must be entered again;
- if a Teacher changes, every record containing that Teacher may need to be updated;
- if all Students in Class `7B` leave, the information about Class `7B` may be lost. fileciteturn0file0L435-L440

This is exactly why normalisation is needed.

---

### 2. The three normal forms in this chapter

The source material states:

```text
1NF
No repeating groups.

2NF
Must already be in 1NF.
No partial dependencies.

3NF
Must already be in 2NF.
No non-key dependencies.
```

fileciteturn0file0L441-L447

A useful way to remember the final goal, used in the chapter, is:

> When a database is in 3NF, attributes depend on **the key, the whole key and nothing but the key**. fileciteturn0file0L453-L454

We will understand this statement one step at a time.

---

## C. Predict and Perform

### Step 0 — Unnormalised School Database

The source material adds Subject information for each Student.

Example:

```text
StudentID: S1276
Name: Noor Baig

Subjects:
- Maths       → Mr Yee
- History     → Miss Wu
- Geography   → Mr Khan

Class:
7A → Room 3 → Mr Khan
```

If this is represented as one record:

```text
S1276
Noor
Baig
09/22/2010
Maths, History, Geography
Mr Yee, Miss Wu, Mr Khan
7A
Room 3
Mr Khan
37952
...
```

then:

```text
SubjectName
SubjectTeacher
```

contain several values inside one Student record. The source material identifies these as **repeating attributes**. fileciteturn0file0L514-L523

---

### Step 1 — Convert to First Normal Form (1NF)

### The problem

We have:

```text
StudentID = S1276

SubjectName:
Maths
History
Geography
```

Different Students may study different numbers of Subjects.

If we design the table as:

```text
Subject1
Subject2
Subject3
```

then several problems arise:

- what if a Student studies 5 subjects?
- what if a Student studies only 2 subjects?
- to find every student who studies Maths, several columns would need to be searched.

This is a repeating group.

---

### The 1NF rule

Within the scope of this chapter:

> **Entities do not contain repeated groups of attributes.**

fileciteturn0file0L441-L443

We therefore separate the Subjects.

### Before

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,

    SubjectName,
    SubjectTeacher,
    SubjectName,
    SubjectTeacher,
    SubjectName,
    SubjectTeacher,

    ClassID,
    Location,
    TeacherName,
    LicenceNumber,
    Address,
    TeacherDateOfBirth
)
```

### After 1NF

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID,
    Location,
    TeacherName,
    LicenceNumber,
    Address,
    TeacherDateOfBirth
)
```

and:

```text
STUDENTSUBJECT(
    StudentID,
    SubjectName,
    SubjectTeacher
)
```

The source material gives these same two tables after the 1NF step. fileciteturn0file0L562-L568

---

### What is the primary key of STUDENTSUBJECT?

Data:

| StudentID | SubjectName | SubjectTeacher |
|---|---|---|
| S1276 | Maths | Mr Yee |
| S1276 | History | Miss Wu |
| S1276 | Geography | Mr Khan |
| S1277 | Maths | Mr Yee |

`StudentID` is not enough:

```text
S1276
S1276
S1276
```

`SubjectName` is also not enough:

```text
Maths
Maths
```

But the pair:

```text
(StudentID, SubjectName)
```

is unique.

Therefore:

```text
PK = (StudentID, SubjectName)
```

This is a **composite key**.

In addition:

```text
StudentID
```

is a foreign key referring to:

```text
STUDENT.StudentID
```

The chapter explicitly states this relationship. fileciteturn0file0L562-L568

---

### Understanding 1NF

We have removed:

```text
Subject1
Subject2
Subject3
...
```

and replaced them with:

```text
one subject = one row
```

For example:

```text
S1276 | Maths
S1276 | History
S1276 | Geography
```

This design is much more flexible.

---

### Step 2 — Convert from 1NF → 2NF

Now examine:

```text
STUDENTSUBJECT(
    StudentID,
    SubjectName,
    SubjectTeacher
)
```

Primary key:

```text
(StudentID, SubjectName)
```

Ask:

> Does `SubjectTeacher` depend on the whole composite key?

Suppose:

```text
Maths → Mr Yee
```

Regardless of which Student is involved:

```text
S1276 + Maths → Mr Yee
S1277 + Maths → Mr Yee
S1299 + Maths → Mr Yee
```

We do not actually need `StudentID` to determine the teacher.

We only need:

```text
SubjectName → SubjectTeacher
```

---

### Partial dependency

This is a **partial dependency**.

The attribute:

```text
SubjectTeacher
```

does not depend on:

```text
(StudentID, SubjectName)
```

as a whole. It depends only on **part** of the composite key:

```text
SubjectName
```

The source material describes exactly this problem. fileciteturn0file0L569-L573

---

### The 2NF rule

Within the chapter:

> A database must already be in 1NF, and non-key attributes must depend on the primary key; there must be no partial dependencies. fileciteturn0file0L441-L445

Therefore, we separate:

```text
SUBJECT(
    SubjectName,
    SubjectTeacher
)
```

from the relationship table.

The result is:

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID,
    Location,
    TeacherName,
    LicenceNumber,
    Address,
    TeacherDateOfBirth
)

STUDENTSUBJECT(
    StudentID,
    SubjectName
)

SUBJECT(
    SubjectName,
    SubjectTeacher
)
```

This is the 2NF structure given in the source material. fileciteturn0file0L614-L618

---

### Understanding 2NF through dependency

Before:

```text
(StudentID, SubjectName)
              ↓
        SubjectTeacher
```

but in reality:

```text
SubjectName
     ↓
SubjectTeacher
```

We move that dependency into its own table:

```text
SUBJECT
SubjectName PK
SubjectTeacher
```

Now:

```text
STUDENTSUBJECT
StudentID + SubjectName
```

is used only to state:

> Which Student studies which Subject?

This produces a much cleaner design.

---

### Step 3 — Convert from 2NF → 3NF

The remaining problem is inside:

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID,
    Location,
    TeacherName,
    LicenceNumber,
    Address,
    TeacherDateOfBirth
)
```

Primary key:

```text
StudentID
```

Now examine the dependencies.

### One Student determines one Class

```text
StudentID
    ↓
ClassID
```

But:

```text
ClassID
   ↓
Location
TeacherName
```

For example:

```text
7A → Room 3
7A → Mr Khan
```

Therefore, `Location` and `TeacherName` do not depend directly on the Student.

They depend on:

```text
ClassID
```

The source material identifies exactly this dependency. fileciteturn0file0L624-L629

---

### What about the Teacher details?

We also have:

```text
TeacherName
     ↓
LicenceNumber
Address
TeacherDateOfBirth
```

This creates the chain:

```text
StudentID
   ↓
ClassID
   ↓
Teacher
   ↓
Teacher details
```

Non-key attributes are depending on **another non-key attribute**.

This is what 3NF is intended to remove.

---

### The 3NF rule

The source material describes 3NF as follows:

> The database is in 2NF and all non-key attributes are independent; there are no non-key dependencies. fileciteturn0file0L445-L447

We therefore begin separating the data further.

---

### Step 3.1 — Separate CLASS

From:

```text
StudentID
ClassID
Location
Teacher
```

we create:

```text
CLASS(
    ClassID,
    Location,
    LicenceNumber
)
```

and the Student table keeps only:

```text
ClassID
```

to refer to the Class.

We therefore have:

```text
STUDENT.ClassID
        ↓ FK
CLASS.ClassID
```

---

### Step 3.2 — Separate TEACHER

Initially, we might consider:

```text
TeacherName PK
```

but the chapter identifies a problem:

> Teacher names might not be unique.

The source material therefore suggests using:

```text
LicenceNumber
```

as the Primary Key. fileciteturn0file0L630-L635

We obtain:

```text
TEACHER(
    LicenceNumber PK,
    TeacherName,
    Address,
    TeacherDateOfBirth
)
```

CLASS contains:

```text
LicenceNumber FK
```

Relationship:

```text
TEACHER 1 ───── M CLASS
```

---

### Step 3.3 — Improve SUBJECT

The source material also recognises that:

> Teachers may be both Class Teachers and Subject Teachers.

We should not maintain:

```text
CLASS.TeacherName
```

and:

```text
SUBJECT.SubjectTeacher
```

as two separate representations of Teacher data.

Instead, we should use one table:

```text
TEACHER
```

and let SUBJECT refer to:

```text
LicenceNumber
```

The source material describes the consolidation of teacher information in this way. fileciteturn0file0L630-L635

We obtain:

```text
SUBJECT(
    SubjectName,
    LicenceNumber
)
```

---

## D. Result After Normalisation

Based on Table 8.11, the logical structure is:

```text
STUDENT
--------------------------------
StudentID        PK
FirstName
SecondName
DateOfBirth
ClassID          FK
```

```text
CLASS
--------------------------------
ClassID          PK
Location
LicenceNumber    FK
```

```text
TEACHER
--------------------------------
LicenceNumber    PK
TeacherName
Address
TeacherDateOfBirth
```

```text
STUDENTSUBJECT
--------------------------------
StudentID        PK/FK
SubjectName      PK/FK
```

```text
SUBJECT
--------------------------------
SubjectName      PK
LicenceNumber    FK
```

Table 8.11 on page 206 shows the Student, Teacher, Class, StudentSubject, and Subject tables after the database has been converted to 3NF. fileciteturn0file0L636-L665

### A point to note in the source material itself

On the next page, the text prints:

```text
STUDENT(StudentID, FirstName, SecondName, DateOfBirth,)
```

and then lists the remaining tables. fileciteturn0file0L671-L676

However, **Table 8.11 immediately before this still contains `ClassID` in STUDENT**, and the Student → Class relationship requires `ClassID` as a foreign key. Therefore, the representation in the text appears inconsistent with the preceding table; this inconsistency is not silently treated as authoritative.

---

## E. Understand the Result

### 1. Trace one Student

Take:

```text
S1276
```

### Find the Class

```text
STUDENT
S1276 → ClassID 7A
```

↓

```text
CLASS
7A → Floor 2 Room 3
```

### Find the Class Teacher

```text
CLASS
7A → LicenceNumber 37952
```

↓

```text
TEACHER
37952 → Mr Khan
```

We no longer need to store:

```text
Mr Khan
Room 3
Address
DOB
```

inside each Student record.

---

### 2. Trace a Student's Subjects

```text
STUDENT
S1276
```

↓

```text
STUDENTSUBJECT
S1276 → Maths
S1276 → History
S1276 → Geography
```

↓

```text
SUBJECT
Maths → 35859
History → 72691
Geography → 37952
```

↓

```text
TEACHER
35859 → Mr Yee
72691 → Miss Wu
37952 → Mr Khan
```

The database now has more tables, but each fact is stored in a more appropriate place.

---

### 3. Why does normalisation reduce anomalies?

### Update anomaly

Before normalisation:

```text
Mr Khan address
```

appears in many Student rows.

If the address changes:

```text
many rows must be UPDATED
```

After 3NF:

```text
TEACHER
37952 | Mr Khan | New Address
```

only one place needs to be updated.

---

### Insertion anomaly

Before normalisation:

Suppose we want to create Class `8A` before any Student belongs to it.

If Class data exists only inside Student rows, the Class is difficult to store independently.

After normalisation:

```text
CLASS
8A | Room 10 | T005
```

can exist on its own.

---

### Deletion anomaly

Before normalisation:

If the final Student in `7B` is deleted, we may also lose:

```text
7B
Room 4
Miss Malik
```

After 3NF:

```text
CLASS
7B | Room 4 | ...
```

still exists.

These three anomalies show clearly **why normalisation is useful**.

---

### 4. A quick way to recognise 1NF / 2NF / 3NF

Do not begin by memorising definitions. Ask these questions in order:

```text
Question 1:
Are there repeating groups?
        ↓
Yes → not yet in 1NF
```

```text
Question 2:
Is the PK composite?

If yes:
does any non-key attribute depend on
only part of the composite key?
        ↓
Yes → not yet in 2NF
```

```text
Question 3:
Does a non-key attribute depend
on another non-key attribute?
        ↓
Yes → not yet in 3NF
```

This is a useful checking process in examination questions.

---

## F. Apply It Yourself

Now complete a short task similar to **Activity 8D** in the source material. No answer is provided yet.

Given:

```text
EMPLOYEE(
    EmployeeNumber,
    EmployeeName,
    Position,
    ContactNumber,
    ContactName,
    ContactEmail
)
```

Data:

```text
7001 | James Tey | Financial Director |
28 | Mary Jones | mary@xyz.com

7001 | James Tey | Financial Director |
31 | James Smith | james@pqr.com

7002 | Paul Leigh | Accountant |
19 | Mary Cheung | mch@abc.com
```

The source material uses this Employee database as a normalisation exercise. fileciteturn0file0L687-L713

### Complete these four steps

```text
1. Why is this table not yet in 1NF?

2. After converting it to 1NF, which tables are needed?

3. The dependency:
ContactNumber → ContactName, ContactEmail
causes what problem?

4. Produce the final design in 3NF.
```

Write the result in this format:

```text
TABLE_NAME(
    PrimaryKey,
    Attribute,
    ForeignKey
)
```

and mark:

```text
PK
FK
```

---

### Check Your Understanding

Finally, answer these three short questions:

**1.** Why does `SubjectTeacher` mean that `STUDENTSUBJECT` is not yet in 2NF?

**2.** Why should `Location` not be stored in `STUDENT`?

**3.** What is the most important difference between **2NF** and **3NF**?

---

## Module 4 — Consolidation

At this point, the School Database has gone through the complete sequence:

```text
raw data
   ↓
repeating groups
   ↓
1NF
   ↓
partial dependency
   ↓
2NF
   ↓
non-key dependency
   ↓
3NF
```

This provides the foundation for **Module 5 — Database Management Systems (DBMS)**. Instead of asking *“How should the database be designed?”*, we will now ask *“What does the DBMS actually do to manage the structure, metadata, security, queries, and backups of this database?”*

---
