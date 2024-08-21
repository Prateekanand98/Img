     let page = 1;
    const accessKey = '3RgoleO08bTmqL2LtGOXRsXvOAq8P5-Bb1DoxeQrRQQ';
    const imageGrid = document.getElementById('image-grid');

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function fetchImages() {
        fetch(`https://api.unsplash.com/photos?page=${page}&client_id=${accessKey}`)
            .then(response => response.json())
            .then(images => {
                images.forEach(image => {
                    const imgDiv = document.createElement('div');
                    imgDiv.classList.add('image-container');
                    imgDiv.innerHTML = `<img src="${image.urls.regular}" alt="${image.alt_description}"/>`;
                    imageGrid.appendChild(imgDiv);
                });
                document.body.style.backgroundColor = getRandomColor();
            })
            .catch(error => console.error(error));
    }

    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            page++;
            fetchImages();
        }
    }

    window.addEventListener('scroll', onScroll);

    // Initial image load
    fetchImages();