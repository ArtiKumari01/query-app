const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://www.flaticon.com/free-icon/bot_4711994";
const PERSON_IMG = "https://www.flaticon.com/free-icon/user_456212?term=user&page=1&position=1&origin=search&related_id=456212";
const BOT_NAME = "BOT";
const PERSON_NAME = "Arti";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  // sending value to backend
  ipcRenderer.send('inputValue:send', {
    value: msgText,
  });

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(res) {
  const msgText = res;
  appendMessage(BOT_NAME, BOT_IMG, "left", msgText);
}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}


ipcRenderer.on('inputValue:print', (event) => {
    // alertSuccess(`Hello ${event.value}`);
    // console.log(event.value);
    // addTask(event.value);
    botResponse(event.value);
  });

