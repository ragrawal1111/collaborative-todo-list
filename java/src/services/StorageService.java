package services;

import models.Task;
import models.User;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class StorageService {

    // In-memory thread-safe storage
    private final Map<String, Task> tasks = new ConcurrentHashMap<>();
    private final Map<String, User> users = new ConcurrentHashMap<>();

    // --- Task Methods ---

    public List<Task> loadTasks() {
        return new ArrayList<>(tasks.values());
    }

    // ADDED THIS: Required by TaskManager.completeTask()
    public Task getTask(String taskId) {
        return tasks.get(taskId);
    }

    // ADDED THIS: Required by TaskManager.getAllTasks()
    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }

    public void saveTask(Task task) {
        tasks.put(task.getId(), task);
    }

    public void deleteTask(String taskId) {
        tasks.remove(taskId);
    }

    // --- User Methods ---

    public List<User> loadUsers() {
        return new ArrayList<>(users.values());
    }

    // ADDED THIS: Often useful for validation
    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    public void saveUser(User user) {
        users.put(user.getId(), user);
    }

    public User getUser(String userId) {
        return users.get(userId);
    }
}