const mic = document.getElementById("mic");
const ring = document.querySelector(".ring");

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

    const reply = "Aapne kaha: " + text;

    chat.innerHTML += `<div class="ai">${reply}</div>`;

    speak(reply);

    statusText.innerHTML = "✅ Ready";

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
