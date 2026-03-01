export default function PromptInput({ value, onChange, mode }) {
  const placeholders = {
    explain: "e.g. Explain how JavaScript closures work...",
    mcq: "e.g. The water cycle and its stages...",
    summarize: "Paste any text you want summarized here...",
    improve: "Paste the writing you want improved here...",
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/60 uppercase tracking-widest">
        Your Input
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholders[mode] || "Enter your text here..."}
        rows={6}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
          text-white placeholder-white/20 font-body text-sm resize-none
          focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30
          transition-all duration-200"
      />
    </div>
  );
}
