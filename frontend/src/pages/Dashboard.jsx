import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
      <h1>Welcome to Dashboard</h1>

  const fetchTasks = async () => {
  try {
    const res = await API.get("/tasks");
    setTasks(res.data);
  } catch (err) {
    console.error(err);
  }
};


  useEffect(() => { fetchTasks(); }, []);

  const addTask = async () => {
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>

      <input placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)} />
      <button onClick={addTask}>Add Task</button>

      {tasks.map(task => (
        <div className="task" key={task._id}>
          {task.title}
          <button onClick={() => deleteTask(task._id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
