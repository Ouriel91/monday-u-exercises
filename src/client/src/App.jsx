import "./App.css";
import Container from "./components/App/Container/Container";
import { Tab, TabList } from "monday-ui-react-core";
import "monday-ui-react-core/dist/main.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import About from "./components/other/About/Container";
import Statistics from "./components/other/Statistics/Statistics";

function App() {
  const navigate = useNavigate();

  return (
    <div>
      <Routes>
        <Route path="/" element={<Container />} />
        <Route path="about" element={<About />} />
        <Route path="stats" element={<Statistics />} />
      </Routes>

      <div className="tabs">
        <TabList>
          <Tab onClick={() => navigate("/")}>App</Tab>
          <Tab onClick={() => navigate("stats")}>Statistics</Tab>
          <Tab onClick={() => navigate("about")}>About</Tab>
        </TabList>
      </div>
    </div>
  );
}

export default App;
