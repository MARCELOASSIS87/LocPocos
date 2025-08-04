import React from 'react';
import { Navigate } from 'react-router-dom';

/** Decodifica o payload do JWT sem dependências externas */
function decodeToken(token) {
  try {
    // pega a segunda parte do JWT (payload)
    const base64 = token.split('.')[1];
    // corrige url-safe base64 e decodifica
    const jsonPayload = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    // trata possíveis caracteres unicode
    const decoded = decodeURIComponent(
      jsonPayload
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(decoded);
  } catch (err) {
    console.error('❌ decodeToken erro:', err);
    return null;
  }
}

export default function PrivateRoute({ role, children }) {
  const token = localStorage.getItem('token');
  console.log('🔐 PrivateRoute token:', token);

  if (!token) {
    console.warn('⛔ Sem token — redirecionando para /login');
    return <Navigate to="/login" replace />;
  }

  const user = decodeToken(token);
  console.log('✅ Payload decodificado:', user);

  if (!user) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  if (role) {
    // se passou um array de roles, verifica se o user.role está incluído
    if (Array.isArray(role)) {
      if (!role.includes(user.role)) {
        console.warn(
          `⛔ Role mismatch: esperado=[${role.join(', ')}], recebido="${user.role}"`
        );
        return <Navigate to="/login" replace />;
      }
    }
    // se passou só uma string, faz a checagem normal
    else if (user.role !== role) {
      console.warn(
        `⛔ Role mismatch: esperado="${role}", recebido="${user.role}"`
      );
      return <Navigate to="/login" replace />;
    }
  }

  console.log('✔️ Autenticado OK — renderizando rota protegida');
  return children;
}
