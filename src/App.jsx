import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import ChartPage from './pages/ChartPage';
import ProtectedRoute from './components/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import FormPage from './pages/FormPage';


const App = () => {
  const location = useLocation()

  return (
    <div className='w-screen'>
      {
        !location.pathname.startsWith("/login") ? <Header /> : null
      }
      <Routes>
        <Route path='/login' Component={LoginPage} />
        <Route
          path="/chart"
          element={
            <ProtectedRoute>
              <ChartPage />
            </ProtectedRoute>
          }
        />
        <Route path='/input-form' Component={FormPage} />
        <Route
          path="*"
          element={
            localStorage.getItem('access_token') ? (
              <Navigate to="/chart" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
