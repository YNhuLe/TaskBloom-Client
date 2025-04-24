import { useState, useEffect } from "react";
import BreakdownButton from "../BreakdownButton/BreakdownButton";
import GenerateSubTaskModal from "../GenerateSubTaskModal/GenerateSubTaskModal";
import CongratsModal from "../CongratsModal/CongratsModal";
import axios from "axios";
import "./TodoList.scss";
import { useParams } from "react-router-dom";

const TodoList = (props) => {
  const param = useParams();
  const [taskList, setTaskList] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  async function getTasks() {
    try {
      const response = await axios.get(props.baseUrl);
      const tasksWithSubtasks = response.data.map((task) => ({
        ...task,
        subtasks: task.subtasks || [], // Ensure subtasks is always an array
      }));
      setTaskList(response.data);
    } catch (error) {
      console.log("Unable to get to do list data", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  async function postTask() {
    if (!newTask.trim()) return;
    try {
      await axios.post(props.baseUrl, { taskName: newTask });
      await getTasks();
      setNewTask("");
    } catch (error) {
      console.log("Unable to post task, please try again later", error);
    }
  }
  const handleTaskBreakdown = async (taskId) => {
    try {
      const response = await axios.get(`${props.baseUrl}/${taskId}/`);
      const subTaskStrings = response.data;
      const transformedSubTasks = subTaskStrings.map((text, index) => ({
        id: index,
        taskName: text,
        completed: false,
      }));

      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, subtasks: transformedSubTasks } : task
        )
      );
    } catch (error) {
      console.log("Error loading subtasks", error);
    }
  };

  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTaskId(null);
  };

  const toggleTaskCompletion = (taskId) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          if (task.subtasks && task.subtasks.length > 0) {
            return task;
          } else {
            return { ...task, completed: !task.completed };
          }
        }
        return task;
      })
    );
  };

  const toggleSubTaskCompletion = (taskId, subTaskId) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subTask) => {
            if (subTask.id === subTaskId) {
              return { ...subTask, completed: !subTask.completed };
            }
            return subTask;
          });
          const allCompleted = updatedSubtasks.every((st) => st.completed);
          return {
            ...task,
            subtasks: updatedSubtasks,
            completed: allCompleted,
          };
        }
        return task;
      })
    );
  };

  useEffect(() => {
    if (taskList.length > 0) {
      const allComplete = taskList.every((task) => {
        if (task.subtasks && task.subtasks.length > 0) {
          return task.subtasks.every((st) => st.completed);
        }
        return task.completed;
      });
      setShowCongratsModal(allComplete);
    } else {
      setShowCongratsModal(false);
    }
  }, [taskList]);

  return (
    <>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={postTask}>+ Add a todo</button>
      </div>
      <div className="todo-container">
        <ul className="todo-list">
          {taskList.map((task) => (
            <li key={task.id} className="task-item">
              <div className="task-content">
                <label>
                  <input
                    type="checkbox"
                    checked={
                      task.subtasks && task.subtasks.length > 0
                        ? task.subtasks.every((st) => st.completed)
                        : task.completed
                    }
                    onChange={() => toggleTaskCompletion(task.id)}
                    disabled={task.subtasks && task.subtasks.length > 0}
                  />
                  {task.taskName}
                </label>
                <BreakdownButton onClick={() => openModal(task.id)} />
              </div>
              {task.subtasks && task.subtasks.length > 0 && (
                <ul className="subtask-list">
                  {task.subtasks.map((subTask) => (
                    <li key={subTask.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={subTask.completed}
                          onChange={() =>
                            toggleSubTaskCompletion(task.id, subTask.id)
                          }
                        />
                        {subTask.taskName}
                      </label>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {isModalOpen && (
          <GenerateSubTaskModal
            taskId={selectedTaskId}
            onClose={closeModal}
            // onBreakdown={handleTaskBreakdown}
            onBreakdown={getTasks}
            baseUrl={props.baseUrl}
          />
        )}

        {showCongratsModal && (
          <CongratsModal onClose={() => setShowCongratsModal(false)} />
        )}
      </div>
    </>
  );
};

export default TodoList;

