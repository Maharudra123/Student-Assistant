export default function Header() {
  return (
    <header className="border-b border-white/10 py-5 px-6">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-black font-bold text-sm">
          AI
        </div>
        <h1 className="font-display text-xl font-bold tracking-tight">
          Student Assistant
        </h1>
        <span className="ml-auto text-xs text-white/40 font-mono"></span>
      </div>
    </header>
  );
}
