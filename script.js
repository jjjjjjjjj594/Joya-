const mic = document.getElementById("mic");
const ring = document.querySelector(".ring");
const statusText = document.getElementById("status");
const chat = document.getElementById("chat");

// Google AI Studio API Key
const GEMINI_API_KEY = "YAHAN_APNI_GEMINI_API_KEY_PASTE_KARO";

// Speech Recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Speech Recognition is not supported in this browser.");
}

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.interimResults = false;
recognition.continuous = false;

// Mic Button
mic.addEventListener("click", () => {

  document.body.classList.add("listening");

  statusText.innerHTML = "🎤 Listening...";

  ring.style.filter = "drop-shadow(0 0 60px #00d4ff)";

  recognition.start();

});

// Speech Start
recognition.onstart = () => {

  statusText.innerHTML = "🎤 Listening...";

};

// Speech End
recognition.onend = () => {

  document.body.classList.remove("listening");

  ring.style.filter = "drop-shadow(0 0 15px #6a5cff)";

  statusText.innerHTML = "✅ Ready";

};
