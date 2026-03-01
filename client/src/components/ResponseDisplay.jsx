import ReactMarkdown from "react-markdown";

export default function ResponseDisplay({ response, mode }) {
  if (!response) return null;

  // For MCQ mode, parse and render structured JSON
  if (mode === "mcq") {
    try {
      // Hybrid fix: Strip potential markdown code blocks from Gemini's JSON output
      const cleanJsonStr = response
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanJsonStr);

      return (
        <div className="animate-slide-up space-y-4">
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-widest">
            Generated Questions
          </h3>
          {parsed.questions?.map((q, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3"
            >
              <p className="font-medium text-white">
                <span className="text-green-400 mr-2">Q{i + 1}.</span>
                {q.question}
              </p>
              <ul className="space-y-2">
                {q.options.map((opt, j) => {
                  // Check if the option starts with the answer or matches it exactly
                  const isCorrect =
                    opt.startsWith(q.answer) || opt === q.answer;
                  return (
                    <li
                      key={j}
                      className={`text-sm px-3 py-2 rounded-lg transition-colors
                        ${
                          isCorrect
                            ? "bg-green-500/10 text-green-400 border border-green-500/30"
                            : "text-white/60"
                        }`}
                    >
                      {opt}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      );
    } catch (err) {
      console.error("Failed to parse MCQ JSON:", err);
      // fallback to markdown if JSON parse fails
    }
  }

  return (
    <div className="animate-slide-up space-y-3">
      <h3 className="text-sm font-medium text-white/60 uppercase tracking-widest">
        Response
      </h3>
      <div className="bg-white/5 border border-white/10 rounded-xl p-5">
        <div className="prose prose-invert prose-sm max-w-none text-white/80 leading-relaxed">
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
