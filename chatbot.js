document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        let input = inputField.value;
        inputField.value = "";
        output(input);
      }
    });
  });


document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const sendBtn = document.getElementById("send-btn");
    const micBtn = document.getElementById('micBtn');
const imgBtn = document.getElementById('imgBtn');
const imageUpload = document.getElementById('imageUpload');
  

  function handleInput() {
    let input = inputField.value;
    if (input.trim() === "") return;
    inputField.value = "";
    output(input);
  }



  inputField.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.key === "Enter") {
      handleInput();
    }
  });
sendBtn.addEventListener("click", handleInput);
});


// Possible and works for all device browsers:-

// document.addEventListener("DOMContentLoaded", () => {
//   const inputField = document.getElementById("input");
//   const sendBtn = document.getElementById("send-btn");

//   function handleInput() {
//     const input = inputField.value.trim();
//     if (input !== "") {
//       inputField.value = "";
//       output(input);
//     }
//   }

//   inputField.addEventListener("keydown", (e) => {
//     if (e.key === "Enter") {
//       handleInput();
//     }
//   });

//   sendBtn.addEventListener("click", () => {
//     handleInput();
//   });
// });

  function output(input) {
    let product;

    
  
    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
    // But solves problem of entering something like 'hi1'
  
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (compare(prompts, replies, text)) { 
      // Search for exact match in `prompts`
      product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!"
    } else if (text.match(/(corona|covid|virus)/gi)) {
      // If no match, check if message contains `coronavirus`
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
      // If all else fails: random alternative
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    // Update DOM
    addChat(input, product);
  }
  
  function compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }
  
  function addChat(input, product) {
    const messagesContainer = document.getElementById("messages");
  
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.className = "user response";
    userDiv.innerHTML = `<img src="us.jpg" class="avatar"><span>${input}</span>`;
    messagesContainer.appendChild(userDiv);
  
    let botDiv = document.createElement("div");
    let botImg = document.createElement("img");
    let botText = document.createElement("span");
    botDiv.id = "bot";
    botImg.src = "chatbotimg.jpg";
    botImg.className = "avatar";
    botDiv.className = "bot response";
    botText.innerText = "Thinking...";
    botDiv.appendChild(botText);
    botDiv.appendChild(botImg);
    messagesContainer.appendChild(botDiv);
    // Keep messages at most recent
    messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
  
    // Fake delay to seem "real"
    setTimeout(() => {
      botText.innerText = `${product}`;
    }, 2000
    )
  
  }



// Voice input
micBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    input.value = text;
    sendBtn.click();
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
  function output(input) {
    let product;
  
    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
    // But solves problem of entering something like 'hi1'
  
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (compare(prompts, replies, text)) { 
      // Search for exact match in `prompts`
      product = compare(prompts, replies, text);
    } else if (text.match(/thank/gi)) {
      product = "You're welcome!"
    } else if (text.match(/(corona|covid|virus)/gi)) {
      // If no match, check if message contains `coronavirus`
      product = coronavirus[Math.floor(Math.random() * coronavirus.length)];
    } else {
      // If all else fails: random alternative
      product = alternative[Math.floor(Math.random() * alternative.length)];
    }
  
    // Update DOM
    addChat(input, product);
  }


// const input = document.getElementById("message-input");
// const sendBtn = document.getElementById("send-btn");
// const chatBox = document.getElementById("chat-box");

// sendBtn.addEventListener("click", sendMessage);
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") sendMessage();
// });

// function sendMessage() {
//   const msg = input.value.trim();
//   if (msg === "") return;
  
//   appendMessage(msg, "user");
//   input.value = "";
//   setTimeout(() => {
//     appendMessage("Typing...", "bot");
//     setTimeout(() => {
//         document.querySelector(".bot:last-child").innerText = "This is a bot reply.";
//     }, 1000);
//   }, 500);
// }

// function appendMessage(text, type) {
//   const msgDiv = document.createElement("div");
//   msgDiv.className = message ${type};
//   msgDiv.innerText = text;
//   chatBox.appendChild(msgDiv);
//   chatBox.scrollTop = chatBox.scrollHeight;
// }



const input = document.getElementById('input');
const messages = document.getElementById('messages');
const sendBtn = document.getElementById('sendBtn');
const micBtn = document.getElementById('micBtn');
const imgBtn = document.getElementById('imgBtn');
const imageUpload = document.getElementById('imageUpload');

// Send text
// sendBtn.onclick = () => {
//   const text = input.value.trim();
//   if (!text) return;
//   addMessage('user', text);
//   input.value = '';
//   setTimeout(() => {
//     botReply("I'm just a demo bot 🧠");
//   }, 600);
// };

// Add message to DOM
function addMessage(sender, text, isImage = false) {
  const msgDiv = document.createElement('div');
//   msgDiv.className = message ${sender};
msgDiv.className = `message ${sender}`;
// filepath: c:\Users\Kenneth David\Desktop\ALL MY OLD HARD DRIVE WORK\DESKTOP BACK UP\All My Projects ex\All My Projects\Whatsapp pro\script.js
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
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}

// Bot response
function botReply(msg) {    
    addMessage('bot', msg);
}

// Voice input
micBtn.onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();

  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    input.value = text;
    sendBtn.click();
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

  
