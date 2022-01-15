import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import DashboardPage from './components/dashboardScreen';

function App() {
  return (
    <div>
       <Routes>
          <Route exact path="/" element={<DashboardPage />}></Route>
        </Routes>
    </div>
  );
}

export default App;
