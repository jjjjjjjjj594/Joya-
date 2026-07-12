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
// Speech Result
recognition.onresult = async (event) => {

  const text = event.results[0][0].transcript;

  chat.innerHTML += `<div class="user">${text}</div>`;
  chat.scrollTop = chat.scrollHeight;

  statusText.innerHTML = "🤖 ZOYA is thinking...";

  await askAI(text);

};

// Speak Function
function speak(message) {

  const speech = new SpeechSynthesisUtterance(message);

  speech.lang = "hi-IN";
  speech.rate = 1;
  speech.pitch = 1;

  ring.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.08)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 800,
      iterations: Infinity
    }
  );

  speech.onend = () => {

    ring.getAnimations().forEach(a => a.cancel());

    statusText.innerHTML = "✅ Ready";

  };

  speechSynthesis.speak(speech);

}
