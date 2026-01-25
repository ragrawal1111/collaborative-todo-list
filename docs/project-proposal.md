# Collaborative To-Do List Application - Project Proposal

**Project Duration**: Weeks 3-7 (January 25 - February 22, 2026)  
**Team Members**: Rajiv (JavaScript Lead), Namratha Kondi (Java Lead)  
**Course**: MSCS-632-A01 Advanced Programming Languages

---

## 1. Application Overview

The Collaborative To-Do List Application is a cross-platform task management system implemented in both JavaScript and Java. The primary goal is to demonstrate how different programming languages approach the same problem while maintaining consistent functionality and data models.

### Key Objectives
- Implement identical features in two different languages (JavaScript and Java)
- Compare language-specific implementation patterns and design decisions
- Practice collaborative software development with version control
- Showcase async/await patterns (JavaScript) vs threading (Java)
- Demonstrate proper data persistence and file I/O in both languages

---

## 2. Features List

### Core Features (Deliverable 2 - by Feb 8)
- **CRUD Operations**: Create, Read, Update, Delete tasks and users
- **Task Management**: Add new tasks with details (title, description, category, assignee, status)
- **User Management**: Maintain user profiles and track task assignments
- **Data Persistence**: Save and load data from JSON files
- **Filtering**: Filter tasks by category, status, or assigned user
- **Search**: Full-text search in task titles and descriptions
- **Status Tracking**: Mark tasks as pending, in-progress, or completed
- **CLI Interface**: Command-line menu for all operations

### Advanced Features (Deliverable 3 - by Feb 22)
- **Concurrency Handling**: Thread-safe operations (Java) / Async operations (JavaScript)
- **Performance Optimization**: Efficient data retrieval and manipulation
- **Error Handling**: Robust exception handling in both languages
- **Enhanced CLI**: Interactive menu system with formatted output

---

## 3. Technology Stack

### JavaScript Implementation
- **Runtime**: Node.js 16+
- **Language Version**: ES6+ (ECMAScript 2020+)
- **Key Features**: async/await, arrow functions, modern object syntax
- **Async Operations**: Promise-based file I/O
- **Data Storage**: JSON files with manual serialization
- **Testing**: Built-in or simple test framework (e.g., Jest, Mocha)
- **Package Management**: npm

### Java Implementation
- **Language Version**: Java 11 or higher
- **Build Tool**: Maven or Gradle (to be decided)
- **Key Features**: OOP principles, Exception handling, Collections Framework
- **Threading**: Java Threads for concurrent operations
- **Data Storage**: JSON files (using JSON library like Gson or Jackson)
- **Testing**: JUnit 5
- **Package Structure**: Standard Maven/Gradle directory layout

---

## 4. Data Models

### Task Entity
```
- id (Long/Number): Unique identifier (generated automatically)
- title (String): Task title/summary
- description (String): Detailed description
- category (Enum): Category classification
- status (Enum): Current task status
- assignedTo (String): ID of assigned user
- createdAt (Date/Timestamp): Creation timestamp
```

### User Entity
```
- id (String): Unique identifier
- name (String): User's full name
- email (String): User's email address
```

### Enumerations
- **TaskStatus**: PENDING, IN_PROGRESS, COMPLETED
- **Category**: WORK, PERSONAL, SHOPPING, URGENT, OTHER

---

## 5. Timeline and Milestones

### Deliverable 1 (Due: January 25, 11:59 PM EST)
**Goal**: Project setup, planning, and initial structure

**Tasks**:
- [x] Create and configure GitHub repository
- [x] Set up directory structure for both languages
- [x] Design and document data models
- [ ] Write this project proposal
- [ ] Initialize Node.js project (Rajiv)
- [ ] Create Java project structure (Namratha)
- [ ] Create data model templates in both languages
- [ ] Write implementation plans for both languages

**Deliverables**:
- GitHub repository link
- Project proposal document
- Both project structures initialized
- Data models defined in both languages

### Deliverable 2 (Due: February 8, 11:59 PM EST)
**Goal**: Core functionality implementation

**Week 4 (Jan 26 - Feb 1)**:
- Implement data model classes in both languages
- Create basic CRUD operations (Task and User managers)
- Implement file I/O and data persistence

**Week 5 (Feb 2 - Feb 8)**:
- Implement filtering and search functionality
- Create CLI interface for both implementations
- Write unit tests
- Code review and integration

**Deliverables**:
- Working CRUD operations in both languages
- Search and filter functionality
- Basic CLI interface
- Unit tests
- Updated documentation

### Deliverable 3 (Due: February 22, 11:59 PM EST)
**Goal**: Advanced features, optimization, and demonstration

**Week 6 (Feb 9 - Feb 15)**:
- Implement concurrency/threading features
- Optimize performance
- Add advanced error handling

**Week 7 (Feb 16 - Feb 22)**:
- Final testing and bug fixes
- Write comparison report (Java vs JavaScript)
- Record and edit demo video
- Final documentation and cleanup

**Deliverables**:
- Complete working application in both languages
- Concurrency implementation
- Comparison report
- Demo video
- Final code on GitHub

---

## 6. Development Approach

### Collaboration Strategy
1. **Shared Planning**: Both team members meet to design data models and architecture
2. **Parallel Development**: Each member implements in their primary language
3. **Code Review**: Regular peer reviews via GitHub pull requests
4. **Feature Parity**: Ensure both implementations have identical features
5. **Integration Testing**: Test compatibility and consistency

### Version Control
- Repository: `collaborative-todo-list` on GitHub
- Branching: Feature branches (`feature/task-manager`, `feature/search`, etc.)
- Commits: Frequent commits with clear, descriptive messages
- Pull Requests: All changes reviewed before merging to main

### Communication
- **Weekly Meetings**: Discuss progress, blockers, and next steps
- **Messaging**: Real-time communication channel (Discord/Slack/WhatsApp)
- **Documentation**: Keep README and code comments up-to-date
- **Issue Tracking**: Use GitHub Issues for bugs and tasks

---

## 7. Success Criteria

### Functional Requirements
- Both implementations support identical CRUD operations
- Data persists correctly between sessions
- Filtering and search work in both languages
- CLI interface is user-friendly and responsive

### Code Quality
- Clean, readable code with proper naming conventions
- Comprehensive comments and documentation
- Proper error handling and validation
- Well-organized project structure

### Deliverables
- All three deliverables submitted on time
- GitHub repository properly maintained
- Demo video clearly demonstrates features
- Comparison report provides meaningful insights

---

## 8. Challenges & Mitigation

### Potential Challenges
| Challenge | Mitigation Strategy |
|-----------|-------------------|
| Synchronization between two implementations | Regular code reviews and feature parity checks |
| Different async patterns (async/await vs threads) | Understand both patterns thoroughly before coding |
| JSON serialization differences | Create shared test data and validate both ways |
| Time management | Weekly check-ins and clear task division |
| Git merge conflicts | Clear branching strategy and frequent merges |

---

## 9. Roles & Responsibilities

### Rajiv (JavaScript Lead)
- **Primary**: JavaScript implementation and testing
- **Secondary**: Review Java code, provide feedback
- **Shared**: Data model design, proposal, video demo (JavaScript parts)

### Namratha Kondi (Java Lead)
- **Primary**: Java implementation and testing
- **Secondary**: Review JavaScript code, provide feedback
- **Shared**: Data model design, proposal, video demo (Java parts)

### Shared Responsibilities
- Data model design and validation
- GitHub repository setup and maintenance
- Project documentation
- Comparison report writing
- Video demo recording and editing

---

## 10. Next Steps

1. **Immediate** (Next 2-3 Days):
   - Meet to finalize data models
   - Create GitHub repository
   - Complete Deliverable 1 setup tasks
   - Set up communication channel

2. **Week 4** (Jan 26 - Feb 1):
   - Initialize projects in both languages
   - Implement basic CRUD operations
   - Start basic testing

3. **Week 5** (Feb 2 - Feb 8):
   - Complete filtering and search
   - CLI interface refinement
   - Prepare Deliverable 2 submission

---

**Project Status**: Setup Phase - Deliverable 1 In Progress  
**Last Updated**: January 25, 2026  
**Next Review**: Upon Deliverable 1 completion
