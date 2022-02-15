import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SplashPage from './components/splashScreen';
import DashboardPage from './components/dashboardScreen';
import ResumeformPage from './components/resumeformScreen';

function App() {
  return (
    <div>
       <Routes>
          <Route exact path="/" element={<SplashPage />}></Route>
          <Route exact path="/home" element={<DashboardPage />}></Route>
          <Route  path="/resumeform" element={<ResumeformPage />}></Route>
        </Routes>
    </div>
  );
}

export default App;
