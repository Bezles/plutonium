const doc = document;
const txt = document.getElementById("txt");

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
    const rawUrl = command.slice(5).trim();
    if (!rawUrl.startsWith("http")) {
      rawUrl = "https://" + rawUrl;
    }

    const encodedUrl = encodeURIComponent(rawUrl);
    const proxyDomain = "https://plutonium-proxy.onrender.com"; // ← REPLACE with your Render URL
    const proxyEndpoint = `${proxyDomain}/proxy?url=${encodedUrl}`;

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
            <li>music: Open the music player window</li>
            <li>help: Show this help message</li>
            <li>games: Open the games window</li>
            <li>config: Open the configuration window</li>
            <li>links: Open the links window</li>
            <li>media: Open the media window</li>
            <li>surf: Open the proxy interface</li>
            <li>surf [webpage]: Surf to a specific webpage</li>
          </ul>
        `,
      },
      games: {
        title: "Games",
        content: "<p>Placeholder for games</p>",
      },
      config: {
        title: "Configuration",
        content: "<p>Placeholder for configuration settings</p>",
      },
      links: {
        title: "Links",
        content: "<p>Placeholder for useful links</p>",
      },
      media: {
        title: "Media",
        content: "<p>Placeholder for media player</p>",
      },
    };

    if (apps[command]) {
      showWindow(apps[command]);
    } else {
      welcomeP.textContent = "command not found";
    }
  }
}

function showWindow(app) {
  const appContent = document.getElementById("app-content");
  appContent.innerHTML = `<h1>${app.title}</h1>${app.content}`;
  windowDiv.style.display = "flex";
  document.body.classList.add("window-open");
  setTimeout(() => {
    windowDiv.classList.add("visible");
  }, 10);

  // Optional: attach the "Go" button for the simple surf input
  const goBtn = document.getElementById("proxy-go-btn");
  if (goBtn) {
    goBtn.onclick = () => {
      const rawUrl = document.getElementById("proxy-url-input").value.trim();
      if (rawUrl) {
        processCommand(`surf ${rawUrl}`);
      }
    };
  }
}

function hideWindow() {
  windowDiv.classList.remove("visible");
  document.body.classList.remove("window-open");
  windowDiv.addEventListener(
    "transitionend",
    function handler() {
      windowDiv.removeEventListener("transitionend", handler);
      windowDiv.style.display = "none";
    },
    { once: true }
  );
}
