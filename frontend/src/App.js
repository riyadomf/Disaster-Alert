import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AlertScreen from "./screens/AlertScreen";
import HomeScreen from "./screens/HomeScreen";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Router>
      <main>
        <Container>
          <Routes>
            <Route path="/alert-subscription" element={<AlertScreen />} />
            <Route exact path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
};

export default App;
