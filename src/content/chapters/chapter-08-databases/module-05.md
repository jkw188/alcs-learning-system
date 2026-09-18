# Module 5 — Database Management Systems (DBMS)

In Module 4, we designed a School Database that reaches approximately 3NF. In Module 5, the question is no longer “Which tables should the data be divided into?” Instead, we ask:

> **What will manage those tables, keep the data correct and secure, create backups, and process SQL statements?**

That is the role of a **Database Management System — DBMS**.

## A. Learning Objectives

We continue using the School Database with tables such as `STUDENT`, `CLASS`, `TEACHER`, `SUBJECT`, and `STUDENTSUBJECT`.

The school has three groups of users:

```text
Administrator
Teacher
Student
```

However, they must not all be allowed to perform the same actions. An Administrator may manage data, a Teacher may need to view or update only certain information, and a Student mainly needs to view their own data.

In addition, the system must:

```text
- store metadata about the database structure
- control access rights
- back up data
- record activity
- execute SQL
- protect database integrity
```

By the end of this module, you should be able to explain `DBMS`, `data dictionary`, `data modelling`, `logical schema`, `access rights`, `developer interface`, `query processor`, and the security measures provided by a DBMS.

A **DBMS** is systems software used for the **definition, creation and manipulation** of a database.

---

## B. Theory Needed Now

### 1. A DBMS is not the same as a database

This is an important distinction.

The database consists of structures such as:

```text
STUDENT
CLASS
TEACHER
SUBJECT
...
```

and the data stored inside them.

The DBMS is the software that manages that database.

We can visualise this as:

```text
Users / Applications
        │
        ▼
       DBMS
        │
        ▼
     Database
```

Real-world examples of DBMS software include MySQL, PostgreSQL, SQL Server, and SQLite.

Within the scope of this chapter, the important point is not to memorise product names but to understand:

```text
Database = data + structure

DBMS = software that manages the structure and data
```

---

### 2. How does a DBMS overcome the limitations of a file-based approach?

Module 1 identified three problems:

```text
Data redundancy
Data inconsistency
Data dependency
```

A DBMS addresses them by managing data in linked tables.

### Data redundancy

Instead of each application storing its own copies of:

```text
StudentName
TeacherName
ClassLocation
```

all applications use one shared database.

For example:

```text
STUDENT
S1276 → ClassID 7A
```

and:

```text
CLASS
7A → Room 3
```

`Room 3` does not need to be copied into every Student record.

A DBMS reduces duplication by storing data in separate linked tables.

---

### Data inconsistency

Suppose a Teacher changes classroom.

If several files contain:

```text
Mr Khan → Room 3
```

then several separate places may need to be changed.

In a normalised database, the value needs to be updated only in the appropriate location.

All applications can then see the same updated data.

Storing most data items only once means that updates can be seen by all applications, improving data integrity.

---

### Data dependency

In a file-based approach:

```text
Application
    │
    └── knows the exact file structure
```

In the database approach:

```text
Application
    │
    ▼
   DBMS
    │
    ▼
database structure
```

The DBMS sits between the application and the physical storage.

Therefore, a change to the database structure does not necessarily require every application to be rewritten.

This is called **data independence**.

---

### 3. Data Dictionary — “what does the database know about itself?”

A DBMS needs to know:

```text
Which columns does STUDENT contain?
What data type does StudentID use?
What is the Primary Key?
Where does the Foreign Key point?
Which table has an index?
What validation rules exist?
```

This information is not Student data.

It is **metadata** — data about data.

The DBMS stores metadata in the:

> **Data Dictionary**

For example, a data dictionary might describe:

```text
Table: STUDENT

StudentID
Type: VARCHAR
Primary Key: Yes

FirstName
Type: VARCHAR

ClassID
Type: VARCHAR
Foreign Key: CLASS.ClassID
```

The data dictionary can contain definitions of tables, attributes, relationships, indexing, validation rules, and information about physical storage.

The key distinction is:

```text
STUDENT table
→ stores student data

Data dictionary
→ stores information ABOUT the STUDENT table
```

---

### 4. Data Modelling and Logical Schema

In Module 3, we drew an E-R diagram.

That is one form of **data model**.

```text
STUDENT M ───── 1 CLASS
```

Data modelling is the process of analysing and defining the structures required in a database.

A **logical schema** is a data model for a specific database that is **independent of the DBMS used to build it**.

For example, the design:

```text
STUDENT(StudentID, FirstName, ClassID)

CLASS(ClassID, Location)
```

is not, at the logical level, tied specifically to:

```text
MySQL
PostgreSQL
SQL Server
```

The implementation details may differ slightly, but the relational structure remains the same.

---

### 5. How does a DBMS protect data?

The School Database contains information that not every user should be allowed to view or modify.

For example:

```text
Administrator
→ Student + Teacher + Class

Teacher
→ students in their own class

Student
→ their own personal information
```

A DBMS can provide security measures such as usernames/passwords, access rights, database views, automatic backups, encryption, and audit trail/activity logs.

We can examine each one in the context of the School Database.

### Authentication

```text
username + password
```

answers:

> Who are you?

---

### Access rights

Once the system knows who you are, it asks:

> What are you allowed to do?

For example:

```text
Teacher:
READ STUDENT
UPDATE ExamMark

Student:
READ own results
NO DELETE

Administrator:
READ
INSERT
UPDATE
DELETE
```

Access rights can control both the **action** a user may perform and the **part of the database** that user may access.

---

### View

A Student does not need to see all of:

```text
TEACHER.Address
TEACHER.DateOfBirth
```

The DBMS can provide a view containing only the appropriate information.

The idea is:

```text
Full database
     ↓
DBMS view
     ↓
specific user
```

---

### Backup

If the database experiences:

```text
hardware failure
accidental deletion
corruption
```

a backup can be used to recover the data.

A DBMS can automatically schedule regular backups.

---

### Encryption

If stored data is obtained without authorisation, encryption makes it much harder to read the data directly.

---

### Audit trail

Suppose a Student's mark changes:

```text
62 → 92
```

An Administrator may want to know:

```text
Who changed it?
When?
What was changed?
```

An audit log can record this activity.

---

## C. Predict and Perform

Now design a minimal security policy for the School Database.

We have three roles:

```text
ADMIN
TEACHER
STUDENT
```

and three operations:

```text
SELECT
UPDATE
DELETE
```

First predict what a sensible permission table might look like.

Then compare it with the following design:

| Role | SELECT Student | UPDATE Student | DELETE Student |
|---|---:|---:|---:|
| ADMIN | Yes | Yes | Yes |
| TEACHER | Yes | Limited | No |
| STUDENT | Own data only | No | No |

Here, **access rights** are being used to satisfy the requirement:

> users should only be able to access data appropriate to their role.

This School Database therefore needs role-based access so that administrators, teachers, and students can see only the information appropriate to them.

---

### 6. Developer Interface

A DBMS must also provide a way for a developer to communicate with the database.

Instead of using only a graphical interface, the developer can write:

```sql
SELECT FirstName, SecondName
FROM Student
WHERE ClassID = '7A';
```

The DBMS provides a **developer interface** for writing SQL.

The developer interface allows a developer to write SQL queries, which are then processed by the query processor.

We will practise actual SQL in Modules 6–7.

---

### 7. Query Processor — where does an SQL statement go?

Suppose a user sends:

```sql
SELECT FirstName
FROM Student
WHERE ClassID = '7A';
```

The database does not simply “understand it automatically.”

A simplified flow is:

```text
SQL query
    ↓
Query Processor
    ↓
analyse / process
    ↓
low-level operations
    ↓
database
    ↓
result
```

The chapter identifies the following components of the query processor:

```text
DDL interpreter
DML compiler
Query evaluation engine
```

---

### 8. DDL Interpreter

If a developer sends:

```sql
CREATE TABLE Student(...)
```

this is **DDL**.

The DDL interpreter handles commands that relate to database structure.

Information about the new structure is also recorded in the:

```text
Data Dictionary
```

We can visualise this as:

```text
CREATE TABLE
     ↓
DDL Interpreter
     ↓
Data Dictionary updated
```

DDL statements are interpreted and the resulting structure is recorded in the database's data dictionary.

---

### 9. DML Compiler

If the system receives:

```sql
SELECT ...
INSERT ...
UPDATE ...
DELETE ...
```

these are DML statements.

The DML compiler converts the statements into low-level instructions.

The chapter also states that the compiler can:

```text
optimise the query
```

meaning that it attempts to find an efficient way to execute the query.

---

### 10. Query Evaluation Engine

After the DML has been processed:

```text
DML command
    ↓
DML Compiler
    ↓
low-level instructions
    ↓
Query Evaluation Engine
    ↓
execute
```

The Query Evaluation Engine actually executes the instructions.

This level of understanding is sufficient for the chapter; there is no need here to study query planners, B-tree implementation, or execution algorithms in depth.

---

## D. Understand the Result

Now trace one complete situation.

A Teacher signs in and runs:

```sql
SELECT FirstName, SecondName
FROM Student
WHERE ClassID = '7A';
```

The flow is:

```text
Teacher
   ↓
Authentication
   ↓
Access rights check
   ↓
Developer/Application interface
   ↓
SQL query
   ↓
Query Processor
   ↓
DML Compiler
   ↓
Query Evaluation Engine
   ↓
STUDENT table
   ↓
Result
```

At the same time, the DBMS also uses or maintains:

```text
Data Dictionary
→ knows the STUDENT structure

Audit Log
→ can record user activity

Backup
→ protects against data loss

Access Rights
→ prevents the Teacher from performing unauthorised actions
```

This is the key idea of Module 5:

> A DBMS is not simply “software that stores data.” It is the management layer between users/applications and the database.

---

### A counterexample

Suppose a Student signs in and sends:

```sql
DELETE FROM Student;
```

The SQL may be syntactically valid.

However:

```text
Valid SQL
≠
Authorised operation
```

The DBMS must still check access rights.

The Student does not have DELETE permission → the operation is rejected.

Therefore, security and query processing are separate concerns.

---

## E. Apply It Yourself

Consider a school system with three users:

```text
Alice  = Administrator
Mr Lee = Teacher
S1276  = Student
```

Analyse these four situations:

1. `S1276` wants to view their own date of birth.
2. `S1276` wants to delete another Student's record.
3. `Mr Lee` wants to view the list of Students in his class.
4. The Administrator wants to restore data after the Student table is accidentally deleted.

For each situation, identify an appropriate **DBMS feature**, for example:

```text
Access rights
View
Backup
Authentication
Audit trail
```

Then answer these three review questions:

**Question 1.** Does the data dictionary store **data** or **metadata**? Give one example.

**Question 2.** How do the `DDL interpreter` and `DML compiler` differ in terms of the statements they process?

**Question 3.** Why is a password alone not enough to secure a database, and why are access rights also required?

---
