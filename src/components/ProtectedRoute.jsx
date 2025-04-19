import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');

    // Jika token tidak ada, redirect ke halaman login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika token ada, render komponen anak (children)
    return children;
};

export default ProtectedRoute;