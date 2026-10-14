const form = document.querySelector("#contactForm");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea");

    fields.forEach(function (field) {
        if (field.checkValidity()) {
            field.classList.add("is-valid");
            field.classList.remove("is-invalid");
        } else {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");
        }
    });
});