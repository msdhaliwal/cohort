const apiURL = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");
const tweetBtn = document.getElementById("tweetQuote");
const exportBtn = document.getElementById("exportQuote");
const quoteContainer = document.getElementById("quoteContainer");

async function fetchQuote() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.success) {
      const quote = data.data.content;
      const author = data.data.author || "Unknown";

      quoteText.textContent = `"${quote}"`;
      quoteAuthor.textContent = `- ${author}`;

      setRandomBackground();
    } else {
      quoteText.textContent = "Failed to fetch quote.";
      quoteAuthor.textContent = "";
    }
  } catch (error) {
    console.error(error);
    quoteText.textContent = "An error occurred.";
    quoteAuthor.textContent = "";
  }
}

function copyQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  navigator.clipboard.writeText(text).then(() => {
    alert("Quote copied to clipboard!");
  });
}

function tweetQuote() {
  const text = `${quoteText.textContent} ${quoteAuthor.textContent}`;
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  window.open(tweetURL, "_blank");
}

function exportQuoteImage() {
  html2canvas(document.getElementById("quoteBox")).then(canvas => {
    const link = document.createElement("a");
    link.download = "quote.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

function setRandomBackground() {
  const randomImgUrl = `https://source.unsplash.com/random/1600x900?sig=${Math.floor(Math.random() * 1000)}`;
  document.body.style.backgroundImage = `url(${randomImgUrl})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}

newQuoteBtn.addEventListener("click", fetchQuote);
copyBtn.addEventListener("click", copyQuote);
tweetBtn.addEventListener("click", tweetQuote);
exportBtn.addEventListener("click", exportQuoteImage);

fetchQuote();
