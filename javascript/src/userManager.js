/**
 * User Manager
 * 
 * Handles all CRUD operations for users
 */

import { User } from './dataModels.js';
import * as storage from './storage.js';

class UserManager {
    constructor() {
        this.users = [];
    }

    /**
     * Initialize with existing data from storage
     * @returns {Promise<void>}
     */
    async initialize() {
        try {
            const usersData = await storage.loadUsers();
            this.users = usersData.map(data =>
                new User(data.id, data.name, data.email)
            );

            console.log(`Loaded ${this.users.length} users`);
        } catch (error) {
            console.error('Error initializing UserManager:', error.message);
            throw error;
        }
    }

    /**
     * Add a new user
     * @param {Object} userData - User data (name, email)
     * @returns {Promise<User>} Created user
     */
    async addUser(userData) {
        // Trim inputs first
        const trimmedName = userData.name ? userData.name.trim() : '';
        const trimmedEmail = userData.email ? userData.email.trim() : '';

        // Validate required fields
        if (!trimmedName) {
            throw new Error('User name cannot be empty');
        }

        if (!trimmedEmail) {
            throw new Error('User email cannot be empty');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            throw new Error('Invalid email format');
        }

        // Check for duplicate email
        const existingUser = this.users.find(u =>
            u.email.toLowerCase() === trimmedEmail.toLowerCase()
        );

        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Generate user ID
        const userId = this.generateUserId();

        const user = new User(
            userId,
            trimmedName,
            trimmedEmail
        );

        this.users.push(user);
        await this.saveToDisk();

        return user;
    }

    /**
     * Generate a unique user ID
     * @returns {string} User ID (e.g., "user1", "user2")
     */
    generateUserId() {
        if (this.users.length === 0) {
            return 'user1';
        }

        // Extract numeric parts from existing IDs
        const numbers = this.users
            .map(u => u.id.replace(/\D/g, ''))
            .filter(n => n !== '')
            .map(n => parseInt(n));

        const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
        return `user${maxNumber + 1}`;
    }

    /**
     * Get user by ID
     * @param {string} userId - User ID
     * @returns {Promise<User|null>} User or null if not found
     */
    async getUser(userId) {
        const user = this.users.find(u => u.id === userId);
        return user || null;
    }

    /**
     * Get all users
     * @returns {Promise<Array<User>>} All users
     */
    async getAllUsers() {
        return [...this.users]; // Return copy to prevent direct mutation
    }

    /**
     * Update a user
     * @param {string} userId - User ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<User|null>} Updated user or null if not found
     */
    async updateUser(userId, updates) {
        const userIndex = this.users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return null;
        }

        const user = this.users[userIndex];

        // Update only provided fields
        if (updates.name !== undefined) {
            const trimmedName = updates.name.trim();
            if (trimmedName === '') {
                throw new Error('User name cannot be empty');
            }
            user.name = trimmedName;
        }

        if (updates.email !== undefined) {
            const trimmedEmail = updates.email.trim();
            if (trimmedEmail === '') {
                throw new Error('User email cannot be empty');
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(trimmedEmail)) {
                throw new Error('Invalid email format');
            }

            // Check for duplicate email (excluding current user)
            const existingUser = this.users.find(u =>
                u.id !== userId && u.email.toLowerCase() === trimmedEmail.toLowerCase()
            );

            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            user.email = trimmedEmail;
        }

        await this.saveToDisk();

        return user;
    }

    /**
     * Delete a user
     * @param {string} userId - User ID
     * @returns {Promise<boolean>} Success flag
     */
    async removeUser(userId) {
        const initialLength = this.users.length;
        this.users = this.users.filter(u => u.id !== userId);

        if (this.users.length < initialLength) {
            await this.saveToDisk();
            return true;
        }

        return false;
    }

    /**
     * Save users to storage
     * @returns {Promise<void>}
     */
    async saveToDisk() {
        const usersData = this.users.map(u => u.toJSON());
        await storage.saveUsers(usersData);
    }
}

export default UserManager;
