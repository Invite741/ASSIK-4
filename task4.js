const form = document.querySelector("#registrationForm");

if (form) {
    const fields = form.querySelectorAll(
        "input:not([type='radio']):not([type='checkbox']), select"
    );

    const password = form.querySelector("#password");
    const confirmPassword = form.querySelector("#confirmPassword");

    const genderInputs = form.querySelectorAll(
        "input[name='gender']"
    );

    const genderFeedback = form.querySelector("#genderFeedback");
    const successMessage = form.querySelector("#successMessage");

    let submitted = false;

    function validateField(field) {
        if (field === confirmPassword) {
            if (
                confirmPassword.value !== "" &&
                confirmPassword.value !== password.value
            ) {
                confirmPassword.setCustomValidity(
                    "Passwords do not match."
                );
            } else {
                confirmPassword.setCustomValidity("");
            }
        }

        const valid = field.checkValidity();

        field.classList.toggle("is-valid", valid);
        field.classList.toggle("is-invalid", !valid);

        return valid;
    }

    function validateGender() {
        const selectedGender = form.querySelector(
            "input[name='gender']:checked"
        );

        const valid = Boolean(selectedGender);

        genderInputs.forEach(function (input) {
            input.classList.toggle("is-invalid", !valid);
            input.classList.toggle(
                "is-valid",
                valid && input.checked
            );
        });

        genderFeedback.classList.toggle("d-block", !valid);

        return valid;
    }

    function hideSuccessMessage() {
        successMessage.classList.add("d-none");
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        submitted = true;

        let fieldsValid = true;

        fields.forEach(function (field) {
            if (!validateField(field)) {
                fieldsValid = false;
            }
        });

        const genderValid = validateGender();

        if (fieldsValid && genderValid) {
            successMessage.classList.remove("d-none");
        } else {
            hideSuccessMessage();

            const firstInvalidField = form.querySelector(
                ".is-invalid"
            );

            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    fields.forEach(function (field) {
        field.addEventListener("input", function () {
            if (!submitted) {
                return;
            }

            validateField(field);
            hideSuccessMessage();

            if (
                field === password ||
                field === confirmPassword
            ) {
                validateField(confirmPassword);
            }
        });

        field.addEventListener("change", function () {
            if (submitted) {
                validateField(field);
                hideSuccessMessage();
            }
        });
    });

    genderInputs.forEach(function (input) {
        input.addEventListener("change", function () {
            if (submitted) {
                validateGender();
                hideSuccessMessage();
            }
        });
    });

    form.addEventListener("reset", function () {
        submitted = false;

        setTimeout(function () {
            fields.forEach(function (field) {
                field.classList.remove("is-valid", "is-invalid");
                field.setCustomValidity("");
            });

            genderInputs.forEach(function (input) {
                input.classList.remove("is-valid", "is-invalid");
            });

            genderFeedback.classList.remove("d-block");
            successMessage.classList.add("d-none");
        }, 0);
    });
}