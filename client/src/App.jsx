import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RideForm from './pages/RideForm';
import RideDetails from './pages/RideDetails';
import AdminDashboard from './pages/AdminDashboard';
import MyJoinedRides from './pages/MyJoinedRides';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContext } from './context/AuthContext';
import './App.css';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ride/new"
            element={
              <ProtectedRoute>
                <RideForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rides/:id"
            element={
              <ProtectedRoute>
                <RideDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                {user?.user_type === 'admin' ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/home" replace />
                )}
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-joined-rides"
            element={
              <ProtectedRoute>
                <MyJoinedRides />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;