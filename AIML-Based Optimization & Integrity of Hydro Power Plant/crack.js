const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');
const detectCrackButton = document.getElementById('detectCrackButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Preview the uploaded image
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            preview.src = e.target.result;
            preview.style.display = 'block';
            canvas.style.display = 'none'; // Hide canvas until button is clicked
        };
        reader.readAsDataURL(file);
    }
});

// Convert image to grayscale
detectCrackButton.addEventListener('click', () => {
    if (preview.src) {
        const img = new Image();
        img.src = preview.src;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

        // Convert to grayscale
        for (let i = 0; i < data.length; i += 4) {
            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = data[i + 1] = data[i + 2] = gray;
        }

        // Apply thresholding for high contrast
        for (let i = 0; i < data.length; i += 4) {
            const threshold = 128; // Adjust threshold value if needed
            const value = data[i] > threshold ? 255 : 0;
            data[i] = data[i + 1] = data[i + 2] = value;
        }

            // Update canvas with grayscale image
            ctx.putImageData(imageData, 0, 0);
            canvas.style.display = 'block'; // Show canvas

            const downloadButton = document.getElementById("downloadButton");
            downloadButton.style.display = "block";
    
            // Set the download link to the grayscale image
            downloadButton.href = canvas.toDataURL();
            downloadButton.download = "grayscale_image.png";
        };
    } else {
        alert('Please upload an image first.');
    }
});
