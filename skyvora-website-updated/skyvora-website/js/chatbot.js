/**
 * SKYVORA — AI Painter chatbot
 * Rule-based keyword matcher over PAINTING_KNOWLEDGE (paintingKnowledge.js).
 * Designed so the matching function can later be swapped for a real
 * LLM API call without changing any of the surrounding UI code —
 * see attemptApiReply() below for where that would plug in.
 */

/**
 * Normalizes text for matching: lowercase, strip punctuation, collapse whitespace.
 */
function normalizeText(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Very small, safe singularizer so "bedrooms"/"bedroom", "cracks"/"crack",
 * "brushes"/"brush" etc all match each other, without mangling words like
 * "gloss" or "process" that just happen to end in s/ss.
 */
function singularize(word) {
  if (word.length <= 3) return word;
  if (word.endsWith("sses")) return word.slice(0, -2);
  if (word.endsWith("ches") || word.endsWith("shes") || word.endsWith("xes")) return word.slice(0, -2);
  if (word.endsWith("ies") && word.length > 4) return word.slice(0, -3) + "y";
  if (word.endsWith("ss")) return word;
  if (word.endsWith("us") || word.endsWith("is")) return word;
  if (word.endsWith("s")) return word.slice(0, -1);
  return word;
}

function tokenize(str) {
  return normalizeText(str).split(" ").filter(Boolean).map(singularize);
}

// Common words that shouldn't count toward keyword matching on their own.
const STOPWORDS = new Set([
  "what", "is", "are", "do", "you", "the", "a", "an", "for", "of", "to", "in", "on",
  "i", "my", "can", "please", "should", "would", "will", "it", "me", "how", "be",
  "which", "with", "and", "or", "best", "good", "need", "needed", "use", "using", "your",
  "much", "many", "just", "really", "also", "get", "give", "tell", "know"
]);

/**
 * Matches user text against PAINTING_KNOWLEDGE using word-overlap scoring
 * rather than rigid substring matching, so plurals, reordered words and
 * partial phrasing (e.g. "paint for bedrooms" vs "bedroom paint") still
 * find the right answer instead of falling through to the fallback message.
 */
function findBestAnswer(userText) {
  const text = normalizeText(userText);
  if (!text) return null;

  const userTokens = new Set(tokenize(userText));

  let best = null;
  let bestScore = 0;

  PAINTING_KNOWLEDGE.forEach(entry => {
    let score = 0;
    entry.keywords.forEach(kw => {
      const kwNorm = normalizeText(kw);
      if (text.includes(kwNorm)) {
        // exact phrase present — strongest signal
        score += kwNorm.split(" ").length * 2;
        return;
      }
      const kwTokens = tokenize(kw).filter(t => !STOPWORDS.has(t));
      if (!kwTokens.length) return;
      const overlap = kwTokens.filter(t => userTokens.has(t)).length;
      const frac = overlap / kwTokens.length;
      if (frac === 1) {
        // all significant words present, just reordered
        score += kwTokens.length * 1.5;
      } else if (frac >= 0.5 && kwTokens.length >= 2) {
        // partial but meaningful overlap
        score += overlap * 0.5;
      }
    });
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  });

  // small talk: greetings, farewells, thanks, how-are-you, identity, owner —
  // handled whenever no painting-knowledge entry scored well enough
  const GREETING_WORDS = ["hi", "hello", "hey", "hiya", "yo", "hola"];
  const GREETING_PHRASES = ["good morning", "good afternoon", "good evening", "namaste", "vanakkam", "whats up", "sup"];
  const FAREWELL_WORDS = ["bye", "goodbye", "tata", "byee"];
  const FAREWELL_PHRASES = ["good bye", "see you", "see ya", "take care", "got to go", "gtg", "talk later", "catch you later", "have a good day", "have a great day", "ill go now", "im leaving", "signing off"];
  const THANKS_PHRASES = ["thank you", "thanks", "thank u", "ok thanks", "great thanks", "thanks a lot", "thankyou", "tq", "thnx", "thx", "much appreciated", "appreciate it"];
  const HOWAREYOU_PHRASES = ["how are you", "how r u", "how are u", "hows it going", "how is it going", "hows everything", "hows life", "how you doing"];
  const IDENTITY_PHRASES = ["who are you", "what are you", "are you a bot", "are you a robot", "are you human", "are you real", "your name", "what is your name", "whats your name", "who am i talking to", "what can you do", "what do you do"];
  const OWNER_PHRASES = ["who is your owner", "whos your owner", "who owns you", "who made you", "who created you", "who built you", "who is sathya", "whos sathya", "who runs this", "who owns skyvora", "who owns this company", "who is the owner", "whos the owner", "your owner", "your boss", "your founder", "who founded"];

  if (bestScore < 1) {
    if (
      GREETING_WORDS.some(g => userTokens.has(g)) ||
      GREETING_PHRASES.some(g => text.includes(g))
    ) {
      return { answer: "Hi sir! I'm Skyvora AI. What can I help you with today — wall painting, texture, melamine polish, PU polish, or something else?" };
    }
    if (
      FAREWELL_WORDS.some(g => userTokens.has(g)) ||
      FAREWELL_PHRASES.some(g => text.includes(g))
    ) {
      return { answer: "Goodbye, sir! Thanks for stopping by SKYVORA Painting & Finishes. Whenever you're ready, SATHYA is a call away at +91 63831 28470 or +91 99654 88325 for a site visit or quote. Have a great day!" };
    }
    if (THANKS_PHRASES.some(t => text.includes(t))) {
      return { answer: "You're most welcome! Let me know if there's anything else about your painting project I can help with." };
    }
    if (HOWAREYOU_PHRASES.some(t => text.includes(t))) {
      return { answer: "I'm doing great, thank you for asking! I'm Skyvora AI, ready to help with any painting or finishing questions — what would you like to know?" };
    }
    if (OWNER_PHRASES.some(t => text.includes(t))) {
      return { answer: "SKYVORA Painting & Finishes is owned and run by SATHYA, who you can reach directly at +91 63831 28470 or +91 99654 88325 for a site visit or quote." };
    }
    if (IDENTITY_PHRASES.some(t => text.includes(t))) {
      return { answer: "I'm Skyvora AI — the virtual painting assistant for SKYVORA Painting & Finishes, owned and run by SATHYA. I can help with wall painting, texture, melamine polish, PU polish, surface preparation and general guidance. For anything I can't cover, SATHYA is reachable at +91 63831 28470 or +91 99654 88325." };
    }
    return null;
  }

  return best;
}

/**
 * Placeholder for a future LLM-backed reply.
 * NEVER hardcode an API key here — read it from an environment variable
 * on a backend endpoint and call that endpoint from the frontend instead.
 * Example:
 *   const res = await fetch('/api/ai-painter', { method:'POST', body: JSON.stringify({ message: userText }) });
 *   return (await res.json()).reply;
 * Until a backend is wired up, the app falls back to findBestAnswer() above.
 */
async function attemptApiReply(userText) {
  return null; // not configured — falls back to local knowledge base
}

/**
 * Splits a long bot answer into short, ChatGPT-style paragraphs instead of
 * one dense wall of text. Respects existing blank-line breaks in the string
 * (\n\n) if present; otherwise groups sentences two at a time.
 */
function splitIntoParagraphs(text) {
  const manual = text.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  if (manual.length > 1) return manual;

  const sentences = text.match(/[^.!?]+[.!?]+(\s+|$)/g) || [text];
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const chunk = sentences.slice(i, i + 2).join("").trim();
    if (chunk) paragraphs.push(chunk);
  }
  return paragraphs.length ? paragraphs : [text];
}

document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.getElementById("chatBody");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const clearBtn = document.getElementById("chatClear");
  const suggestedWrap = document.getElementById("suggestedQuestions");
  if (!chatBody || !chatForm) return;

    function addMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `msg ${role}`;
    if (role === "bot") {
      const avatar = document.createElement("div");
      avatar.className = "msg-avatar";
      avatar.innerHTML = '<img src="assets/images/skyvora-mark.jpg" alt="SKYVORA">';
      msg.appendChild(avatar);
    } else {
      const avatar = document.createElement("div");
      avatar.className = "msg-avatar";
      avatar.textContent = "You";
      avatar.style.fontSize = "10px";
      msg.appendChild(avatar);
    }
    const bubble = document.createElement("div");
    if (role === "bot") {
      splitIntoParagraphs(text).forEach(para => {
        const p = document.createElement("p");
        p.textContent = para;
        bubble.appendChild(p);
      });
    } else {
      bubble.textContent = text;
    }
    msg.appendChild(bubble);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTyping() {
    const msg = document.createElement("div");
    msg.className = "msg bot";
    msg.id = "typingIndicator";
    msg.innerHTML = `<div class="msg-avatar"><img src="assets/images/skyvora-mark.jpg" alt="SKYVORA"></div><div class="msg-bubble"><div class="typing"><span></span><span></span><span></span></div></div>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  function hideTyping() {
    const el = document.getElementById("typingIndicator");
    if (el) el.remove();
  }

  async function respondTo(userText) {
    addMessage("user", userText);
    showTyping();

    const apiReply = await attemptApiReply(userText);
    const delay = 500 + Math.random() * 500;

    setTimeout(() => {
      hideTyping();
      if (apiReply) {
        addMessage("bot", apiReply);
        return;
      }
      const match = findBestAnswer(userText);
      addMessage("bot", match ? match.answer : CHAT_FALLBACK);
    }, delay);
  }

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = chatInput.value.trim();
    if (!val) return;
    chatInput.value = "";
    respondTo(val);
  });

  if (suggestedWrap) {
    SUGGESTED_QUESTIONS.forEach(q => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = q;
      b.addEventListener("click", () => respondTo(q));
      suggestedWrap.appendChild(b);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      chatBody.innerHTML = "";
      addMessage("bot", CHAT_GREETING);
    });
  }

  addMessage("bot", CHAT_GREETING);
});