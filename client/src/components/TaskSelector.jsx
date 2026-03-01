const MODES = [
  {
    value: "explain",
    label: "💡 Explain a Concept",
    desc: "Get a clear, beginner-friendly explanation",
  },
  {
    value: "mcq",
    label: "📝 Generate MCQs",
    desc: "Create multiple-choice questions",
  },
  {
    value: "summarize",
    label: "📋 Summarize Text",
    desc: "Get a concise summary of any content",
  },
  {
    value: "improve",
    label: "✍️  Improve Writing Quality",
    desc: "Polish and refine your writing",
  },
];

export default function TaskSelector({ value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60 uppercase tracking-widest">
        Task Mode
      </label>
      <div className="grid grid-cols-2 gap-3">
        {MODES.map((mode) => (
          <button
            key={mode.value}
            onClick={() => onChange(mode.value)}
            className={`p-4 rounded-xl border text-left transition-all duration-200
              ${
                value === mode.value
                  ? "border-green-500 bg-green-500/10 text-green-400"
                  : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:text-white/80"
              }`}
          >
            <div className="font-medium text-sm">{mode.label}</div>
            <div className="text-xs mt-1 opacity-60">{mode.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
