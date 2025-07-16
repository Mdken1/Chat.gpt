document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById("micBtn");
  const imgBtn = document.getElementById("imgBtn");
  const imageUpload = document.getElementById("imageUpload");
  const messagesContainer = document.getElementById("messages");

  // Handle sending text
  function handleInput() {
    const input = inputField.value.trim();
    if (input === "") return;
    inputField.value = "";
    output(input);
  }

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleInput();
  });
  sendBtn.addEventListener("click", handleInput);

  // Voice input
  micBtn.onclick = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      inputField.value = text;
      handleInput();
    };
  };

  // Image upload
  imgBtn.onclick = () => imageUpload.click();

  imageUpload.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      addMessage('user', reader.result, true);
      botReply('Searching the image... (not functional yet)');
    };
    reader.readAsDataURL(file);
  };

  // Add message to DOM
  function addMessage(sender, text, isImage = false) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const span = document.createElement('span');
    if (isImage) {
      const img = document.createElement('img');
      img.src = text;
      img.style.maxWidth = '140px';
      img.style.borderRadius = '10px';
      span.appendChild(img);
    } else {
      span.innerText = text;
    }
    const avatar = document.createElement('img');
    avatar.src = sender === 'user' ? 'user.jpg' : 'bot.jpg';
    avatar.className = 'avatar';
    if (sender === 'user') {
      msgDiv.append(span, avatar);
    } else {
      msgDiv.append(avatar, span);
    }
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Bot reply logic
  function botReply(msg) {
    addMessage('bot', msg);
  }

  // Main output logic (customize as needed)
  function output(input) {
    // Example bot reply logic
    setTimeout(() => {
      botReply("I'm just a demo bot 🧠");
    }, 600);
  }
});
