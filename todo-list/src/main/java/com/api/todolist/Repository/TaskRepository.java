package com.api.todolist.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.api.todolist.Entity.Task;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {
}
