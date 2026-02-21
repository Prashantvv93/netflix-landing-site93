import axios from 'axios';

const API_KEY = "WumZ81X0uW9qxQ3pldOr6pBjuvDVlbnuwD9F9kXh";
const BASE_URL = "https://api.watchmode.com/v1";

async function fetchGenres() {
    try {
        console.log("Fetching Genres...");
        const res = await axios.get(`${BASE_URL}/genres/?apiKey=${API_KEY}`);
        console.log("Genres:", JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error("Error:", err.message);
    }
}

fetchGenres();
