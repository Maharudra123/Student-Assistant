#  AI-Powered Student Assistant

**Live Demo:** [https://student-assistant-frontend.vercel.app/]  
**Backend API:** https://student-assistant-backend-dwtz.onrender.com

---

## 📖 Project Overview

The **AI-Powered Student Assistant** is a MERN-stack web application designed to help students learn more effectively. It leverages the Google Gemini API to process user input across four distinct educational modes:

-  Explaining concepts  
-  Generating Multiple-Choice Questions (MCQs)  
-  Summarizing text  
-  Improving writing quality  

The application features a modern, responsive React frontend built with **Vite** and **Tailwind CSS v4**, connected to a robust, validated **Node.js/Express backend**.

---

## 🛠 Tech Stack

### Frontend
- React 18  
- Vite  
- Tailwind CSS v4  
- Axios  
- React Markdown  

### Backend
- Node.js  
- Express.js  
- CORS  
- Node-Cron (for Render keep-alive)  

### AI Integration
- Google Gemini API (`@google/generative-ai`)  
- Model: `gemini-2.5-flash`  

### Deployment
- Vercel (Client)  
- Render (Server)  

---

## ⚙️ Setup and Run Instructions

###  Prerequisites
- Node.js installed  
- A free Google Gemini API Key (from Google AI Studio)  

---

##  Installation Steps

### 1️ Clone the repository

```bash
git clone https://github.com/Maharudra123/Student-Assistant
cd ai-student-assistant
```

---

### 2️ Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

Start the backend:

```bash
npm run dev
```

---

### 3️ Setup the Frontend

Open a new terminal window:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

###  Access the App

Open:

```
http://localhost:5173
```

---

#  AI Integration Strategy

The AI integration is strictly **decoupled from the routing logic**.  

All AI calls are handled inside:

```
server/services/ai.service.js
```

The backend utilizes **Express middleware** (`middleware/validate.js`) to:

- Sanitize user input  
- Validate input lengths  
- Validate selected modes  

This ensures:

- Protection of API limits  
- Stable execution  
- Structured prompt control  

---

#  Prompt Design Approach (Mandatory Explanation)

This application strictly **prohibits passing raw user inputs directly to the LLM**.

Instead, it utilizes a **template-based prompt engineering architecture**.

---

## 1️ How Prompts Are Structured

Every dynamically constructed prompt consists of **four mandatory layers**:

### 🔹 Role Definition
Instructs the AI on its persona  
Examples:
- "Experienced university instructor"
- "Expert academic summarizer"

This establishes correct vocabulary and tone.

---

### 🔹 Context & Rules
Provides explicit instructions including:

- Goal definition  
- Strict length constraints  
- Formatting requirements  

---

### 🔹 Universal Guardrails

A mandatory string appended to every prompt:

> "If you are uncertain about any part of this, explicitly say 'I am not fully certain, but...' rather than guessing. If the topic is inappropriate or completely nonsensical, reply only with 'I cannot fulfill this request.'"

---

### 🔹 User Input
The sanitized string provided by the user.

---

## 2️ How Different Modes Affect Prompt Generation

The `ai.service.js` file dynamically swaps templates based on the UI dropdown.

---

### 📘 Explain Mode

- Adopts a patient instructor role  
- Uses simple language  
- Restricts output to 150 words  
- Forces inclusion of a real-world analogy  

---

### 📝 MCQ Mode

- Adopts an exam designer role  
- Completely bypasses conversational prose  
- Mandates strict JSON array output  

Required JSON structure:

```json
[
  {
    "question": "string",
    "options": ["A", "B", "C", "D"],
    "answer": "Correct Option"
  }
]
```

---

### 📄 Summarize Mode

- Strict 80–120 word limit  
- Explicitly forbids adding outside information  
- Must only use source text  

---

### ✍️ Improve Mode

- Adopts writing coach role  
- Maintains original voice  
- Appends a **"Changes Made"** section at the end  
- Uses Markdown formatting  

---

## 3️ Why Prompt Constraints Were Chosen

### 🔹 JSON Enforcement (MCQ)
By forbidding markdown code blocks and demanding strict JSON:

- The React frontend can reliably use `JSON.parse()`
- Enables dynamic rendering of interactive UI cards
- Prevents formatting breakage

---

### 🔹 Length Limits

Constraints like:
- Under 150 words  
- 80–120 words  

Help to:

- Keep UI clean  
- Reduce token consumption  
- Force information distillation  
- Improve student comprehension  

---

### 🔹 Anti-Hallucination Guardrails

The guardrails ensure the tool remains:

- Educational  
- Reliable  
- Responsible  

By forcing uncertainty admission, the model avoids fabricating facts.

---

#  Final Notes

This project demonstrates:

- Full-stack MERN architecture  
- Secure backend validation  
- Advanced prompt engineering  
- Structured AI response handling  
- Production deployment workflow  

---

## 🌟 Bonus Feature: Full-Stack Session History

To elevate the user experience beyond a standard API wrapper, this application includes a fully integrated database history feature:
* **Persistent Storage:** Every interaction (prompt, task mode, and AI response) is automatically saved to a **MongoDB** database using a structured Mongoose schema.
* **Collapsible UI Sidebar:** A sleek, ChatGPT-style sidebar allows users to view their most recent queries, sorted automatically by timestamp.
* **One-Click Restore:** Clicking any past interaction in the sidebar instantly restores the exact prompt, task mode, and AI response into the main viewing window for seamless review.


---

# 👨‍💻 Author

**Maharudra Ganjure**  
B.E. Artificial Intelligence & Data Science (2023–2026)  
Full Stack Developer | MERN Stack | AI Integration  

---
