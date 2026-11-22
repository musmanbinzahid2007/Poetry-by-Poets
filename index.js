document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // 2. Interactive "Verse of the Moment" Rotator (From Your 4 Pages)
    const featuredVerses = [
        {
            lines: "اپنے من میں ڈوب کر پا جا سراغِ زندگی<br>تو اگر میرا نہیں بنتا نہ بن، اپنا تو بن",
            poet: "— علامہ محمد اقبال"
        },
        {
            lines: "کی محمدؐ سے وفا تُو نے تو ہم تیرے ہیں<br>یہ جہاں چیز ہے کیا لوح و قلم تیرے ہیں",
            poet: "— علامہ محمد اقبال"
        },
        {
            lines: "چلتی پھرتی ہوئی آنکھوں سے اذان دیکھی ہے<br>میں نے جنت تو نہیں دیکھی ہے ماں دیکھی ہے",
            poet: "— منور رانا"
        },
        {
            lines: "جو تو نے اللہ سے لو لگائی تو دل میں خوفِ زوال کیسا<br>کہ جس کی کشتی کو تھام لے وہ، اسے ڈوبنے کا خیال کیسا",
            poet: "— حمدِ باری تعالیٰ"
        },
        {
            lines: "خود اپنے آپ سے ملنے کی جستجو ہے مجھے<br>درونِ ذات اترنے کی آرزو ہے مجھے",
            poet: "— محمد عثمان بن زاہد (غنی)"
        }
    ];

    let currentVerseIndex = 0;
    const poetryDisplay = document.getElementById("spotlight-poetry");
    const poetDisplay = document.getElementById("spotlight-poet");
    const nextVerseBtn = document.getElementById("next-verse-btn");
    const copySpotlightBtn = document.getElementById("copy-spotlight-btn");

    if (nextVerseBtn && poetryDisplay && poetDisplay) {
        nextVerseBtn.addEventListener("click", () => {
            poetryDisplay.style.opacity = "0";
            setTimeout(() => {
                currentVerseIndex = (currentVerseIndex + 1) % featuredVerses.length;
                poetryDisplay.innerHTML = featuredVerses[currentVerseIndex].lines;
                poetDisplay.innerText = featuredVerses[currentVerseIndex].poet;
                poetryDisplay.style.opacity = "1";
            }, 220);
        });
    }

    if (copySpotlightBtn && poetryDisplay && poetDisplay) {
        copySpotlightBtn.addEventListener("click", () => {
            const textToCopy = `${poetryDisplay.innerText.trim()}\n${poetDisplay.innerText.trim()}`;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = copySpotlightBtn.innerText;
                copySpotlightBtn.innerText = "کاپی ہو گیا ✓";
                setTimeout(() => {
                    copySpotlightBtn.innerText = originalText;
                }, 2000);
            });
        });
    }

    // 3. Scroll-Reveal Animation for Cards & Sections
    const revealElements = document.querySelectorAll(".but, .spotlight-card, .poets-section, .about-section");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });
});