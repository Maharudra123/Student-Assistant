import { useState, useEffect } from "react";
import TaskSelector from "../components/TaskSelector";
import PromptInput from "../components/PromptInput";
import ResponseDisplay from "../components/ResponseDisplay";
import LoadingSpinner from "../components/LoadingSpinner";
import { generateAIResponse, getHistoryData } from "../services/api";

export default function Home() {
  const [mode, setMode] = useState("explain");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // History and Sidebar States
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default

  const fetchHistory = async () => {
    try {
      const res = await getHistoryData();
      if (res.success) {
        setHistory(res.data);
      }
    } catch (err) {
      console.error("Could not load history", err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

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
      fetchHistory(); // Refresh history
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreHistory = (item) => {
    setMode(item.mode);
    setPrompt(item.prompt);
    setResponse(item.response);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Main Container uses flex to put Sidebar and Content side-by-side
    <div className="flex max-w-[90rem] mx-auto px-4 py-8 gap-6 relative min-h-[calc(100vh-80px)]">
      {/* Show Toggle Open Button ONLY when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-8 left-4 z-10 p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group"
          title="Open History"
        >
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* --- SIDEBAR (Collapsible) --- */}
      <aside
        className={`transition-all duration-300 ease-in-out shrink-0
          ${isSidebarOpen ? "w-full md:w-80 opacity-100" : "w-0 opacity-0 overflow-hidden hidden md:block"}
        `}
      >
        <div className="flex flex-col h-[calc(100vh-8rem)] sticky top-8 border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden">
          {/* Sidebar Header & Close Button */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.03]">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-widest">
              Recent History
            </h3>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-white/10 text-white/40 hover:text-white transition-colors"
              title="Close History"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          </div>

          {/* Sidebar Scrollable List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
              <p className="text-xs text-white/40 text-center mt-4">
                No recent interactions.
              </p>
            ) : (
              history.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handleRestoreHistory(item)}
                  className="w-full text-left bg-white/5 border border-white/10 rounded-xl p-4 hover:border-green-500/50 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                      {item.mode}
                    </span>
                    <span className="text-[10px] text-white/40 font-mono">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2 leading-relaxed group-hover:text-white transition-colors">
                    {item.prompt}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main
        className={`flex-1 transition-all duration-300 w-full ${!isSidebarOpen ? "max-w-4xl mx-auto" : "max-w-3xl"}`}
      >
        <div className="space-y-8">
          {/* Hero */}
          <div className="text-center space-y-3 pt-4">
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
        </div>
      </main>
    </div>
  );
}
