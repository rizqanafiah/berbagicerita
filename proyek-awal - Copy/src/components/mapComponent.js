import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

export function createMap(container, options = {}) {
    const {
        lat = -6.2088,
        lon = 106.8456,
        zoom = 13,
        onClick,
        markers = []
    } = options;

    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    container.appendChild(mapContainer);

    // Initialize map
    const map = L.map(mapContainer).setView([lat, lon], zoom);

    // Add tile layers
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    });
    const cartoLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
    });
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri'
    });

    // Add layer control
    const baseMaps = {
        "OpenStreetMap": osmLayer,
        "CartoDB": cartoLayer,
        "Satellite": satelliteLayer
    };

    L.control.layers(baseMaps).addTo(map);
    osmLayer.addTo(map);

    // Add click handler if provided
    if (onClick) {
        map.on('click', (e) => {
            onClick(e.latlng);
        });
    }

    // Add markers if provided
    markers.forEach(marker => {
        const popup = L.popup()
            .setContent(`
                <strong>${marker.name}</strong><br>
                ${marker.description}
            `);

        L.marker([marker.lat, marker.lon])
            .bindPopup(popup)
            .addTo(map);
    });

    // Fix map rendering issues
    requestAnimationFrame(() => {
        map.invalidateSize();
    });

    return map;
} 