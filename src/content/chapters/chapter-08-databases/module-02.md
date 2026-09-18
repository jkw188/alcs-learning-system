# Module 2 — Building the Relational Model: Entity, Attribute, Tuple, and Keys

## A. Learning Objectives

In Module 1, we learned why a system should move from several separate files to a shared database.

Now we begin to **design the actual data structure** for the School Database.

In this module, we need to answer:

> If we want to store Student, Class, Teacher, and similar data in a relational database, how should each type of data be represented, and how does the database know that a record is unique or that tables are related?

By the end of this module, you should understand and be able to use:

- `Entity`
- `Attribute`
- `Tuple`
- `Table / Record / Field`
- `Candidate key`
- `Primary key`
- `Secondary key`
- `Foreign key`
- `Composite key`
- `Referential integrity`
- `Index`

These terms are introduced directly in Section 8.1.3 of the source material. fileciteturn0file0L217-L227

---

## B. Theory Needed Now

### 1. From the real world → a relational database

Suppose we have one student:

```text
Student:
Student ID: S1276
First Name: Noor
Second Name: Baig
Date of Birth: 2009-09-22
Class ID: 7A
```

In relational-database terms:

```text
Entity type: STUDENT

Attributes:
- StudentID
- FirstName
- SecondName
- DateOfBirth
- ClassID
```

One particular student:

```text
S1276 | Noor | Baig | 2009-09-22 | 7A
```

is a **tuple**.

The source material defines:

- **Entity**: anything about which data can be stored, for example a person, place, event, or object.
- **Attribute**: an individual data item belonging to an entity.
- **Tuple**: one instance of an entity, represented by a row. fileciteturn0file0L240-L252

We can visualise this as:

```text
Real world
    ↓
Entity
STUDENT
    ↓
Attributes
StudentID, FirstName, SecondName, DateOfBirth, ClassID
    ↓
Tuples
S1276, Noor, Baig, ...
S1277, Ahmed, Sayed, ...
```

---

### 2. Are Table, Record, and Field different from Entity, Tuple, and Attribute?

In this chapter, these terms are closely related:

| General term | Relational terminology |
|---|---|
| Table | contains instances of an entity |
| Record / row | Tuple |
| Field / column | Attribute |

Example from the source material:

| StudentID | FirstName | SecondName | DateOfBirth | ClassID |
|---|---|---|---|---|
| S1276 | Noor | Baig | ... | 7A |
| S1277 | Ahmed | Sayed | ... | 7B |

Here:

```text
STUDENT         → entity/table

StudentID       → attribute/field/column

S1276 | Noor... → tuple/record/row
```

The source material illustrates this mapping directly: row → record and column → field in the Student table. fileciteturn0file0L220-L234

### A common point of confusion

You should not say:

> `S1276` is a tuple.

That is incorrect because `S1276` is only **one attribute value**.

The whole row:

```text
S1276 | Noor | Baig | 2009-09-22 | 7A
```

is the tuple.

---

### 3. The next problem: how do we identify one tuple uniquely?

Suppose we have this table:

| FirstName | SecondName | ClassID |
|---|---|---|
| Minh | Nguyen | 7A |
| Minh | Nguyen | 7B |

If we use:

```text
FirstName = "Minh"
```

we do not know which person is meant.

If we use:

```text
FirstName + SecondName
```

there may still be duplicates.

Therefore, a relational database needs **keys**.

---

### 4. Candidate key

According to the source material:

> A candidate key is an attribute or **smallest set of attributes** for which no two tuples have the same value. fileciteturn0file0L265-L272

Suppose:

| StudentID | Email | FirstName |
|---|---|---|
| S001 | a@school.com | An |
| S002 | b@school.com | An |
| S003 | c@school.com | Minh |

If both `StudentID` and `Email` are guaranteed to be unique, then:

```text
Candidate keys:
StudentID
Email
```

Both can uniquely identify one student.

### Why is it called a "candidate" key?

Because these values are **candidates** for selection as the Primary Key.

```text
Candidate keys
      ↓ choose one
Primary key
```

---

### 5. Primary key

A **primary key** is the candidate key chosen to act as the main unique identifier for a table. fileciteturn0file0L265-L270

Example:

```text
STUDENT
-----------------------------------------------
StudentID | FirstName | SecondName | ClassID
-----------------------------------------------
S1276     | Noor      | Baig       | 7A
S1277     | Ahmed     | Sayed      | 7B
S2199     | Tahir     | Hassan     | 7A
```

We choose:

```text
PK = StudentID
```

because:

```text
S1276 → exactly one student
S1277 → exactly one student
S2199 → exactly one student
```

The source material also adds `StudentID` to the Student table so that every student has a unique value. fileciteturn0file0L295-L304

---

### 6. Secondary key

Using the terminology of this chapter:

> A **secondary key** is a candidate key that is not selected as the primary key. fileciteturn0file0L265-L277

The source material uses chemical elements as an example:

```text
Symbol | Name       | AtomicWeight
H      | Hydrogen   | 1.008
Li     | Lithium    | 6.94
Na     | Sodium     | 22.990
```

In that example, all three attributes are treated as unique, so all three are candidate keys.

If we choose:

```text
Primary Key = Symbol
```

then:

```text
Secondary Keys:
Name
AtomicWeight
```

using the terminology of the source material. fileciteturn0file0L273-L287

---

### 7. Foreign key — the key used to connect tables

Now we have two entities.

#### STUDENT

| StudentID | FirstName | ClassID |
|---|---|---|
| S1276 | Noor | 7A |
| S1277 | Ahmed | 7B |
| S2199 | Tahir | 7A |

#### CLASS

| ClassID | TeacherName | Location |
|---|---|---|
| 7A | Mr Khan | Room 3 |
| 7B | Miss Malik | Room 4 |
| 7C | Miss Gill | Room 5 |

In `CLASS`:

```text
ClassID = Primary Key
```

In `STUDENT`:

```text
ClassID = Foreign Key
```

We therefore have:

```text
STUDENT.ClassID
        |
        └──────────→ CLASS.ClassID
                       Primary Key
```

A **foreign key** is an attribute or set of attributes in one table that refers to the primary key in another table. fileciteturn0file0L305-L314

This is the mechanism used to create a relationship.

---

### 8. Referential integrity

Suppose `CLASS` contains only:

```text
7A
7B
7C
```

Now we add a student:

```text
S3000 | Lan | 9Z
```

But:

```text
9Z ∉ CLASS.ClassID
```

We are claiming:

> Lan belongs to class `9Z`

but class `9Z` does not exist.

This violates **referential integrity**.

According to the source material:

> A database must not contain a foreign-key value that does not match the corresponding primary key. fileciteturn0file0L305-L309

A useful way to remember this is:

```text
Foreign Key value
       ↓
must be found in
       ↓
corresponding Primary Key
```

Valid example:

```text
Student.ClassID = 7A
                  ↓
Class.ClassID   = 7A ✓
```

Invalid example:

```text
Student.ClassID = 9Z
                  ↓
Class.ClassID   = ??? ✗
```

---

### 9. Composite key

A single attribute is not always enough to be unique.

This becomes especially important when we study normalisation.

Suppose we have:

```text
STUDENT_SUBJECT
```

| StudentID | SubjectName |
|---|---|
| S1276 | Maths |
| S1276 | History |
| S1277 | Maths |

`StudentID` is not unique:

```text
S1276
S1276
```

`SubjectName` is also not unique:

```text
Maths
Maths
```

However:

```text
(StudentID, SubjectName)
```

is unique.

Therefore, we use:

```text
PK = (StudentID, SubjectName)
```

This is a **composite key** — a set of attributes that together form the primary key.

The source material uses this exact composite key when the School database is converted to 1NF. fileciteturn0file0L562-L568

---

## C. Predict and Perform

Now we begin to build the School database.

### Step 1 — Identify the entities

At present, we have the following data:

```text
Student ID: S1276
First Name: Noor
Second Name: Baig
Date of Birth: 2009-09-22

Class ID: 7A
Teacher Name: Mr Khan
Location: Floor 2 Room 3
```

If we put everything into:

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID,
    TeacherName,
    Location
)
```

there is a problem.

For example:

```text
S1276 | Noor  | Baig   | 7A | Mr Khan | Room 3
S2199 | Tahir | Hassan | 7A | Mr Khan | Room 3
```

`Mr Khan` and `Room 3` are repeated because both students belong to class 7A.

We have not yet studied normalisation in full, so we are **not yet solving this with 1NF/2NF/3NF**.

However, at the conceptual-design level, we can already recognise two entities:

```text
STUDENT
CLASS
```

---

### Step 2 — Create the relational representation

We design:

```text
STUDENT(
    StudentID,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID
)
```

and:

```text
CLASS(
    ClassID,
    TeacherName,
    Location
)
```

where:

```text
STUDENT.StudentID
    PK

CLASS.ClassID
    PK

STUDENT.ClassID
    FK → CLASS.ClassID
```

Data:

```text
STUDENT
----------------------------------------------------
StudentID | FirstName | SecondName | DOB        | ClassID
S1276     | Noor      | Baig       | 2009-09-22 | 7A
S1277     | Ahmed     | Sayed      | 2010-06-11 | 7B
S2199     | Tahir     | Hassan     | 2011-01-30 | 7A
```

```text
CLASS
----------------------------------------
ClassID | TeacherName | Location
7A      | Mr Khan     | Floor 2 Room 3
7B      | Miss Malik  | Floor 2 Room 4
7C      | Miss Gill   | Floor 2 Room 5
```

This is also the Student/Class structure used in the source material to introduce foreign keys. fileciteturn0file0L310-L330

---

## D. Understand the Result

Trace one tuple:

```text
StudentID = S2199
```

We find:

```text
STUDENT
S2199 | Tahir | Hassan | ... | 7A
                              ↓
                           ClassID
                              ↓
CLASS
7A | Mr Khan | Floor 2 Room 3
```

From one student, the database can find the corresponding class without copying:

```text
Mr Khan
Floor 2 Room 3
```

into every Student record.

This is one of the most important ideas in a relational database:

```text
Do not duplicate all related data

          ↓

store an identifier

          ↓

use a key to create the relationship
```

---

### An important counterexample

If STUDENT contains:

```text
S5000 | Mai | ... | 8X
```

but CLASS contains only:

```text
7A
7B
7C
```

then:

```text
8X
 ↓
no matching CLASS can be found
```

→ **referential integrity violation**.

---

### 10. Index — do not confuse it with a key

The chapter also introduces the **index**.

An index is a data structure built from one or more columns in order to **speed up searching**. fileciteturn0file0L343-L349

For example, suppose we frequently need to produce a list:

```text
Class 7A
    ↓
sort by SecondName
    ↓
sort by FirstName
```

We could create an index using:

```text
ClassID
SecondName
FirstName
```

The key distinction is:

```text
Primary/Foreign Key
→ identifies or links data

Index
→ speeds up searching
```

You should not conclude:

> An index is simply a primary key.

The two concepts have different purposes within the scope of this chapter.

---

## E. Apply It Yourself

Extend the School Database by adding the entity:

```text
TEACHER
```

Data:

| LicenceNumber | TeacherName | DateOfBirth |
|---|---|---|
| T001 | Mr Khan | 1985-03-27 |
| T002 | Miss Malik | 1988-12-14 |
| T003 | Miss Gill | 1987-07-21 |

And CLASS:

| ClassID | LicenceNumber | Location |
|---|---|---|
| 7A | T001 | Room 3 |
| 7B | T002 | Room 4 |
| 7C | T003 | Room 5 |

### Task 1

Complete:

```text
TEACHER
Primary Key = ?

CLASS
Primary Key = ?
Foreign Key = ?
Foreign Key references = ?
```

### Task 2

Consider the record:

```text
CLASS
8A | T999 | Room 10
```

but `TEACHER` does not contain `T999`.

Answer:

```text
Which concept does this record violate?

Why?
```

### Task 3 — Composite key

Given:

```text
STUDENT_SUBJECT

StudentID | SubjectName
S1276     | Maths
S1276     | History
S1277     | Maths
```

Answer:

```text
Can StudentID be the PK on its own?

Can SubjectName be the PK on its own?

What would be a suitable composite PK?
```

### Task 4 — Check your understanding

Explain in your own words:

> **How do a primary key and a foreign key differ in purpose?**

A short answer of about 1–2 sentences is sufficient.

---

## Module 2 — Consolidation

After this step, the School Database has progressed from:

```text
raw data
```

to:

```text
Entity
   ↓
Table
   ↓
Attributes
   ↓
Tuples
   ↓
Primary Keys
   ↓
Foreign Keys
   ↓
Relationships
```

The next question is:

> **Are Student–Class–Teacher relationships actually 1:1, 1:M, or M:N, and where should cardinality symbols be placed on an E-R diagram?**

---
