import axios from 'axios';

const API_KEY = "WumZ81X0uW9qxQ3pldOr6pBjuvDVlbnuwD9F9kXh";
const BASE_URL = "https://api.watchmode.com/v1";

async function inspectList() {
    try {
        console.log("Fetching list-titles...");
        const res = await axios.get(`${BASE_URL}/list-titles/?apiKey=${API_KEY}&types=movie&limit=1`);
        console.log("First Title Object:", JSON.stringify(res.data.titles[0], null, 2));
    } catch (err) {
        console.error("List Error:", err.message);
    }

    try {
        console.log("\nTesting Search with 'Avengers'...");
        // Try without search_field, or name
        const res = await axios.get(`${BASE_URL}/autocomplete-search/?apiKey=${API_KEY}&search_value=Avengers&search_type=1`);
        console.log("Autocomplete Results:", res.data.results?.length);
        if (res.data.results?.length > 0) {
            console.log("Sample:", res.data.results[0]);
        }

        const res2 = await axios.get(`${BASE_URL}/search/?apiKey=${API_KEY}&search_field=name&search_value=Avengers`);
        console.log("Search Results:", res2.data.title_results?.length);

    } catch (err) {
        console.error("Search Error:", err.message);
    }
}

inspectList();
