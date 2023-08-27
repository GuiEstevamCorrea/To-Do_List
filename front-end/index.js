const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addButton.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        try {
            const response = await fetch('http://localhost:8080/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: taskText,
                    completed: false
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            }

            const newTask = await response.json();
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" class="task-checkbox">
                <span class="task-text">${taskText}</span>
                <span class="edit-button">✎</span>
                <span class="delete-button">🗑️</span>
            `;
            listItem.dataset.taskId = newTask.id; 
            taskList.appendChild(listItem);
            taskInput.value = '';
        } catch (error) {
            console.error(error);
        }
    }
});

taskList.addEventListener("change", async (event) => {
  const checkbox = event.target;
  const listItem = checkbox.parentElement;
  const taskId = Number(listItem.dataset.taskId); 

  try {
    const response = await fetch(
      `http://localhost:8080/api/tasks/${taskId}/complete`,
      {
        method: "PUT",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to mark task as completed");
    }
  } catch (error) {
    console.error(error);
    checkbox.checked = !checkbox.checked;
  }
});

taskList.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-button")) {
    const listItem = event.target.parentElement;
    const taskId = Number(listItem.dataset.taskId); 

    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      listItem.remove();
    } catch (error) {
      console.error(error);
    }
  } else if (event.target.classList.contains("edit-button")) {
    const listItem = event.target.parentElement;
    const taskTextElement = listItem.querySelector('.task-text');

    const updatedText = prompt('Edit task:', taskTextElement.textContent);
    if (updatedText !== null && updatedText.trim() !== '') {
        try {
            const taskId = Number(listItem.dataset.taskId);
            const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updatedText
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            taskTextElement.textContent = updatedText;
        } catch (error) {
            console.error(error);
        }
    }
  }
});
