import Header from "./components/Layout/Header";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
      <Header></Header>
        <Routes>
          <Route path="/Login" element={<AuthPage />} exact></Route>
        </Routes>
        <Routes>
          <Route path="/Task" element={<TaskPage />} exact></Route>
        </Routes>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
