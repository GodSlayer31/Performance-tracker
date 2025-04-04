document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');
    const usernameInput = document.getElementById('reg_username');
    const passwordInput = document.getElementById('reg_password');

    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch('register.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.message) {
                alert(data.message);  // Show success message
                window.location.href = 'index.html';  // Redirect to login page
            } else {
                alert(data.error);  // Show error message if any
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error. Please try again later.');
        }
    });
});
// Add event listener to show/hide password
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('reg_password');
    const togglePasswordButton = document.getElementById('togglePassword');

    togglePasswordButton.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show Password' : 'Hide Password';
    });
});