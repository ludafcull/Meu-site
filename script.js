const menu = document.querySelector(".menu");
const nav = document.querySelector(".bar nav");

if (menu && nav) {
  menu.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}


document.querySelectorAll('a[href^="#"]').forEach((link) => {

  link.addEventListener("click", (event) => {

    const target = document.querySelector(
      link.getAttribute("href")
    );

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    nav?.classList.remove("show");

  });

});