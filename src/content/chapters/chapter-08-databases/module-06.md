# Module 6 — SQL DDL: Turning the Design into a Real Database

In Module 4, we produced a **logical database design**. Module 5 showed how a DBMS manages that database. We now make the transition:

```text
Database design
      ↓
SQL DDL
      ↓
Actual database structure
```

**DDL — Data Definition Language** is used to create, modify, and remove the structures that form a relational database, while DML works with the data stored inside those structures.

## A. Learning Objectives

In this module, we do not yet focus on `SELECT`, `INSERT`, `UPDATE`, or `DELETE`. These belong to Module 7.

We focus only on this question:

> How can we turn the School Database we designed into tables, columns, primary keys, and foreign keys using SQL?

By the end of this module, you should be able to use and explain:

```text
CREATE DATABASE
CREATE TABLE
ALTER TABLE
PRIMARY KEY
FOREIGN KEY ... REFERENCES ...
```

These are the DDL commands required by the chapter.

---

## B. Theory Needed Now

### 1. DDL works with structure

Suppose the database contains no data yet, but we create:

```sql
CREATE TABLE Student (
    StudentID VARCHAR(10),
    FirstName VARCHAR(50)
);
```

No Student has been added yet.

However, the database already knows:

```text
Table: Student

Columns:
- StudentID
- FirstName
```

This means DDL creates the **structure**, not the records.

A useful distinction is:

```text
DDL = structure

DML = data
```

DDL works with the relational database structure, while DML works with the data stored in the database.

---

### 2. Data types

The chapter requires knowledge of the following data types:

| Data type | Meaning |
|---|---|
| `CHARACTER` | fixed-length text |
| `VARCHAR(n)` | variable-length text |
| `BOOLEAN` | True/False |
| `INTEGER` | whole number |
| `REAL` | decimal number |
| `DATE` | date |
| `TIME` | time |

For example, in the School Database:

```text
StudentID      → text
FirstName      → text
SecondName     → text
DateOfBirth    → DATE
ClassID        → text
```

### How do CHARACTER and VARCHAR differ?

If we declare:

```sql
CHARACTER(5)
```

we are using fixed-length text.

By contrast:

```sql
VARCHAR(50)
```

stores variable-length text up to a maximum of 50 characters.

For example, names such as:

```text
An
Nguyen
Christopher
```

have different lengths, so `VARCHAR` is often more appropriate in an implementation.

The chapter describes `CHARACTER` as fixed length and `VARCHAR(n)` as variable length.

---

## C. Predict and Perform

We will not create all five tables at once. First, we build only:

```text
CLASS
STUDENT
```

so that we can understand the full PK → FK process.

### Step 1 — Design before writing code

From the previous modules:

```text
CLASS
----------------
ClassID        PK
Location
LicenceNumber
```

and:

```text
STUDENT
----------------
StudentID      PK
FirstName
SecondName
DateOfBirth
ClassID        FK
```

Relationship:

```text
CLASS 1 ───── M STUDENT
```

and:

```text
STUDENT.ClassID
        ↓
CLASS.ClassID
```

Before writing SQL, notice the dependency:

> `CLASS` must exist before we create a foreign key from `STUDENT` to it.

---

### Step 2 — CREATE DATABASE

Create the database:

```sql
CREATE DATABASE School;
```

`CREATE DATABASE` creates a database.

Then, in a DBMS such as MySQL, we select the database:

```sql
USE School;
```

> **Implementation note:** `USE School;` is MySQL-specific setup used here so that the practical example can run in a concrete DBMS environment.

SQL syntax can differ slightly between DBMSs.

---

### Step 3 — CREATE TABLE Class

Create the parent table first:

```sql
CREATE TABLE Class (
    ClassID VARCHAR(10),
    Location VARCHAR(100),
    LicenceNumber VARCHAR(20)
);
```

The table now has columns but no primary key yet.

Add one:

```sql
ALTER TABLE Class
ADD PRIMARY KEY (ClassID);
```

The flow is:

```text
CREATE TABLE
    ↓
table structure is created

ALTER TABLE
    ↓
structure is changed

PRIMARY KEY
    ↓
ClassID becomes the unique identifier
```

The chapter also illustrates creating `Class` and then adding the primary key using `ALTER TABLE`.

---

### Why is ClassID the Primary Key?

For example:

```text
7A
7B
7C
```

each value represents exactly one Class.

We do not automatically choose:

```text
Location
```

because the requirements do not guarantee that two classes could never use the same location at different times.

A primary key should come from the data design and requirements, not simply from choosing a column that happens to look different.

---

### Step 4 — CREATE TABLE Student

Next:

```sql
CREATE TABLE Student (
    StudentID VARCHAR(10),
    FirstName VARCHAR(50),
    SecondName VARCHAR(50),
    DateOfBirth DATE,
    ClassID VARCHAR(10)
);
```

Then:

```sql
ALTER TABLE Student
ADD PRIMARY KEY (StudentID);
```

We now have:

```text
STUDENT

StudentID    PK
FirstName
SecondName
DateOfBirth
ClassID
```

but `ClassID` is still only an ordinary column.

The relationship has not yet been enforced.

---

### Step 5 — Add the Foreign Key

We want:

```text
Student.ClassID
       ↓
Class.ClassID
```

so we add the constraint:

```sql
ALTER TABLE Student
ADD FOREIGN KEY (ClassID)
REFERENCES Class(ClassID);
```

The DBMS now knows:

```text
Student.ClassID = foreign key
Class.ClassID   = referenced primary key
```

The chapter also uses `FOREIGN KEY ... REFERENCES ...` to link Student to Class.

---

### Step 6 — Review the complete code so far

This is the **complete code for the current step**, not yet the entire School Database:

```sql
CREATE DATABASE School;

USE School;

CREATE TABLE Class (
    ClassID VARCHAR(10),
    Location VARCHAR(100),
    LicenceNumber VARCHAR(20)
);

ALTER TABLE Class
ADD PRIMARY KEY (ClassID);

CREATE TABLE Student (
    StudentID VARCHAR(10),
    FirstName VARCHAR(50),
    SecondName VARCHAR(50),
    DateOfBirth DATE,
    ClassID VARCHAR(10)
);

ALTER TABLE Student
ADD PRIMARY KEY (StudentID);

ALTER TABLE Student
ADD FOREIGN KEY (ClassID)
REFERENCES Class(ClassID);
```

If MySQL is used, this form is more suitable for practical execution while remaining aligned with the chapter's syntax.

---

## D. Understand the Result

### 1. Trace a CREATE TABLE statement

Consider:

```sql
CREATE TABLE Student (
    StudentID VARCHAR(10),
    FirstName VARCHAR(50),
    DateOfBirth DATE
);
```

A simplified view of the DBMS processing is:

```text
DDL statement
      ↓
DDL interpreter
      ↓
create table structure
      ↓
update Data Dictionary
```

Module 5 established that DDL statements are processed by the DDL interpreter and the structure is recorded in the data dictionary.

The data dictionary may now contain information such as:

```text
Student
 ├─ StudentID : VARCHAR
 ├─ FirstName : VARCHAR
 └─ DateOfBirth : DATE
```

No Student records need to exist yet.

---

### 2. How do CREATE TABLE and ALTER TABLE differ?

```sql
CREATE TABLE Student (...)
```

→ creates a new table.

By contrast:

```sql
ALTER TABLE Student ...
```

→ changes the definition of an existing table.

The chapter defines them as:

```text
CREATE TABLE → creates a table definition
ALTER TABLE  → changes the definition of a table
```

---

### 3. Primary Key and Foreign Key perform different jobs

```sql
PRIMARY KEY (StudentID)
```

answers:

> How do we identify one Student uniquely?

Whereas:

```sql
FOREIGN KEY (ClassID)
REFERENCES Class(ClassID)
```

answers:

> Which Class is this Student related to?

Therefore:

```text
PK → identity

FK → relationship
```

---

### 4. Referential integrity is now enforced by the DBMS

Suppose the Class table contains:

```text
7A
7B
7C
```

Later, if we try to add a Student with:

```text
S5000 → ClassID 9Z
```

but:

```text
9Z
```

does not exist in Class, the foreign-key constraint can prevent that invalid data from being stored.

This is the same **referential integrity** concept from Module 2: foreign-key values must correspond to primary-key values in the referenced table.

---

### 5. Why does table-creation order matter?

If we run:

```sql
ALTER TABLE Student
ADD FOREIGN KEY (ClassID)
REFERENCES Class(ClassID);
```

before `Class` exists, the DBMS has no target for the foreign key to reference.

Therefore, a sensible order is:

```text
1. CREATE Class
2. create the Class PK

3. CREATE Student
4. create the Student PK

5. Student FK → Class PK
```

This is why the foreign key is added only after the Class table has been created.

---

### 6. Practical SQL naming and syntax

Avoid identifiers with spaces and obvious spelling errors in executable SQL. For example, instead of:

```text
Licence Number CHRACTER
```

use:

```sql
LicenceNumber VARCHAR(20)
```

> **Implementation note:** the practical version uses valid, portable identifiers so that the SQL can run without special quoting.

---

## E. Apply It Yourself — Add TEACHER to the School Database

Now create the `Teacher` table and add `LicenceNumber` as a foreign key in `Class`.

Use this design:

```text
TEACHER
----------------------
LicenceNumber     PK
TeacherName
Address
TeacherDateOfBirth
```

and:

```text
CLASS
----------------------
ClassID           PK
Location
LicenceNumber     FK
```

Complete the following code:

```sql
CREATE TABLE Teacher (
    LicenceNumber VARCHAR(20),
    TeacherName VARCHAR(100),
    Address VARCHAR(200),
    TeacherDateOfBirth DATE
);

-- TODO 1:
-- add LicenceNumber as the Primary Key of Teacher

-- TODO 2:
-- add a Foreign Key from Class.LicenceNumber
-- to Teacher.LicenceNumber
```

Completion criteria:

```text
Teacher.LicenceNumber = PK

Class.LicenceNumber = FK

Class.LicenceNumber
        ↓
Teacher.LicenceNumber
```

Then answer these three questions:

**1.** If `Teacher` does not yet exist but `Class` already has a `LicenceNumber` column, why can we not yet create the complete relationship?

**2.** In the statement:

```sql
FOREIGN KEY (LicenceNumber)
REFERENCES Teacher(LicenceNumber)
```

what role does the first `LicenceNumber` play, and what role does the `LicenceNumber` after `REFERENCES` play?

**3.** Which commands belong to DDL?

```sql
CREATE TABLE
ALTER TABLE
SELECT
UPDATE
```

There may be more than one correct answer.

---

## Module 6 — Consolidation

The School Database problem has now progressed through:

```text
Conceptual design
      ↓
Normalisation
      ↓
Tables + relationships
      ↓
DDL
      ↓
Database schema
```

The next group of commands is:

```text
INSERT
SELECT
WHERE
ORDER BY
INNER JOIN
GROUP BY
SUM
COUNT
AVG
UPDATE
DELETE
```

These commands will be used in the next module to manipulate and query data.

---
