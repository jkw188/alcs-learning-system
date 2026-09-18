# Module 7 — SQL DML: Adding, Querying, and Modifying Data

In Module 6, we created only the **structure**:

```text
School
├── Student
├── Class
├── Teacher
├── Subject
└── StudentSubject
```

Now the database begins to contain real data. The question for this module is:

> How do we add data, retrieve exactly the data we need, combine several tables, and update the database?

This is the role of **DML — Data Manipulation Language**. According to the source material, DML is used to **add, modify, delete and retrieve** data stored in a relational database. fileciteturn0file0L897-L904

## A. Learning Objectives

By the end of Module 7, you should understand and be able to use:

```text
SELECT ... FROM
WHERE
ORDER BY
GROUP BY
INNER JOIN
SUM
COUNT
AVG

INSERT INTO
UPDATE
DELETE FROM
```

These are the SQL DML commands required in Chapter 8. fileciteturn0file0L992-L1011

We continue with the same School Database rather than changing to a different project.

---

## B. Theory Needed Now

### 1. How do DDL and DML differ?

In the previous module:

```sql
CREATE TABLE Student (...);
```

changed the **structure**.

In this module:

```sql
INSERT INTO Student ...
```

changes the **data**.

A useful distinction is:

```text
DDL
→ database structure

DML
→ data inside that structure
```

The source material makes the same distinction. fileciteturn0file0L908-L921

---

## C. Predict and Perform

### Step 1 — INSERT: put data into the database

Suppose the database already contains:

```text
CLASS
ClassID | Location
7A      | Floor 2 Room 3
7B      | Floor 2 Room 4
```

and:

```text
STUDENT
StudentID | FirstName | SecondName | DateOfBirth | ClassID
```

We want to add Noor.

### Syntax

```sql
INSERT INTO Student
VALUES (...);
```

The source material uses `INSERT INTO` to add a new row. fileciteturn0file0L1032-L1038

### Practical version

Assume that we are using MySQL:

```sql
INSERT INTO Student
VALUES (
    'S1276',
    'Noor',
    'Baig',
    '2010-09-22',
    '7A'
);
```

Result:

```text
Student
----------------------------------------------------
S1276 | Noor | Baig | 2010-09-22 | 7A
```

The key idea is:

```text
INSERT
→ creates a new tuple
```

---

### What if not all values are known?

We can specify the columns explicitly:

```sql
INSERT INTO Student (
    StudentID,
    FirstName,
    SecondName
)
VALUES (
    'S1301',
    'Peter',
    'Probert'
);
```

The source material also shows this approach when values for all columns are not available. fileciteturn0file0L1035-L1038

---

### Step 2 — SELECT: retrieve data

Suppose Student contains:

```text
S1276 | Noor  | Baig   | 7A
S1277 | Ahmed | Sayed  | 7B
S1299 | Tahir | Hassan | 7A
```

To retrieve:

```text
FirstName
SecondName
```

we write:

```sql
SELECT FirstName, SecondName
FROM Student;
```

Meaning:

```text
SELECT
→ which columns should be returned?

FROM
→ from which table?
```

The source material states that queries begin with `SELECT`. fileciteturn0file0L992-L995

---

### Step 3 — WHERE: filter rows

Requirement:

> Display students who belong to class 7A.

Add a condition:

```sql
SELECT FirstName, SecondName
FROM Student
WHERE ClassID = '7A';
```

Trace:

```text
S1276 → 7A ✓
S1277 → 7B ✗
S1299 → 7A ✓
```

Result:

```text
Noor  | Baig
Tahir | Hassan
```

`WHERE` keeps only rows that satisfy the condition. fileciteturn0file0L994-L999

The source material uses this same example of Students in class `7A`. fileciteturn0file0L1012-L1019

---

### Step 4 — ORDER BY: sort the result

Extend the requirement:

> List the students in class 7A in alphabetical order of SecondName.

```sql
SELECT FirstName, SecondName
FROM Student
WHERE ClassID = '7A'
ORDER BY SecondName;
```

We can understand the query as a pipeline:

```text
FROM Student
      ↓
WHERE ClassID = '7A'
      ↓
SELECT FirstName, SecondName
      ↓
ORDER BY SecondName
```

This is also a sample query in the chapter. fileciteturn0file0L1012-L1019

---

### Step 5 — INNER JOIN: combine several tables

This is one of the most important parts of the module.

Normalisation divides the data among tables such as:

```text
Teacher
Subject
StudentSubject
Student
```

If we want to answer:

> Which Teacher teaches which Subject?

we must join tables again.

Suppose:

```text
TEACHER

LicenceNumber | TeacherName
35859         | Mr Yee
72691         | Miss Wu
37952         | Mr Khan
```

and:

```text
SUBJECT

SubjectName | LicenceNumber
Maths       | 35859
History     | 72691
Geography   | 37952
```

The joining point is:

```text
Teacher.LicenceNumber
        =
Subject.LicenceNumber
```

Query:

```sql
SELECT Teacher.TeacherName,
       Subject.SubjectName
FROM Teacher
INNER JOIN Subject
ON Teacher.LicenceNumber = Subject.LicenceNumber;
```

Result:

```text
Mr Yee   | Maths
Miss Wu  | History
Mr Khan  | Geography
```

`INNER JOIN` combines rows from two tables when the join condition is true. fileciteturn0file0L1000-L1006

---

### A note about the example in the source material

Page 213 presents the query in the form:

```text
SELECT Teacher.TeacherName AND Subject.SubjectName
```

fileciteturn0file0L1020-L1023

In the **supplementary practical implementation**, we use:

```sql
SELECT Teacher.TeacherName,
       Subject.SubjectName
```

so that the query uses conventional SQL syntax that can run in the practical environment. This is an implementation adjustment, not a silent alteration of the source content.

---

### Step 6 — JOIN across several tables

Now solve a requirement similar to Activity 8H:

> Display the FirstName, SecondName, and Subjects studied by each Student.

The source material asks for a query of this kind. fileciteturn0file0L1029-L1031

Relationships:

```text
STUDENT
StudentID
   │
   │
   ▼
STUDENTSUBJECT
StudentID
SubjectName
   │
   │
   ▼
SUBJECT
SubjectName
```

We need two joins:

```text
Student
   JOIN
StudentSubject
   JOIN
Subject
```

Query:

```sql
SELECT Student.FirstName,
       Student.SecondName,
       Subject.SubjectName
FROM Student
INNER JOIN StudentSubject
ON Student.StudentID = StudentSubject.StudentID
INNER JOIN Subject
ON StudentSubject.SubjectName = Subject.SubjectName;
```

Trace Noor:

```text
Student
S1276 = Noor
   ↓

StudentSubject
S1276 → Maths
S1276 → History
S1276 → Geography
   ↓

Subject
Maths
History
Geography
```

Result:

```text
Noor | Baig | Maths
Noor | Baig | History
Noor | Baig | Geography
```

This shows why normalisation does not cause information to be “lost.”

We separate data to reduce redundancy, then use **JOIN** when combined information is required.

---

## D. Aggregate Functions

Suppose `STUDENTSUBJECT` is extended with:

```text
StudentID | SubjectName | ExamMark
S1276     | Maths       | 80
S1276     | History     | 70
S1277     | Maths       | 90
```

The chapter uses this same idea of adding `ExamMark` to demonstrate aggregate functions. fileciteturn0file0L1043-L1051

### 1. SUM

Total all marks:

```sql
SELECT SUM(ExamMark)
FROM StudentSubject;
```

Calculation:

```text
80 + 70 + 90 = 240
```

---

### 2. AVG

Average:

```sql
SELECT AVG(ExamMark)
FROM StudentSubject;
```

```text
240 / 3 = 80
```

---

### 3. COUNT

Count the number of marks:

```sql
SELECT COUNT(ExamMark)
FROM StudentSubject;
```

Result:

```text
3
```

The source material describes `SUM`, `COUNT`, and `AVG` in the DML command list. fileciteturn0file0L1003-L1006

---

## E. GROUP BY — Aggregate Within Groups

If we run:

```sql
SELECT AVG(ExamMark)
FROM StudentSubject;
```

we obtain the average of **all rows**.

But suppose the requirement is:

> Calculate the average mark for each Subject.

We must divide the rows into groups:

```text
Maths:
80, 90

History:
70
```

and calculate the average for each group:

```sql
SELECT SubjectName,
       AVG(ExamMark)
FROM StudentSubject
GROUP BY SubjectName;
```

Result:

```text
Maths   | 85
History | 70
```

We can think of this as:

```text
GROUP BY SubjectName
        ↓
Maths group
History group
...
        ↓
AVG for each group
```

The source material defines `GROUP BY` as arranging data into groups. fileciteturn0file0L998-L1005

---

## F. UPDATE — Modify Data

The source material lists `UPDATE` as the command used to edit rows. fileciteturn0file0L1007-L1010

Suppose Ahmed moves from `7B` to `7A`.

We want:

```text
S1277
ClassID: 7B → 7A
```

Supplementary practical implementation:

```sql
UPDATE Student
SET ClassID = '7A'
WHERE StudentID = 'S1277';
```

The most important part is:

```text
WHERE StudentID = 'S1277'
```

because it identifies the Student who should be changed.

If `WHERE` is omitted, more rows may be modified than intended.

---

## G. DELETE — Remove Data

The source material gives the example:

```sql
DELETE FROM Student
WHERE StudentID = 'S1301';
```

fileciteturn0file0L1039-L1042

Meaning:

```text
FROM Student
→ which table?

WHERE StudentID = 'S1301'
→ which row?
```

The source material specifically warns that `DELETE FROM Student` without a `WHERE` condition affects all rows in the table. fileciteturn0file0L1039-L1042

---

## H. Understand the Result

We can now see why the earlier modules are closely connected.

### Normalisation

We divide the data into:

```text
STUDENT
SUBJECT
STUDENTSUBJECT
```

to reduce duplication.

### Primary / Foreign Keys

These give us links such as:

```text
Student.StudentID
       ↓
StudentSubject.StudentID
```

### DML

DML lets us use those relationships through:

```sql
INNER JOIN
```

so that information can be combined again when required.

The whole chain is:

```text
Normalisation
      ↓
appropriate tables

Primary/Foreign Keys
      ↓
relationships

SQL DML
      ↓
query relationships

useful information
```

If `SELECT` is learned only as an isolated command, it is much harder to understand the purpose of the relational database model.

---

## I. Apply It Yourself

Use the School Database itself.

Data:

```text
STUDENT

StudentID | FirstName | SecondName | ClassID
S1276     | Noor      | Baig       | 7A
S1277     | Ahmed     | Sayed      | 7B
S1299     | Tahir     | Hassan     | 7A
```

```text
STUDENTSUBJECT

StudentID | SubjectName | ExamMark
S1276     | Maths       | 80
S1276     | History     | 72
S1277     | Maths       | 90
S1299     | Maths       | 85
S1299     | History     | 78
```

Write SQL for the following five requirements, **without looking at an answer first**:

1. Display the `FirstName` and `SecondName` of all students in `7A`, sorted by `SecondName`.

2. Display all Subjects studied by Student `S1276`.

3. Calculate the average `ExamMark` across all records.

4. Display the average `ExamMark` for **each Subject**.

5. Display:

```text
FirstName
SecondName
SubjectName
ExamMark
```

for all students using `INNER JOIN`.

Then answer these three review questions:

**1.** How do `WHERE` and `GROUP BY` solve different problems?

**2.** Why do we need a `JOIN` to obtain a Student name together with a Subject name instead of selecting only from `StudentSubject`?

**3.** For the relationship:

```text
STUDENT 1 ─── M STUDENTSUBJECT
```

which column is used as the join condition?

---

## Module 7 — Consolidation

At this point, the School Database has covered almost the whole of Chapter 8:

```text
File-based problems
        ↓
Relational database
        ↓
Entity + Attributes + Keys
        ↓
Relationships + E-R Diagram
        ↓
Normalisation → 3NF
        ↓
DBMS
        ↓
SQL DDL
        ↓
SQL DML
```

The source material finishes the SQL section after examples of `INSERT`, `DELETE`, `SUM`, `AVG`, and `COUNT`, then moves to the **End of chapter questions**. fileciteturn0file0L1032-L1053

**Module 8** is the final integration module: we will take a database with design problems, identify its entities/keys/relationships, normalise it, build an E-R design, and write SQL — following the style of the Cambridge questions at the end of Chapter 8.

---
