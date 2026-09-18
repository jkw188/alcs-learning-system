# Chapter Overview

**Chapter 8 – Databases** is built around one continuous problem: designing and implementing a relational database for a school. The chapter covers the file-based approach, relational databases, keys and relationships, E-R diagrams, normalisation to 3NF, DBMSs, DDL, and DML/SQL.

## Big Problem — Rebuilding a School Data System

**Context:** the school currently stores information about students, classes, teachers, and subjects in a way that is not well optimised. Our task is to move from **analysing data-storage problems** to a **complete relational database** that can be implemented using SQL.

The final outcome will include:

- analysing why a file-based system causes problems;
- designing tables, primary/foreign keys, and relationships;
- producing an E-R diagram with correct cardinality;
- normalising data from unnormalised form → **1NF → 2NF → 3NF**;
- explaining how a DBMS manages, secures, and processes queries;
- creating a database using **DDL**;
- adding/modifying/deleting/querying data using **DML**;
- solving a Cambridge-style problem at the end of the chapter.

Throughout this chapter, we will use a **School database** as the running example, involving Students, Classes, Teachers, Subjects, relationships, normalisation, and SQL.

## Learning Objectives and Module Map

| Module | Task in the Big Problem | Main Knowledge | Expected Outcome |
|---|---|---|---|
| **1. Why do we need a database?** | Analyse the current file-storage system | file-based, redundancy, inconsistency, dependency | Explain why the system should move to a database |
| **2. Build the relational model** | Identify entity, attribute, table, and keys | tuple, entity, candidate/primary/secondary/foreign key, referential integrity, index | Produce the initial table model |
| **3. Design relationships** | Connect Student–Class–Teacher… | 1:1, 1:M, M:N, cardinality, optional/mandatory | Produce an E-R diagram |
| **4. Normalisation** | Repair a large School table containing duplicated data | 1NF, 2NF, 3NF, composite key, dependencies | Produce a database in 3NF |
| **5. How does a DBMS operate?** | Decide how the DBMS will manage the system | data dictionary, logical schema, access rights, backup, encryption, audit log, query processor | Explain DBMS architecture and access control |
| **6. Create the database** | Convert the design into SQL | DDL, CREATE, ALTER, PK, FK, data types | Produce SQL that creates the schema |
| **7. Use the database** | Build retrieval and update operations | SELECT, WHERE, ORDER BY, GROUP BY, JOIN, SUM/COUNT/AVG, INSERT/UPDATE/DELETE | Produce working queries |
| **8. Integration + exam task** | Solve a new database problem from the beginning | the whole chapter | Design and explain a database independently |

The modules progress from **database concepts → DBMS → DDL/DML**, with each step contributing to the same School database problem.

### Minimum Environment

Modules 1–5 require no software installation; we will work with tables, traces, and E-R diagrams. Modules 6–7 require a DBMS such as **MySQL or SQLite**. SQL syntax can differ slightly between DBMSs.

When practising SQL, we must distinguish between:

**Core SQL concepts** ≠ **DBMS-specific syntax details**.

> **Implementation note:** SQL syntax can vary slightly between DBMSs. The practical examples in this chapter use MySQL-compatible syntax where a concrete implementation is needed.

---
