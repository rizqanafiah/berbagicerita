// Entry point utama SPA. Import router dan appBar jika perlu.
import { initRouter } from './router.js';
import { initAppBar } from './components/appBar.js';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('token') && location.hash !== '#/login') {
        window.location.hash = '#/login';
    }
    initRouter();
    initAppBar();
    if (document.startViewTransition) {
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const href = e.target.getAttribute('href');
                document.startViewTransition(() => {
                    window.location.hash = href;
                });
            }
        });
    }
    // Skip link handler
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function (e) {
            e.preventDefault();
            window.location.hash = '#/';
            setTimeout(() => {
                const main = document.getElementById('main-content');
                if (main) main.focus();
            }, 100);
        });
    }
}); 