package services;

import models.Task;
import models.Category;
import models.TaskStatus;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class TaskManager {

    private final StorageService storageService;

    public TaskManager(StorageService storageService) {
        this.storageService = storageService;
    }

    public Task createTask(String title, String description, Category category, String userId) {
        String id = UUID.randomUUID().toString();
        Task newTask = new Task(id, title, description, category, TaskStatus.PENDING, userId);
        storageService.saveTask(newTask);
        return newTask;
    }

    public boolean removeTask(String taskId) {
        // Now works because we added getTask() to StorageService
        if (storageService.getTask(taskId) != null) {
            storageService.deleteTask(taskId);
            return true;
        }
        return false;
    }

    public void completeTask(String taskId) {
        // Now works because we added getTask() to StorageService
        Task task = storageService.getTask(taskId);
        if (task != null) {
            task.setStatus(TaskStatus.COMPLETED);
            storageService.saveTask(task);
        } else {
            throw new IllegalArgumentException("Task not found: " + taskId);
        }
    }

    public List<Task> getAllTasks() {
        // Now works because we added getAllTasks() to StorageService
        return storageService.getAllTasks();
    }

    public List<Task> getTasksByUser(String userId) {
        return storageService.getAllTasks().stream()
                .filter(t -> t.getAssignedTo().equals(userId))
                .collect(Collectors.toList());
    }
}