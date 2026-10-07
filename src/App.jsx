import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import DashboardLayout from './pages/DashboardLayout';
import DMDashboard from './components/Dashboard';
import MPDashboard from './pages/MPDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import CitizenDashboard from './pages/CitizenDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<DashboardLayout />}>
          <Route path="mp" element={<MPDashboard />} />
          <Route path="dm" element={<DMDashboard />} />
          <Route path="auditor" element={<AuditorDashboard />} />
          <Route path="citizen" element={<CitizenDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
