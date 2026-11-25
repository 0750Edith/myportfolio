// ===============================
// DARK / LIGHT MODE
// ===============================
const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);

    try {
        localStorage.setItem("theme", next);
    } catch (e) {}
});


// ===============================
// MOBILE MENU
// ===============================
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
}

menuBtn.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("active");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", function (event) {
    if (!event.target.closest(".navbar")) {
        closeMenu();
    }
});


// ===============================
// CHANGING HERO TEXT
// ===============================
const changingText = document.getElementById("changing-text");

const roles = [
    "Software Engineering Student",
    "Aspiring Developer",
    "Entrepreneur"
];

let roleIndex = 0;

setInterval(function () {
    changingText.style.opacity = "0";
    changingText.style.transform = "translateY(10px)";

    setTimeout(function () {
        roleIndex = (roleIndex + 1) % roles.length;
        changingText.textContent = roles[roleIndex];

        changingText.style.opacity = "1";
        changingText.style.transform = "translateY(0)";
    }, 400);
}, 2500);


// ===============================
// SEE MORE / SEE LESS
// ===============================
document.querySelectorAll(".see-more").forEach(function (button) {
    button.addEventListener("click", function () {
        const moreText = button.previousElementSibling;
        const isHidden = moreText.hasAttribute("hidden");

        if (isHidden) {
            moreText.removeAttribute("hidden");
        } else {
            moreText.setAttribute("hidden", "");
        }

        button.textContent = isHidden ? "See less" : "See more";
        button.setAttribute("aria-expanded", String(isHidden));
    });
});


// ===============================
// SCROLL PROGRESS BAR + BACK TO TOP
// ===============================
const progressBar = document.getElementById("progressBar");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const percent = height > 0 ? (scrollTop / height) * 100 : 0;

    progressBar.style.width = percent + "%";
    backToTop.classList.toggle("visible", scrollTop > 500);
});

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ===============================
// HIGHLIGHT ACTIVE NAV LINK
// ===============================
const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                menuLinks.forEach(function (link) {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + entry.target.id
                    );
                });
            }
        });
    },
    { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    { threshold: 0.15 }
);

revealElements.forEach(function (element) {
    revealObserver.observe(element);
});


// ===============================
// CONTACT FORM (FORMSPREE)
// ===============================
const contactForm = document.querySelector(".contact-form");
const formMessage = document.getElementById("formMessage");

function showFormMessage(text, isError) {
    formMessage.textContent = text;
    formMessage.classList.toggle("error", isError);
    formMessage.removeAttribute("hidden");

    setTimeout(function () {
        formMessage.setAttribute("hidden", "");
    }, 6000);
}

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            body: new FormData(contactForm),
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            showFormMessage("Thank you for contacting me! I will get back to you soon.", false);
            contactForm.reset();
        } else {
            showFormMessage("Something went wrong. Please try again or email me directly.", true);
        }
    } catch (error) {
        showFormMessage("Network error. Please check your connection and try again.", true);
    }

    submitBtn.disabled = false;
});