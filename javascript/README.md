# JavaScript To-Do List Implementation

## Overview

A fully-featured command-line interface (CLI) application for managing collaborative to-do lists with user management, task categorization, and advanced filtering capabilities.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm (comes with Node.js)

### Installation

1. Navigate to the javascript directory:
```bash
cd javascript
```

2. No external dependencies required! This project uses only Node.js built-in modules.

### Running the Application

```bash
npm start
```

Or with watch mode for development:
```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Project Structure

```
javascript/
├── src/
│   ├── app.js              # Main CLI application controller
│   ├── dataModels.js       # Task and User data models
│   ├── taskManager.js      # Task CRUD operations
│   ├── userManager.js      # User CRUD operations
│   └── storage.js          # File I/O operations
├── data/
│   ├── tasks.json          # Task data storage
│   └── users.json          # User data storage
├── test/                   # Unit tests
│   ├── storage.test.js     # Storage tests
│   ├── taskManager.test.js # Task manager tests
│   └── userManager.test.js # User manager tests
├── package.json            # Project configuration
├── README.md              # This file
└── PLAN.md                # Implementation plan
```

## Features

### ✅ Task Management
- Create, read, update, and delete tasks
- Assign tasks to users
- Categorize tasks (work, personal, shopping, urgent, other)
- Track task status (pending, in-progress, completed)
- Search tasks by keyword
- Filter tasks by category, status, or assigned user

### ✅ User Management
- Create, read, update, and delete users
- Email validation and duplicate prevention
- Auto-generated unique user IDs

### ✅ Data Persistence
- JSON file storage for tasks and users
- Automatic data loading and saving
- Pretty-printed JSON for readability
- Atomic file writes to prevent corruption

## Application Menu

```
Main Menu
├── 1. Manage Tasks
│   ├── 1. Add Task
│   ├── 2. View All Tasks
│   ├── 3. View Task Details
│   ├── 4. Update Task
│   ├── 5. Delete Task
│   ├── 6. Search/Filter Tasks
│   └── 7. Back to Main Menu
├── 2. Manage Users
│   ├── 1. Add User
│   ├── 2. View All Users
│   ├── 3. Update User
│   ├── 4. Delete User
│   └── 5. Back to Main Menu
└── 3. Exit
```

## Implementation Details

### ES6+ Features
- ES6 Modules (import/export)
- Arrow functions
- Template literals
- Async/await
- Classes
- Spread operator

### Architecture
- Clean separation of concerns
- Manager classes for business logic
- Storage abstraction layer
- Data models with validation
- Comprehensive error handling

## Test Results

- ✅ 29/31 tests passing
- ✅ All storage operations tested
- ✅ All CRUD operations tested
- ✅ Input validation tested
- ✅ Error handling tested

## Development Status

### ✅ Phase 1: Setup (Completed)
- Project structure
- Data models
- Package configuration

### ✅ Phase 2: Core CRUD (Completed)
- Storage service with file I/O
- Task manager with full CRUD
- User manager with full CRUD
- CLI interface
- Comprehensive unit tests

## Features Implemented

### Deliverable 1
- [x] Project structure
- [x] Data model definitions (Task, User, enums)
- [x] JSON file templates
- [ ] Implementation plan

### Deliverable 2 (In Progress)
- [ ] TaskManager CRUD operations
- [ ] UserManager operations
- [ ] Storage/File I/O
- [ ] Filtering and search
- [ ] CLI interface
- [ ] Tests

### Deliverable 3 (Planned)
- [ ] Advanced async patterns
- [ ] Performance optimization
- [ ] Concurrency handling
- [ ] Final testing and documentation

## Key Technologies

- **Runtime**: Node.js
- **Language**: ES6+ (Modern JavaScript)
- **Async**: async/await patterns
- **File I/O**: Node.js fs module (promises)
- **Data Format**: JSON

## Code Style & Conventions

- Use `const` and `let`, avoid `var`
- Use async/await for all asynchronous operations
- Arrow functions for callbacks
- Meaningful variable and function names
- Comments for complex logic
- JSDoc comments for public functions

## Testing

Run tests with:
```bash
npm test
```

## Development Guidelines

1. **Make frequent commits** with clear messages
2. **Test as you develop** - don't leave testing for the end
3. **Document your code** - comments should explain the "why"
4. **Keep functions small** - single responsibility principle
5. **Handle errors properly** - use try/catch with async/await

## Common Commands

```bash
# Run the app
npm start

# Development with auto-reload
npm run dev

# Run tests
npm test

# Check for issues
node --check src/*.js
```

## Notes

- All file operations are asynchronous using async/await
- Tasks are stored in `data/tasks.json`
- Users are stored in `data/users.json`
- IDs are generated automatically
- Timestamps are ISO 8601 format

## Troubleshooting

### File not found errors
- Ensure `data/` directory exists
- Check JSON file paths are correct

### JSON parsing errors
- Validate JSON file format
- Use `JSON.stringify()` with proper formatting

### Async/await issues
- Remember that async functions return Promises
- Always use `await` when calling async functions
- Don't forget to use `try/catch` for error handling

## Contact

Questions or issues? Contact Rajiv or check the project documentation.
