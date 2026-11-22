document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll-Reveal Animation for Poetry Cards
    const poetryCards = document.querySelectorAll(".poetry");

    const observerOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    poetryCards.forEach((card) => {
        card.classList.add("fade-card");
        cardObserver.observe(card);

        // 2. Add Copy-to-Clipboard Button to Each Poetry Card
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-verse-btn";
        copyBtn.innerText = "شعر کاپی کریں";
        copyBtn.title = "Copy Verse";

        copyBtn.addEventListener("click", () => {
            const verseText = card.querySelector("p").innerText.trim();
            const poetTag = card.querySelector("small");
            const poetName = poetTag ? `\n— ${poetTag.innerText.trim()}` : "";

            navigator.clipboard.writeText(`${verseText}${poetName}`).then(() => {
                copyBtn.innerText = "کاپی ہو گیا ✓";
                copyBtn.classList.add("copied");
                setTimeout(() => {
                    copyBtn.innerText = "شعر کاپی کریں";
                    copyBtn.classList.remove("copied");
                }, 2000);
            });
        });

        card.appendChild(copyBtn);
    });

    // 3. Floating Dhikr (Tasbeeh) Counter Widget
    const dhikrPhrases = ["سُبْحَانَ اللَّهِ", "الْحَمْدُ لِلَّهِ", "اللَّهُ أَكْبَرُ", "أَسْتَغْفِرُ اللَّهَ"];
    let dhikrIndex = 0;
    let count = 0;

    const dhikrWidget = document.createElement("div");
    dhikrWidget.className = "dhikr-widget";
    dhikrWidget.innerHTML = `
        <div class="dhikr-label" id="dhikr-phrase">${dhikrPhrases[0]}</div>
        <div class="dhikr-controls">
            <button id="dhikr-count-btn" title="Count Dhikr">0</button>
            <button id="dhikr-switch-btn" title="Change Dhikr">↻</button>
        </div>
    `;
    document.body.appendChild(dhikrWidget);

    const countBtn = document.getElementById("dhikr-count-btn");
    const switchBtn = document.getElementById("dhikr-switch-btn");
    const phraseLabel = document.getElementById("dhikr-phrase");

    countBtn.addEventListener("click", () => {
        count++;
        countBtn.innerText = count;
        if (count === 33 || count === 100) {
            countBtn.classList.add("milestone");
            setTimeout(() => countBtn.classList.remove("milestone"), 600);
        }
    });

    switchBtn.addEventListener("click", () => {
        dhikrIndex = (dhikrIndex + 1) % dhikrPhrases.length;
        phraseLabel.innerText = dhikrPhrases[dhikrIndex];
        count = 0;
        countBtn.innerText = count;
    });

    // 4. Back-to-Top Button & Dynamic Header Elevation
    const topBtn = document.createElement("button");
    topBtn.className = "back-to-top";
    topBtn.innerHTML = "↑";
    topBtn.title = "Back to Top";
    document.body.appendChild(topBtn);

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.classList.add("show");
            header.style.backgroundColor = "rgba(255, 255, 255, 0.96)";
            header.style.backdropFilter = "blur(6px)";
        } else {
            topBtn.classList.remove("show");
            header.style.backgroundColor = "#ffffff";
        }
    });

    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});