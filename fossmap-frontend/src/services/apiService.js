export async function fetchRoute(start, end) {
    try {
        const response = await fetch(`http://localhost:5000/api/route?start=${start}&end=${end}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
