import { StoryModel } from '../models/storyModel.js';
import { RegisterView } from '../views/registerView.js';

export async function RegisterPresenter(container) {
    const form = RegisterView(container);
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const button = form.querySelector('button[type="submit"]');
        button.disabled = true;
        button.textContent = 'Memproses...';
        try {
            await StoryModel.register({ name, email, password });
            alert('Registrasi berhasil! Silakan login.');
            window.location.hash = '#/login';
        } catch (err) {
            alert('Registrasi gagal: ' + err.message);
            button.disabled = false;
            button.textContent = 'Register';
        }
    });
} 