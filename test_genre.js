import axios from 'axios';

const API_KEY = "WumZ81X0uW9qxQ3pldOr6pBjuvDVlbnuwD9F9kXh";
const BASE_URL = "https://api.watchmode.com/v1";

async function testGenre() {
    try {
        console.log("Fetching Action Movies (Genre 1)...");
        const res = await axios.get(`${BASE_URL}/list-titles/?apiKey=${API_KEY}&genres=1&types=movie&limit=5`); // Action
        console.log("Action Status:", res.status);
        console.log("Action Titles:", res.data.titles?.length);
        if (res.data.titles?.length > 0) console.log(res.data.titles[0].title);
    } catch (err) {
        console.error("Action Error:", err.message);
    }
}

testGenre();
