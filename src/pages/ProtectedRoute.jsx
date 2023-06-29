import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../constext/AuthContext';

export default function ProtectedRoute({ children, requireAdmin }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    navigate('/', { replace: true });
  }

  return children;
}
