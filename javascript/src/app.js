/**
 * Collaborative To-Do List Application
 * 
 * Main CLI application controller
 */

import readline from 'readline';
import TaskManager from './taskManager.js';
import UserManager from './userManager.js';
import { TaskStatus, Category } from './dataModels.js';

// Initialize managers
const taskManager = new TaskManager();
const userManager = new UserManager();

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Prompt user for input
 * @param {string} question - Question to ask
 * @returns {Promise<string>} User's answer
 */
function prompt(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

/**
 * Display separator line
 */
function printSeparator() {
    console.log('='.repeat(60));
}

/**
 * Initialize application
 * @returns {Promise<void>}
 */
async function initializeApp() {
    try {
        console.log('\n🚀 Initializing Collaborative To-Do List...\n');
        await taskManager.initialize();
        await userManager.initialize();
        console.log('\n✅ Application initialized successfully!\n');
    } catch (error) {
        console.error('❌ Error initializing application:', error.message);
        process.exit(1);
    }
}

/**
 * Display main menu
 * @returns {Promise<void>}
 */
async function showMainMenu() {
    printSeparator();
    console.log('         COLLABORATIVE TO-DO LIST - MAIN MENU');
    printSeparator();
    console.log('1. Manage Tasks');
    console.log('2. Manage Users');
    console.log('3. Exit');
    printSeparator();

    const choice = await prompt('Select an option (1-3): ');

    switch (choice) {
        case '1':
            await showTaskMenu();
            break;
        case '2':
            await showUserMenu();
            break;
        case '3':
            console.log('\n👋 Goodbye! Thanks for using the To-Do List app.\n');
            rl.close();
            process.exit(0);
            break;
        default:
            console.log('\n❌ Invalid option. Please try again.\n');
            await showMainMenu();
    }
}

/**
 * Task Management Menu
 * @returns {Promise<void>}
 */
async function showTaskMenu() {
    printSeparator();
    console.log('              TASK MANAGEMENT MENU');
    printSeparator();
    console.log('1. Add Task');
    console.log('2. View All Tasks');
    console.log('3. View Task Details');
    console.log('4. Update Task');
    console.log('5. Delete Task');
    console.log('6. Search/Filter Tasks');
    console.log('7. Back to Main Menu');
    printSeparator();

    const choice = await prompt('Select an option (1-7): ');

    switch (choice) {
        case '1':
            await addTask();
            break;
        case '2':
            await viewAllTasks();
            break;
        case '3':
            await viewTaskDetails();
            break;
        case '4':
            await updateTask();
            break;
        case '5':
            await deleteTask();
            break;
        case '6':
            await searchFilterTasks();
            break;
        case '7':
            await showMainMenu();
            return;
        default:
            console.log('\n❌ Invalid option. Please try again.\n');
    }

    await showTaskMenu();
}

/**
 * Add a new task
 * @returns {Promise<void>}
 */
async function addTask() {
    console.log('\n--- Add New Task ---\n');

    const title = await prompt('Title: ');
    const description = await prompt('Description: ');

    // Show category options
    console.log('\nCategories:');
    Object.keys(Category).forEach((key, index) => {
        console.log(`  ${index + 1}. ${Category[key]}`);
    });
    const categoryChoice = await prompt('Select category (1-5): ');
    const categoryIndex = parseInt(categoryChoice) - 1;
    const categoryValues = Object.values(Category);
    const category = categoryValues[categoryIndex] || Category.OTHER;

    // Show status options
    console.log('\nStatus:');
    Object.keys(TaskStatus).forEach((key, index) => {
        console.log(`  ${index + 1}. ${TaskStatus[key]}`);
    });
    const statusChoice = await prompt('Select status (1-3): ');
    const statusIndex = parseInt(statusChoice) - 1;
    const statusValues = Object.values(TaskStatus);
    const status = statusValues[statusIndex] || TaskStatus.PENDING;

    // Show available users
    const users = await userManager.getAllUsers();
    if (users.length > 0) {
        console.log('\nAvailable Users:');
        users.forEach((user, index) => {
            console.log(`  ${index + 1}. ${user.name} (${user.id})`);
        });
        console.log(`  ${users.length + 1}. None (leave unassigned)`);

        const userChoice = await prompt(`Assign to user (1-${users.length + 1}): `);
        const userIndex = parseInt(userChoice) - 1;
        var assignedTo = userIndex >= 0 && userIndex < users.length ? users[userIndex].id : null;
    } else {
        console.log('\n⚠️  No users available. Task will be unassigned.');
        var assignedTo = null;
    }

    try {
        const task = await taskManager.addTask({
            title,
            description,
            category,
            status,
            assignedTo
        });

        console.log('\n✅ Task added successfully!');
        console.log(`   ID: ${task.id}`);
        console.log(`   Title: ${task.title}`);
        console.log(`   Category: ${task.category}`);
        console.log(`   Status: ${task.status}\n`);
    } catch (error) {
        console.log(`\n❌ Error adding task: ${error.message}\n`);
    }
}

/**
 * View all tasks
 * @returns {Promise<void>}
 */
async function viewAllTasks() {
    console.log('\n--- All Tasks ---\n');

    const tasks = await taskManager.getAllTasks();

    if (tasks.length === 0) {
        console.log('No tasks found.\n');
        return;
    }

    tasks.forEach(task => {
        const assignedTo = task.assignedTo || 'Unassigned';
        console.log(`[${task.id}] ${task.title}`);
        console.log(`    Category: ${task.category} | Status: ${task.status} | Assigned: ${assignedTo}`);
        console.log(`    Created: ${new Date(task.createdAt).toLocaleString()}`);
        console.log();
    });
}

/**
 * View task details
 * @returns {Promise<void>}
 */
async function viewTaskDetails() {
    console.log('\n--- View Task Details ---\n');

    const taskId = await prompt('Enter task ID: ');
    const task = await taskManager.getTaskById(parseInt(taskId));

    if (!task) {
        console.log(`\n❌ Task with ID ${taskId} not found.\n`);
        return;
    }

    printSeparator();
    console.log(`Task ID: ${task.id}`);
    console.log(`Title: ${task.title}`);
    console.log(`Description: ${task.description}`);
    console.log(`Category: ${task.category}`);
    console.log(`Status: ${task.status}`);
    console.log(`Assigned To: ${task.assignedTo || 'Unassigned'}`);
    console.log(`Created At: ${new Date(task.createdAt).toLocaleString()}`);
    printSeparator();
    console.log();
}

/**
 * Update a task
 * @returns {Promise<void>}
 */
async function updateTask() {
    console.log('\n--- Update Task ---\n');

    const taskId = await prompt('Enter task ID: ');
    const task = await taskManager.getTaskById(parseInt(taskId));

    if (!task) {
        console.log(`\n❌ Task with ID ${taskId} not found.\n`);
        return;
    }

    console.log('\nCurrent task details:');
    console.log(`  Title: ${task.title}`);
    console.log(`  Description: ${task.description}`);
    console.log(`  Category: ${task.category}`);
    console.log(`  Status: ${task.status}`);
    console.log(`  Assigned To: ${task.assignedTo || 'Unassigned'}`);

    console.log('\nLeave blank to keep current value.\n');

    const updates = {};

    const title = await prompt(`New title [${task.title}]: `);
    if (title) updates.title = title;

    const description = await prompt(`New description [${task.description}]: `);
    if (description) updates.description = description;

    console.log('\nCategories:');
    Object.keys(Category).forEach((key, index) => {
        console.log(`  ${index + 1}. ${Category[key]}`);
    });
    const categoryChoice = await prompt(`New category [${task.category}]: `);
    if (categoryChoice) {
        const categoryIndex = parseInt(categoryChoice) - 1;
        const categoryValues = Object.values(Category);
        updates.category = categoryValues[categoryIndex] || task.category;
    }

    console.log('\nStatus:');
    Object.keys(TaskStatus).forEach((key, index) => {
        console.log(`  ${index + 1}. ${TaskStatus[key]}`);
    });
    const statusChoice = await prompt(`New status [${task.status}]: `);
    if (statusChoice) {
        const statusIndex = parseInt(statusChoice) - 1;
        const statusValues = Object.values(TaskStatus);
        updates.status = statusValues[statusIndex] || task.status;
    }

    try {
        const updatedTask = await taskManager.updateTask(parseInt(taskId), updates);
        console.log('\n✅ Task updated successfully!\n');
    } catch (error) {
        console.log(`\n❌ Error updating task: ${error.message}\n`);
    }
}

/**
 * Delete a task
 * @returns {Promise<void>}
 */
async function deleteTask() {
    console.log('\n--- Delete Task ---\n');

    const taskId = await prompt('Enter task ID: ');
    const task = await taskManager.getTaskById(parseInt(taskId));

    if (!task) {
        console.log(`\n❌ Task with ID ${taskId} not found.\n`);
        return;
    }

    console.log(`\nTask to delete: ${task.title}`);
    const confirm = await prompt('Are you sure? (yes/no): ');

    if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
        const success = await taskManager.removeTask(parseInt(taskId));
        if (success) {
            console.log('\n✅ Task deleted successfully!\n');
        } else {
            console.log('\n❌ Failed to delete task.\n');
        }
    } else {
        console.log('\n❌ Deletion cancelled.\n');
    }
}

/**
 * Search and filter tasks
 * @returns {Promise<void>}
 */
async function searchFilterTasks() {
    console.log('\n--- Search/Filter Tasks ---\n');
    console.log('1. Filter by Category');
    console.log('2. Filter by Status');
    console.log('3. Filter by Assigned User');
    console.log('4. Search by Keyword');
    console.log('5. Back');

    const choice = await prompt('\nSelect option (1-5): ');
    let results = [];

    switch (choice) {
        case '1':
            console.log('\nCategories:');
            Object.keys(Category).forEach((key, index) => {
                console.log(`  ${index + 1}. ${Category[key]}`);
            });
            const categoryChoice = await prompt('Select category (1-5): ');
            const categoryIndex = parseInt(categoryChoice) - 1;
            const categoryValues = Object.values(Category);
            const category = categoryValues[categoryIndex];
            if (category) {
                results = await taskManager.filterByCategory(category);
            }
            break;

        case '2':
            console.log('\nStatus:');
            Object.keys(TaskStatus).forEach((key, index) => {
                console.log(`  ${index + 1}. ${TaskStatus[key]}`);
            });
            const statusChoice = await prompt('Select status (1-3): ');
            const statusIndex = parseInt(statusChoice) - 1;
            const statusValues = Object.values(TaskStatus);
            const status = statusValues[statusIndex];
            if (status) {
                results = await taskManager.filterByStatus(status);
            }
            break;

        case '3':
            const users = await userManager.getAllUsers();
            if (users.length === 0) {
                console.log('\n❌ No users available.\n');
                return;
            }
            console.log('\nUsers:');
            users.forEach((user, index) => {
                console.log(`  ${index + 1}. ${user.name} (${user.id})`);
            });
            const userChoice = await prompt(`Select user (1-${users.length}): `);
            const userIndex = parseInt(userChoice) - 1;
            if (userIndex >= 0 && userIndex < users.length) {
                results = await taskManager.filterByUser(users[userIndex].id);
            }
            break;

        case '4':
            const keyword = await prompt('Enter search keyword: ');
            if (keyword) {
                results = await taskManager.searchTasks(keyword);
            }
            break;

        case '5':
            return;

        default:
            console.log('\n❌ Invalid option.\n');
            return;
    }

    console.log(`\n--- Search Results (${results.length} found) ---\n`);
    if (results.length === 0) {
        console.log('No matching tasks found.\n');
    } else {
        results.forEach(task => {
            const assignedTo = task.assignedTo || 'Unassigned';
            console.log(`[${task.id}] ${task.title}`);
            console.log(`    Category: ${task.category} | Status: ${task.status} | Assigned: ${assignedTo}`);
            console.log();
        });
    }
}

/**
 * User Management Menu
 * @returns {Promise<void>}
 */
async function showUserMenu() {
    printSeparator();
    console.log('              USER MANAGEMENT MENU');
    printSeparator();
    console.log('1. Add User');
    console.log('2. View All Users');
    console.log('3. Update User');
    console.log('4. Delete User');
    console.log('5. Back to Main Menu');
    printSeparator();

    const choice = await prompt('Select an option (1-5): ');

    switch (choice) {
        case '1':
            await addUser();
            break;
        case '2':
            await viewAllUsers();
            break;
        case '3':
            await updateUser();
            break;
        case '4':
            await deleteUser();
            break;
        case '5':
            await showMainMenu();
            return;
        default:
            console.log('\n❌ Invalid option. Please try again.\n');
    }

    await showUserMenu();
}

/**
 * Add a new user
 * @returns {Promise<void>}
 */
async function addUser() {
    console.log('\n--- Add New User ---\n');

    const name = await prompt('Name: ');
    const email = await prompt('Email: ');

    try {
        const user = await userManager.addUser({ name, email });
        console.log('\n✅ User added successfully!');
        console.log(`   ID: ${user.id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}\n`);
    } catch (error) {
        console.log(`\n❌ Error adding user: ${error.message}\n`);
    }
}

/**
 * View all users
 * @returns {Promise<void>}
 */
async function viewAllUsers() {
    console.log('\n--- All Users ---\n');

    const users = await userManager.getAllUsers();

    if (users.length === 0) {
        console.log('No users found.\n');
        return;
    }

    users.forEach(user => {
        console.log(`[${user.id}] ${user.name}`);
        console.log(`    Email: ${user.email}`);
        console.log();
    });
}

/**
 * Update a user
 * @returns {Promise<void>}
 */
async function updateUser() {
    console.log('\n--- Update User ---\n');

    const userId = await prompt('Enter user ID: ');
    const user = await userManager.getUser(userId);

    if (!user) {
        console.log(`\n❌ User with ID ${userId} not found.\n`);
        return;
    }

    console.log('\nCurrent user details:');
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);

    console.log('\nLeave blank to keep current value.\n');

    const updates = {};

    const name = await prompt(`New name [${user.name}]: `);
    if (name) updates.name = name;

    const email = await prompt(`New email [${user.email}]: `);
    if (email) updates.email = email;

    try {
        await userManager.updateUser(userId, updates);
        console.log('\n✅ User updated successfully!\n');
    } catch (error) {
        console.log(`\n❌ Error updating user: ${error.message}\n`);
    }
}

/**
 * Delete a user
 * @returns {Promise<void>}
 */
async function deleteUser() {
    console.log('\n--- Delete User ---\n');

    const userId = await prompt('Enter user ID: ');
    const user = await userManager.getUser(userId);

    if (!user) {
        console.log(`\n❌ User with ID ${userId} not found.\n`);
        return;
    }

    console.log(`\nUser to delete: ${user.name} (${user.email})`);
    const confirm = await prompt('Are you sure? (yes/no): ');

    if (confirm.toLowerCase() === 'yes' || confirm.toLowerCase() === 'y') {
        const success = await userManager.removeUser(userId);
        if (success) {
            console.log('\n✅ User deleted successfully!\n');
        } else {
            console.log('\n❌ Failed to delete user.\n');
        }
    } else {
        console.log('\n❌ Deletion cancelled.\n');
    }
}

/**
 * Run the application
 * @returns {Promise<void>}
 */
async function run() {
    await initializeApp();
    await showMainMenu();
}

// Start the application
run().catch(error => {
    console.error('\n💥 Fatal error:', error.message);
    rl.close();
    process.exit(1);
});
