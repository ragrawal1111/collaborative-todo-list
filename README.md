# Collaborative To-Do List Project

A group project implementing a to-do list application in both JavaScript and Java to demonstrate language differences and shared architectural patterns.

## Team Members

- **Rajiv** - JavaScript Lead
- **Namratha Kondi** - Java Lead

## Project Overview

This project aims to build a fully functional to-do list application with CRUD operations, filtering, searching, and data persistence. Both implementations share the same data models and core features while showcasing language-specific best practices.

## Technology Stack

### JavaScript Version
- **Runtime**: Node.js
- **Language**: ES6+ (modern JavaScript)
- **Async Handling**: async/await
- **Data Storage**: JSON files

### Java Version
- **Language**: Java 11+
- **Build Tool**: Maven or Gradle (TBD)
- **Data Storage**: JSON files (via JSON library)

## Project Structure

```
collaborative-todo-list/
├── javascript/           # JavaScript implementation
│   ├── src/
│   │   ├── app.js
│   │   ├── taskManager.js
│   │   ├── userManager.js
│   │   └── storage.js
│   ├── data/
│   │   ├── tasks.json
│   │   └── users.json
│   ├── package.json
│   └── README.md
├── java/                 # Java implementation
│   ├── src/
│   │   ├── models/
│   │   │   ├── Task.java
│   │   │   ├── User.java
│   │   │   ├── TaskStatus.java
│   │   │   └── Category.java
│   │   └── services/
│   │       ├── TaskManager.java
│   │       ├── UserManager.java
│   │       ├── StorageService.java
│   │       └── Main.java
│   ├── README.md
│   └── PLAN.md
├── docs/
│   └── project-proposal.md
└── README.md             # This file
```

## Key Features (Planned)

### Deliverable 1 (Jan 25, 2026)
- Project setup and planning
- Data model design
- Initial project structures for both languages
- Project proposal document

### Deliverable 2 (Feb 8, 2026)
- CRUD operations (Create, Read, Update, Delete)
- Filtering by category and status
- Search functionality
- Basic CLI interface
- Data persistence (save/load)

### Deliverable 3 (Feb 22, 2026)
- Concurrency/threading implementation
- Advanced features
- Performance comparison report
- Demo video
- Final documentation

## Getting Started

### JavaScript Setup
See [javascript/README.md](javascript/README.md)

### Java Setup
See [java/README.md](java/README.md)

## Data Models

Both implementations use the same data structures:

### Task
```
{
  id: unique identifier,
  title: string,
  description: string,
  category: enum (work, personal, shopping, urgent, etc.),
  status: enum (pending, in-progress, completed),
  assignedTo: user id,
  createdAt: timestamp
}
```

### User
```
{
  id: unique identifier,
  name: string,
  email: string
}
```

## Communication & Collaboration

- **Meetings**: Weekly check-ins
- **Code Review**: Pull request reviews before merging
- **Branching**: Feature branches for each task
- **Commits**: Frequent, meaningful commit messages

## Timeline

| Week | Dates       | Deliverable | Focus                    |
|------|-------------|-------------|--------------------------|
| 3    | Jan 18-25   | D1          | Setup, planning, structure |
| 4    | Jan 26-Feb1 | D2 (Work)   | Core CRUD operations     |
| 5    | Feb 2-8     | D2          | Filtering, search, testing|
| 6    | Feb 9-15    | D3 (Work)   | Concurrency              |
| 7    | Feb 16-22   | D3          | Report, video, polish    |

## Notes

- Keep implementations simple initially
- Document as you code
- Test frequently
- Communicate early and often
- Review each other's code
