export function createStoryCard(story) {
    const card = document.createElement('article');
    card.className = 'story-card';
    card.setAttribute('tabindex', '0');
    
    const image = document.createElement('img');
    image.src = story.photoUrl;
    image.alt = `Foto cerita oleh ${story.name}`;
    image.loading = 'lazy';
    image.onerror = () => {
        image.src = 'https://via.placeholder.com/600x350?text=No+Image';
        image.style.background = '#e0e0e0';
    };
    
    const content = document.createElement('div');
    content.className = 'story-card__content';
    
    const title = document.createElement('h2');
    title.textContent = story.name;
    
    const description = document.createElement('p');
    description.textContent = story.description;
    
    const link = document.createElement('a');
    link.href = `#/story/${story.id}`;
    link.textContent = 'Baca Selengkapnya';
    link.setAttribute('aria-label', `Baca cerita dari ${story.name}`);
    
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(link);
    
    card.appendChild(image);
    card.appendChild(content);
    
    return card;
} 