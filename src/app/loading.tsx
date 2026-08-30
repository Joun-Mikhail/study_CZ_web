export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-amber/30 border-t-amber rounded-full animate-spin" />
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
