const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function askChatGPT(reqText) {
  // console.log("console started");
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: reqText,
  max_tokens: 2048,
});
return completion.data.choices[0].text;
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // mainWindow.webContents.openDevTools();

  mainWindow.loadFile('home.html');
}

app.whenReady().then(createWindow);

ipcMain.on('inputValue:send', (e, options) => {
  // console.log(options);
  
  let msg = askChatGPT(options.value);
  // console.log("msg is printed",msg);

// Handling the resolved value
msg.then((value) => {
  // console.log("Get Value",value); 
  // Output: Hello, World!
  let obj = {
    value: value,
  };

  mainWindow.webContents.send('inputValue:print', obj);
});
});