package services;

import models.Task;
import models.User;
import models.Category;
import models.TaskStatus;

public class Main {
    public static void main(String[] args) {
        System.out.println("Collaborative To-Do List - Java Version");
        System.out.println("Deliverable 1: Project Structure Setup");
        System.out.println();
        
        // Test creating models
        System.out.println("Testing Data Models:");
        System.out.println("--------------------");
        
        // Create a user
        User user = new User("user001", "Namratha", "namratha@example.com");
        System.out.println("Created User: " + user);
        
        // Create a task
        Task task = new Task(
            "task001", 
            "Set up Java project structure",
            "Create all required Java classes for Deliverable 1",
            Category.WORK,
            TaskStatus.IN_PROGRESS,
            "user001"
        );
        System.out.println("Created Task: " + task);
        
        // Test enum values
        System.out.println("\nAvailable Categories:");
        for (Category cat : Category.values()) {
            System.out.println("  - " + cat);
        }
        
        System.out.println("\nAvailable Statuses:");
        for (TaskStatus status : TaskStatus.values()) {
            System.out.println("  - " + status);
        }
        
        
        System.out.println("\nTesting Service Skeletons:");
        System.out.println("--------------------------");
        
        StorageService storage = new StorageService();
        storage.loadTasks();
        
        TaskManager taskManager = new TaskManager();
        taskManager.addTask(task);
        
        UserManager userManager = new UserManager();
        userManager.addUser(user);
        
        System.out.println("\n Deliverable 1 Complete ");
        System.out.println("Project structure is ready for Deliverable 2 implementation.");
    }
}