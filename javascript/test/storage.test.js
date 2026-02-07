/**
 * Storage Service Tests
 * 
 * Tests for file I/O operations
 */

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import * as storage from '../src/storage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TEST_DATA_DIR = path.join(__dirname, '..', 'data');

describe('Storage Service', () => {
    beforeEach(async () => {
        // Ensure clean state before each test
        await storage.initializeDataDirectory();
    });

    test('should initialize data directory', async () => {
        await storage.initializeDataDirectory();

        try {
            await fs.access(TEST_DATA_DIR);
            assert.ok(true, 'Data directory exists');
        } catch (error) {
            assert.fail('Data directory should exist');
        }
    });

    test('should save and load tasks', async () => {
        const testTasks = [
            {
                id: 1,
                title: 'Test Task 1',
                description: 'First test task',
                category: 'work',
                status: 'pending',
                assignedTo: 'user1',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                title: 'Test Task 2',
                description: 'Second test task',
                category: 'personal',
                status: 'completed',
                assignedTo: 'user2',
                createdAt: new Date().toISOString()
            }
        ];

        await storage.saveTasks(testTasks);
        const loadedTasks = await storage.loadTasks();

        assert.strictEqual(loadedTasks.length, 2, 'Should load 2 tasks');
        assert.strictEqual(loadedTasks[0].title, 'Test Task 1');
        assert.strictEqual(loadedTasks[1].title, 'Test Task 2');
    });

    test('should save and load users', async () => {
        const testUsers = [
            {
                id: 'user1',
                name: 'John Doe',
                email: 'john@example.com'
            },
            {
                id: 'user2',
                name: 'Jane Smith',
                email: 'jane@example.com'
            }
        ];

        await storage.saveUsers(testUsers);
        const loadedUsers = await storage.loadUsers();

        assert.strictEqual(loadedUsers.length, 2, 'Should load 2 users');
        assert.strictEqual(loadedUsers[0].name, 'John Doe');
        assert.strictEqual(loadedUsers[1].name, 'Jane Smith');
    });

    test('should handle empty tasks file', async () => {
        const tasks = await storage.loadTasks();
        assert.ok(Array.isArray(tasks), 'Should return an array');
    });

    test('should handle empty users file', async () => {
        const users = await storage.loadUsers();
        assert.ok(Array.isArray(users), 'Should return an array');
    });

    test('should save empty arrays', async () => {
        await storage.saveTasks([]);
        const tasks = await storage.loadTasks();
        assert.strictEqual(tasks.length, 0, 'Should save and load empty array');

        await storage.saveUsers([]);
        const users = await storage.loadUsers();
        assert.strictEqual(users.length, 0, 'Should save and load empty array');
    });
});

console.log('✅ Storage tests completed');
