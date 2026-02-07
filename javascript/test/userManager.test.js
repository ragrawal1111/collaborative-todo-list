/**
 * User Manager Tests
 * 
 * Tests for User CRUD operations
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import UserManager from '../src/userManager.js';
import * as storage from '../src/storage.js';

describe('UserManager', () => {
    let userManager;

    beforeEach(async () => {
        // Clear existing data
        await storage.saveUsers([]);

        userManager = new UserManager();
        await userManager.initialize();
    });

    test('should initialize with empty users', async () => {
        const users = await userManager.getAllUsers();
        assert.ok(Array.isArray(users), 'Should return an array');
    });

    test('should add a new user', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com'
        };

        const user = await userManager.addUser(userData);

        assert.ok(user.id, 'User should have an ID');
        assert.strictEqual(user.name, 'John Doe');
        assert.strictEqual(user.email, 'john@example.com');
    });

    test('should generate sequential user IDs', async () => {
        const user1 = await userManager.addUser({
            name: 'User One',
            email: 'user1@example.com'
        });

        const user2 = await userManager.addUser({
            name: 'User Two',
            email: 'user2@example.com'
        });

        assert.strictEqual(user1.id, 'user1');
        assert.strictEqual(user2.id, 'user2');
    });

    test('should get user by ID', async () => {
        const addedUser = await userManager.addUser({
            name: 'Jane Smith',
            email: 'jane@example.com'
        });

        const foundUser = await userManager.getUser(addedUser.id);

        assert.ok(foundUser, 'Should find the user');
        assert.strictEqual(foundUser.name, 'Jane Smith');
    });

    test('should return null for non-existent user', async () => {
        const user = await userManager.getUser('nonexistent');
        assert.strictEqual(user, null, 'Should return null');
    });

    test('should update a user', async () => {
        const user = await userManager.addUser({
            name: 'Original Name',
            email: 'original@example.com'
        });

        const updated = await userManager.updateUser(user.id, {
            name: 'Updated Name',
            email: 'updated@example.com'
        });

        assert.strictEqual(updated.name, 'Updated Name');
        assert.strictEqual(updated.email, 'updated@example.com');
    });

    test('should remove a user', async () => {
        const user = await userManager.addUser({
            name: 'To Delete',
            email: 'delete@example.com'
        });

        const success = await userManager.removeUser(user.id);
        assert.strictEqual(success, true, 'Should return true on successful delete');

        const found = await userManager.getUser(user.id);
        assert.strictEqual(found, null, 'User should be deleted');
    });

    test('should validate required fields', async () => {
        await assert.rejects(
            async () => {
                await userManager.addUser({
                    name: '',
                    email: 'test@example.com'
                });
            },
            /name cannot be empty/,
            'Should reject empty name'
        );

        await assert.rejects(
            async () => {
                await userManager.addUser({
                    name: 'Test',
                    email: ''
                });
            },
            /email cannot be empty/,
            'Should reject empty email'
        );
    });

    test('should validate email format', async () => {
        await assert.rejects(
            async () => {
                await userManager.addUser({
                    name: 'Test User',
                    email: 'invalid-email'
                });
            },
            /Invalid email format/,
            'Should reject invalid email format'
        );
    });

    test('should prevent duplicate emails', async () => {
        await userManager.addUser({
            name: 'First User',
            email: 'same@example.com'
        });

        await assert.rejects(
            async () => {
                await userManager.addUser({
                    name: 'Second User',
                    email: 'same@example.com'
                });
            },
            /already exists/,
            'Should reject duplicate email'
        );
    });

    test('should allow updating to same email', async () => {
        const user = await userManager.addUser({
            name: 'Test User',
            email: 'test@example.com'
        });

        const updated = await userManager.updateUser(user.id, {
            name: 'Updated Name',
            email: 'test@example.com'
        });

        assert.ok(updated, 'Should allow updating to same email');
    });

    test('should prevent updating to existing email', async () => {
        await userManager.addUser({
            name: 'User One',
            email: 'user1@example.com'
        });

        const user2 = await userManager.addUser({
            name: 'User Two',
            email: 'user2@example.com'
        });

        await assert.rejects(
            async () => {
                await userManager.updateUser(user2.id, {
                    email: 'user1@example.com'
                });
            },
            /already exists/,
            'Should reject updating to existing email'
        );
    });

    test('should trim whitespace from inputs', async () => {
        const user = await userManager.addUser({
            name: '  John Doe  ',
            email: '  john@example.com  '
        });

        assert.strictEqual(user.name, 'John Doe');
        assert.strictEqual(user.email, 'john@example.com');
    });
});

console.log('✅ UserManager tests completed');
