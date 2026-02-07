/**
 * Task Manager Tests
 * 
 * Tests for Task CRUD operations
 */

import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert';
import TaskManager from '../src/taskManager.js';
import * as storage from '../src/storage.js';

describe('TaskManager', () => {
    let taskManager;

    beforeEach(async () => {
        // Clear existing data
        await storage.saveTasks([]);

        taskManager = new TaskManager();
        await taskManager.initialize();
    });

    test('should initialize with empty tasks', async () => {
        const tasks = await taskManager.getAllTasks();
        assert.ok(Array.isArray(tasks), 'Should return an array');
    });

    test('should add a new task', async () => {
        const taskData = {
            title: 'Test Task',
            description: 'A test task',
            category: 'work',
            status: 'pending',
            assignedTo: 'user1'
        };

        const task = await taskManager.addTask(taskData);

        assert.ok(task.id, 'Task should have an ID');
        assert.strictEqual(task.title, 'Test Task');
        assert.strictEqual(task.category, 'work');
        assert.strictEqual(task.status, 'pending');
        assert.strictEqual(task.assignedTo, 'user1');
    });

    test('should generate sequential IDs', async () => {
        const task1 = await taskManager.addTask({
            title: 'Task 1',
            description: 'First',
            category: 'work',
            status: 'pending'
        });

        const task2 = await taskManager.addTask({
            title: 'Task 2',
            description: 'Second',
            category: 'personal',
            status: 'pending'
        });

        assert.strictEqual(task2.id, task1.id + 1, 'IDs should be sequential');
    });

    test('should get task by ID', async () => {
        const addedTask = await taskManager.addTask({
            title: 'Find Me',
            description: 'Test',
            category: 'work',
            status: 'pending'
        });

        const foundTask = await taskManager.getTaskById(addedTask.id);

        assert.ok(foundTask, 'Should find the task');
        assert.strictEqual(foundTask.title, 'Find Me');
    });

    test('should return null for non-existent task', async () => {
        const task = await taskManager.getTaskById(9999);
        assert.strictEqual(task, null, 'Should return null');
    });

    test('should update a task', async () => {
        const task = await taskManager.addTask({
            title: 'Original Title',
            description: 'Original',
            category: 'work',
            status: 'pending',
            assignedTo: 'user1'
        });

        const updated = await taskManager.updateTask(task.id, {
            title: 'Updated Title',
            status: 'completed'
        });

        assert.strictEqual(updated.title, 'Updated Title');
        assert.strictEqual(updated.status, 'completed');
        assert.strictEqual(updated.category, 'work', 'Should keep unchanged fields');
    });

    test('should remove a task', async () => {
        const task = await taskManager.addTask({
            title: 'To Delete',
            description: 'Test',
            category: 'work',
            status: 'pending'
        });

        const success = await taskManager.removeTask(task.id);
        assert.strictEqual(success, true, 'Should return true on successful delete');

        const found = await taskManager.getTaskById(task.id);
        assert.strictEqual(found, null, 'Task should be deleted');
    });

    test('should filter tasks by category', async () => {
        await taskManager.addTask({
            title: 'Work Task',
            description: 'Test',
            category: 'work',
            status: 'pending'
        });

        await taskManager.addTask({
            title: 'Personal Task',
            description: 'Test',
            category: 'personal',
            status: 'pending'
        });

        const workTasks = await taskManager.filterByCategory('work');
        assert.strictEqual(workTasks.length, 1);
        assert.strictEqual(workTasks[0].category, 'work');
    });

    test('should filter tasks by status', async () => {
        await taskManager.addTask({
            title: 'Pending Task',
            description: 'Test',
            category: 'work',
            status: 'pending'
        });

        await taskManager.addTask({
            title: 'Completed Task',
            description: 'Test',
            category: 'work',
            status: 'completed'
        });

        const completedTasks = await taskManager.filterByStatus('completed');
        assert.strictEqual(completedTasks.length, 1);
        assert.strictEqual(completedTasks[0].status, 'completed');
    });

    test('should filter tasks by user', async () => {
        await taskManager.addTask({
            title: 'User1 Task',
            description: 'Test',
            category: 'work',
            status: 'pending',
            assignedTo: 'user1'
        });

        await taskManager.addTask({
            title: 'User2 Task',
            description: 'Test',
            category: 'work',
            status: 'pending',
            assignedTo: 'user2'
        });

        const user1Tasks = await taskManager.filterByUser('user1');
        assert.strictEqual(user1Tasks.length, 1);
        assert.strictEqual(user1Tasks[0].assignedTo, 'user1');
    });

    test('should search tasks by keyword', async () => {
        await taskManager.addTask({
            title: 'Important Meeting',
            description: 'Discuss project timeline',
            category: 'work',
            status: 'pending'
        });

        await taskManager.addTask({
            title: 'Buy groceries',
            description: 'Milk, eggs, bread',
            category: 'shopping',
            status: 'pending'
        });

        const results = await taskManager.searchTasks('meeting');
        assert.strictEqual(results.length, 1);
        assert.ok(results[0].title.toLowerCase().includes('meeting'));
    });

    test('should validate required fields', async () => {
        await assert.rejects(
            async () => {
                await taskManager.addTask({
                    title: '',
                    description: 'Test',
                    category: 'work',
                    status: 'pending'
                });
            },
            /title cannot be empty/,
            'Should reject empty title'
        );
    });
});

console.log('✅ TaskManager tests completed');
