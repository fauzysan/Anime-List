import axios from "axios";

export const getAnimeList = async() => {
    const anime = await axios.get(
        "https://api.jikan.moe/v4/top/anime"
        )
    return anime.data.data
}

export const searchAnime = async(q) => {
    const search = await axios.get(`https://api.jikan.moe/v4/anime?q=${q}`)
    return search.data
}