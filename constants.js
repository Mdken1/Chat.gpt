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
