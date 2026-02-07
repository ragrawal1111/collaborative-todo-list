# JavaScript Implementation Plan

## Project Overview
This document outlines the JavaScript implementation strategy for the collaborative to-do list application. The implementation focuses on using modern ES6+ features, async/await patterns, and clean architecture.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│           app.js (Entry Point)          │
│      Main application controller        │
└──────────────────┬──────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
    ┌───▼────────┐    ┌──────▼──────┐
    │TaskManager │    │UserManager  │
    │(CRUD Ops)  │    │ (CRUD Ops)  │
    └───┬────────┘    └──────┬──────┘
        │                     │
        └──────────┬──────────┘
                   │
        ┌──────────▼──────────┐
        │  storage.js         │
        │  File I/O Handler   │
        └─────────────────────┘
```

## File Structure

```
javascript/
├── src/
│   ├── app.js                 # Main entry point / CLI
│   ├── dataModels.js          # Task, User classes & enums
│   ├── taskManager.js         # Task CRUD operations
│   ├── userManager.js         # User CRUD operations
│   └── storage.js             # File I/O operations
├── data/
│   ├── tasks.json             # Task data storage
│   └── users.json             # User data storage
├── test/
│   ├── taskManager.test.js    # Task tests
│   ├── userManager.test.js    # User tests
│   ├── storage.test.js        # Storage tests
│   └── integration.test.js    # Integration tests
├── package.json
├── README.md
└── PLAN.md                    # This file
```

## Implementation Timeline

### Phase 1: Setup (Week 3) ✓ COMPLETED
- [x] Create project structure
- [x] Create data models (Task, User, enums)
- [x] Create JSON templates
- [x] Initialize npm project
- [x] Create this implementation plan

### Phase 2: Core CRUD (Week 4) ✓ COMPLETED
- [x] Implement `storage.js` - File I/O operations
- [x] Implement `taskManager.js` - Task CRUD
- [x] Implement `userManager.js` - User CRUD
- [x] Create basic tests for each module
- [x] Basic CLI interface

### Phase 3: Features (Week 5)
- [ ] Implement filtering functions
- [ ] Implement search functionality
- [ ] Enhance CLI interface
- [ ] Write comprehensive tests
- [ ] Documentation and code review

### Phase 4: Advanced (Week 6-7)
- [ ] Performance optimization
- [ ] Advanced error handling
- [ ] Additional features (sorting, bulk operations)
- [ ] Final testing and documentation

## Detailed Function Plan

### 1. storage.js - File I/O Operations

```javascript
/**
 * Load tasks from JSON file
 * @returns {Promise<Array<Task>>} Array of tasks
 */
async function loadTasks()

/**
 * Save tasks to JSON file
 * @param {Array<Task>} tasks - Tasks to save
 * @returns {Promise<void>}
 */
async function saveTasks(tasks)

/**
 * Load users from JSON file
 * @returns {Promise<Array<User>>} Array of users
 */
async function loadUsers()

/**
 * Save users to JSON file
 * @param {Array<User>} users - Users to save
 * @returns {Promise<void>}
 */
async function saveUsers(users)

/**
 * Ensure data directory exists
 * @returns {Promise<void>}
 */
async function initializeDataDirectory()
```

**Key Considerations:**
- Use Node.js `fs.promises` for async file operations
- Handle file not found errors gracefully
- Validate JSON structure before returning
- Implement atomic writes to prevent data corruption
- Pretty-print JSON for readability

### 2. TaskManager.js - Task Operations

```javascript
class TaskManager {
  constructor(storage) {
    this.storage = storage;
    this.tasks = [];
    this.nextId = 1;
  }

  /**
   * Initialize with existing data
   * @returns {Promise<void>}
   */
  async initialize()

  /**
   * Add a new task
   * @param {Object} taskData - Task data without ID
   * @returns {Promise<Task>} Created task
   */
  async addTask(taskData)

  /**
   * Get task by ID
   * @param {number} taskId - Task ID
   * @returns {Promise<Task|null>} Task or null if not found
   */
  async getTaskById(taskId)

  /**
   * Get all tasks
   * @returns {Promise<Array<Task>>} All tasks
   */
  async getAllTasks()

  /**
   * Update a task
   * @param {number} taskId - Task ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Task|null>} Updated task or null
   */
  async updateTask(taskId, updates)

  /**
   * Delete a task
   * @param {number} taskId - Task ID
   * @returns {Promise<boolean>} Success flag
   */
  async removeTask(taskId)

  /**
   * Filter tasks by category
   * @param {string} category - Category to filter by
   * @returns {Promise<Array<Task>>} Filtered tasks
   */
  async filterByCategory(category)

  /**
   * Filter tasks by status
   * @param {string} status - Status to filter by
   * @returns {Promise<Array<Task>>} Filtered tasks
   */
  async filterByStatus(status)

  /**
   * Filter tasks by assigned user
   * @param {string} userId - User ID
   * @returns {Promise<Array<Task>>} Filtered tasks
   */
  async filterByUser(userId)

  /**
   * Search tasks by keyword
   * @param {string} keyword - Search keyword
   * @returns {Promise<Array<Task>>} Matching tasks
   */
  async searchTasks(keyword)

  /**
   * Save tasks to storage
   * @returns {Promise<void>}
   */
  async saveToDisk()
}
```

**Key Considerations:**
- All methods return Promises (even synchronous ones for consistency)
- ID generation is automatic and sequential
- Validate task data before adding/updating
- Maintain data consistency with storage
- Use spread operator for immutability when needed
- Case-insensitive search and filtering

### 3. UserManager.js - User Operations

```javascript
class UserManager {
  constructor(storage) {
    this.storage = storage;
    this.users = [];
  }

  /**
   * Initialize with existing data
   * @returns {Promise<void>}
   */
  async initialize()

  /**
   * Add a new user
   * @param {Object} userData - User data (name, email)
   * @returns {Promise<User>} Created user
   */
  async addUser(userData)

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<User|null>} User or null
   */
  async getUser(userId)

  /**
   * Get all users
   * @returns {Promise<Array<User>>} All users
   */
  async getAllUsers()

  /**
   * Update a user
   * @param {string} userId - User ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<User|null>} Updated user or null
   */
  async updateUser(userId, updates)

  /**
   * Delete a user
   * @param {string} userId - User ID
   * @returns {Promise<boolean>} Success flag
   */
  async removeUser(userId)

  /**
   * Save users to storage
   * @returns {Promise<void>}
   */
  async saveToDisk()
}
```

**Key Considerations:**
- User IDs are custom strings (e.g., "user1", "user2")
- Validate email format
- Check for duplicate emails
- Consider cascading deletes for user tasks

### 4. app.js - CLI Interface & Main Controller

```javascript
/**
 * Initialize application
 * @returns {Promise<void>}
 */
async function initializeApp()

/**
 * Display main menu
 * @returns {Promise<void>}
 */
async function showMainMenu()

/**
 * Task management menu
 * @returns {Promise<void>}
 */
async function showTaskMenu()

/**
 * User management menu
 * @returns {Promise<void>}
 */
async function showUserMenu()

/**
 * Run the application
 * @returns {Promise<void>}
 */
async function run()
```

**Menu Structure:**
```
Main Menu
├── 1. Manage Tasks
│   ├── 1.1 Add Task
│   ├── 1.2 View All Tasks
│   ├── 1.3 View Task Details
│   ├── 1.4 Update Task
│   ├── 1.5 Delete Task
│   └── 1.6 Search/Filter
├── 2. Manage Users
│   ├── 2.1 Add User
│   ├── 2.2 View All Users
│   ├── 2.3 Update User
│   └── 2.4 Delete User
└── 3. Exit
```

**Key Considerations:**
- Use readline or similar for user input
- Validate all inputs before processing
- Display clear, formatted output
- Handle errors gracefully with user-friendly messages
- Persist changes to disk after each operation

## Async/Await Strategy

All I/O operations will use async/await:

```javascript
// ✓ Good
async function getData() {
  try {
    const data = await storage.loadTasks();
    return data;
  } catch (error) {
    console.error('Error loading tasks:', error);
    throw error;
  }
}

// ✗ Avoid
function getData() {
  return storage.loadTasks()
    .then(data => data)
    .catch(error => console.error(error));
}
```

## Error Handling Strategy

```javascript
// File not found
try {
  const tasks = await loadTasks();
} catch (error) {
  if (error.code === 'ENOENT') {
    // Initialize with empty array
    return [];
  }
  throw error;
}

// Invalid JSON
try {
  const data = JSON.parse(content);
} catch (error) {
  console.error('Invalid JSON in file:', error.message);
  // Return default empty structure
  return { tasks: [] };
}

// Validation errors
if (!task.title || task.title.trim() === '') {
  throw new Error('Task title cannot be empty');
}
```

## Testing Strategy

### Unit Tests
- **storage.js**: Test file operations, error handling
- **TaskManager.js**: Test CRUD, filtering, search
- **UserManager.js**: Test user operations
- **dataModels.js**: Test class constructors and methods

### Integration Tests
- Test complete workflow (add user → add task → filter)
- Test data persistence across app restarts
- Test concurrent operations

### Test Tools
- Node.js built-in test runner (Node 18+)
- Or: Jest / Mocha

### Example Test
```javascript
// test/taskManager.test.js
import { TaskManager } from '../src/taskManager.js';

describe('TaskManager', () => {
  let taskManager;

  beforeEach(async () => {
    taskManager = new TaskManager(mockStorage);
    await taskManager.initialize();
  });

  test('should add a new task', async () => {
    const task = await taskManager.addTask({
      title: 'Test Task',
      description: 'A test',
      category: 'work',
      status: 'pending',
      assignedTo: 'user1'
    });
    
    expect(task.id).toBeDefined();
    expect(task.title).toBe('Test Task');
  });

  test('should filter tasks by category', async () => {
    const tasks = await taskManager.filterByCategory('work');
    expect(tasks.every(t => t.category === 'work')).toBe(true);
  });
});
```

## Code Style Guidelines

1. **Variable Naming**
   - camelCase for variables and functions
   - UPPER_SNAKE_CASE for constants
   - PascalCase for classes

2. **Comments**
   - JSDoc for all public functions/classes
   - Inline comments for complex logic only
   - No commented-out code

3. **Error Handling**
   - Always use try/catch with async/await
   - Provide meaningful error messages
   - Don't swallow errors silently

4. **Immutability**
   - Avoid mutating input parameters
   - Use spread operator: `{ ...task, status: 'completed' }`
   - Return new arrays: `[...tasks, newTask]`

5. **Async Patterns**
   ```javascript
   // ✓ Preferred
   const result = await operation();
   
   // ✗ Avoid
   const result = operation(); // Forgot await!
   ```

## Deliverable Checklist

- [ ] All CRUD operations implemented
- [ ] Filtering and search working
- [ ] Data persistence verified
- [ ] CLI interface complete
- [ ] Tests passing (>90% coverage)
- [ ] Code review completed
- [ ] README updated with usage
- [ ] All commits pushed to GitHub
- [ ] No console errors or warnings

## Dependencies

**Required** (npm packages):
- None required for basic implementation!

**Optional** (for future enhancements):
- `express` - For REST API version
- `jest` or `mocha` - For testing framework
- `inquirer` - For interactive CLI
- `chalk` - For colored terminal output
- `uuid` - For better ID generation

## Success Criteria

1. ✓ All core features implemented
2. ✓ Code follows consistent style
3. ✓ Error handling is robust
4. ✓ Tests demonstrate functionality
5. ✓ Documentation is clear and complete
6. ✓ Feature parity with Java version
7. ✓ Code commits are frequent and meaningful

## Next Steps

1. Implement storage.js first (foundation)
2. Implement data model classes
3. Implement TaskManager with tests
4. Implement UserManager with tests
5. Create CLI interface (app.js)
6. Final testing and optimization
7. Code review and merge

---

**Status**: Ready for Development  
**Last Updated**: January 25, 2026  
**Lead Developer**: Rajiv
