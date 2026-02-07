package services;

import models.Task;
import models.Category;
import models.TaskStatus;
import java.util.List;

public class TaskManager {    
    
    public Task addTask(Task task) {
        System.out.println("TaskManager.addTask() - To implement in D2");
        return null;
    }
    
    public boolean removeTask(String taskId) {
        System.out.println("TaskManager.removeTask() - To implement in D2");
        return false;
    }
    
    public Task updateTask(String taskId, Task updates) {
        System.out.println("TaskManager.updateTask() - To implement in D2");
        return null;
    }
    
    public Task getTaskById(String taskId) {
        System.out.println("TaskManager.getTaskById() - To implement in D2");
        return null;
    }
    
    public List<Task> getAllTasks() {
        System.out.println("TaskManager.getAllTasks() - To implement in D2");
        return null;
    }
}