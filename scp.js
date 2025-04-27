document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("scp-nav");

    // Toggle nav menu on mobile
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("show");
    });

    // Load nav links from JSON
    fetch("scp.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(scp => {
                const link = document.createElement('a');
                link.href = `#${scp.subject}`;
                link.textContent = scp.subject;
                link.onclick = function (event) {
                    event.preventDefault();
                    loadSCP(scp);
                    navMenu.classList.remove("show"); // Close menu after clicking
                };
                navMenu.appendChild(link);
            });
        })
        .catch(error => console.error("Error loading data", error));
});

// Load SCP details
function loadSCP(scp) {
    const display = document.getElementById("display");
    const imageContainer = document.getElementById("image-container");

    display.scrollTop = 0;

    const content = `
        <h2>${scp.subject}</h2>
        <h3>${scp.class}</h3>
        <h4>Description</h4>
        <p>${scp.description}</p>
        <h4>Containment</h4>
        <p>${scp.containment}</p>
        <button id="read">Read Description</button>
    `;

    display.innerHTML = content;
    imageContainer.innerHTML = `<img src="${scp.image}" alt="${scp.subject}" />`;

    document.getElementById("read").onclick = function () {
        readDescription(scp.description);
    };
}

// Read SCP out loud
function readDescription(description) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = description;
    speech.voice = speechSynthesis.getVoices()[0];
    speechSynthesis.speak(speech);
}
