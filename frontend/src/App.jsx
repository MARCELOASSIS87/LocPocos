// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import VeiculosPage from './pages/VeiculosPage';
import MotoristasPage from './pages/MotoristasPage';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';

function Layout() {
  // 🔥 Agora useLocation está DENTRO do <BrowserRouter>
  const location = useLocation();
  const showSidebar = location.pathname !== '/login';

  return (
    <>
      {showSidebar && <Sidebar />}
      <Box
        ml={{ base: 0, md: showSidebar ? '220px' : 0 }}
        pt={4}
        px={4}
      >
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
            path="/admin/gestao-veiculos"
            element={
              <PrivateRoute role={['super', 'admin']}>
                <VeiculosPage />
              </PrivateRoute>
            }
          />          
          <Route
            path="/admin/gestao-motoristas"
            element={
              <PrivateRoute role={['super', 'admin']}>
                <MotoristasPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
