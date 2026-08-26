import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DashboardPage from './pages/DashboardPage';
import TopicsPage from './pages/TopicsPage';
import PracticePage from './pages/PracticePage';
import ResultsPage from './pages/ResultsPage';
import HistoryPage from './pages/HistoryPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <NavBar />
        <div style={{ padding: '1rem', flex: 1 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/topics" element={<TopicsPage />} />
            <Route path="/practice" element={<PracticePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </div>
        <footer style={{ textAlign: 'center', padding: '1rem', borderTop: '1px solid #333', fontSize: '0.85rem', color: '#888' }}>
          Built with Claude as part of the AB Talks 60-Day Claude AI Challenge.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;