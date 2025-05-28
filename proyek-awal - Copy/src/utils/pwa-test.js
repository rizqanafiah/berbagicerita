import { initDB, addStory, getAllStories, deleteStory } from './indexedDB';

// Test PWA Installation
async function testPWAInstallation() {
  console.log('Testing PWA Installation...');
  
  // Check if the app is installable
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        console.log('✅ Service Worker is registered');
      } else {
        console.log('❌ Service Worker is not registered');
      }
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  } else {
    console.log('❌ Service Worker is not supported');
  }

  // Check if the app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('✅ App is running in standalone mode');
  } else {
    console.log('ℹ️ App is not running in standalone mode');
  }
}

// Test Offline Functionality
async function testOfflineFunctionality() {
  console.log('\nTesting Offline Functionality...');
  
  // Check if the app is offline
  if (!navigator.onLine) {
    console.log('✅ App is offline');
  } else {
    console.log('ℹ️ App is online');
  }

  // Test IndexedDB
  try {
    const db = await initDB();
    console.log('✅ IndexedDB is initialized');
    
    // Test adding data
    const testStory = {
      id: 'test-' + Date.now(),
      title: 'Test Story',
      content: 'This is a test story',
      createdAt: new Date().toISOString()
    };
    
    await addStory(testStory);
    console.log('✅ Successfully added test story to IndexedDB');
    
    // Test retrieving data
    const stories = await getAllStories();
    console.log('✅ Successfully retrieved stories from IndexedDB:', stories.length);
    
    // Test deleting data
    await deleteStory(testStory.id);
    console.log('✅ Successfully deleted test story from IndexedDB');
  } catch (error) {
    console.error('❌ IndexedDB test failed:', error);
  }
}

// Test Push Notifications
async function testPushNotifications() {
  console.log('\nTesting Push Notifications...');
  
  try {
    // Check if push notifications are supported
    if (!('Notification' in window)) {
      console.log('❌ Push notifications are not supported');
      return;
    }

    // Check permission status
    const permission = await Notification.requestPermission();
    console.log('ℹ️ Notification permission status:', permission);

    if (permission === 'granted') {
      // Test subscription
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        console.log('✅ Push notification subscription exists');
      } else {
        console.log('ℹ️ No push notification subscription found');
      }
    } else {
      console.log('❌ Push notification permission denied');
    }
  } catch (error) {
    console.error('❌ Push notification test failed:', error);
  }
}

// Run all tests
async function runAllTests() {
  console.log('Starting PWA Tests...\n');
  
  await testPWAInstallation();
  await testOfflineFunctionality();
  await testPushNotifications();
  
  console.log('\nPWA Tests completed!');
}

// Export test functions
export {
  testPWAInstallation,
  testOfflineFunctionality,
  testPushNotifications,
  runAllTests
}; 