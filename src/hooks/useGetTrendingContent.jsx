import { useEffect, useState } from 'react'
import { useContentStore } from '../store/content'

const useGetTrendingContent = () => {
    const [trendingContent, setTrendingContent] = useState(null)
    const { contentType } = useContentStore()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getTrendingContent = async () => {
            setLoading(true)

            const apiKey = import.meta.env.VITE_TMDB_API_KEY;

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
            }

            try {
                const response = await fetch(`https://api.themoviedb.org/3/${contentType}?language=en-US&page=1`, options)
                const data = await response.json()
                setTrendingContent(data.results)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        getTrendingContent()
    }, [contentType])

    return { trendingContent, loading }
}

export default useGetTrendingContent
