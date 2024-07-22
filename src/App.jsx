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

    setTodos((prevTodos) => [...prevTodos, { task, priority, completed: false }]);

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

  // del todo func
  const handleDelete = (todoToDelete) => {
    setTodos((prevTodos) =>
      prevTodos.filter((todo) => todo !== todoToDelete)
    );
  };

  // done func
  const handleDoneBtn = (index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, idx) =>
        idx === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <>
      <div className="">

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
          <div className="mt-4">
            <div className="p-4 w-full flex justify-center">
              <table className="p-4 w-full">
                <thead className="bg-red-300 text-left">
                  <tr>
                    <th className="p-4 bg-green-300 w-[33%]">Todo's</th>
                    <th className="p-4 bg-green-400 w-[33%]">Priority</th>
                    <th className="p-4 bg-green-800 w-[33%] text-center">Delete/Done</th>
                  </tr>
                </thead>
                <tbody className="mt-3">
                  {todos.map((todo, idx) => (
                    <tr key={idx} className={`text-xl border ${todo.completed ? "line-through" : ""}`}>
                      <td className="p-4 font-mono">
                        {todo.task}
                      </td>
                      <td className="p-4 font-mono">
                        {todo.priority}
                      </td>
                      <td className="p-4 font-mono text-center">
                        <div className="flex items-center justify-center gap-4">
                          <i
                            onClick={() => handleDoneBtn(idx)}
                            className={`ri-check-double-fill text-2xl cursor-pointer ${todo.completed ? 'text-green-500' : 'text-blue-500'}`}
                          ></i>
                          <i
                            onClick={() => handleDelete(todo)}
                            className="ri-delete-bin-line text-2xl text-red-600 cursor-pointer"
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
