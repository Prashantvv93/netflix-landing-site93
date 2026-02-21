import axios from 'axios';

const API_KEY = "WumZ81X0uW9qxQ3pldOr6pBjuvDVlbnuwD9F9kXh";
const BASE_URL = "https://api.watchmode.com/v1";

async function testWatchmode() {
    console.log("Testing Watchmode API...");

    // 1. List Titles (Trending equivalent?)
    // Watchmode doesn't have a direct "trending" endpoint in free tier usually, but let's try list-titles
    try {
        console.log("Fetching list-titles...");
        const res = await axios.get(`${BASE_URL}/list-titles/?apiKey=${API_KEY}&types=movie&limit=5`);
        console.log("List Titles Success:", res.status);
        console.log("Sample Title:", res.data.titles[0]);

        // 2. Title Details
        const titleId = res.data.titles[0].id;
        console.log(`\nFetching details for ID ${titleId}...`);
        const detailsRes = await axios.get(`${BASE_URL}/title/${titleId}/details/?apiKey=${API_KEY}&append_to_response=sources`);
        console.log("Details Success:", detailsRes.status);
        console.log("Details Sample:", {
            title: detailsRes.data.title,
            plot: detailsRes.data.plot_overview,
            poster: detailsRes.data.poster,
            backdrop: detailsRes.data.backdrop,
            trailer: detailsRes.data.trailer,
            sources: detailsRes.data.sources?.length
        });

    } catch (err) {
        console.error("Error:", err.response?.status, err.response?.data || err.message);
    }

    // 3. Search
    try {
        console.log("\nTesting Search...");
        const searchRes = await axios.get(`${BASE_URL}/search/?apiKey=${API_KEY}&search_field=name&search_value=Avengers&types=movie`);
        console.log("Search Success:", searchRes.status);
        console.log("Search Results:", searchRes.data.title_results?.length);
    } catch (err) {
        console.error("Search Error:", err.response?.status, err.response?.data);
    }
}

testWatchmode();
