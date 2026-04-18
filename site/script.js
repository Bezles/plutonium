const doc = document;
const txt = document.getElementById("txt");

const proxyDomain = "https://plutonium-proxy.onrender.com";

doc.addEventListener("click", () => txt.focus());

const input = document.getElementById("txt");
const windowDiv = document.getElementById("window");
const closeBtn = document.getElementById("close-btn");
const welcomeP = document.getElementById("welcome-p");

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = input.value.trim();
    input.value = "";
    processCommand(command);
  }
});

closeBtn.addEventListener("click", function () {
  hideWindow();
});

function processCommand(command) {
  welcomeP.textContent = "welcome";

  if (command === "surf") {
    showWindow({
      title: "Surf",
      content: `
        <p>Enter a URL:</p>
        <input id="proxy-url-input" placeholder="example.com">
        <button id="proxy-go-btn">Go</button>
        <div id="proxy-content"></div>
      `,
    });
  } else if (command.startsWith("surf ")) {
    let rawUrl = command.slice(5).trim();
    if (!rawUrl.startsWith("http")) {
      rawUrl = "https://" + rawUrl;
    }

    const proxyEndpoint = `${proxyDomain}/proxy?url=${encodeURIComponent(rawUrl)}`;

    showWindow({
      title: "Surf",
      content: `
        <h3>Surf via proxy</h3>
        <iframe
          id="proxy-frame"
          src="${proxyEndpoint}"
          style="width:100%; height:calc(100vh - 120px); border:none;"
          frameborder="0"
          allow="accelerometer; ambient-light-sensor; camera; display-capture; encrypted-media; fullscreen; gyroscope; magnetometer; microphone; midi; payment; picture-in-picture; usb; web-share;"
        ></iframe>
      `,
    });
  } else {
    const apps = {
      music: {
        title: "Music Player",
        content: "<p>Placeholder for music controls</p>",
      },
      help: {
        title: "Help",
        content: `
          <p>Available commands:</p>
          <ul>
            <
