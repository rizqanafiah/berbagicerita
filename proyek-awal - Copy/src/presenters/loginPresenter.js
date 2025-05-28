import { StoryModel } from '../models/storyModel.js';
import { LoginView } from '../views/loginView.js';

export async function LoginPresenter(container) {
    const form = LoginView(container);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.email.value;
        const password = form.password.value;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Memproses...';
        try {
            const token = await StoryModel.login({ email, password });
            localStorage.setItem('token', token);
            window.location.hash = '#/';
        } catch (err) {
            alert('Login gagal: ' + err.message);
            button.disabled = false;
            button.textContent = 'Login';
        }
    });
} 