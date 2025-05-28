import 'leaflet/dist/leaflet.css';
import './styles/main.css';
import './main.js';
import { registerServiceWorker, subscribePushNotification } from './utils/pushNotification';
import { initDB } from './utils/indexedDB';
import { runAllTests } from './utils/pwa-test';

// Initialize IndexedDB
initDB().catch(console.error);

// Register service worker and initialize PWA features
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await registerServiceWorker();
      
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await subscribePushNotification();
      }

      // Run PWA tests
      await runAllTests();
    } catch (error) {
      console.error('Failed to initialize PWA features:', error);
    }
  });
}

// Add to homescreen prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // Show install button or prompt
  const installButton = document.createElement('button');
  installButton.textContent = 'Install App';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.right = '20px';
  installButton.style.padding = '10px 20px';
  installButton.style.backgroundColor = '#4CAF50';
  installButton.style.color = 'white';
  installButton.style.border = 'none';
  installButton.style.borderRadius = '5px';
  installButton.style.cursor = 'pointer';
  
  installButton.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      deferredPrompt = null;
      installButton.remove();
    }
  });
  document.body.appendChild(installButton);
});

// Rest of your application code... 