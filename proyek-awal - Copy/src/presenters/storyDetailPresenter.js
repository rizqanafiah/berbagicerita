import { StoryModel } from '../models/storyModel.js';
import { StoryDetailView } from '../views/storyDetailView.js';

export async function StoryDetailPresenter(container, { id }) {
    try {
        const story = await StoryModel.getStoryById(id);
        StoryDetailView(container, story);
    } catch (error) {
        console.error('Error in StoryDetailPresenter:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>Maaf, cerita tidak ditemukan atau terjadi kesalahan.</p>
                <a href="#/" class="button">Kembali ke Beranda</a>
            </div>
        `;
    }
} 