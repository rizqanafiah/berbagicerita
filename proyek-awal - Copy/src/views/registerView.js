export function RegisterView(container) {
    const section = document.createElement('section');
    section.className = 'form-container view-transition';
    section.innerHTML = `
        <h2>Register</h2>
        <form id="registerForm">
            <div class="form-group">
                <label for="name">Nama</label>
                <input id="name" name="name" type="text" required autocomplete="name" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" name="email" type="email" required autocomplete="username" />
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" required autocomplete="new-password" />
            </div>
            <button type="submit" class="button">Register</button>
        </form>
        <p>Sudah punya akun? <a href="#/login">Login di sini</a></p>
    `;
    container.appendChild(section);
    return section.querySelector('form');
} 