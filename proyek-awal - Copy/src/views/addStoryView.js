import { createMap } from '../components/mapComponent.js';

export function AddStoryView(container) {
    const section = document.createElement('section');
    section.className = 'form-container view-transition';
    
    const form = document.createElement('form');
    form.id = 'addStoryForm';
    
    // Title input
    const titleGroup = document.createElement('div');
    titleGroup.className = 'form-group';
    
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'title');
    titleLabel.textContent = 'Judul Cerita';
    
    const titleInput = document.createElement('input');
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.type = 'text';
    titleInput.required = true;
    titleInput.setAttribute('aria-label', 'Masukkan judul cerita');
    
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    
    // Description input
    const descriptionGroup = document.createElement('div');
    descriptionGroup.className = 'form-group';
    
    const descriptionLabel = document.createElement('label');
    descriptionLabel.setAttribute('for', 'description');
    descriptionLabel.textContent = 'Cerita Anda';
    
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'description';
    descriptionInput.name = 'description';
    descriptionInput.required = true;
    descriptionInput.setAttribute('aria-label', 'Masukkan cerita Anda');
    
    descriptionGroup.appendChild(descriptionLabel);
    descriptionGroup.appendChild(descriptionInput);
    
    // Photo input
    const photoGroup = document.createElement('div');
    photoGroup.className = 'form-group';
    
    const photoLabel = document.createElement('label');
    photoLabel.setAttribute('for', 'photo');
    photoLabel.textContent = 'Foto';
    
    const photoInput = document.createElement('input');
    photoInput.type = 'file';
    photoInput.id = 'photo';
    photoInput.name = 'photo';
    photoInput.accept = 'image/*';
    photoInput.required = true;
    
    const cameraButton = document.createElement('button');
    cameraButton.type = 'button';
    cameraButton.textContent = 'Ambil Foto';
    cameraButton.className = 'button camera-open';
    
    const cameraPreview = document.createElement('div');
    cameraPreview.className = 'camera-preview';
    
    cameraButton.addEventListener('click', async () => {
        cameraPreview.innerHTML = '';
        const video = document.createElement('video');
        video.autoplay = true;
        video.style.width = '100%';
        video.style.maxWidth = '320px';
        video.style.borderRadius = '8px';
        
        const takePhotoBtn = document.createElement('button');
        takePhotoBtn.type = 'button';
        takePhotoBtn.textContent = 'Ambil Foto';
        takePhotoBtn.className = 'button';
        takePhotoBtn.style.marginTop = '1rem';
        
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            cameraPreview.appendChild(video);
            
            takePhotoBtn.onclick = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 320;
                canvas.height = video.videoHeight || 240;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                
                stream.getTracks().forEach(track => track.stop());
                
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/jpeg');
                img.alt = 'Preview Foto';
                img.style.maxWidth = '100%';
                cameraPreview.innerHTML = '';
                cameraPreview.appendChild(img);
                
                canvas.toBlob(blob => {
                    const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    photoInput.files = dataTransfer.files;
                }, 'image/jpeg');
            };
            
            cameraPreview.appendChild(takePhotoBtn);
        } catch (error) {
            console.error('Error accessing camera:', error);
            cameraPreview.innerHTML = '<p class="error">Tidak dapat mengakses kamera</p>';
        }
    });
    
    photoGroup.appendChild(photoLabel);
    photoGroup.appendChild(photoInput);
    photoGroup.appendChild(cameraButton);
    photoGroup.appendChild(cameraPreview);
    
    // Map for location
    const mapGroup = document.createElement('div');
    mapGroup.className = 'form-group';
    
    const mapLabel = document.createElement('label');
    mapLabel.textContent = 'Lokasi (opsional)';
    
    const mapContainer = document.createElement('div');
    mapContainer.className = 'map-container';
    
    let selectedLocation = null;
    const map = createMap(mapContainer, {
        onClick: (latlng) => {
            selectedLocation = latlng;
            // Clear existing markers
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker) {
                    map.removeLayer(layer);
                }
            });
            // Add new marker
            L.marker(latlng).addTo(map);
        }
    });
    
    mapGroup.appendChild(mapLabel);
    mapGroup.appendChild(mapContainer);
    
    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Kirim Cerita';
    
    form.appendChild(titleGroup);
    form.appendChild(descriptionGroup);
    form.appendChild(photoGroup);
    form.appendChild(mapGroup);
    form.appendChild(submitButton);
    
    section.appendChild(form);
    container.appendChild(section);
    
    return {
        form,
        getFormData: () => ({
            title: titleInput.value,
            description: descriptionInput.value,
            photo: photoInput.files[0],
            lat: selectedLocation?.lat,
            lon: selectedLocation?.lng
        })
    };
}

export function showSuccess(container) {
    container.innerHTML = `
        <div class="success-message">
            <h2>Cerita Berhasil Ditambahkan!</h2>
            <p>Terima kasih telah berbagi cerita Anda.</p>
            <a href="#/" class="button">Kembali ke Beranda</a>
        </div>
    `;
}

export function showFormError(form, error) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <p>Maaf, terjadi kesalahan saat mengirim cerita.</p>
        <button onclick="window.location.reload()">Coba Lagi</button>
    `;
    
    form.insertBefore(errorMessage, form.firstChild);
}

export function setSubmitting(form, isSubmitting) {
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? 'Mengirim...' : 'Kirim Cerita';
} 