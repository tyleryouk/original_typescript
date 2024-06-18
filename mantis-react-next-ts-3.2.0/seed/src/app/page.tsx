// project import
import GuestGuard from 'utils/route-guard/GuestGuard';
import Login from 'views/auth/login';

export default function HomePage() {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
}
