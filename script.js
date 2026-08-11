const header=document.querySelector(".header");
const menu=document.querySelector(".menu");
menu?.addEventListener("click",()=>{const open=header.classList.toggle("open");menu.setAttribute("aria-expanded",open)});
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>{header.classList.remove("open");menu?.setAttribute("aria-expanded","false")}));
const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");obs.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>obs.observe(e));
document.getElementById("year").textContent=new Date().getFullYear();
