# JavaScript To-Do List Implementation

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- npm (comes with Node.js)

### Installation

1. Navigate to the javascript directory:
```bash
cd javascript
```

2. Install dependencies (if any are added):
```bash
npm install
```

### Running the Application

```bash
npm start
```

Or with watch mode for development:
```bash
npm run dev
```

### Project Structure

```
javascript/
├── src/
│   ├── app.js              # Main application entry point
│   ├── taskManager.js      # Task CRUD operations
│   ├── userManager.js      # User management
│   └── storage.js          # File I/O operations
├── data/
│   ├── tasks.json          # Task data storage
│   └── users.json          # User data storage
├── test/                   # Unit tests
│   └── *.test.js
├── package.json            # Project dependencies
├── README.md              # This file
└── PLAN.md                # Implementation plan
```

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
