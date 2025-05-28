const BASE_URL = 'https://story-api.dicoding.dev/v1';

export const StoryModel = {
    async getStories() {
        try {
            const response = await fetch(`${BASE_URL}/stories`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseJson = await response.json();
            
            if (responseJson.error) {
                throw new Error(responseJson.message || 'Failed to fetch stories');
            }
            
            return responseJson.listStory || [];
        } catch (error) {
            console.error('Error fetching stories:', error);
            throw new Error('Gagal memuat cerita. Silakan coba lagi nanti.');
        }
    },

    async getStoryById(id) {
        try {
            const response = await fetch(`${BASE_URL}/stories/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseJson = await response.json();
            
            if (responseJson.error) {
                throw new Error(responseJson.message || 'Failed to fetch story');
            }
            
            return responseJson.story;
        } catch (error) {
            console.error('Error fetching story:', error);
            throw new Error('Gagal memuat detail cerita. Silakan coba lagi nanti.');
        }
    },

    async addStory({ description, photo, lat, lon }) {
        try {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('photo', photo);
            
            if (lat && lon) {
                formData.append('lat', lat);
                formData.append('lon', lon);
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Anda harus login terlebih dahulu');
            }

            const response = await fetch(`${BASE_URL}/stories`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseJson = await response.json();
            
            if (responseJson.error) {
                throw new Error(responseJson.message || 'Failed to add story');
            }
            
            return responseJson;
        } catch (error) {
            console.error('Error adding story:', error);
            throw new Error(error.message || 'Gagal menambahkan cerita. Silakan coba lagi nanti.');
        }
    },

    async login({ email, password }) {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.message);
        return data.loginResult.token;
    },

    async register({ name, email, password }) {
        const response = await fetch('https://story-api.dicoding.dev/v1/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (data.error) throw new Error(data.message);
        return data.message;
    }
}; 