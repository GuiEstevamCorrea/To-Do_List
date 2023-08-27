package com.api.todolist.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.api.todolist.Entity.Task;
import com.api.todolist.Repository.TaskRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping
    public Iterable<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PutMapping("/{taskId}/complete")
    public ResponseEntity<String> markTaskAsCompleted(@PathVariable Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setCompleted(true);
            taskRepository.save(task);
            return ResponseEntity.ok("Task marked as completed.");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{taskId}/uncomplete")
    public ResponseEntity<String> markTaskAsUncompleted(@PathVariable Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setCompleted(false);
            taskRepository.save(task);
            return ResponseEntity.ok("Task marked as uncompleted.");
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateTaskText(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            task.setTitle(updatedTask.getTitle());
            taskRepository.save(task);
            return ResponseEntity.ok("Task text updated.");
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);
        if (optionalTask.isPresent()) {
            taskRepository.deleteById(taskId);
            return ResponseEntity.ok("Task deleted.");
        }
        return ResponseEntity.notFound().build();
    }
}
