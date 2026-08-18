// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// Dark mode toggle

const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

function setTheme() {
  document.documentElement.setAttribute(
    "data-bs-theme",
    darkMode.matches ? "dark" : "light",
  );
}

setTheme();

darkMode.addEventListener("change", setTheme);
