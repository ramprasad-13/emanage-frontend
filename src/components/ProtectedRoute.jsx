/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is authenticated (token present)

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;