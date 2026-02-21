import axios from 'axios';

const API_KEY = "WumZ81X0uW9qxQ3pldOr6pBjuvDVlbnuwD9F9kXh";
const BASE_URL = "https://api.themoviedb.org/3";

async function testApiKey() {
    console.log("Testing as v3 API Key (param)...");
    try {
        const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        console.log("Success with api_key param!");
        console.log("Sample:", res.data.results[0].title);
    } catch (err) {
        console.log("Failed as param:", err.response?.status, err.response?.data?.status_message);
    }

    console.log("\nTesting as Bearer Token (header)...");
    try {
        const res = await axios.get(`${BASE_URL}/movie/popular`, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        });
        console.log("Success with Bearer token!");
        console.log("Sample:", res.data.results[0].title);
    } catch (err) {
        console.log("Failed as Bearer:", err.response?.status, err.response?.data?.status_message);
    }
}

testApiKey();
