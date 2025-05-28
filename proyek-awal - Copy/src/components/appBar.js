export function initAppBar() {
    const hamburgerButton = document.getElementById('hamburgerButton');
    const navigationDrawer = document.getElementById('navigationDrawer');
    
    hamburgerButton.addEventListener('click', () => {
        navigationDrawer.classList.toggle('open');
    });
    
    // Close drawer when clicking outside
    document.addEventListener('click', (event) => {
        if (!navigationDrawer.contains(event.target) && 
            !hamburgerButton.contains(event.target) && 
            navigationDrawer.classList.contains('open')) {
            navigationDrawer.classList.remove('open');
        }
    });
    
    // Close drawer when window is resized to desktop view
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navigationDrawer.classList.remove('open');
        }
    });
} 