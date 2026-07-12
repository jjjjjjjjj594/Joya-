const mic = document.getElementById("mic");
const ring = document.querySelector(".ring");
const OPENAI_API_KEY = 
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang = "hi-IN";
recognition.interimResults = false;
recognition.continuous = false;

mic.onclick = () => {

document.body.classList.add("listening");

statusText.innerHTML="🎤 Listening...";

recognition.start();
document.body.classList.remove("listening");

ring.style.filter="drop-shadow(0 0 15px #6a5cff)";
};
recognition.onresult = (event) => {

  const text = event.results[0][0].transcript;

  chat.innerHTML += `<div class="user">${text}</div>`;

  statusText.innerHTML = "🤖 ZOYA is thinking...";

  setTimeout(() => {

    const reply = askAI(text);

    chat.innerHTML += `<div class="ai">${reply}</div>`;

    speak(reply);

    statusText.innerHTML = "✅ Ready";

    chat.scrollTop = chat.scrollHeight;

  }, 700);

};

recognition.onend = () => {
  ring.style.transform = "scale(1)";
  ring.style.boxShadow = "0 0 25px #6a5cff";
};
document.body.classList.remove("listening");

ring.style.filter="drop-shadow(0 0 15px #6a5cff)";
function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);

  speech.lang = "hi-IN";
  speech.rate = 1;
  speech.pitch = 1;

  ring.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.12)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 800,
      iterations: Infinity
    }
  );

  speech.onend = () => {
    ring.getAnimations().forEach(a => a.cancel());
  };

  speechSynthesis.speak(speech);
}
async function askAI(message) {

  statusText.innerHTML = "🤖 ZOYA is thinking...";

  try {

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + OPENAI_API_KEY
      },
      body: JSON.stringify({
        model: "gpt-5.5",
        input: message
      })
    });

    const data = await response.json();

    const reply =
      data.output?.[0]?.content?.[0]?.text ||
      "Sorry, mujhe jawab nahi mila.";

    chat.innerHTML += `<div class="ai">${reply}</div>`;

    speak(reply);

    statusText.innerHTML = "✅ Ready";

    chat.scrollTop = chat.scrollHeight;

  } catch (e) {

    chat.innerHTML += `<div class="ai">Connection Error</div>`;
    statusText.innerHTML = "❌ Error";

  }
}
