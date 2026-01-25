
# Java Implementation Plan

## Overview
This document outlines the implementation plan for the Java version of the Collaborative To-Do List.

## Deliverable 1 (Jan 25) - COMPLETE
- [x] Create Java project structure
- [x] Set up package structure (models, services)
- [x] Create data model classes:
    - [x] Task.java with all required fields
    - [x] User.java with all required fields
    - [x] TaskStatus.java enum
    - [x] Category.java enum
- [x] Create service skeleton classes:
    - [x] StorageService.java
    - [x] TaskManager.java
    - [x] UserManager.java
    - [x] Main.java
- [x] Document setup in README.md
- [x] Write implementation plan in PLAN.md

## Deliverable 2 (Feb 8) - TO DO
### Week 4 (Jan 26 - Feb 1)
- [ ] Implement Task.java complete with getters/setters
- [ ] Implement User.java complete with getters/setters
- [ ] Create TaskManager.java with CRUD operations:
    - [ ] Task addTask(Task task)
    - [ ] boolean removeTask(long taskId)
    - [ ] Task updateTask(long taskId, Task updates)
    - [ ] Task getTaskById(long taskId)
    - [ ] List<Task> getAllTasks()
- [ ] Create StorageService.java with file I/O:
    - [ ] List<Task> loadTasks() - Read from file
    - [ ] void saveTasks(List<Task> tasks) - Write to file
    - [ ] Handle exceptions properly

### Week 5 (Feb 2 - Feb 8)
- [ ] Implement filtering and search in TaskManager:
  - [ ] List<Task> filterByCategory(Category category)
  - [ ] List<Task> filterByStatus(TaskStatus status)
  - [ ] List<Task> filterByUser(String userId)
  - [ ] List<Task> searchTasks(String keyword)
- [ ] Create UserManager.java:
  - [ ] User addUser(User user)
  - [ ] User getUser(String userId)
  - [ ] List<User> getAllUsers()
- [ ] Create Main.java with CLI menu:
  - [ ] Menu options for all operations
  - [ ] Display formatted task lists
  - [ ] Handle user input
- [ ] Write tests for all functionality
- [ ] Code cleanup and documentation


### Error Handling
- Use try-catch blocks for file operations
- Validate user input in CLI
- Provide meaningful error messages

## Classes and Methods to Implement

### TaskManager.java
- addTask(Task task)
- removeTask(String taskId)
- updateTask(String taskId, Task updates)
- getTaskById(String taskId)
- getAllTasks()
- filterByCategory(Category category)
- filterByStatus(TaskStatus status)
- filterByUser(String userId)
- searchTasks(String keyword)

### UserManager.java
- addUser(User user)
- getUser(String userId)
- getAllUsers()

### StorageService.java
- loadTasks()
- saveTasks(List<Task> tasks)
- loadUsers()
- saveUsers(List<User> users)