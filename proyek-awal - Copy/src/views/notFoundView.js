export function NotFoundView(container) {
    const section = document.createElement('section');
    section.className = 'not-found view-transition';
    
    const title = document.createElement('h1');
    title.textContent = '404';
    
    const message = document.createElement('p');
    message.textContent = 'Halaman yang Anda cari tidak ditemukan';
    
    const homeLink = document.createElement('a');
    homeLink.href = '#/';
    homeLink.textContent = 'Kembali ke Beranda';
    homeLink.setAttribute('aria-label', 'Kembali ke halaman beranda');
    
    section.appendChild(title);
    section.appendChild(message);
    section.appendChild(homeLink);
    
    container.appendChild(section);
} 