import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import TaskList from "./components/task-list/TaskList";
import TaskDetails from "./components/task-details/TaskDetails";
import EditTaskDetails from "./components/edit-task-details/EditTaskDetails";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<TaskList />} exact />
          <Route path="/tasks" element={<TaskList />} exact />
          <Route path="/tasks/:id" element={<TaskDetails />} exact />
          <Route path="/add" element={<EditTaskDetails />} exact />
          <Route path="/edit/:id" element={<EditTaskDetails />} exact />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
