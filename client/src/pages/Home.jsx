import { useState } from "react";
import TaskSelector from "../components/TaskSelector";
import PromptInput from "../components/PromptInput";
import ResponseDisplay from "../components/ResponseDisplay";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateAIResponse } from "../services/api";

export default function Home() {
  const [mode, setMode] = useState("explain");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setResponse(""); 
    setError(""); 
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) return setError("Please enter some text first.");
    setError("");
    setResponse("");
    setLoading(true);

    try {
      const data = await generateAIResponse(prompt, mode);
      setResponse(data.result);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-white">
          Ask. Learn. <span className="text-green-400">Grow.</span>
        </h2>
        <p className="text-white/50 text-sm">
          An AI-powered assistant built to help students explain, quiz,
          summarize, and write better.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/3 border border-white/10 rounded-2xl p-6 space-y-6">
        <TaskSelector value={mode} onChange={handleModeChange} />
        <PromptInput value={prompt} onChange={setPrompt} mode={mode} />

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className="w-full py-3.5 rounded-xl font-display font-bold text-sm uppercase tracking-widest
            bg-green-500 text-black hover:bg-green-400 active:scale-[0.98]
            disabled:opacity-40 disabled:cursor-not-allowed
            transition-all duration-200"
        >
          {loading ? "Generating..." : "Generate Response →"}
        </button>
      </div>

      {/* Output */}
      {loading && <LoadingSpinner />}
      {!loading && response && (
        <ResponseDisplay response={response} mode={mode} />
      )}
    </main>
  );
}
