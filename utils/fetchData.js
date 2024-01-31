let fetch;

async function fetchData(url) {
    if (!fetch) {
        fetch = (await import('node-fetch')).default;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

module.exports = fetchData;
