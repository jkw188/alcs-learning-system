# Module 1 — Why Move from Files to a Database?

## A. Learning Objectives

We will not create tables or write SQL yet.

First, we need to answer one important question:

> **What problems can a database solve that file-based data storage does not handle well?**

By the end of this module, you should be able to:

- identify **data redundancy**;
- identify **data inconsistency**;
- explain **data dependency**;
- explain why a relational database overcomes these three problems.

This corresponds directly to Sections **8.1.1 and 8.1.2**.

---

## B. Theory Needed Now

### 1. What is a file-based approach?

A file can contain many **records**, and each record can contain multiple **fields**. The problem is that the record structure depends on the program that processes the file.

If one program changes the file structure, another program that reads the same type of data may also need to be changed. fileciteturn0file0L58-L69

The source material illustrates this with two programs:

**Payroll Program**

```text
First Name
Second Name
Address
Phone Number
Staff Number
```

**Sales Program**

```text
Name
Staff Number
Target Sales
Actual Sales
```

Both programs require information about the same employee, but each stores its own separate copy of the data. fileciteturn0file0L135-L162

---

### 2. Data redundancy

Suppose we have:

```text
Payroll file
S001 | Nguyen Van A | ...

Sales file
Nguyen Van A | S001 | ...
```

`Nguyen Van A` and `S001` appear in **two different places**.

This is **redundant data** — data that is duplicated unnecessarily.

The immediate consequence is:

```text
multiple copies
     ↓
wasted storage
```

The source material identifies this as one of the three main limitations of a file-based approach. fileciteturn0file0L163-L169

---

### 3. Data inconsistency

Now suppose the employee's staff number changes:

```text
Payroll:
S001 → S015
```

but the Sales file still contains:

```text
S001
```

We now have:

```text
Payroll says: S015
Sales says:   S001
```

Two places are describing **the same fact but giving different values**.

This is **data inconsistency**.

The key idea is:

> Redundancy creates the conditions in which inconsistency can occur.

If there is only **one authoritative copy**, you do not need to remember to update several separate copies.

---

### 4. Data dependency

This is often the easiest concept to confuse.

In a file-based system, a program may need to know exactly where each field appears:

```text
field 1 = FirstName
field 2 = SecondName
field 3 = Address
...
field 5 = StaffNumber
```

If the structure changes:

```text
StaffNumber moves from field 5 → field 1
```

the program may also need to be changed.

In other words:

```text
Application
    ↓ depends on
File structure
```

This is **data dependency**.

The source material explains that the enquiries available may depend on both the data structure and the software being used. fileciteturn0file0L163-L169

---

## C. Predict and Perform

Suppose the school has two software systems.

#### Student Administration

```text
StudentID
StudentName
DateOfBirth
ClassID
```

#### Timetable

```text
StudentID
StudentName
ClassID
Subject
```

The student:

```text
S1276 | Noor Baig | 7A
```

appears in both files.

Predict which type of problem is shown in each situation below:

**①** `StudentName` is stored in both files.

**②** Administration changes:

```text
Noor Baig → Noor B.
```

but Timetable still contains:

```text
Noor Baig
```

**③** Administration changes the file format from:

```text
StudentID, StudentName, DateOfBirth, ClassID
```

to:

```text
StudentID, ClassID, StudentName, DateOfBirth
```

and the program that reads the old file no longer works.

Assign each case yourself:

```text
① = ?
② = ?
③ = ?
```

to one of:

```text
Data redundancy
Data inconsistency
Data dependency
```

---

## D. Why Does the Database Approach Solve These Problems?

The idea changes from:

```text
Payroll Program ──→ Payroll file

Sales Program   ──→ Sales file
```

to:

```text
             ┌─ Payroll Application
DATABASE ────┤
             └─ Sales Application
```

Shared data is now managed centrally.

In the example from the source material, an employee's name and staff number only need to be stored once; a change made by the payroll application can then be seen by the sales application, and vice versa. fileciteturn0file0L194-L216

Therefore:

```text
less duplication
    ↓
less redundancy

one shared value
    ↓
better consistency

an application does not own a separate file structure
    ↓
greater data independence
```

These three benefits directly correspond to the three problems we identified earlier.

---

## E. Apply It Yourself

Without looking back at the previous section, complete the following table:

| Situation | Problem |
|---|---|
| The same student address is stored in four different applications | ? |
| One application changes an address but the other three still contain the old address | ? |
| A program must be rewritten because the order of fields in a file changes | ? |
| The same StudentID appears in several files | ? |

Then answer these **two explanation questions**:

**1.** Why can *data redundancy* lead to *data inconsistency*?

**2.** If all applications use **one database**, why is changing a student's information safer than allowing each application to keep its own separate file?

You do not need to recite definitions. Explain using **cause → effect** reasoning.

---
