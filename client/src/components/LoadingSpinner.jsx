export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse-dot"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
      </div>
      <p className="text-sm text-white/40 font-mono">Generating response...</p>
    </div>
  );
}
