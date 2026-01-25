package services;

import models.Task;
import models.User;
import java.util.List;

public class StorageService {    
    
    public List<Task> loadTasks() {
        System.out.println("StorageService.loadTasks() - To implement in D2");
        return null;
    }
    
    public void saveTasks(List<Task> tasks) {
        System.out.println("StorageService.saveTasks() - To implement in D2");
    }
    
    public List<User> loadUsers() {
        System.out.println("StorageService.loadUsers() - To implement in D2");
        return null;
    }
    
    public void saveUsers(List<User> users) {
        System.out.println("StorageService.saveUsers() - To implement in D2");
    }
}