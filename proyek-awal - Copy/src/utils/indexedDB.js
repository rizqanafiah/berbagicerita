const dbName = 'berbagi-cerita-db';
const dbVersion = 1;

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create object store for stories
      if (!db.objectStoreNames.contains('stories')) {
        const storyStore = db.createObjectStore('stories', { keyPath: 'id' });
        storyStore.createIndex('title', 'title', { unique: false });
        storyStore.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  });
};

const addStory = async (story) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['stories'], 'readwrite');
    const store = transaction.objectStore('stories');
    const request = store.add(story);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getAllStories = async () => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['stories'], 'readonly');
    const store = transaction.objectStore('stories');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const deleteStory = async (id) => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['stories'], 'readwrite');
    const store = transaction.objectStore('stories');
    const request = store.delete(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export { initDB, addStory, getAllStories, deleteStory }; 