document.addEventListener("DOMContentLoaded", () => {
    const poetryCards = document.querySelectorAll(".poetry");
    const searchInput = document.getElementById("poetry-search");
    const filterButtons = document.querySelectorAll(".filter-btn");

    // 1. Scroll-Reveal Animation & One-Click Copy Button
    const cardObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    poetryCards.forEach((card) => {
        card.classList.add("fade-card");
        cardObserver.observe(card);

        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-verse-btn";
        copyBtn.innerText = "شعر کاپی کریں";

        copyBtn.addEventListener("click", () => {
            const verseText = card.querySelector("p").innerText.trim();
            const poetTag = card.querySelector("small");
            const poetName = poetTag && poetTag.innerText.trim() ? `\n— ${poetTag.innerText.trim()}` : "";

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

    // 2. Poet Filter & Live Search
    let activePoet = "all";

    function filterPoetry() {
        const query = searchInput ? searchInput.value.trim() : "";

        poetryCards.forEach((card) => {
            const poemText = card.querySelector("p").innerText;
            const poetTag = card.querySelector("small");
            const poetText = poetTag ? poetTag.innerText.trim() : "";

            const matchesPoet = activePoet === "all" || poetText.includes(activePoet);
            const matchesSearch = !query || poemText.includes(query) || poetText.includes(query);

            if (matchesPoet && matchesSearch) {
                card.style.display = "block";
                card.classList.add("visible");
            } else {
                card.style.display = "none";
            }
        });
    }

    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            filterButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            activePoet = btn.getAttribute("data-poet");
            filterPoetry();
        });
    });

    if (searchInput) {
        searchInput.addEventListener("input", filterPoetry);
    }

    // 3. Floating Durood-o-Salam Counter Widget
    let duroodCount = 0;
    const duroodWidget = document.createElement("div");
    duroodWidget.className = "durood-widget";
    duroodWidget.innerHTML = `
        <div class="durood-title">نبی کریم ﷺ پر درود بھیجیں</div>
        <div class="durood-arabic">صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ</div>
        <button id="durood-count-btn">درود پڑھیں (0)</button>
    `;
    document.body.appendChild(duroodWidget);

    const duroodBtn = document.getElementById("durood-count-btn");
    duroodBtn.addEventListener("click", () => {
        duroodCount++;
        duroodBtn.innerText = `صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ (${duroodCount})`;
    });

    // 4. Back-to-Top Button & Dynamic Header
    const topBtn = document.createElement("button");
    topBtn.className = "back-to-top";
    topBtn.innerHTML = "↑";
    topBtn.title = "اوپر جائیں";
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