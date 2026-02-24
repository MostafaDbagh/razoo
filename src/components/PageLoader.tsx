import Navigation from './Navigation';

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navigation />
      <div className="pt-32 min-h-[60vh] flex items-center justify-center" aria-hidden>
        <div className="h-8 w-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
