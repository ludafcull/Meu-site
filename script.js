const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

const progress = $("#progress");
const menuButton = $("#menuButton");
const mobileMenu = $("#mobileMenu");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

menuButton?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

$$(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach(el => observer.observe(el));

const filters = $$(".filter");
const items = $$(".archive-item");
const empty = $("#archiveEmpty");

function filterArchive(category) {
  let visible = 0;

  items.forEach(item => {
    const show = category === "all" || item.dataset.category === category;
    item.classList.toggle("hidden", !show);
    if (show) visible++;
  });

  empty.style.display = visible ? "none" : "block";
  filters.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === category);
  });
}

filters.forEach(button => {
  button.addEventListener("click", () => filterArchive(button.dataset.filter));
});

$$(".category-card[data-filter]").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.filter;
    setTimeout(() => filterArchive(category), 0);
  });
});

$$('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", id);
  });
});

window.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    mobileMenu?.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  }
});
