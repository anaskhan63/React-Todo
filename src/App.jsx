import { useState, useEffect } from "react";
import "./App.css";
import Button from "./Components/Button";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState("");
  const [DateTime, setDateTime] = useState(""); // Correctly using useState here

  const handlePriorityChange = (e) => {
    setPriority(e.target.value);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (!task || !priority) {
      setError("Kindly fill all fields!");
      return;
    }

    if (todos.some(todo => todo.task === task && todo.priority === priority)) {
      setError("Task with the same priority already exists!");
      return;
    }

    setTodos((prevTodos) => [...prevTodos, { task, priority }]);

    setTask("");
    setPriority("");
    setError("");
  };

  // date and time
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="container">
        <header className="p-5 flex justify-evenly items-center">
          <h1 className="font-mono font-bold text-4xl text-center">
            Todo Web App
          </h1>
          <p>{DateTime}</p>
        </header>
        <section className="flex justify-center mt-2">
          <form className="relative w-1/2" onSubmit={handleButtonClick}>
            {error && <p className="text-red-600 underline mb-2">{error}</p>}
            <input
              onChange={handleTaskChange}
              value={task}
              required
              type="text"
              placeholder="Enter your Task Here"
              className="py-4 px-3 outline-none pr-12 rounded border w-full"
            />
            <div className="flex items-center gap-3 mt-4">
              <label className="flex items-center gap-4">
                <input
                  type="radio"
                  name="priority"
                  value="easy"
                  onChange={handlePriorityChange}
                  checked={priority === "easy"}
                  required
                  className="form-radio h-5 w-5 text-green-600"
                />
                <span className="text-green-600">Easy</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="radio"
                  name="priority"
                  onChange={handlePriorityChange}
                  checked={priority === "urgent"}
                  value="urgent"
                  required
                  className="form-radio h-5 w-5 text-yellow-600"
                />
                <span className="text-yellow-600">Urgent</span>
              </label>
              <label className="flex items-center gap-4">
                <input
                  type="radio"
                  name="priority"
                  onChange={handlePriorityChange}
                  checked={priority === "extreme"}
                  value="extreme"
                  required
                  className="form-radio h-5 w-5 text-red-600"
                />
                <span className="text-red-600">Extreme</span>
              </label>
            </div>
            <Button type={"submit"} text={"Add Todo"} />
          </form>
        </section>

        <section>
          {todos.map((todo, idx) => (
            <div key={idx} className="mt-4">
              <p>Task: {todo.task}</p>
              <p>Priority: {todo.priority}</p>
            </div>
          ))}
        </section>
      </div>
    </>
  );
}

export default App;
