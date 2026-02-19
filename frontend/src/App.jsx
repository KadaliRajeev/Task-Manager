import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [aiDescription, setAiDescription] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:5000/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post("http://127.0.0.1:5000/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Generate AI Description
  const generateDescription = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/generate-description",
        { title }
      );

      setAiDescription(res.data.description);
    } catch (error) {
      console.error("AI error:", error);
    }
  };

  // Toggle complete
  const toggleTask = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "420px",
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#1e1e1e",
          boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          Task Manager
        </h2>

        {/* Input Section */}
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task"
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #444",
              backgroundColor: "#2a2a2a",
              color: "white",
              outline: "none",
            }}
          />
          <button
            onClick={addTask}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {/* AI Button */}
        <button
          onClick={generateDescription}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
            marginBottom: "15px",
          }}
        >
          Generate AI Description
        </button>

        {/* AI Output */}
        {aiDescription && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#2a2a2a",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "14px",
              color: "#ccc",
            }}
          >
            <strong>AI Suggestion:</strong>
            <p style={{ marginTop: "5px" }}>{aiDescription}</p>
          </div>
        )}

        {/* Task List */}
        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#aaa" }}>
            No tasks yet
          </p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #333",
                }}
              >
                <span
                  onClick={() => toggleTask(task.id)}
                  style={{
                    cursor: "pointer",
                    textDecoration: task.completed
                      ? "line-through"
                      : "none",
                  }}
                >
                  {task.title}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{
                    backgroundColor: "#ff4d4d",
                    border: "none",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
