// Function to extract JSON-LD data from the page
function getJSONLDData() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (let script of scripts) {
        try {
            const jsonData = JSON.parse(script.textContent);
            if (jsonData['@type'] === 'Book') {
                return jsonData;
            }
        } catch (e) {
            console.error('Error parsing JSON-LD:', e);
        }
    }
    return null;
}

// Get the book data from JSON-LD
const bookData = getJSONLDData();
if (bookData) {
    const title = bookData.name;
    const author = bookData.author && bookData.author[0] ? bookData.author[0].name : null;

    if (title && author) {
        console.log('Book Title:', title);
        console.log('Book Author:', author);

        // Create the search button
        const button = document.createElement('button');
        button.textContent = 'Download';
        button.style.position = 'fixed';
        button.style.top = '10px';
        button.style.right = '10px';
        button.style.padding = '10px';
        button.style.backgroundColor = '#0a74da';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.cursor = 'pointer';
        button.style.zIndex = 10000;

        // Append the button to the body
        document.body.appendChild(button);

        // Add click event to the button to open Anna's Archive search
        button.addEventListener('click', () => {
			window.open(`https://annas-archive.org/search?index=&page=1&q=${encodeURIComponent(`${title} ${author}`)}&display=&sort=`, '_blank');
			window.open(`https://z-lib.id/s?q=${encodeURIComponent(`${title}`)}`, '_blank');
			window.open(`https://z-lib.io/s/${encodeURIComponent(`${title}`)}`, '_blank');
	});
    } else {
        console.log('Could not find title or author in the JSON-LD.');
    }
} else {
    console.log('No JSON-LD book data found.');
}
