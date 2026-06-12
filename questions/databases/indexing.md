---
title: "How do Database Indexes work?"
tags: [databases, indexing, b-tree, hash-index, sql]
difficulty: medium
---

Database indexes speed up data retrieval operations at the cost of additional writes and storage space.

### 1. B-Tree Indexes
Most relational databases (e.g., PostgreSQL, MySQL) use B-Trees (or B+ Trees) for indexing.
- **Time Complexity**: $O(\log N)$ for search, insert, and delete.
- **Range Queries**: Efficiently supports range queries (e.g., `WHERE age BETWEEN 20 AND 30`) because leaf nodes are linked sequentially.

### 2. Hash Indexes
Hash indexes use a hash table to map keys to row pointers.
- **Time Complexity**: $O(1)$ on average.
- **Limitation**: Cannot perform range queries or partial matching. Only supports equality operators (`=`, `IN`).

### Indexing Example (SQL):
```sql
-- Create an index on the email column
CREATE INDEX idx_users_email ON users(email);

-- Query using the index
SELECT * FROM users WHERE email = 'dev@example.com';
```
