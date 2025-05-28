import { StoryModel } from '../models/storyModel.js';
import { HomeView, showLoading, showEmptyState, showError } from '../views/homeView.js';

export async function HomePresenter(container) {
    try {
        showLoading(container);
        const stories = await StoryModel.getStories();
        
        if (!stories || stories.length === 0) {
            showEmptyState(container);
            return;
        }

        HomeView(container, stories);
    } catch (error) {
        console.error('Error in HomePresenter:', error);
        showError(container, error);
    }
} 