// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Fireworks effect
function createFirework() {
    const fireworksContainer = document.getElementById("fireworks");
    const firework = document.createElement("div");
    firework.className = "firework";

    // Random position
    firework.style.left = Math.random() * 100 + "%";
    firework.style.top = Math.random() * 100 + "%";

    // Random color
    const colors = ["#FF9933", "#FFFFFF", "#138808", "#FFD700"];
    firework.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    fireworksContainer.appendChild(firework);

    // Remove after animation
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// Create fireworks periodically
setInterval(createFirework, 2000);

// Welcome message
setTimeout(() => {
    console.log("🇮🇳 Happy Independence Day! Jai Hind! 🇮🇳");
}, 1000);

// Add parallax effect on scroll
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const flag = document.querySelector(".flag");
    if (flag) {
        flag.style.transform = `translateY(${scrolled * 0.1}px) rotateY(${
            scrolled * 0.01
        }deg)`;
    }
});

// submit post
// Modal control
const modal = document.getElementById("celebrationModal");
const btn = document.querySelector(".cta-button");
const span = document.querySelector(".close");

btn.onclick = function () {
    modal.style.display = "block";
};

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Submit handler
document
    .getElementById("celebrationForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const message = document.getElementById("message").value;
        const image = document.getElementById("image").files[0];

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // Set hidden inputs with coordinates
                    document.getElementById("latitude").value =
                        position.coords.latitude;
                    document.getElementById("longitude").value =
                        position.coords.longitude;

                    console.log("Name:", name);
                    console.log("Message:", message);
                    console.log("Image:", image);
                    console.log("Latitude:", position.coords.latitude);
                    console.log("Longitude:", position.coords.longitude);

                    const formData = new FormData();
                    formData.append("name", name);
                    formData.append("message", message);
                    formData.append("image", image);
                    formData.append("latitude", position.coords.latitude);
                    formData.append("longitude", position.coords.longitude)

                    fetch("http://localhost:8000/api/posts", {
                        method: "POST",
                        body: formData,
                    })
                        .then(res => res.json())
                        .then((data) => {
                            alert("Thanks, " + name + "! Your post has been saved successfully.");
                            document.getElementById("celebrationModal").style.display = "none";
                            document.getElementById("celebrationForm").reset();
                        })
                        .catch((err) => {
                            console.error("submission failed", err);
                            alert("Something went wrong!");
                        })
                },
                function (error) {
                    alert("Geolocation failed: " + error.message);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
