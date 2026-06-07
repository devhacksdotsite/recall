# Recall Implementation Plan

## Objective

Build Recall incrementally using small, independently testable, and committable changes.

Each step should:

* Compile successfully
* Be testable
* Be deployable
* Have a clear rollback path
* Represent a single Git commit

---

# Phase 1: Foundation

## Goal

Create the project skeleton and local infrastructure.

---

### Step 1.1 — Initialize Repository

**Commit**

```text
feat: initialize Recall project structure
```

**Tasks**

* Create repository
* Create README
* Create docs directory
* Create src directory
* Create .memory directory
* Create .gitignore

**Deliverable**

```text
recall/
├── README.md
├── docs/
├── src/
└── .memory/
```

**Validation**

* Repository builds
* Directory structure exists

---

### Step 1.2 — Add Dockerized Neo4j

**Commit**

```text
feat: add local neo4j docker environment
```

**Tasks**

* Add docker-compose.yml
* Configure Neo4j container
* Configure volume persistence
* Configure ports

**Validation**

```bash
docker compose up -d
```

Verify:

```text
http://localhost:7474
```

---

### Step 1.3 — Create Configuration Module

**Commit**

```text
feat: add application configuration layer
```

**Tasks**

* Environment loader
* Neo4j settings
* Memory path settings
* Validation

**Validation**

```bash
npm run start
```

Config loads successfully.

---

### Step 1.4 — Neo4j Connection Service

**Commit**

```text
feat: implement neo4j connection service
```

**Tasks**

* Create Neo4j client
* Connection testing
* Error handling

**Validation**

Application can:

```cypher
RETURN 1
```

successfully.

---

# Phase 2: Markdown Memory

## Goal

Establish markdown as the source of truth.

---

### Step 2.1 — Memory Directory Bootstrap

**Commit**

```text
feat: initialize memory file generation
```

**Tasks**

Auto-create:

```text
.memory/

architecture.md
requirements.md
decisions.md
tasks.md
project-summary.md
```

**Validation**

Files created automatically.

---

### Step 2.2 — Memory File Service

**Commit**

```text
feat: implement markdown memory service
```

**Tasks**

Support:

* Read file
* Write file
* Append file

**Validation**

Can update memory files.

---

### Step 2.3 — Project Summary Model

**Commit**

```text
feat: add project summary model
```

**Tasks**

Create:

```text
ProjectSummary
```

schema.

**Validation**

Can serialize and save summary.

---

# Phase 3: Graph Foundation

## Goal

Create graph storage capability.

---

### Step 3.1 — Define Node Types

**Commit**

```text
feat: define graph node models
```

**Tasks**

Create models:

```text
Project
Feature
Task
Requirement
Decision
Component
```

**Validation**

Models compile.

---

### Step 3.2 — Define Relationship Types

**Commit**

```text
feat: define graph relationship model
```

**Tasks**

Support:

```text
DEPENDS_ON
USES
REFERENCES
IMPLEMENTS
BLOCKED_BY
```

**Validation**

Relationships serialize correctly.

---

### Step 3.3 — Graph Repository

**Commit**

```text
feat: implement graph repository
```

**Tasks**

Support:

* Create node
* Update node
* Create relationship

**Validation**

Graph data visible in Neo4j.

---

### Step 3.4 — Graph Query Service

**Commit**

```text
feat: implement graph retrieval service
```

**Tasks**

Support:

* Find node
* Find relationships
* Traverse graph

**Validation**

Can retrieve stored entities.

---

# Phase 4: Save Command

## Goal

Persist project memory.

---

### Step 4.1 — Save Command Framework

**Commit**

```text
feat: add save command
```

**Tasks**

Create:

```text
/save
```

command entry point.

**Validation**

Command executes.

---

### Step 4.2 — Summary Generation

**Commit**

```text
feat: generate project summaries
```

**Tasks**

Generate:

* Summary
* Architecture
* Tasks

**Validation**

Markdown updates correctly.

---

### Step 4.3 — Entity Extraction

**Commit**

```text
feat: extract project entities
```

**Tasks**

Extract:

```text
Feature
Decision
Requirement
Component
```

**Validation**

Entities produced from input.

---

### Step 4.4 — Relationship Extraction

**Commit**

```text
feat: extract graph relationships
```

**Tasks**

Extract:

```text
Attendance DEPENDS_ON Enrollment
```

style relationships.

**Validation**

Relationships created.

---

### Step 4.5 — Save To Neo4j

**Commit**

```text
feat: persist extracted memory to graph
```

**Tasks**

Write entities.

Write relationships.

**Validation**

Graph populated.

---

# Phase 5: Reload Command

## Goal

Restore context.

---

### Step 5.1 — Reload Command Framework

**Commit**

```text
feat: add reload command
```

**Validation**

```text
/reload
```

executes.

---

### Step 5.2 — Load Markdown Memory

**Commit**

```text
feat: load markdown memory files
```

**Tasks**

Load:

```text
architecture.md
requirements.md
decisions.md
tasks.md
```

**Validation**

Memory retrieved.

---

### Step 5.3 — Load Graph Context

**Commit**

```text
feat: retrieve graph relationships
```

**Tasks**

Query Neo4j.

Return related entities.

**Validation**

Graph data returned.

---

### Step 5.4 — Context Package Builder

**Commit**

```text
feat: build optimized reload context package
```

**Tasks**

Combine:

* Markdown
* Graph knowledge

Generate:

```text
Context Package
```

**Validation**

Context package generated.

---

### Step 5.5 — Token Budget Enforcement

**Commit**

```text
feat: implement context size limits
```

**Tasks**

Target:

```text
< 2000 tokens
```

**Validation**

Large contexts trimmed.

---

# Phase 6: Intelligent Retrieval

## Goal

Return only relevant memory.

---

### Step 6.1 — Relevance Ranking Engine

**Commit**

```text
feat: add memory relevance scoring
```

**Tasks**

Rank:

* Features
* Requirements
* Decisions

**Validation**

Relevant items prioritized.

---

### Step 6.2 — Relationship Traversal

**Commit**

```text
feat: add graph relationship traversal
```

**Tasks**

Support:

```text
Feature
→ Dependencies
→ Requirements
→ Decisions
```

**Validation**

Connected context retrieved.

---

### Step 6.3 — Context Compression

**Commit**

```text
feat: compress retrieved memory
```

**Tasks**

Reduce duplicate information.

**Validation**

Smaller context packages.

---

# Phase 7: Production Hardening

## Goal

Make Recall reliable.

---

### Step 7.1 — Structured Logging

**Commit**

```text
feat: add structured application logging
```

---

### Step 7.2 — Error Handling

**Commit**

```text
feat: implement centralized error handling
```

---

### Step 7.3 — Health Checks

**Commit**

```text
feat: add neo4j and memory health checks
```

---

### Step 7.4 — Backup Strategy

**Commit**

```text
feat: implement memory backup process
```

---

# Phase 8: Semantic Search (Optional)

## Goal

Add document retrieval.

---

### Step 8.1 — Add Vector Database

**Commit**

```text
feat: add qdrant vector storage
```

---

### Step 8.2 — Embedding Service

**Commit**

```text
feat: add embedding generation service
```

---

### Step 8.3 — Semantic Retrieval

**Commit**

```text
feat: implement semantic memory retrieval
```

---

### Step 8.4 — Hybrid Retrieval

**Commit**

```text
feat: combine graph and vector retrieval
```

---

# MVP Completion Criteria

MVP is complete after:

* Phase 1 complete
* Phase 2 complete
* Phase 3 complete
* Phase 4 complete
* Phase 5 complete

At that point Recall can:

* Save project memory
* Store graph relationships
* Reload context
* Reduce token usage
* Persist knowledge across sessions

without requiring vector search or advanced AI retrieval.

