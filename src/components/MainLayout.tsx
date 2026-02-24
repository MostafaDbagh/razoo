import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
