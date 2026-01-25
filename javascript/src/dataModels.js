/**
 * Task Data Model
 * 
 * Represents a single task in the to-do list
 */
class Task {
    /**
     * Create a new Task
     * @param {number} id - Unique identifier
     * @param {string} title - Task title
     * @param {string} description - Detailed description
     * @param {string} category - Task category (work, personal, shopping, urgent, other)
     * @param {string} status - Task status (pending, in-progress, completed)
     * @param {string} assignedTo - User ID of assigned user
     * @param {string} createdAt - ISO 8601 timestamp
     */
    constructor(id, title, description, category, status, assignedTo, createdAt = new Date().toISOString()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
    }

    /**
     * Get task summary
     * @returns {string} Formatted task summary
     */
    toString() {
        return `[${this.status.toUpperCase()}] ${this.title} (${this.category}) - Assigned to: ${this.assignedTo}`;
    }

    /**
     * Convert task to plain object for JSON serialization
     * @returns {Object} Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            category: this.category,
            status: this.status,
            assignedTo: this.assignedTo,
            createdAt: this.createdAt
        };
    }
}

/**
 * User Data Model
 * 
 * Represents a user/team member
 */
class User {
    /**
     * Create a new User
     * @param {string} id - Unique identifier
     * @param {string} name - User's full name
     * @param {string} email - User's email address
     */
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    /**
     * Get user summary
     * @returns {string} Formatted user summary
     */
    toString() {
        return `${this.name} (${this.email})`;
    }

    /**
     * Convert user to plain object for JSON serialization
     * @returns {Object} Plain object representation
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email
        };
    }
}

/**
 * Task Status Enumeration
 */
const TaskStatus = {
    PENDING: 'pending',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed'
};

/**
 * Task Category Enumeration
 */
const Category = {
    WORK: 'work',
    PERSONAL: 'personal',
    SHOPPING: 'shopping',
    URGENT: 'urgent',
    OTHER: 'other'
};

export { Task, User, TaskStatus, Category };
