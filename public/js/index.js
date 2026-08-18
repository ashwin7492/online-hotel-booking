function main() {
  const taxToggler = document.querySelector("#switchCheckChecked");
  const hamburger = document.querySelector(".hamburger");
  const cross = document.querySelector(".cross");
  const nav = document.querySelector(".filters");

  function hideHeading() {
    nav.style.display = "none";
    cross.style.display = "none";
    hamburger.style.display = "block";
  }

  function showHeading() {
    nav.style.display = "inline-block";
    hamburger.style.display = "none";
    cross.style.display = "block";
  }

  const searchInput = document.querySelector("#searchInput");
  const listings = document.querySelectorAll(".listing-item");

  function handleResponsiveMenu() {
    if (window.innerWidth <= 950) {
      nav.style.display = "none";
      hamburger.style.display = "block";
      cross.style.display = "none";
    } else {
      nav.style.display = "flex";
      hamburger.style.display = "none";
      cross.style.display = "none";
    }
  }

  window.addEventListener("resize", handleResponsiveMenu);
  window.addEventListener("DOMContentLoaded", handleResponsiveMenu);

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim().toLowerCase();

    listings.forEach((listing) => {
      const title = listing
        .querySelector(".card-title")
        .textContent.toLowerCase();

      const location = listing
        .querySelector(".card-text:last-child")
        .textContent.toLowerCase();

      if (title.includes(searchValue) || location.includes(searchValue)) {
        listing.style.display = "";
      } else {
        listing.style.display = "none";
      }
    });
  });
  taxToggler.addEventListener("click", () => {
    const costElements = document.querySelectorAll(".cost");
    const taxElements = document.querySelectorAll(".tax");

    if (taxToggler.checked) {
      costElements.forEach((cost) => (cost.style.display = "none"));
      taxElements.forEach((tax) => (tax.style.display = "block"));
    } else {
      costElements.forEach((cost) => (cost.style.display = "block"));
      taxElements.forEach((tax) => (tax.style.display = "none"));
    }
  });

  hamburger.addEventListener("click", () => {
    if (window.innerWidth <= 950) {
      showHeading();
    }
  });

  cross.addEventListener("click", () => {
    if (window.innerWidth <= 950) {
      hideHeading();
    }
  });
}

main();
