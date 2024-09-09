import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import hero_banner from '../../assets/hero_banner.jpg';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../components/TitleCards/TitleCards';
import Footer from '../../components/Footer/Footer';
import useGetTrendingContent from '../../hooks/useGetTrendingContent';
import { useSwipeable } from 'react-swipeable';
import { useContentStore } from '../../store/content';
import { Link } from 'react-router-dom';

const TvShows = () => {
    const { trendingContent } = useGetTrendingContent();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // const {contentType} = useContentStore()
    // console.log(contentType);


    // // Cycle through trending content every 5 seconds with fade effect
    useEffect(() => {
        if (trendingContent && trendingContent.length > 0) {
            const interval = setInterval(() => {
                handleNext();
            }, 5000); // 5 seconds

            return () => clearInterval(interval); // Clean up on unmount
        }
    }, [trendingContent]);

    const handleNext = () => {
        setIsFading(true); // Start fading
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % trendingContent.length);
            setIsFading(false); // End fading after switching content
        }, 500); // Sync fade with transition duration
    };

    const handlePrev = () => {
        setIsFading(true); // Start fading
        setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + trendingContent.length) % trendingContent.length);
            setIsFading(false); // End fading after switching content
        }, 500); // Sync fade with transition duration
    };

    // Swipeable functionality for manual swiping
    const handlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
    });

    const dateSplitter = (date) => {
        const dateSplit = date.split("-");
        const year = dateSplit[0];
        return `${year}`;
    };

    return (
        <div className='tv-shows'>
            <Navbar />

            <div className={`hero`}>
                <img
                    src={trendingContent ? `https://image.tmdb.org/t/p/original${trendingContent[currentIndex]?.backdrop_path}` : null}
                    alt=''
                    className={`banner-img ${isFading ? 'fade-out' : 'fade-in'}`}{...handlers}
                />

                <div className="hero-caption">

                    <div className={`hero-details ${isFading ? 'fade-out' : 'fade-in'}`}>
                        <h1>
                            {trendingContent ? (trendingContent[currentIndex]?.title || trendingContent[currentIndex]?.name) : "The Protector"}
                        </h1>

                        <h3>
                            {trendingContent
                                ? trendingContent[currentIndex]?.first_air_date
                                    ? dateSplitter(trendingContent[currentIndex]?.first_air_date)
                                    : trendingContent[currentIndex]?.release_date
                                        ? dateSplitter(trendingContent[currentIndex]?.release_date)
                                        : "2018"
                                : "2018"}{" "}
                            |{" "}
                            {trendingContent
                                ? trendingContent[currentIndex]?.adult
                                    ? "18+"
                                    : trendingContent[currentIndex]?.name
                                        ? "TV-MA"
                                        : "PG-13"
                                : "TV-MA"}
                        </h3>

                        <p>
                            {trendingContent
                                ? trendingContent[currentIndex]?.overview.slice(0, 200) + "...."
                                : "Discovering his ties to the secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy."}
                        </p>

                        <div className="hero-btns">

                            {trendingContent ? <Link to={`/playerTv/${trendingContent[currentIndex].id}`} className='btn'>
                                <img src={play_icon} alt='' />Play
                            </Link> : <button className='btn'> <img src={play_icon} alt='' />Play</button>}


                            <button className='btn dark-btn'>
                                <img src={info_icon} alt='' />More Info
                            </button>
                        </div>
                    </div>

                    <div className="cards">
                        <TitleCards title={"Popular on Netflix"} tvcategory={'tv/top_rated'}  />
                    </div>


                </div>
            </div>

            <div className="more-cards">
                <TitleCards title={"Trending Now"} tvcategory={'tv/popular'} />
                {/* <TitleCards title={"Blockbuster Movies"} tvcategory={"movie/top_rated"} /> */}
                {/* <TitleCards title={"Upcoming Movies"} tvcategory={'movie/now_playing'} /> */}
                <TitleCards title={"Tv Shows for you"} tvcategory={'tv/top_rated'} />
                <TitleCards title={"Only on Netflix"} tvcategory={'tv/popular'} />
                <TitleCards title={"Top Picks for You"} tvcategory={'tv/airing_today'} />
            </div>

            <Footer />
        </div>
    );
};

export default TvShows;
