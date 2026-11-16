/* =========================================================
   main.js — particle background, reveal-on-scroll, nav,
   page-fade transitions, typing effect, skill bars
   ========================================================= */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- fade page in on load ---------- */
    window.addEventListener("DOMContentLoaded", function () {
        document.body.classList.add("is-ready");
        highlightActiveNav();
        setupNavToggle();
        setupReveal();
        setupPageTransitions();
        setupTypingHero();
        setupSkillBars();
        if (!reduceMotion) {
            setupCursorGlow();
            setupParticles();
        }
    });

    /* ---------- highlight current page in nav ---------- */
    function highlightActiveNav() {
        var current = (location.pathname.split("/").pop() || "index.html");
        document.querySelectorAll("nav.site-nav a").forEach(function (link) {
            var href = link.getAttribute("href");
            if (href === current || (current === "" && href === "index.html")) {
                link.classList.add("active");
            }
        });
    }

    /* ---------- mobile nav toggle ---------- */
    function setupNavToggle() {
        var toggle = document.querySelector(".nav-toggle");
        var links = document.querySelector(".nav-links");
        if (!toggle || !links) return;
        toggle.addEventListener("click", function () {
            links.classList.toggle("open");
        });
        links.querySelectorAll("a").forEach(function (a) {
            a.addEventListener("click", function () { links.classList.remove("open"); });
        });
    }

    /* ---------- reveal panels as they scroll into view ---------- */
    function setupReveal() {
        var targets = document.querySelectorAll(".panel, .stage-card, .quest, .trophy");
        targets.forEach(function (el) { el.classList.add("reveal"); });

        if (reduceMotion || !("IntersectionObserver" in window)) {
            targets.forEach(function (el) { el.classList.add("in-view"); });
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        targets.forEach(function (el) { observer.observe(el); });
    }

    /* ---------- smooth fade between pages on internal links ---------- */
    function setupPageTransitions() {
        document.querySelectorAll('a[href$=".html"]').forEach(function (link) {
            if (link.target === "_blank") return;
            link.addEventListener("click", function (e) {
                var href = link.getAttribute("href");
                e.preventDefault();
                document.body.classList.remove("is-ready");
                document.body.classList.add("is-leaving");
                setTimeout(function () { window.location.href = href; }, reduceMotion ? 0 : 380);
            });
        });
    }

    /* ---------- typing effect for the hero title on the home page ---------- */
    function setupTypingHero() {
        var el = document.querySelector("[data-type]");
        if (!el) return;
        var full = el.getAttribute("data-type") || el.textContent;
        if (reduceMotion) { el.textContent = full; return; }
        el.textContent = "";
        var i = 0;
        (function type() {
            if (i <= full.length) {
                el.textContent = full.slice(0, i);
                i++;
                setTimeout(type, 65);
            }
        })();
    }

    /* ---------- animate skill bars once visible ---------- */
    function setupSkillBars() {
        var bars = document.querySelectorAll(".skill-bar .fill");
        if (!bars.length) return;
        var run = function (el) { el.style.width = el.getAttribute("data-fill") + "%"; };
        if (reduceMotion || !("IntersectionObserver" in window)) {
            bars.forEach(run);
            return;
        }
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    run(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        bars.forEach(function (b) { observer.observe(b); });
    }

    /* ---------- glowing cursor dot (desktop, fine pointer only) ---------- */
    function setupCursorGlow() {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        var dot = document.createElement("div");
        dot.className = "cursor-glow";
        document.body.appendChild(dot);
        window.addEventListener("mousemove", function (e) {
            dot.style.transform = "translate(" + (e.clientX - 11) + "px," + (e.clientY - 11) + "px)";
        });
    }

    /* ---------- drifting neon particle background ---------- */
    function setupParticles() {
        var canvas = document.getElementById("bg-canvas");
        if (!canvas || !canvas.getContext) return;
        var ctx = canvas.getContext("2d");
        var colors = ["#9dfb3c", "#35e6f2", "#c86bff", "#ffb043", "#ff4fd1"];
        var particles = [];
        var W, H;

        function resize() {
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener("resize", resize);
        resize();

        var count = Math.min(70, Math.floor((W * H) / 22000));
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.6 + 0.6,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                color: colors[Math.floor(Math.random() * colors.length)],
                a: Math.random() * 0.5 + 0.3
            });
        }

        function tick() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(function (p) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
                if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.a;
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    }
})();
