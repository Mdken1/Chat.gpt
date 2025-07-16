
// Options the user could type in
const prompts = [
  ["hi","hiii", "hey", "hello", "good morning", "good afternoon"],
  ["how are you", "how is life", "how are things"],
  ["what are you doing", "what is going on", "what is up"],
  ["how old are you"],
  ["who are you", "are you human", "are you bot", "are you human or bot"],
  ["who created you", "who made you"],
  [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  ["i love you"],
  ["happy", "good", "fun", "wonderful", "fantastic", "cool"],
  ["bad", "bored", "tired"],
  ["help me", "tell me story", "tell me joke"],
  ["ah", "yes", "ok", "okay", "nice"],
  ["bye", "good bye", "goodbye", "see you later"],
  ["what should i eat today"],
  ["bro"],
  ["what", "why", "how", "where", "when"],
  ["no","not sure","maybe","no thanks"],
  [""],
  ["haha","ha","lol","hehe","funny","joke"]
];

// Possible responses, in corresponding order
const replies = [
  ["Hello!", "Hi!", "Hey!", "Hi there!","Howdy"],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am infinite"],
  ["I am just a bot", "I am a bot. What are you?"],
  ["The one true God, and  Programmed by Mdken Web World."],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV"],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["Bye", "Goodbye", "See you later"],
  ["Sushi", "Pizza","veg-omellet","healthy food"],
  ["Bro!"],
  ["Great question"],
  ["That's ok","I understand","What do you want to talk about?"],
  ["Please say something :("],
  ["Haha!","Good one!"]
];

// Random for any other user input
const alternative = [
  "Same",
  "Go on...",
  "Bro...",
  "Try again",
  "I'm listening...",
  "I don't understand :/"
];

// Example coronavirus responses
const coronavirus = [
  "Please stay home",
  "Wear a mask",
  "Fortunately, I don't have COVID",
  "These are uncertain times"
];

// Utility: Compare user input to prompts
function compare(promptsArray, repliesArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < promptsArray.length; x++) {
    for (let y = 0; y < promptsArray[x].length; y++) {
      if (promptsArray[x][y] === string) {
        let replies = repliesArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) break;
  }
  return reply;
}

// Add chat message to DOM
function addChat(input, product) {
  const messagesContainer = document.getElementById("messages");

  let userDiv = document.createElement("div");
  userDiv.className = "user response";
  userDiv.innerHTML = `<img src="user.jpg" class="avatar"><span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botImg = document.createElement("img");
  let botText = document.createElement("span");
  botImg.src = "bot.jpg";
  botImg.className = "avatar";
  botDiv.className = "bot response";
  botText.innerText = "Thinking...";
  botDiv.appendChild(botText);
  botDiv.appendChild(botImg);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 2000);
}

// Add image message to DOM
function addMessage(sender, text, isImage = false) {
  const messagesContainer = document.getElementById("messages");
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
  avatar.src = sender === 'user' ? 'use.jpg' : 'chatbotimg.jpg';
  avatar.className = 'avatar';
  if (sender === 'user') {
    msgDiv.append(span, avatar);
  } else {
    msgDiv.append(avatar, span);
  }
  messagesContainer.appendChild(msgDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Main output logic
async function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  const matched = compare(prompts, replies, text);

  if (matched) {
    product = matched;
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else {
    // Fallback to ChatGPT
    product = await handleUserInput(input);
  }

  addChat(input, product);
}

// ChatGPT API integration
async function handleUserInput(userInput) {
  // You must use your own valid OpenAI API key here!
  const apiKey = "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"; // Replace with your actual API key
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `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`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
      })
    });

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      return "Sorry, I couldn't get a response from ChatGPT.";
    }
  } catch (error) {
    return "Error connecting to ChatGPT.";
  }
}

// DOMContentLoaded: Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const sendBtn = document.getElementById("sendBtn");
  const micBtn = document.getElementById('micBtn');
  const imgBtn = document.getElementById('imgBtn');
  const imageUpload = document.getElementById('imageUpload');

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
      output("Image uploaded"); // Optionally trigger bot response
    };
    reader.readAsDataURL(file);
  };
});
imageUpload.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    // Show the image in chat
    addMessage('user', reader.result, true);

    // Search Google Images with the uploaded image
    // This uses Google Lens (works in Chrome)
    const googleLensUrl = `https://lens.google.com/upload`;
    // Open Google Lens upload page in a new tab
    window.open(googleLensUrl, '_blank');
    // Optionally, you can show a message in chat
    addMessage('bot', 'Searching Google for your image...');
  };
  reader.readAsDataURL(file);
};
          imgBtn.onclick = () => imageUpload.click();


imgBtn.onclick = () => imageUpload.click();

imageUpload.onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    // Show the image in chat
    addMessage('user', reader.result, true);

    // Search Google Images with the uploaded image (Google Lens)
    const googleLensUrl = `https://lens.google.com/upload`;
    window.open(googleLensUrl, '_blank');
    addMessage('bot', 'Searching Google for your image...');
  };
  reader.readAsDataURL(file);
};

// Main output logic
async function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
  text = text
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

  const matched = compare(prompts, replies, text);

  if (matched) {
    product = matched;
  } else if (text.match(/thank/gi)) {
    product = "You're welcome!";
  } else if (text.match(/(corona|covid|virus)/gi)) {
    product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
  } else if (text.includes("meaning") || text.includes("define") || text.includes("definition")) {
    // If user asks for meaning/definition, search Google
    product = "Searching Google for the meaning...";
    const query = encodeURIComponent(input);
    setTimeout(() => {
      window.open(`https://www.google.com/search?q=${query}+meaning`, "_blank");
    }, 1000);
  } else {
    // Fallback to ChatGPT
    product = await handleUserInput(input);
  }

  addChat(input, product);
}
