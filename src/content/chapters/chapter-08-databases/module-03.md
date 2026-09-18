# Module 3 — Relationships, Cardinality, and E-R Diagrams

## A. Learning Objectives

At this point, we already have:

```text
STUDENT(
    StudentID PK,
    FirstName,
    SecondName,
    DateOfBirth,
    ClassID FK
)

CLASS(
    ClassID PK,
    Location,
    LicenceNumber FK
)

TEACHER(
    LicenceNumber PK,
    TeacherName,
    Address,
    DateOfBirth
)
```

However, simply looking at the tables does not clearly answer:

- how many Students can belong to one Class?
- how many Classes can one Student belong to?
- how many Classes can one Teacher be responsible for?
- is a relationship mandatory or optional?

This is the role of **relationships**, **cardinality**, and **E-R diagrams**.

The source material begins this section with four forms of relationship: `1:1`, `1:m`, `m:1`, and `m:m`. fileciteturn0file0L331-L335

---

## B. Theory Needed Now

### 1. How is a relationship created?

In a relational database, a relationship exists when one table contains a **foreign key** that refers to the **primary key** of another table. fileciteturn0file0L305-L309

Example:

```text
STUDENT
StudentID   ClassID
S1276       7A
S1277       7B
S2199       7A
               │
               │ FK
               ▼
CLASS
ClassID
7A
7B
7C
```

We have:

```text
STUDENT.ClassID → CLASS.ClassID
```

Therefore, `STUDENT` and `CLASS` are related.

---

### 2. What is cardinality?

Cardinality answers the question:

> How many instances of entity B can be related to one instance of entity A?

The basic forms used in this chapter are:

```text
1 : 1
1 : many
many : 1
many : many
```

The source material calls them:

- one-to-one
- one-to-many
- many-to-one
- many-to-many. fileciteturn0file0L331-L335

---

### 3. Student ↔ Class: 1:M or M:1?

This is very easy to confuse.

Data:

```text
STUDENT
S1276 → 7A
S2199 → 7A
S1277 → 7B
```

One class:

```text
7A
```

can contain:

```text
S1276
S2199
...
```

many students.

Therefore, viewed from:

```text
CLASS → STUDENT
```

the relationship is:

```text
1 : M
```

or:

> One Class has many Students.

But viewed in the opposite direction:

```text
STUDENT → CLASS
```

many Students may point to the same Class:

```text
M : 1
```

The source material describes Student–Class as **many-to-one**, because one `ClassID` can appear many times in the Student table but only once in the Class table. fileciteturn0file0L343-L345

These two descriptions are **not contradictory**:

```text
CLASS ──1────M── STUDENT

Class → Student = 1:M
Student → Class = M:1
```

---

### 4. One-to-one — 1:1

A simple example is:

```text
PERSON ──1────1── PASSPORT
```

Suppose the system specifies that:

- each Person can have at most one Passport;
- each Passport belongs to exactly one Person.

Then the relationship is:

```text
1 : 1
```

In a database, one table would normally contain a foreign key referring to the other table, and that foreign key would need an appropriate restriction so that several records could not all point to the same record.

At the level of this chapter, the important skill is to **identify the cardinality**; we do not need to study constraint implementation in depth yet.

---

### 5. One-to-many — 1:M

The School database gives us a very clear example:

```text
CLASS ──1────M── STUDENT
```

One Class:

```text
7A
```

can contain many Students.

However, each Student in the current model contains only one:

```text
ClassID
```

so each Student belongs to one Class.

We can trace this as:

```text
CLASS 7A
   │
   ├── S1276 Noor
   ├── S2199 Tahir
   └── ...
```

---

### 6. Many-to-many — M:N

Now consider:

```text
STUDENT
```

and:

```text
SUBJECT
```

One Student may study:

```text
Maths
History
Geography
```

A Subject such as Maths may be studied by:

```text
S1276
S1277
S1299
...
```

Therefore:

```text
STUDENT ──M────M── SUBJECT
```

which is often written as:

```text
M : N
```

### But how does a relational database handle M:N?

We do not store the relationship directly using:

```text
Student.Subject1
Student.Subject2
Student.Subject3
```

Instead, we use an intermediate table:

```text
STUDENT_SUBJECT
StudentID | SubjectName
S1276     | Maths
S1276     | History
S1277     | Maths
```

The result is:

```text
STUDENT
   1
   │
   M
STUDENT_SUBJECT
   M
   │
   1
SUBJECT
```

So an M:N relationship is converted into two 1:M relationships.

This is also the structure used later in the chapter during normalisation. fileciteturn0file0L562-L568

---

### 7. Mandatory and Optional Relationships

Cardinality does not tell us only `one` or `many`.

We also need to know:

```text
minimum = 0 or 1?
```

The source material gives the following example:

- an Employee has one Desk;
- however, a Desk may not yet have been allocated to an Employee.

Therefore, for the Desk ↔ Employee relationship, one side can be **zero or one**, meaning the relationship is optional. fileciteturn0file0L369-L375

The source material lists these cardinalities:

```text
one
many
one and only one
zero or one
one or many
zero or many
```

fileciteturn0file0L374-L383

They can be understood using `min..max` notation:

| Cardinality | Min..Max |
|---|---|
| exactly one | `1..1` |
| zero or one | `0..1` |
| one or many | `1..*` |
| zero or many | `0..*` |

---

### 8. Do not look only at “1:M” — ask for the minimum and maximum

Consider the School database question:

> How many Students can a Class have?

There are two possible designs.

### Design A

A Class must have at least one Student:

```text
CLASS → STUDENT
1..*
```

### Design B

A Class may be created before any Students have been assigned to it:

```text
CLASS → STUDENT
0..*
```

Both are **one-to-many** at the general level.

However, their minimum cardinalities differ:

```text
A: 1..*
B: 0..*
```

This is why business rules are important.

---

### 9. What is an E-R Diagram used for?

The source material defines an E-R diagram as a visual way to document a database design and show the relationships between entities. fileciteturn0file0L350-L368

Figure 8.3 on page 202 represents:

```text
STUDENT
----------------
StudentID
FirstName
SecondName
DateOfBirth
ClassID

          many
            │
            │
            │
           one

CLASS
----------------
ClassID
TeacherName
Location
```

The meaning is:

```text
one class has many students
```

This is the diagram that we will now extend.

---

## C. Predict and Perform

### Step 1 — Identify Student ↔ Class

Business rule:

> Each student belongs to one class.  
> One class can contain many students.

We write:

```text
CLASS ─── 1 : M ─── STUDENT
```

Foreign key:

```text
STUDENT.ClassID
        ↓
CLASS.ClassID
```

The important point is:

**The foreign key is on the many side.**

```text
CLASS       STUDENT
 1             M
               │
               └── ClassID FK
```

This is an extremely important pattern.

---

### Step 2 — Class ↔ Teacher

According to Activity 8B in the source material:

> A teacher can have more than one class.

The source material asks us to add a `Teacher` table and modify the Class table accordingly. fileciteturn0file0L389-L398

We have:

```text
TEACHER
LicenceNumber PK
TeacherName
DateOfBirth
Address
```

and:

```text
CLASS
ClassID PK
Location
LicenceNumber FK
```

Relationship:

```text
TEACHER ─── 1 : M ─── CLASS
```

One Teacher:

```text
T001 Mr Khan
```

may be responsible for:

```text
7A
7C
8A
```

However, one Class in this design has one teacher.

---

### Step 3 — Student ↔ Subject

Business rules:

```text
One Student can study many Subjects.
One Subject can be studied by many Students.
```

Therefore:

```text
STUDENT ─── M : N ─── SUBJECT
```

We resolve this using an associative table:

```text
STUDENT
StudentID PK

        1
        │
        M

STUDENT_SUBJECT
StudentID PK/FK
SubjectName PK/FK

        M
        │
        1

SUBJECT
SubjectName PK
```

Composite key:

```text
(StudentID, SubjectName)
```

If this pair is the primary key, the same student cannot be recorded for the same subject twice.

---

### Step 4 — Combine the current E-R model

We now have:

```text
                 TEACHER
             ┌───────────────┐
             │ LicenceNumber │ PK
             │ TeacherName   │
             │ Address       │
             └───────┬───────┘
                     │ 1
                     │
                     │ M
                 ┌───▼─────────┐
                 │    CLASS    │
                 │ ClassID PK  │
                 │ Location    │
                 │ LicenceNo FK│
                 └──────┬──────┘
                        │ 1
                        │
                        │ M
                 ┌──────▼──────┐
                 │   STUDENT   │
                 │ StudentID PK│
                 │ FirstName   │
                 │ SecondName  │
                 │ ClassID FK  │
                 └──────┬──────┘
                        │ 1
                        │
                        │ M
                ┌───────▼─────────┐
                │ STUDENT_SUBJECT │
                │ StudentID PK/FK │
                │ SubjectName PK/FK
                └───────┬─────────┘
                        │ M
                        │
                        │ 1
                   ┌────▼─────┐
                   │ SUBJECT  │
                   │ Subject  │ PK
                   └──────────┘
```

This is not yet the final database for the chapter. During **normalisation**, the Teacher/Subject structure will be improved further.

---

## D. Understand the Result

### 1. Why is the FK usually placed on the many side?

Relationship:

```text
TEACHER 1 ───── M CLASS
```

If one Teacher manages many Classes, we do not want a Teacher table like:

```text
TeacherID | Class1 | Class2 | Class3 | ...
```

Instead:

```text
CLASS
7A | T001
7B | T002
7C | T001
```

Teacher `T001` appears as a foreign key in several rows.

```text
T001 ─────→ 7A
   └──────→ 7C
```

Therefore:

```text
1-side PK
   ↓
referenced by
   ↓
M-side FK
```

---

### 2. Trace the relationship instead of memorising it

Given:

```text
CLASS
ClassID | LicenceNumber
7A      | T001
7B      | T002
7C      | T001
```

Question:

> How many Classes does T001 have?

Trace:

```text
T001
 ↓
7A
7C
```

→ many.

Question:

> How many Teachers does 7A have?

The record for 7A contains only:

```text
LicenceNumber = T001
```

→ one.

Therefore:

```text
TEACHER → CLASS = 1:M
```

---

### 3. A common reasoning error

Suppose you see:

```text
StudentID
```

appearing several times in `STUDENT_SUBJECT`, and then conclude:

> StudentID cannot be a key.

That conclusion is incorrect.

In:

```text
STUDENT
```

`StudentID` is the **Primary Key**.

In:

```text
STUDENT_SUBJECT
```

`StudentID` is a **Foreign Key** and also **part of the Composite Primary Key**.

The same attribute name can play different roles in different tables.

---

## E. Apply It Yourself

Complete part of the E-R design yourself before moving on to normalisation.

### Task 1 — Determine the cardinality

Given these business rules:

```text
1. One Teacher may be responsible for many Classes.
2. Each Class has exactly one Teacher.
3. One Class has many Students.
4. Each Student belongs to exactly one Class.
5. One Student may study many Subjects.
6. One Subject may be studied by many Students.
```

Complete:

```text
TEACHER : CLASS
? : ?

CLASS : STUDENT
? : ?

STUDENT : SUBJECT
? : ?
```

---

### Task 2 — Find the foreign keys

Given:

```text
TEACHER 1:M CLASS
CLASS   1:M STUDENT
```

Identify:

```text
FK of CLASS = ?

FK of STUDENT = ?
```

and state which primary key each one references.

---

### Task 3 — Optional case

The School allows a new Class to be created before any students have enrolled in it.

Choose:

```text
Class → Student

A. 1..1
B. 0..1
C. 1..*
D. 0..*
```

and briefly explain why.

---

### Task 4 — Identify a design problem

A student designs:

```text
STUDENT(
    StudentID,
    FirstName,
    Subject1,
    Subject2,
    Subject3
)
```

to represent the Student–Subject relationship.

Explain:

1. why this is a poor design when different students study different numbers of subjects;
2. what structure should be used instead.

You do not need to use the term `1NF` yet if you do not want to; reasoning from the relationship is enough.

---

## Module 3 — Consolidation

At this point, the Big Problem has progressed through:

```text
Entity
↓
Attributes
↓
Keys
↓
Relationships
↓
Cardinality
↓
E-R model
```

The source material next moves to **Section 8.1.5 – The normalisation process**. This is one of the most important parts of Chapter 8: a large School table that creates redundancy and update problems will be transformed step by step:

```text
Unnormalised
      ↓
     1NF
      ↓
     2NF
      ↓
     3NF
```

and for the first time we will use the concepts **repeating group, composite key, partial dependency, and non-key dependency** in a complete process. fileciteturn0file0L403-L447

---
