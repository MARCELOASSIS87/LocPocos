import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import HomeAdmin from './pages/AdminHome';
import MotoristaDashboard from './pages/MotoristaDashboard';
import PrivateRoute from './components/PrivateRoute'; // componente que verifica token/role

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="super">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/home"
          element={
            <PrivateRoute role="admin">
              <HomeAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/motorista/dashboard"
          element={
            <PrivateRoute role="motorista">
              <MotoristaDashboard />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
