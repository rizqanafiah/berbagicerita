import { StoryModel } from '../models/storyModel.js';
import { AddStoryView, showSuccess, showFormError, setSubmitting } from '../views/addStoryView.js';

export async function AddStoryPresenter(container) {
    const { form, getFormData } = AddStoryView(container);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        setSubmitting(form, true);
        
        try {
            const formData = getFormData();
            await StoryModel.addStory(formData);
            showSuccess(container);
        } catch (error) {
            console.error('Error in AddStoryPresenter:', error);
            showFormError(form, error);
            setSubmitting(form, false);
        }
    });
} 