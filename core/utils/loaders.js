export function loadImage(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });

        image.addEventListener('error', event => {
            reject(`Could not load image from ${url}`);
        });
        image.src = url;
    });
}

export function loadJSON(url) {
    return new Promise(async(resolve, reject) => {
        try {
            let response = await fetch(url);
            let json = await response.json();

            resolve(json)
        } catch (error) {
            reject(error);
        }
    });
}