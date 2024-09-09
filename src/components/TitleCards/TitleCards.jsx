import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category, tvcategory }) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const handlewheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };

    fetch(`https://api.themoviedb.org/3/${category||tvcategory}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handlewheel);
  }, [])

  return (

    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={category&& `/player/${card.id}` || tvcategory&& `/playerTv/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${category&&card.poster_path || tvcategory&&card.poster_path}`} alt="card-img" className='card-img' />
            <p>{card.title || card.name}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards