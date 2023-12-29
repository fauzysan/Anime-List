import { Inter } from 'next/font/google'
import {getAnimeList, searchAnime} from "./api"
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [popularAnimes , setPopularAnime] = useState([])
  useEffect (() => {
    getAnimeList().then((result) => {
      setPopularAnime(result)
    })
  }, [])
  
  const PopularAnimeList = () => {
    return popularAnimes.map((anime, i) => {
      const title = anime.titles.map(p => p.title)
      return (
        <div className='w-60 p-5 m-5 bg-grey rounded-xl' key={i}>
          <img src={anime.images.jpg.image_url} className='object-cover rounded-xl' alt="" />
          <div className="p-2"></div>
          <h2 className='font-bold text-lg'>{anime.titles[0].title}</h2>
          <div className="p-2"></div>
          <div className=" text-underline"><a href={anime.url} target='_blank'>See in MyAnimeList</a></div>
          <div className="p-2"></div>
          <div className="text-md">Realese: {anime.aired.string}</div>
          <div>Rating:⭐{anime.score}</div>
          
        </div>
      )
    })
  }
  
  const search = async(q) => {
    if(q.length > 4){
      const query = await searchAnime(q)
      setPopularAnime(query.data)
    }
  }

  return (
    <div className='text-center'>
      <header className='bg-black min-h-screen flex flex-col items-center justify-center text-space font-Poppins'>
        <p className='text-6xl mb-3 py-5'>Anime List</p>
        <input type="text" className='rounded text-black h-[60px] mb-4 p-2 text-lg font-bold w-1/2' placeholder='Cari Anime ' onChange={({target}) => search(target.value)  } />
        <div className=" flex flex-wrap justify-center">
          <PopularAnimeList />
        </div>
      </header>
    </div>
  )
}
