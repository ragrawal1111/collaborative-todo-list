package test;

import models.Task;
import models.User;
import models.Category;
import models.TaskStatus;
import services.StorageService;
import services.TaskManager;
import services.UserManager;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ProjectTests {

    // ANSI Colors for readable output
    private static final String GREEN = "\u001B[32m";
    private static final String RED = "\u001B[31m";
    private static final String RESET = "\u001B[0m";

    public static void main(String[] args) {
        System.out.println("Starting Comprehensive Test Suite...\n");

        int passed = 0;
        int failed = 0;

        // --- GROUP 1: User Management Tests ---
        if (testCreateAndRetrieveUser()) passed++; else failed++;
        if (testAddDuplicateUserUpdatesData()) passed++; else failed++;

        // --- GROUP 2: Task Management Tests ---
        if (testCreateTaskSuccess()) passed++; else failed++;
        if (testTaskAssignmentToUser()) passed++; else failed++;
        if (testCompleteTaskFlow()) passed++; else failed++;
        if (testRemoveTaskSuccess()) passed++; else failed++;

        // --- GROUP 3: Edge Cases ---
        if (testCompleteNonExistentTask()) passed++; else failed++;
        if (testRemoveNonExistentTask()) passed++; else failed++;
        if (testInvalidCategoryHandling()) passed++; else failed++;

        // --- GROUP 4: Simulation of Main.java Logic ---
        if (testMainClassLogic_NewUserOnFly()) passed++; else failed++;

        // --- GROUP 5: Thread Safety ---
        if (testConcurrencySafety()) passed++; else failed++;

        System.out.println("\n------------------------------------------------");
        System.out.println("Total Tests: " + (passed + failed));
        System.out.println("Passed: " + GREEN + passed + RESET);
        System.out.println("Failed: " + RED + failed + RESET);
    }

    private static boolean testCreateAndRetrieveUser() {
        System.out.print("Test: Create and Retrieve User... ");
        StorageService storage = new StorageService();
        UserManager userManager = new UserManager(storage);

        userManager.addUser(new User("u1", "John", "john@test.com"));
        User retrieved = userManager.getUser("u1");

        if (retrieved != null && retrieved.getName().equals("John")) {
            printPass();
            return true;
        }
        printFail("User not retrieved correctly.");
        return false;
    }

    private static boolean testAddDuplicateUserUpdatesData() {
        System.out.print("Test: Overwrite Existing User... ");
        StorageService storage = new StorageService();
        UserManager userManager = new UserManager(storage);

        userManager.addUser(new User("u1", "John", "old@test.com"));
        // Update user details
        userManager.addUser(new User("u1", "John Updated", "new@test.com"));

        User u = userManager.getUser("u1");
        if (u.getName().equals("John Updated")) {
            printPass();
            return true;
        }
        printFail("User data did not update on overwrite.");
        return false;
    }

    private static boolean testCreateTaskSuccess() {
        System.out.print("Test: Create Task Success... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        Task t = taskManager.createTask("Buy Milk", "Groceries", Category.SHOPPING, "u1");

        if (t.getId() != null && t.getStatus() == TaskStatus.PENDING) {
            printPass();
            return true;
        }
        printFail("Task ID was null or status was not PENDING.");
        return false;
    }

    private static boolean testTaskAssignmentToUser() {
        System.out.print("Test: Task User Assignment... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        taskManager.createTask("Code Java", "Desc", Category.WORK, "user99");
        List<Task> tasks = taskManager.getTasksByUser("user99");

        if (tasks.size() == 1 && tasks.getFirst().getAssignedTo().equals("user99")) {
            printPass();
            return true;
        }
        printFail("Could not filter tasks by User ID.");
        return false;
    }

    private static boolean testCompleteTaskFlow() {
        System.out.print("Test: Complete Task Flow... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        Task t = taskManager.createTask("Test Task", "Desc", Category.WORK, "u1");
        taskManager.completeTask(t.getId());

        Task updated = storage.getTask(t.getId());
        if (updated.getStatus() == TaskStatus.COMPLETED) {
            printPass();
            return true;
        }
        printFail("Task status did not change to COMPLETED.");
        return false;
    }

    private static boolean testRemoveTaskSuccess() {
        System.out.print("Test: Remove Task... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        Task t = taskManager.createTask("Delete Me", "Desc", Category.PERSONAL, "u1");
        boolean removed = taskManager.removeTask(t.getId());
        Task check = storage.getTask(t.getId());

        if (removed && check == null) {
            printPass();
            return true;
        }
        printFail("Task was not removed from storage.");
        return false;
    }

    // --- EDGE CASES ---

    private static boolean testCompleteNonExistentTask() {
        System.out.print("Edge Case: Complete Non-Existent Task... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        try {
            taskManager.completeTask("NON_EXISTENT_ID_999");
            printFail("Should have thrown exception.");
            return false;
        } catch (IllegalArgumentException e) {
            printPass(); // Expected behavior
            return true;
        } catch (Exception e) {
            printFail("Threw wrong exception type: " + e.getClass().getName());
            return false;
        }
    }

    private static boolean testRemoveNonExistentTask() {
        System.out.print("Edge Case: Remove Non-Existent Task... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        boolean result = taskManager.removeTask("fake-id");

        if (!result) {
            printPass();
            return true;
        }
        printFail("Should return false when removing non-existent task.");
        return false;
    }

    private static boolean testInvalidCategoryHandling() {
        System.out.print("Edge Case: Enum Validity... ");
        try {
            Category c = Category.valueOf("INVALID_CATEGORY_NAME");
            printFail("Should have thrown IllegalArgumentException.");
            return false;
        } catch (IllegalArgumentException e) {
            printPass();
            return true;
        }
    }

    // --- MAIN LOGIC SIMULATION ---

    private static boolean testMainClassLogic_NewUserOnFly() {
        System.out.print("Integration: Create User-on-the-fly Logic... ");
        StorageService storage = new StorageService();
        UserManager userManager = new UserManager(storage);
        TaskManager taskManager = new TaskManager(storage);

        // Simulation of the Main.java logic:
        String inputUserId = "newuser_123";

        // 1. Check if user exists (Main.java logic)
        if (userManager.getUser(inputUserId) == null) {
            // 2. Create user (Main.java logic)
            userManager.addUser(new User(inputUserId, "New Guy", "new@guy.com"));
        }

        // 3. Create task (Main.java logic)
        Task t = taskManager.createTask("Dynamic User Task", "Desc", Category.WORK, inputUserId);

        // Verify
        if (userManager.getUser(inputUserId) != null && t.getAssignedTo().equals(inputUserId)) {
            printPass();
            return true;
        }
        printFail("Failed to create user and assign task dynamically.");
        return false;
    }

    // --- CONCURRENCY ---

    private static boolean testConcurrencySafety() {
        System.out.print("Concurrency: Thread Safety Check... ");
        StorageService storage = new StorageService();
        TaskManager taskManager = new TaskManager(storage);

        int threadCount = 10;
        ExecutorService executor = Executors.newFixedThreadPool(threadCount);

        try {
            for (int i = 0; i < threadCount; i++) {
                final int id = i;
                executor.submit(() -> {
                    taskManager.createTask("ThreadTask-" + id, "Desc", Category.WORK, "u1");
                });
            }

            executor.shutdown();
            executor.awaitTermination(5, TimeUnit.SECONDS);

            if (taskManager.getAllTasks().size() == 10) {
                printPass();
                return true;
            } else {
                printFail("Expected 10 tasks, found " + taskManager.getAllTasks().size());
                return false;
            }
        } catch (InterruptedException e) {
            printFail("Thread interrupted.");
            return false;
        }
    }

    private static void printPass() {
        System.out.println(GREEN + "[PASS]" + RESET);
    }

    private static void printFail(String message) {
        System.out.println(RED + "[FAIL] - " + message + RESET);
    }
}