import { createMap } from '../components/mapComponent.js';

export function StoryDetailView(container, story) {
    const section = document.createElement('section');
    section.className = 'story-detail view-transition';
    
    // Story content
    const content = document.createElement('article');
    content.className = 'story-content';
    
    const image = document.createElement('img');
    image.src = story.photoUrl;
    image.alt = `Foto cerita oleh ${story.name}`;
    
    const title = document.createElement('h1');
    title.textContent = story.name;
    
    const description = document.createElement('p');
    description.textContent = story.description;
    
    content.appendChild(image);
    content.appendChild(title);
    content.appendChild(description);
    
    // Map section if location exists
    if (story.lat && story.lon) {
        const mapSection = document.createElement('section');
        mapSection.className = 'map-section';
        
        const mapTitle = document.createElement('h2');
        mapTitle.textContent = 'Lokasi Cerita';
        mapSection.appendChild(mapTitle);
        
        createMap(mapSection, {
            lat: story.lat,
            lon: story.lon,
            markers: [{
                lat: story.lat,
                lon: story.lon,
                name: story.name,
                description: story.description
            }]
        });
        
        section.appendChild(mapSection);
    }
    
    // Back button
    const backButton = document.createElement('a');
    backButton.href = '#/';
    backButton.className = 'back-button';
    backButton.textContent = '← Kembali';
    backButton.setAttribute('aria-label', 'Kembali ke daftar cerita');
    
    section.appendChild(content);
    section.appendChild(backButton);
    container.appendChild(section);
} 