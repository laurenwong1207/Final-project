async function fetchData(src) {
    try {
        const response = await fetch('/data/' + src);
        const data = await response.json();
        cate = populateTable(data);  // Process data and assign to cate
        return cate;  // Return the processed data
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;  // Return null on error
    }
}

let selectionName = [];  // Array to store selection names (unused)

function transformData(data) {
    let transformed = {
        labels: [],
        images: {}
    };

    data.forEach(item => {
        if (!transformed.labels.includes(item.name)) {
            transformed.labels.push(item.name);
        }
        transformed.images[item.name] = item.images;
    });

    return transformed;
}

let cate = [];  // Variable to store category data

function populateTable(data){
    cate = [];
    let newData = transformData(data);  // Transform data for use in UI
    console.log(newData);
    return newData;  // Return the transformed data
}

document.addEventListener("DOMContentLoaded", function() {
    const photoWall = document.getElementById('photo-wall');
    const pitchLabel = document.getElementById('pitch-label');
    let tempPhotoList = [];
    let normalPhotoList = [];
    let soundName = [];
    const pitchCategories = {
        "1": "high-pitched",
        "2": "medium-pitched",
        "3": "low-pitched",
        "4": "All"
    };
    
    const pitchTexts = {
        "1": "High-Pitched",
        "2": "Medium-Pitched",
        "3": "Low-Pitched",
        "4": "All"
    };

    const collectionName = {
        "tone": "Tone",
        "pitch": "Pitch",
        "rhythm": "Rhythm",
        "all": "All"
    };

    const categorySelect = document.getElementById('category-select');
    const pitchSlider = document.getElementById('pitch-slider');
    const firstLabel = document.getElementById('first-pitch');
    const lastLabel = document.getElementById('last-pitch');

    categorySelect.addEventListener('change', async function() {
        const selectedCategory = this.value;
        if (selectedCategory == 'none') {
            tempPhotoList = [];
            tempPhotoList = normalPhotoList;
            pitchSlider.value = 0;
            pitchSlider.max = 0;
            firstLabel.textContent = "All";
            lastLabel.textContent = "All";
            updatePhotoWall();
            cate = [];
        } else {
            try {
                categoryInfo = await fetchData(collectionName[selectedCategory]);
                if (categoryInfo) {
                    console.log(categoryInfo);
                    updateSliderAndLabels(categoryInfo);
                } else {
                    console.log('No data received');
                }
            } catch (error) {
                console.error('Failed to fetch or process data:', error);
            }
        }
    });

    pitchSlider.addEventListener('input', function() {
        if (cate) {
            const subCategory = cate.labels[this.value];
            console.log(cate.images[subCategory]);
            tempPhotoList = cate.images[subCategory];
            updatePhotoWall();
        } else {
            // Handle case where cate is undefined
        }
    });

    function updateSliderAndLabels(info) {
        pitchSlider.max = info.labels.length - 1;
        pitchSlider.value = 0;
        firstLabel.textContent = info.labels[0];
        lastLabel.textContent = info.labels[info.labels.length - 1];
        tempPhotoList = info.images[firstLabel.textContent];
        console.log(info.images);
        updatePhotoWall();
    }

    // Initial display of photos
    function fetchPhotos() {
        fetch('/images')
            .then(response => response.json())
            .then(data => {
                tempPhotoList = data.map(image => `photos/${image}`);
                normalPhotoList = data.map(image => `photos/${image}`);
                cate = data.map(image => `photos/${image}`);
                updatePhotoWall();
            })
            .catch(error => console.error('Error fetching images:', error));
    }

    fetch('/sounds')
        .then(response => response.json())
        .then(data => {
            soundName = data.map(mp3 => `http://127.0.0.1:3000/sound/${mp3}`);
            console.log("Sounds: ", soundName);
        })
        .catch(error => console.error('Failed to fetch MP3 files:', error));

    categorySelect.addEventListener('change', function() {
        updatePhotoWall(categorySelect.value);
    });

    // Assuming this part is inside your existing script where images are appended to the photo wall

    function updatePhotoWall() {
        let photoList = [];
        for (let i = 0; i < normalPhotoList.length; i++) {
            for (let j = 0; j < tempPhotoList.length; j++) {
                if (normalPhotoList[i].includes(tempPhotoList[j])) {
                    photoList.push(normalPhotoList[i]);
                    break;
                }
            }
        }
        console.log(photoList);
        let indexMul = 1;
        if (photoList.length <= 10) {
            indexMul = 0;
        }
        photoWall.onclick = function(event) {
            let target = event.target;
            let string1 = target.src;
            if (string1) {
                string1 = string1.replace("http://127.0.0.1:3000/photos/", "");
                string1 = string1.replace(".png", "");
                string1 = string1.replace(" ", "");
                let soundUrl = "http://127.0.0.1:3000/sound/default.mp3";
                for (let i = 0; i < soundName.length; i++) {
                    let tempName = parseInt(string1);
                    console.log(tempName, parseInt(string1));
                    if (tempName == i + 1) {
                        soundUrl = soundName[i];
                        break;
                    }
                }
                console.log(target.src, string1, soundUrl);
                if (target.tagName === 'IMG') {
                    window.location.href = `view.html?image=${encodeURIComponent(target.src)}&SoundID=${encodeURIComponent(soundUrl)}`;
                }
            }
        };

        photoWall.innerHTML = ''; // Clear the existing images
        const centerX = photoWall.clientWidth / 2;
        const centerY = photoWall.clientHeight / 2;
        const layers = 3; // Total layers
        const maxPhotoSize = 150;
        const minPhotoSize = 100;
        const baseSpread = 250; // Base spread distance

        let totalPhotoCount = 0;  // Total number of photo slots
        const photosPerLayer = [];

        if (photoList.length <= 10) {
            const angleIncrement = (2 * Math.PI) / photoList.length;
            const spread = baseSpread * 1.2;
            for (let i = 0; i < photoList.length; i++) {
                const angle = i * angleIncrement + Math.PI / 4;
                const size = maxPhotoSize;

                const photoItem = document.createElement('div');
                photoItem.style.position = 'absolute';
                photoItem.style.width = `${size}px`;
                photoItem.style.height = `${size}px`;

                const img = document.createElement('img');
                img.src = photoList[i]; // Use the image in a loop
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.transition = 'transform 0.5s ease-in-out';


                // Add hover effect
                photoItem.addEventListener('mouseover', () => {
                    img.style.transform = 'scale(2.1)';
                    photoItem.style.zIndex = 1001; // Raise z-index to ensure the image is on top
                });

                photoItem.addEventListener('mouseout', () => {
                    img.style.transform = 'scale(1)';
                    photoItem.style.zIndex = 0; // Lower z-index to default
                });

                photoItem.appendChild(img);

                // Calculate position, create an elliptical distribution
                const posX = centerX + spread * Math.cos(angle) - size / 2; // Adjust x-axis slightly
                const posY = centerY + spread * Math.sin(angle) - size / 2 - 50;
                photoItem.style.left = `${posX}px`;
                photoItem.style.top = `${posY}px`;

                photoWall.appendChild(photoItem);
            }

        } else {
            // Calculate the number of images per layer and accumulate total count
            for (let i = 0; i < layers; i++) {
                let count = Math.ceil(photoList.length * (i + 1) / 6);
                console.log(count);
                photosPerLayer.push(count);
                totalPhotoCount += count;
            }
            console.log(((1 + layers + 1) * (layers + 1) / 2), photoList.length);
            let currentPhotoIndex = 0;

            // Layer the images
            for (let layerIndex = 0; layerIndex < layers; layerIndex++) {
                const layerPhotoCount = photosPerLayer[layerIndex];
                const angleIncrement = (2 * Math.PI) / layerPhotoCount;
                const spread = baseSpread * indexMul + layerIndex * baseSpread; // Increase spread for each layer

                for (let i = 0; i < layerPhotoCount; i++) {
                    const angle = i * angleIncrement + Math.PI / 4;
                    const sizeDecrement = (layerIndex + 1) * (maxPhotoSize - minPhotoSize) / layers;
                    const size = maxPhotoSize - sizeDecrement;

                    const photoItem = document.createElement('div');
                    photoItem.style.position = 'absolute';
                    photoItem.style.width = `${size}px`;
                    photoItem.style.height = `${size}px`;

                    const img = document.createElement('img');
                    img.src = photoList[currentPhotoIndex % photoList.length]; // Use the image in a loop
                    currentPhotoIndex++;  // Move to the next image index
                    img.style.width = '100%';
                    img.style.height = '100%';
                    img.style.objectFit = 'cover';
                    img.style.transition = 'transform 0.5s ease-in-out';


                    // Add hover effect
                    photoItem.addEventListener('mouseover', () => {
                        img.style.transform = 'scale(2.1)';
                        photoItem.style.zIndex = 1001; // Raise z-index to ensure the image is on top
                    });

                    photoItem.addEventListener('mouseout', () => {
                        img.style.transform = 'scale(1)';
                        photoItem.style.zIndex = 0; // Lower z-index to default
                    });

                    photoItem.appendChild(img);

                    // Calculate position, create an elliptical distribution
                    const posX = centerX + spread * Math.cos(angle) - size / 2; // Adjust x-axis slightly
                    const posY = centerY + spread * Math.sin(angle) * (1 - 0.5 * indexMul) - size / 2 - 50;
                    photoItem.style.left = `${posX}px`;
                    photoItem.style.top = `${posY}px`;

                    photoWall.appendChild(photoItem);
                }
            }
        }
    }

    fetchPhotos(); // Initial fetching of images
    // setInterval(fetchPhotos, 5000); // Refresh images every 5 seconds
});
