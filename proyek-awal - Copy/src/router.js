import { HomePresenter } from './presenters/homePresenter.js';
import { AddStoryPresenter } from './presenters/addStoryPresenter.js';
import { StoryDetailPresenter } from './presenters/storyDetailPresenter.js';
import { NotFoundView } from './views/notFoundView.js';
import { LoginPresenter } from './presenters/loginPresenter.js';
import { RegisterPresenter } from './presenters/registerPresenter.js';

const routes = {
    '/': HomePresenter,
    '/add': AddStoryPresenter,
    '/story/:id': StoryDetailPresenter,
    '/login': LoginPresenter,
    '/register': RegisterPresenter,
};

function parseRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const match = hash.match(/^\/story\/([^/]+)$/);
    
    if (match) {
        return {
            path: '/story/:id',
            params: { id: match[1] }
        };
    }
    
    return {
        path: hash,
        params: {}
    };
}

export function initRouter() {
    window.addEventListener('hashchange', renderRoute);
    renderRoute();
}

function renderRoute() {
    const hash = window.location.hash;
    // Jika hash bukan route SPA (bukan #/...), arahkan ke halaman utama dan fokus ke elemen target jika ada
    if (hash && !hash.startsWith('#/')) {
        // Ambil id target tanpa tanda #
        const targetId = hash.replace('#', '');
        window.location.hash = '#/';
        setTimeout(() => {
            const target = document.getElementById(targetId);
            if (target) target.focus();
        }, 0);
        return;
    }
    const { path, params } = parseRoute();
    const main = document.getElementById('main-content');
    
    // Clear previous content
    main.innerHTML = '';
    
    // Add loading state
    main.classList.add('loading');
    
    // Render new content
    if (routes[path]) {
        routes[path](main, params)
            .catch(error => {
                console.error('Error rendering route:', error);
                NotFoundView(main);
            })
            .finally(() => {
                // Ensure loading class is removed after content is loaded
                requestAnimationFrame(() => {
                    main.classList.remove('loading');
                });
            });
    } else {
        NotFoundView(main);
        requestAnimationFrame(() => {
            main.classList.remove('loading');
        });
    }
} 