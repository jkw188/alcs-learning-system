# Module 8 — Whole-Chapter Integration: From Raw Data to SQL

This is the final module of Chapter 8. It does not introduce many new concepts; instead, a problem closely related to **End of chapter question 1** in the source material is used to connect everything we have learned:

```text
Unnormalised data
→ 1NF / 2NF / 3NF
→ Primary / Foreign Keys
→ Relationships
→ E-R design
→ DDL
→ DML
```

The source material presents a problem involving **programmers, teams, programs, and customers**, where one programmer can work on several programs and the system records how many days each programmer has worked on each program. fileciteturn0file0L1053-L1064

---

## A. Learning Objectives

By the end of this module, you should be able to receive a new set of requirements and decide independently:

```text
Which entities exist?
Which entity does each attribute belong to?
What is the primary key?
Is there an M:N relationship?
Which associative table is required?
Is the table in 3NF?
Where should the foreign key be placed?
Which tables must an SQL query JOIN?
```

This is the integrated problem-solving ability that the chapter is intended to develop, rather than simple memorisation of definitions.

---

## B. Integrated Problem — Software Development Company

A company has the following rules:

```text
1. Each programmer belongs to one team.

2. The FirstName of each programmer is unique.

3. Each team has one or more programmers.

4. Each program is developed for exactly one customer.

5. One programmer may work on many programs.

6. One program may have many programmers working on it.

7. The system records the number of days each programmer
   has worked on each program.
```

These are the facts provided by the end-of-chapter problem. fileciteturn0file0L1054-L1063

The first system design is:

```text
ProgDev

FirstName
Team
ProgramName
NoOfDays
Customer
```

Example data from the source material:

```text
Alice
Team WC
    TV control      3 days   SKM
    Ice alert       2 days   WZP
    Digital camera  6 days   HNC

Charles
Team PC
    Oil flow        1 day    GEB
    Rescue Pack     8 days   BGF
```

The source material presents this as an initial design with problems. fileciteturn0file0L1068-L1098

---

## C. Step 1 — Analyse Why It Is Not in 1NF

Look at Alice:

```text
Alice | WC | TV control, Ice alert, Digital camera | ...
```

One Alice record contains several values for:

```text
ProgramName
NoOfDays
Customer
```

These are **repeating groups**.

According to the rule already learned:

```text
1NF
→ contains no repeated groups of attributes
```

Therefore, the original table is not in 1NF.

This is also part (a) of the end-of-chapter question: explain why `ProgDev` is not in 1NF. fileciteturn0file0L1098-L1104

---

## D. Step 2 — Convert to 1NF

The source material suggests separating the design into:

```text
Programmer(
    FirstName,
    Team
)
```

and:

```text
Program(
    FirstName,
    ProgramName,
    NoOfDays,
    Customer
)
```

fileciteturn0file0L1099-L1109

Represent Alice as:

```text
PROGRAMMER

Alice | WC
```

and:

```text
PROGRAM

Alice | TV control      | 3 | SKM
Alice | Ice alert       | 2 | WZP
Alice | Digital camera  | 6 | HNC
```

The repeating group has now been converted into several rows.

---

## E. Step 3 — Find the Primary Key

#### PROGRAMMER

The requirement states:

> Each programmer has a unique first name.

Therefore, within the scope of this problem:

```text
FirstName = Primary Key
```

---

#### PROGRAM

Consider:

```text
Alice | TV control
Ahmad | TV control
```

`FirstName` is not unique.

`ProgramName` is also not unique in this table because one program can have several programmers.

However:

```text
(FirstName, ProgramName)
```

uniquely identifies one occasion on which one programmer works on one program.

Therefore:

```text
Composite PK =
(FirstName, ProgramName)
```

At the business level, this represents an M:N relationship:

```text
PROGRAMMER M ───── N PROGRAM
```

---

## F. Step 4 — How Is the Relationship Between the Two Tables Implemented?

In:

```text
PROGRAMMER
FirstName = PK
```

and:

```text
PROGRAM
FirstName = part of the composite PK
```

`Program.FirstName` also refers to:

```text
Programmer.FirstName
```

Therefore, it also acts as a:

```text
Foreign Key
```

We can represent this as:

```text
PROGRAMMER
FirstName PK
     1
     │
     │
     M
PROGRAM
FirstName PK/FK
ProgramName PK
NoOfDays
Customer
```

The end-of-chapter question also asks directly how the relationship between these two tables has been implemented. fileciteturn0file0L1110-L1113

---

## G. Step 5 — Why Is the Design Still Not in 3NF?

Now consider:

```text
PROGRAM(
    FirstName,
    ProgramName,
    NoOfDays,
    Customer
)
```

Composite key:

```text
(FirstName, ProgramName)
```

Ask what each attribute depends on.

#### NoOfDays

The number of days depends on both:

```text
Programmer + Program
```

For example:

```text
Alice + TV control → 3 days
Ahmad + TV control → 2 days
```

Therefore:

```text
(FirstName, ProgramName)
        ↓
NoOfDays
```

This is appropriate.

---

#### Customer

The requirement states:

> Each program is for one customer only.

Therefore:

```text
ProgramName
     ↓
Customer
```

We **do not need FirstName** to determine the Customer.

For example:

```text
TV control → SKM
```

regardless of whether Alice or Ahmad works on the program.

Therefore, Customer depends on only part of the composite key:

```text
ProgramName
```

This dependency needs to be removed during further normalisation.

The end-of-chapter problem also asks why the `Program` table is not in 3NF. fileciteturn0file0L1110-L1114

---

## H. Step 6 — 3NF Design

Separate Program information from the Programmer–Program relationship.

A suitable design is:

```text
PROGRAMMER(
    FirstName PK,
    Team
)
```

```text
PROGRAM(
    ProgramName PK,
    Customer
)
```

and the associative table:

```text
PROGRAMMER_PROGRAM(
    FirstName PK/FK,
    ProgramName PK/FK,
    NoOfDays
)
```

The dependencies are now clear:

```text
FirstName
    ↓
Team
```

```text
ProgramName
    ↓
Customer
```

```text
(FirstName, ProgramName)
        ↓
NoOfDays
```

The key idea is:

> each attribute depends on the key appropriate to the fact represented by that table.

---

## I. E-R Design

We now have three logical entities/tables:

```text
PROGRAMMER

FirstName PK
Team
```

```text
PROGRAMMER_PROGRAM

FirstName PK/FK
ProgramName PK/FK
NoOfDays
```

```text
PROGRAM

ProgramName PK
Customer
```

Relationship:

```text
PROGRAMMER
     1
     │
     │
     M
PROGRAMMER_PROGRAM
     M
     │
     │
     1
PROGRAM
```

At the business level:

```text
PROGRAMMER M ───── N PROGRAM
```

The associative table converts M:N into:

```text
1:M + M:1
```

---

## J. Convert the Design into SQL DDL

Only now do we move to code.

```sql
CREATE TABLE Programmer (
    FirstName VARCHAR(50),
    Team VARCHAR(20),
    PRIMARY KEY (FirstName)
);
```

```sql
CREATE TABLE Program (
    ProgramName VARCHAR(100),
    Customer VARCHAR(100),
    PRIMARY KEY (ProgramName)
);
```

And the relationship table:

```sql
CREATE TABLE ProgrammerProgram (
    FirstName VARCHAR(50),
    ProgramName VARCHAR(100),
    NoOfDays INTEGER,

    PRIMARY KEY (FirstName, ProgramName),

    FOREIGN KEY (FirstName)
        REFERENCES Programmer(FirstName),

    FOREIGN KEY (ProgramName)
        REFERENCES Program(ProgramName)
);
```

Notice the connection:

```text
Normalisation decision
        ↓
table structure
        ↓
DDL
```

SQL is not the first step in database design. It is the way we **implement a design that has already been reasoned through**.

---

## K. Query the Database Using DML

The database is now normalised.

### Requirement 1

> Display all programs that Alice is working on.

We need:

```text
ProgrammerProgram
```

because this table contains the relationship.

```sql
SELECT ProgramName
FROM ProgrammerProgram
WHERE FirstName = 'Alice';
```

---

### Requirement 2

> Display the program, customer, and number of days worked by Alice.

Customer is not stored in `ProgrammerProgram`.

We need:

```text
ProgrammerProgram
       JOIN
Program
```

The joining point is:

```text
ProgrammerProgram.ProgramName
            =
Program.ProgramName
```

Query:

```sql
SELECT ProgrammerProgram.ProgramName,
       Program.Customer,
       ProgrammerProgram.NoOfDays
FROM ProgrammerProgram
INNER JOIN Program
ON ProgrammerProgram.ProgramName = Program.ProgramName
WHERE ProgrammerProgram.FirstName = 'Alice';
```

This is where the benefit of relational design becomes clear:

```text
data is not duplicated
        +
keys create relationships
        +
JOIN recombines data when needed
```

---

## L. From Requirement → Database: A General Process

After completing the chapter, when you encounter a new database problem, do not begin with SQL.

Follow this sequence:

```text
1. Read the requirements
        ↓
2. Identify entities
        ↓
3. Identify attributes
        ↓
4. Identify candidate / primary keys
        ↓
5. Identify relationships + cardinality
        ↓
6. Check normalisation
        ↓
7. Identify foreign keys
        ↓
8. Draw the E-R design
        ↓
9. Implement using DDL
        ↓
10. Manipulate/query using DML
```

This is the logic that connects all of the content in Chapter 8.

---

## Chapter Summary

| Core knowledge | Where it was used |
|---|---|
| File-based limitations | Module 1 |
| Relational database benefits | Module 1 |
| Entity, attribute, tuple | Module 2 |
| Candidate/primary/secondary/foreign keys | Module 2 |
| Referential integrity, index | Module 2 |
| Relationships | Module 3 |
| Cardinality | Module 3 |
| E-R diagram | Module 3 |
| 1NF, 2NF, 3NF | Module 4 |
| DBMS | Module 5 |
| Data dictionary, logical schema | Module 5 |
| Security/access rights/backups | Module 5 |
| Developer interface/query processor | Module 5 |
| DDL | Module 6 |
| SQL data types | Module 6 |
| DML | Module 7 |
| JOIN/GROUP BY/aggregate functions | Module 7 |
| Integrated database design | Module 8 |

This corresponds to the learning objectives listed at the beginning of the chapter, from the limitations of the file-based approach through to SQL scripts. fileciteturn0file0L4-L21

---

## Final Challenge

Now use **End of chapter question 2** from the source material.

The School has:

```text
STUDENT(
    StudentID,
    FirstName,
    LastName,
    Year,
    TutorGroup
)

CLASS(
    ClassID,
    Subject
)

CLASS_GROUP(
    StudentID,
    ClassID
)
```

The source material states that there is a `one-to-many` relationship between `CLASS` and `CLASS-GROUP`. fileciteturn0file0L1134-L1142

### Task 1 — Keys

Determine:

```text
STUDENT PK = ?

CLASS PK = ?

CLASS_GROUP composite PK = ?

Which FKs does CLASS_GROUP contain?
```

### Task 2 — Relationship

Explain how the relationship:

```text
CLASS
   ↓
CLASS_GROUP
```

is implemented as `1:M`.

Then determine the relationship between:

```text
CLASS_GROUP ↔ STUDENT
```

### Task 3 — SQL

Write SQL to:

> Display the `StudentID` and `FirstName` of all students in TutorGroup `10B`, sorted by `LastName`.

This is a direct requirement from the end-of-chapter question. fileciteturn0file0L1143-L1145

### Task 4 — JOIN

Write SQL to:

> Display the `LastName` of all students who attend the Class with `ClassID = 'CS1'`.

This is also the final SQL question in the chapter. fileciteturn0file0L1146-L1149

Attempt all four parts before checking any solution. When the work is submitted for review, it should be assessed step by step through the reasoning chain `keys → relationships → JOIN`, rather than by providing only a complete answer.

---

## Source Alignment

This English Edition preserves the scope of Chapter 8: limitations of file-based storage, relational database terminology, E-R diagrams, normalisation to 3NF, DBMS features/tools, DDL, DML, and SQL. Citations in the text point to the corresponding parts of the source material.
