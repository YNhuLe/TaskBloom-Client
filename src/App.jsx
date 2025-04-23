import { useState } from "react";
import UserStreak from "./components/UserStreak/UserStreak";
import UserDay from "./components/UserDay/UserDay";
import Header from "./components/Header/Header";
import "./App.scss";
import TodoList from "./components/TodoList/TodoList";

function App() {
  const PORT = 8080 || 5050;
  const localhost = "http://localhost:";
  const baseUrl = `${localhost + PORT}/todos`;

  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", subTasks: [] }, //mock data
    { id: 2, text: "Task 2", subTasks: [] }, //mock data
  ]);

  const handleTaskBreakdown = (taskId, subTasks) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, subTasks } : task))
    );
  };

  return (
    <>
      <main className="panels">
        <div className="side-panel">
          <UserStreak />
          <UserDay />
        </div>
        <div className="main-panel">
          <Header />
          <TodoList
            tasks={tasks}
            onTaskBreakdown={handleTaskBreakdown}
            baseUrl={baseUrl}
          />
        </div>
      </main>
    </>
  );
}

export default App;
