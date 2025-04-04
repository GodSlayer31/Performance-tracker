document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        try {
            const response = await fetch('http://localhost/myapp/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok && data.message) {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                showErrorMessage(data.error);
            }
        } catch (error) {
            showErrorMessage('Server error. Please try again later.');
        }
    });

    function showErrorMessage(message) {
        let errorBox = document.querySelector('.error-message');
        if (!errorBox) {
            errorBox = document.createElement('p');
            errorBox.classList.add('error-message');
            loginForm.insertBefore(errorBox, loginForm.children[1]);
        }
        errorBox.textContent = message;
        errorBox.style.color = 'red';
        errorBox.style.fontSize = '14px';
        errorBox.style.marginBottom = '10px';
    }
});
