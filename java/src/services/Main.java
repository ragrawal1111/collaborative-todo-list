package services;

import models.Task;
import models.User;
import models.Category;
import java.util.Scanner;
import java.util.List;

public class Main {

    private static final StorageService storage = new StorageService();
    private static final TaskManager taskManager = new TaskManager(storage);
    private static final UserManager userManager = new UserManager(storage);
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("=== Collaborative To-Do List ===");

        // Setup dummy users so you have someone to assign tasks to
        userManager.addUser(new User("user001", "Alice", "alice@example.com"));
        userManager.addUser(new User("user002", "Bob", "bob@example.com"));

        while (true) {
            printMenu();
            String choice = scanner.nextLine();

            try {
                switch (choice) {
                    case "1" -> handleCreateTask(); // Updated logic here
                    case "2" -> handleCompleteTask();
                    case "3" -> handleListTasks();
                    case "4" -> handleRemoveTasks();
                    case "5" -> handleListUsers(); // Added to see available User IDs
                    case "6" -> System.exit(0);
                    default -> System.out.println("Invalid option.");
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    private static void printMenu() {
        System.out.println("\n1. Add Task");
        System.out.println("2. Complete Task");
        System.out.println("3. View All Tasks");
        System.out.println("4. Remove Task");
        System.out.println("5. View Users");
        System.out.println("6. Exit");
        System.out.print("Select: ");
    }

    private static void handleCreateTask() {
        System.out.print("Title: ");
        String title = scanner.nextLine();

        System.out.print("Description: ");
        String desc = scanner.nextLine();

        // category selection
        System.out.println("Categories: WORK, PERSONAL, SHOPPING");
        System.out.print("Category: ");
        String catInput = scanner.nextLine().toUpperCase();
        Category category = Category.valueOf(catInput);

        // CRITICAL UPDATE: Explicit User Assignment
        System.out.print("Assign to User ID (e.g., user001): ");
        String userId = scanner.nextLine();

        if (userManager.getUser(userId) == null) {
            System.out.println("User ID '" + userId + "' not found. Creating new user...");

            System.out.print("Enter Name for " + userId + ": ");
            String newName = scanner.nextLine();

            System.out.print("Enter Email for " + userId + ": ");
            String newEmail = scanner.nextLine();

            User newUser = new User(userId, newName, newEmail);
            userManager.addUser(newUser);
            System.out.println("New user '" + newName + "' created successfully.");
        }

        taskManager.createTask(title, desc, category, userId);
        System.out.println("Task assigned to " + userId);
    }

    private static void handleCompleteTask() {
        System.out.print("Enter Task ID: ");
        String id = scanner.nextLine();
        taskManager.completeTask(id);
        System.out.println("Task completed.");
    }

    private static void handleRemoveTasks() {
        System.out.print("Enter Task ID: ");
        String id = scanner.nextLine();
        taskManager.removeTask(id);
        System.out.println("Task removed successfully.");
    }

    private static void handleListTasks() {
        List<Task> tasks = taskManager.getAllTasks();
        System.out.printf("%-36s | %-15s | %-10s | %-10s%n", "ID", "Title", "Assigned To", "Status");
        System.out.println("-----------------------------------------------------------------------------");
        for (Task t : tasks) {
            System.out.printf("%-36s | %-15s | %-10s | %-10s%n",
                    t.getId(), t.getTitle(), t.getAssignedTo(), t.getStatus());
        }
    }

    private static void handleListUsers() {
        List<User> users = userManager.getAllUsers();
        users.forEach(u -> System.out.println(u.getId() + ": " + u.getName()));
    }
}