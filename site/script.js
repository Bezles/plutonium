// Source - https://stackoverflow.com/a/29504659
// Posted by xsami
// Retrieved 2026-04-16, License - CC BY-SA 3.0

var doc = document;
var txt = document.getElementById('txt');

doc.addEventListener('click', () => txt.focus());

// End snippet

const input = document.getElementById("txt");
const windowDiv = document.getElementById("window");
const closeBtn = document.getElementById("close-btn");
const welcomeP = document.getElementById("welcome-p");

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        input.value = '';
        processCommand(command);
    }
});

closeBtn.addEventListener('click', function() {
    hideWindow();
});

function processCommand(command) {
    welcomeP.textContent = 'welcome';

    if (command === 'surf') {
        showWindow({
            title: 'Surf',
            content: '<p>Placeholder for proxy interface</p>'
        });
    } else if (command.startsWith('surf ')) {
        const webpage = command.slice(5);
        showWindow({
            title: 'Surf',
            content: `<p>Surfing to: ${webpage}</p><p>Placeholder for proxy content</p>`
        });
    } else {
        const apps = {
            'music': {
                title: 'Music Player',
                content: '<p>Placeholder for music controls</p>'
            },
            'help': {
                title: 'Help',
                content: '<p>Available commands:</p><ul><li>music: Open the music player window</li><li>help: Show this help message</li><li>games: Open the games window</li><li>config: Open the configuration window</li><li>links: Open the links window</li><li>media: Open the media window</li><li>surf: Open the surf proxy</li><li>surf [webpage]: Surf to a specific webpage</li></ul>'
            },
            'games': {
                title: 'Games',
                content: '<p>Placeholder for games</p>'
            },
            'config': {
                title: 'Configuration',
                content: '<p>Placeholder for configuration settings</p>'
            },
            'links': {
                title: 'Links',
                content: '<p>Placeholder for useful links</p>'
            },
            'media': {
                title: 'Media',
                content: '<p>Placeholder for media player</p>'
            }
        };

        if (apps[command]) {
            showWindow(apps[command]);
        } else {
            welcomeP.textContent = 'command not found';
        }
    }
}

function showWindow(app) {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `<h1>${app.title}</h1>${app.content}`;
    windowDiv.style.display = 'flex';
    document.body.classList.add('window-open');
    // Allow reflow
    setTimeout(() => {
        windowDiv.classList.add('visible');
    }, 10);
}

function hideWindow() {
    windowDiv.classList.remove('visible');
    document.body.classList.remove('window-open');
    windowDiv.addEventListener('transitionend', function handler() {
        windowDiv.removeEventListener('transitionend', handler);
        windowDiv.style.display = 'none';
    });
}


