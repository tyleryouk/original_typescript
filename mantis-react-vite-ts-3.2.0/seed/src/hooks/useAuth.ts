import { useContext } from 'react';

// auth provider
import AuthContext from 'contexts/JWTContext';

// ==============================|| AUTH HOOKS ||============================== //

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
}
