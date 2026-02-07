# Collaborative To-Do List - Java Implementation

## Team Information
- **Java Lead:** Namratha Kondi
- **JavaScript Lead:** Rajiv
- **Project Duration:** Weeks 3-7 (Jan 25 - Feb 22, 2026)


## Data Models

### Task Model Fields
- `id` (String) - Unique identifier
- `title` (String) - Task title
- `description` (String) - Task description
- `category` (Category enum) - Task category
- `status` (TaskStatus enum) - Current status
- `assignedTo` (String) - User ID of assignee
- `createdAt` (LocalDateTime) - Creation timestamp
- `updatedAt` (LocalDateTime) - Last update timestamp

### User Model Fields
- `id` (String) - Unique identifier
- `name` (String) - User's name
- `email` (String) - User's email

## Setup Instructions

### Prerequisites
- Java JDK 11 or higher
- Text editor or IDE (VS Code, IntelliJ, Eclipse)

### Compilation
```bash
cd Java
mkdir bin
javac -d bin src/models/*.java src/services/*.java