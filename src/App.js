import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTasks, setShowAddTasks] = useState(false);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  // Add Task
  const addTask = (task) => {
    const id = Math.floorå(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    console.log(id);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div className='container'>
      <Header
        title='Task Tracker V1'
        onAdd={() => setShowAddTasks(!showAddTasks)}
        showAdd={showAddTasks}
      />
      {showAddTasks && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No Tasks"
      )}
    </div>
  );
}
export default App;
