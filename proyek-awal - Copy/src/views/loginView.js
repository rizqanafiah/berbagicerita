export function LoginView(container) {
    const section = document.createElement('section');
    section.className = 'form-container view-transition';
    section.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required autocomplete="username" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required autocomplete="current-password" />
            </div>
            <button type="submit" class="button">Login</button>
        </form>
        <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
    `;
    container.appendChild(section);
    return section.querySelector('form');
} 