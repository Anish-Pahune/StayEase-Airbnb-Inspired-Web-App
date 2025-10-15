    (function () {
        const form = document.getElementById('signupForm');
        if (!form) return;
        
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        form.addEventListener('submit', function (event) {
            let valid = true;

            // Username Validation (5–30 chars)
            if (username.value.trim().length < 5 || username.value.trim().length > 30) {
                username.classList.add('is-invalid');
                document.getElementById('usernameError').textContent = 
                    username.value.trim().length < 5 
                    ? "Username must be at least 5 characters long."
                    : "Username cannot exceed 30 characters.";
                valid = false;
            } else {
                username.classList.remove('is-invalid');
                username.classList.add('is-valid');
            }

            // Email Validation (simple regex)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('is-invalid');
                document.getElementById('emailError').textContent = "Please enter a valid email address.";
                valid = false;
            } else {
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
            }

            // Password Validation (Joi pattern)
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*_-])[A-Za-z\d!@#$%&*_-]{8,}$/;
            if (!passwordPattern.test(password.value)) {
                password.classList.add('is-invalid');
                document.getElementById('passwordError').textContent = 
                    "Password must be 8 character long with upper, lower, number & special symbol.";
                valid = false;
            } else {
                password.classList.remove('is-invalid');
                password.classList.add('is-valid');
            }

            // Confirm Password
            if (confirmPassword.value !== password.value) {
                confirmPassword.classList.add('is-invalid');
                document.getElementById('confirmPassError').textContent = "Passwords do not match.";
                valid = false;
            } else {
                confirmPassword.classList.remove('is-invalid');
                confirmPassword.classList.add('is-valid');
            }

            if (!valid) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        });
    })();