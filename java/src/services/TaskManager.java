package services;

import models.Task;
import models.Category;
import models.TaskStatus;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class TaskManager {

    private final StorageService storageService;
    private final Map<String, Task> tasks = new ConcurrentHashMap<>();

    public TaskManager(StorageService storageService) {
        this.storageService = storageService;
        loadTasks();
    }

    private void loadTasks() {
        List<Task> loadedTasks = storageService.loadTasks();
        if (loadedTasks != null) {
            for (Task task : loadedTasks) {
                tasks.put(task.getId(), task);
            }
        }
    }

    private void persist() {
        storageService.saveTasks(new ArrayList<>(tasks.values()));
    }

    public Task addTask(Task task) {
        if (task == null || task.getId() == null) {
            throw new IllegalArgumentException("Task or Task ID cannot be null");
        }
        tasks.put(task.getId(), task);
        persist();
        return task;
    }

    public boolean removeTask(String taskId) {
        if (taskId == null) return false;
        boolean removed = tasks.remove(taskId) != null;
        if (removed) persist();
        return removed;
    }

    public Task updateTask(String taskId, Task updatedTask) {
        if (taskId == null || updatedTask == null) return null;
        if (!tasks.containsKey(taskId)) return null;

        tasks.put(taskId, updatedTask);
        persist();
        return updatedTask;
    }

    public Task completeTask(String taskId) {
        Task task = tasks.get(taskId);
        if (task == null) return null;

        task.setStatus(TaskStatus.COMPLETED);
        persist();
        return task;
    }

    public Task getTaskById(String taskId) {
        return taskId == null ? null : tasks.get(taskId);
    }

    public List<Task> getAllTasks() {
        return new ArrayList<>(tasks.values());
    }

    public List<Task> getTasksByCategory(Category category) {
        List<Task> result = new ArrayList<>();
        for (Task task : tasks.values()) {
            if (task.getCategory() == category) {
                result.add(task);
            }
        }
        return result;
    }

    public List<Task> getTasksByStatus(TaskStatus status) {
        List<Task> result = new ArrayList<>();
        for (Task task : tasks.values()) {
            if (task.getStatus() == status) {
                result.add(task);
            }
        }
        return result;
    }
}
