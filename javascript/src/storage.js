/**
 * Storage Service
 * 
 * Handles all file I/O operations for tasks and users
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File paths
const DATA_DIR = path.join(__dirname, '..', 'data');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

/**
 * Ensure data directory exists
 * @returns {Promise<void>}
 */
export async function initializeDataDirectory() {
    try {
        await fs.access(DATA_DIR);
    } catch (error) {
        if (error.code === 'ENOENT') {
            await fs.mkdir(DATA_DIR, { recursive: true });
            console.log('Created data directory');
        } else {
            throw error;
        }
    }
}

/**
 * Load tasks from JSON file
 * @returns {Promise<Array>} Array of task objects
 */
export async function loadTasks() {
    try {
        const content = await fs.readFile(TASKS_FILE, 'utf-8');
        const data = JSON.parse(content);

        // Validate structure
        if (!Array.isArray(data.tasks)) {
            console.warn('Invalid tasks structure, returning empty array');
            return [];
        }

        return data.tasks;
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }

        if (error instanceof SyntaxError) {
            console.error('Invalid JSON in tasks file:', error.message);
            return [];
        }

        throw error;
    }
}

/**
 * Save tasks to JSON file
 * @param {Array} tasks - Array of task objects
 * @returns {Promise<void>}
 */
export async function saveTasks(tasks) {
    try {
        await initializeDataDirectory();

        const data = {
            tasks: tasks || [],
            lastModified: new Date().toISOString()
        };

        // Pretty-print JSON for readability
        const content = JSON.stringify(data, null, 2);

        // Atomic write: write to temp file then rename
        const tempFile = TASKS_FILE + '.tmp';
        await fs.writeFile(tempFile, content, 'utf-8');
        await fs.rename(tempFile, TASKS_FILE);

    } catch (error) {
        console.error('Error saving tasks:', error.message);
        throw error;
    }
}

/**
 * Load users from JSON file
 * @returns {Promise<Array>} Array of user objects
 */
export async function loadUsers() {
    try {
        const content = await fs.readFile(USERS_FILE, 'utf-8');
        const data = JSON.parse(content);

        // Validate structure
        if (!Array.isArray(data.users)) {
            console.warn('Invalid users structure, returning empty array');
            return [];
        }

        return data.users;
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }

        if (error instanceof SyntaxError) {
            console.error('Invalid JSON in users file:', error.message);
            return [];
        }

        throw error;
    }
}

/**
 * Save users to JSON file
 * @param {Array} users - Array of user objects
 * @returns {Promise<void>}
 */
export async function saveUsers(users) {
    try {
        await initializeDataDirectory();

        const data = {
            users: users || [],
            lastModified: new Date().toISOString()
        };

        // Pretty-print JSON for readability
        const content = JSON.stringify(data, null, 2);

        // Atomic write: write to temp file then rename
        const tempFile = USERS_FILE + '.tmp';
        await fs.writeFile(tempFile, content, 'utf-8');
        await fs.rename(tempFile, USERS_FILE);

    } catch (error) {
        console.error('Error saving users:', error.message);
        throw error;
    }
}
