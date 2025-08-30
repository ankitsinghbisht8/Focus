const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const openIcon = document.getElementById("open-icon");
const closeIcon = document.getElementById("close-icon");

export function listenBtn() {
  // console.log(mobileMenu);
  // console.log(mobileMenuBtn);
  // console.log(openIcon);
  // console.log(closeIcon);
  mobileMenuBtn.addEventListener("click", function () {
    const isOpen = !mobileMenu.classList.contains("max-h-0");
    console.log("Menu is open:", isOpen);

    if (isOpen) {
      // Close the menu
      mobileMenu.classList.add("max-h-0");
      mobileMenu.classList.remove("max-h-96");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    } else {
      // Open the menu
      mobileMenu.classList.remove("max-h-0");
      mobileMenu.classList.add("max-h-96");
      openIcon.classList.add("hidden");
      closeIcon.classList.remove("hidden");
    }
  });
}
