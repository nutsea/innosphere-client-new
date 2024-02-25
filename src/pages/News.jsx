import React, { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { fetchNews, fetchNewsImages } from "../http/innoAPI";
import { useNavigate } from "react-router-dom";
import '../styles/news.scss'

const News = () => {
    const navigate = useNavigate()
    const [news, setNews] = useState([])
    const [images, setImages] = useState([])

    const formattedDate = (date) => {
        const d = new Date(date);
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
            left: 0
        })
        navigate(`${e.target.id}`)
    }

    useEffect(() => {
        fetchNews().then(data => setNews(data))
        fetchNewsImages().then(data => {
            setImages(data)
        })
    }, [])

    return (
        <section className="ContentContainer">
            <div className="TopLink">
                <div className="Link" id="/" onClick={handleNavigate}>Главная</div>
                <div>&nbsp;/ Новости</div>
            </div>
            <h1 className='NewsSub'>Новости</h1>
            <div className="AboutContainer PB0">
                {news.map(item =>
                    <div key={item.id} className="AboutPanel NewsContainer">
                        <div className="NewsDate">{formattedDate(item.createdAt)}</div>
                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                        <div className="NewsImages MT10">
                            {images.map(image => {
                                if (Number(image.news_code) === Number(item.id)) {
                                    return <img key={image.id} className="NewsImg" src={`${process.env.REACT_APP_API_URL + image.name}`} alt="Кр" />
                                } else {
                                    return null
                                }
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default News;