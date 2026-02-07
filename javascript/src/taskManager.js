/**
 * Task Manager
 * 
 * Handles all CRUD operations for tasks
 */

import { Task } from './dataModels.js';
import * as storage from './storage.js';

class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    /**
     * Initialize with existing data from storage
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            const tasksData = await storage.loadTasks();
            this.tasks = tasksData.map(data =>
                new Task(
                    data.id,
                    data.title,
                    data.description,
                    data.category,
                    data.status,
                    data.assignedTo,
                    data.createdAt
                )
            );

            // Set next ID to one more than the highest existing ID
            if (this.tasks.length > 0) {
                const maxId = Math.max(...this.tasks.map(t => t.id));
                this.nextId = maxId + 1;
            }

            console.log(`Loaded ${this.tasks.length} tasks`);
        } catch (error) {
            console.error('Error initializing TaskManager:', error.message);
            throw error;
        }
    }

    /**
     * Add a new task
     * @param {Object} taskData - Task data without ID
     * @returns {Promise<Task>} Created task
     */
    async addTask(taskData) {
        // Validate required fields
        if (!taskData.title || taskData.title.trim() === '') {
            throw new Error('Task title cannot be empty');
        }

        if (!taskData.category) {
            throw new Error('Task category is required');
        }

        if (!taskData.status) {
            throw new Error('Task status is required');
        }

        const task = new Task(
            this.nextId++,
            taskData.title.trim(),
            taskData.description || '',
            taskData.category,
            taskData.status,
            taskData.assignedTo || null
        );

        this.tasks.push(task);
        await this.saveToDisk();

        return task;
    }

    /**
     * Get task by ID
     * @param {number} taskId - Task ID
     * @returns {Promise<Task|null>} Task or null if not found
     */
    async getTaskById(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        return task || null;
    }

    /**
     * Get all tasks
     * @returns {Promise<Array<Task>>} All tasks
     */
    async getAllTasks() {
        return [...this.tasks]; // Return copy to prevent direct mutation
    }

    /**
     * Update a task
     * @param {number} taskId - Task ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Task|null>} Updated task or null if not found
     */
    async updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);

        if (taskIndex === -1) {
            return null;
        }

        const task = this.tasks[taskIndex];

        // Update only provided fields
        if (updates.title !== undefined) {
            if (updates.title.trim() === '') {
                throw new Error('Task title cannot be empty');
            }
            task.title = updates.title.trim();
        }

        if (updates.description !== undefined) {
            task.description = updates.description;
        }

        if (updates.category !== undefined) {
            task.category = updates.category;
        }

        if (updates.status !== undefined) {
            task.status = updates.status;
        }

        if (updates.assignedTo !== undefined) {
            task.assignedTo = updates.assignedTo;
        }

        await this.saveToDisk();

        return task;
    }

    /**
     * Delete a task
     * @param {number} taskId - Task ID
     * @returns {Promise<boolean>} Success flag
     */
    async removeTask(taskId) {
        const initialLength = this.tasks.length;
        this.tasks = this.tasks.filter(t => t.id !== taskId);

        if (this.tasks.length < initialLength) {
            await this.saveToDisk();
            return true;
        }

        return false;
    }

    /**
     * Filter tasks by category
     * @param {string} category - Category to filter by
     * @returns {Promise<Array<Task>>} Filtered tasks
     */
    async filterByCategory(category) {
        const categoryLower = category.toLowerCase();
        return this.tasks.filter(t =>
            t.category.toLowerCase() === categoryLower
        );
    }

    /**
     * Filter tasks by status
     * @param {string} status - Status to filter by
     * @returns {Promise<Array<Task>>} Filtered tasks
     */
    async filterByStatus(status) {
        const statusLower = status.toLowerCase();
        return this.tasks.filter(t =>
            t.status.toLowerCase() === statusLower
        );
    }

    /**
     * Filter tasks by assigned user
     * @param {string} userId - User ID
     * @returns {Promise<Array<Task>>} Filtered tasks
     */
    async filterByUser(userId) {
        return this.tasks.filter(t => t.assignedTo === userId);
    }

    /**
     * Search tasks by keyword (searches in title and description)
     * @param {string} keyword - Search keyword
     * @returns {Promise<Array<Task>>} Matching tasks
     */
    async searchTasks(keyword) {
        const searchTerm = keyword.toLowerCase();
        return this.tasks.filter(t =>
            t.title.toLowerCase().includes(searchTerm) ||
            t.description.toLowerCase().includes(searchTerm)
        );
    }

    /**
     * Save tasks to storage
     * @returns {Promise<void>}
     */
    async saveToDisk() {
        const tasksData = this.tasks.map(t => t.toJSON());
        await storage.saveTasks(tasksData);
    }
}

export default TaskManager;
