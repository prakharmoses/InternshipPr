// src/components/AuthProvider.jsx
import { AuthProvider } from '../hooks/useAuth';

export function AccountProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}