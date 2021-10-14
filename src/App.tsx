import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import { FormControl, List, TextField } from "@material-ui/core";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import TaskItem from "./TaskItem";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const unSub = db.collection("tasks").onSnapshot((snapshot) => {
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unSub();
  }, []);
  const newTask = (e: any) => {
    db.collection("tasks").add({ title: input });
    setInput("");
  };
  return (
    <div className="App">
      <h1>React Firebase Todo App</h1>
      <FormControl>
        <TextField
          label="New Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></TextField>
      </FormControl>
      <button disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
