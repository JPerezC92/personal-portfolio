const menuAccordion = document.getElementById("menuAccordion");
const closeButton = document.getElementById("closeButton");
const navbarMenu = document.getElementById("navbar__menu");
const navbarLinksListItem = document.getElementsByClassName("navbar__linksList__item");

const open = (e) => {
  navbarMenu.classList.add("navbar__menuOpen");

  closeButton.classList.remove("hide");
  menuAccordion.classList.add("hide");
};

const close = (e) => {
  navbarMenu.classList.remove("navbar__menuOpen");

  menuAccordion.classList.remove("hide");
  closeButton.classList.add("hide");
};

if (window.innerWidth < 800) {
  menuAccordion.addEventListener("click", open);
  closeButton.addEventListener("click", close);

  for (const item of navbarLinksListItem) {
    item.addEventListener("click", close);
  }
}

window.addEventListener("resize", function () {
  navigarWidth = window.innerWidth;

  if (navigarWidth === 800) {
    for (const item of navbarLinksListItem) {
      item.removeEventListener("click", close);
    }
  } else {
    for (const item of navbarLinksListItem) {
      item.addEventListener("click", close);
    }
  }
});
