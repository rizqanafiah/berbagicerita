function clearLoading(container) {
    container.classList.remove('loading');
    const loadingEl = container.querySelector('.loading');
    if (loadingEl) loadingEl.remove();
}

import { createStoryCard } from '../components/storyCard.js';
import { createMap } from '../components/mapComponent.js';

export function HomeView(container, stories) {
    clearLoading(container);
    const section = document.createElement('section');
    section.className = 'story-list view-transition';
    
    // Create story cards
    stories.forEach(story => {
        section.appendChild(createStoryCard(story));
    });
    
    // Create map with story locations
    const mapSection = document.createElement('section');
    mapSection.className = 'map-section';
    
    const mapTitle = document.createElement('h2');
    mapTitle.textContent = 'Lokasi Cerita';
    mapSection.appendChild(mapTitle);
    
    const markers = stories
        .filter(story => story.lat && story.lon)
        .map(story => ({
            lat: story.lat,
            lon: story.lon,
            name: story.name,
            description: story.description
        }));
    
    // Create map and store the instance
    const map = createMap(mapSection, { markers });
    
    container.appendChild(section);
    container.appendChild(mapSection);

    // Ensure map is fully rendered
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
}

export function showLoading(container) {
    clearLoading(container);
    container.innerHTML = `
        <div class="loading">
            <p>Memuat cerita...</p>
        </div>
    `;
}

export function showEmptyState(container) {
    clearLoading(container);
    container.innerHTML = `
        <div class="empty-state">
            <h2>Belum ada cerita</h2>
            <p>Jadilah yang pertama untuk berbagi cerita!</p>
            <a href="#/add" class="button">Tambah Cerita</a>
        </div>
    `;
}

export function showError(container, error) {
    clearLoading(container);
    container.innerHTML = `
        <div class="error-message">
            <h2>Oops! Terjadi Kesalahan</h2>
            <p>${error.message}</p>
            <button onclick="window.location.reload()" class="button">Coba Lagi</button>
        </div>
    `;
} 