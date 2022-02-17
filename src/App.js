import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"
import SplashPage from './components/splashScreen';
import DashboardPage from './components/dashboardScreen';
import ResumeformPage from './components/resumeformScreen';
import FeedbackPage from './components/feedbackScreen';

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
              <Route exact path="/" element={<SplashPage />}></Route>
              <Route exact path="/home" element={<DashboardPage />}></Route>
              <Route  path="/resumeform" element={<ResumeformPage />}></Route>
              <Route  path="/feedback" element={<FeedbackPage />}></Route>
          </Routes>
        </AuthProvider>
    </div>
  );
}

export default App;
