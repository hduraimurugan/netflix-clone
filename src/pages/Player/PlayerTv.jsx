import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const PlayerTv = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: "",
    })

    useEffect(() => {

        const apiKey = import.meta.env.VITE_TMDB_API_KEY
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };

        fetch(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results[0]))
            .catch(err => console.error(err));

    }, [])


    return (
        <div className='player'>
            <img onClick={() => { navigate('/home') }} src={back_arrow_icon} alt="" />

            <iframe width="90%" height="90%"
                src={`https://www.youtube.com/embed/${apiData.key}?autoplay=1&mute=1`}
                title='trailer' frameBorder="0" allowFullScreen></iframe>

            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    )
}

export default PlayerTv