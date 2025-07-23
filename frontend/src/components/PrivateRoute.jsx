import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function PrivateRoute({ role, children }) {
  const token = localStorage.getItem('adminToken');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = {};
  try {
    user = jwt_decode(token);
  } catch {
    // Token inválido, remove e força login
    localStorage.removeItem('adminToken');
    return <Navigate to="/login" replace />;
  }

  // Se pediu role específica e não bate, bloqueia o acesso
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  // Se está tudo certo, retorna o filho (a rota protegida)
  return children;
}
