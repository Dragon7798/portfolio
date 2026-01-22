document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       Fade-in Sections on Scroll
    ========================== */
    const sections = document.querySelectorAll("section");

    if (sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(section => {
            section.style.opacity = "0";
            section.style.transform = "translateY(40px)";
            section.style.transition = "all 0.8s ease";
            observer.observe(section);
        });
    }

    /* ==========================
       Nav Link Highlight on Scroll
    ========================== */
    const scrollSections = document.querySelectorAll("section, .projects-wrapper");
    const navLinks = document.querySelectorAll(".nav-link");

    if (scrollSections.length && navLinks.length) {
        window.addEventListener("scroll", () => {
            let current = "";

            scrollSections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop && section.id) {
                    current = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${current}`) {
                    link.classList.add("active");
                }
            });
        });
    }

    /* ==========================
       Stats Counter Animation
    ========================== */
    const statTiles = document.querySelectorAll(".stat-tile h3");

    if (statTiles.length) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
                    const rawText = entry.target.textContent;
                    const target = parseInt(rawText.replace(/\D/g, ""), 10);
                    const hasPlus = rawText.includes("+");

                    let count = 0;
                    const increment = Math.ceil(target / 100);

                    const counter = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            count = target;
                            clearInterval(counter);
                        }
                        entry.target.textContent = count + (hasPlus ? "+" : "");
                    }, 20);

                    entry.target.classList.add("counted");
                }
            });
        }, { threshold: 0.5 });

        statTiles.forEach(tile => counterObserver.observe(tile));
    }

    /* ==========================
       Dark Mode Toggle
    ========================== */
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        // Load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
            themeToggle.textContent = "☀️";
        }

        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            themeToggle.textContent = isDark ? "☀️" : "🌙";
        });
    }

    /* ==========================
       System Preference (First Visit)
    ========================== */
    if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark-mode");
        }
    }
});

/* ==========================
   Navbar Scroll Shadow
========================== */
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".main-nav");
    if (nav) {
        nav.classList.toggle("scrolled", window.scrollY > 10);
    }
});
function trackResumeDownload() {
    gtag('event', 'resume_download', {
        event_category: 'engagement',
        event_label: 'Resume PDF',
        file_name: 'Chetan_Dabholkar_Resume.pdf'
    });
}

function trackContactClick() {
    gtag('event', 'contact_click', {
        event_category: 'engagement',
        event_label: 'Contact Button'
    });
}

function trackSocialClick(platform) {
    gtag('event', 'social_click', {
        event_category: 'engagement',
        event_label: platform
    });
}