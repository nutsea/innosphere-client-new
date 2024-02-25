import React, { useEffect, useState } from 'react';
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import { BiImageAdd } from "react-icons/bi";
import { AiOutlineFileImage } from "react-icons/ai";
import { addDocument, addNews, addTeacher, destroyDocument, destroyNews, destroyTeacher, fetchDocuments, fetchNews, fetchNewsImages, fetchTeachers, updateTeacher } from "../http/innoAPI";

import '../styles/admin.scss'
import {
    addImage,
    addIntensive,
    addPrice, addRate,
    addService, destroyImage, destroyIntensive, destroyPrice, destroyRate, destroyService,
    fetchImages,
    fetchIntensives,
    fetchPrices,
    fetchRates,
    fetchServices, updateIntensive, updatePrice,
    updateService
} from "../http/innoAPI";

const Admin = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [adminError, setAdminError] = useState(false)
    const [category, setCategory] = useState('')
    const [services, setServices] = useState()
    const [prices, setPrices] = useState()
    const [intensives, setIntensives] = useState()
    const [rates, setRates] = useState()
    // eslint-disable-next-line
    const [images, setImages] = useState()
    const [name, setName] = useState('')
    const [text, setText] = useState('')
    const [price, setPrice] = useState('')
    // eslint-disable-next-line
    const [categoryId, setCategoryId] = useState(1)
    const [date, setDate] = useState('')
    const [image, setImage] = useState(null)
    const [changeId, setChangeId] = useState()
    const [toDelete, setToDelete] = useState()
    const [selectedOption, setSelectedOption] = useState(1);
    const [news, setNews] = useState([])
    const [newsText, setNewsText] = useState('')
    const [newsImages, setNewsImages] = useState([])
    const [newsOldImages, setNewsOldImages] = useState([])
    const [position, setPosition] = useState('')
    const [education, setEducation] = useState('')
    const [experience, setExperience] = useState('')
    const [description, setDescription] = useState('')
    const [teachers, setTeachers] = useState()
    const [documents, setDocuments] = useState()
    const [document, setDocument] = useState(null)

    const handleChange = (value) => {
        setNewsText(value)
    }

    const handleSend = () => {
        addNews(newsText, newsImages).then(() => {
            setNews(null)
            fetchNews().then(data => setNews(data))
        })
    }

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
            left: 0
        })
        navigate(`${e.target.id}`)
    }

    const formattedDate = (date) => {
        const d = new Date(date);
        const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }

    const newsToDelete = (id) => {
        document.getElementById(`news${id}`).classList.add('ShowedNews')
    }

    const cancelDeleteNews = (id) => {
        document.getElementById(`news${id}`).classList.remove('ShowedNews')
    }

    const deleteNews = (id) => {
        destroyNews(id).then(() => {
            setNews(null)
            fetchNews().then(data => setNews(data))
        })
    }

    const submitPassword = () => {
        if (password === process.env.REACT_APP_ADMIN) {
            setIsAdmin(true)
            setAdminError(false)
            const today = new Date()
            localStorage.setItem('admin', today.toDateString())
        } else {
            setAdminError(true)
        }
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const chooseCategory = (e) => {
        setCategory(e.target.id)
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleText = (e) => {
        setText(e.target.value)
    }

    const handlePrice = (e) => {
        setPrice(e.target.value)
    }

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleDocument = (e) => {
        setDocument(e.target.files[0])
    }

    const handleDate = (e) => {
        const dateInput = new Date(e.target.value);
        if (!isNaN(dateInput.getTime())) {
            setDate(
                e.target.value.split('-')
                    .map((item, idx) => {
                        if (idx === 1) {
                            return ["", "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"][+item];
                        }
                        return item;
                    })
                    .reverse()
                    .join(' ') + ' г.'
            )
        }
    }

    const clickBack = () => {
        setCategory('')
        setName('')
        setText('')
        setPrice('')
        setCategoryId('')
        setDate('')
        setImage(null)
        setChangeId(null)
    }

    const createService = () => {
        if (!changeId) {
            if (name.length > 0 && text.length > 0) {
                addService(name, text).then(() => {
                    setServices(null)
                    setName('')
                    setText('')
                    fetchServices().then(data => {
                        setServices(data)
                    })
                })
            }
        } else {
            if (name.length > 0 && text.length > 0) {
                updateService(changeId, name, text).then(() => {
                    setServices(null)
                    setName('')
                    setText('')
                    setChangeId(null)
                    fetchServices().then(data => {
                        setServices(data)
                    })
                })
            }
        }
    }

    const createTeacher = () => {
        if (!changeId) {
            if (name.length > 0 && position.length > 0 && education.length > 0 && experience.length > 0) {
                addTeacher(name, position, education, experience, description, image).then(() => {
                    setTeachers(null)
                    setName('')
                    setPosition('')
                    setEducation('')
                    setExperience('')
                    setDescription('')
                    setImage(null)
                    fetchTeachers().then(data => {
                        setTeachers(data)
                    })
                })
            }
        } else {
            if (name.length > 0 && position.length > 0 && education.length > 0 && experience.length > 0) {
                updateTeacher(changeId, name, position, education, experience, description, image).then(() => {
                    setTeachers(null)
                    setName('')
                    setPosition('')
                    setEducation('')
                    setExperience('')
                    setDescription('')
                    setImage(null)
                    setChangeId(null)
                    fetchTeachers().then(data => {
                        setTeachers(data)
                    })
                })
            }
        }
    }

    const deleteTeacher = (check) => {
        if (check) {
            setName('')
            setPosition('')
            setEducation('')
            setExperience('')
            setDescription('')
            setChangeId(null)
            destroyTeacher(toDelete.id).then(() => {
                setTeachers(null)
                setToDelete(null)
                fetchTeachers().then(data => {
                    setTeachers(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const createDocument = () => {
        if (name.length > 0 && text.length > 0 && document) {
            addDocument(name, document, text).then(() => {
                setDocuments(null)
                setText('')
                setName('')
                setDocument(null)
                fetchDocuments().then(data => {
                    setDocuments(data)
                })
            })
        }
    }

    const deleteDocument = (check) => {
        if (check) {
            setText('')
            setDocument(null)
            destroyDocument(toDelete.id).then(() => {
                setDocuments(null)
                setToDelete(null)
                fetchDocuments().then(data => {
                    setDocuments(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const createPrice = () => {
        if (!changeId) {
            if (name.length > 0 && text.length > 0 && price.length > 0) {
                addPrice(selectedOption, name, text, price).then(() => {
                    setPrices(null)
                    setName('')
                    setText('')
                    setPrice('')
                    fetchPrices().then(data => {
                        setPrices(data)
                    })
                })
            }
        } else {
            if (name.length > 0 && text.length > 0 && price.length > 0) {
                updatePrice(changeId, selectedOption, name, text, price).then(() => {
                    setPrices(null)
                    setName('')
                    setText('')
                    setPrice('')
                    setChangeId(null)
                    fetchPrices().then(data => {
                        setPrices(data)
                    })
                })
            }
        }
    }

    const createIntensive = () => {
        if (!changeId) {
            if (name.length > 0 && text.length > 0 && price.length > 0) {
                addIntensive(name, text, price).then(() => {
                    setIntensives(null)
                    setName('')
                    setText('')
                    setPrice('')
                    fetchIntensives().then(data => {
                        setIntensives(data)
                    })
                })
            }
        } else {
            if (name.length > 0 && text.length > 0 && price.length > 0) {
                updateIntensive(changeId, name, text, price).then(() => {
                    setIntensives(null)
                    setName('')
                    setText('')
                    setPrice('')
                    setChangeId(null)
                    fetchIntensives().then(data => {
                        setIntensives(data)
                    })
                })
            }
        }
    }

    const createImage = () => {
        if (text.length > 0 && image) {
            addImage(text, image).then(() => {
                setImages(null)
                setText('')
                setImage(null)
                fetchImages().then(data => {
                    setImages(data)
                })
            })
        }
    }

    const createRate = () => {
        if (name.length > 0 && text.length > 0 && date.length > 0) {
            addRate(date, name, text).then(() => {
                setRates(null)
                setName('')
                setText('')
                setDate('')
                fetchRates().then(data => {
                    setRates(data)
                })
            })
        }
    }

    const deleteService = (check) => {
        if (check) {
            setName('')
            setText('')
            setChangeId(null)
            destroyService(toDelete.id).then(() => {
                setServices(null)
                setToDelete(null)
                fetchServices().then(data => {
                    setServices(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const deletePrice = (check) => {
        if (check) {
            setName('')
            setText('')
            setPrice('')
            setChangeId(null)
            destroyPrice(toDelete.id).then(() => {
                setPrices(null)
                setToDelete(null)
                fetchPrices().then(data => {
                    setPrices(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const deleteIntensive = (check) => {
        if (check) {
            setName('')
            setText('')
            setPrice('')
            setChangeId(null)
            destroyIntensive(toDelete.id).then(() => {
                setIntensives(null)
                setToDelete(null)
                fetchIntensives().then(data => {
                    setIntensives(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const deleteRate = (check) => {
        if (check) {
            setName('')
            setText('')
            setDate(null)
            destroyRate(toDelete.id).then(() => {
                setRates(null)
                setToDelete(null)
                fetchRates().then(data => {
                    setRates(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    // eslint-disable-next-line
    const deleteImage = (check) => {
        if (check) {
            setImage('')
            destroyImage(toDelete.id).then(() => {
                setImages(null)
                setToDelete(null)
                fetchImages().then(data => {
                    setImages(data)
                })
            })
        } else {
            setToDelete(null)
        }
    }

    const itemToChange = (e) => {
        console.log(111)
        if (e.id) setChangeId(e.id)
        if (e.name) setName(e.name)
        if (e.text) setText(e.text)
        if (e.price) setPrice(e.price)
        if (e.date) setDate(e.date)
        if (e.category_id) setSelectedOption(e.category_id)
        if (e.position) setPosition(e.position)
        if (e.education) setEducation(e.education)
        if (e.experience) setExperience(e.experience)
        if (e.description) setDescription(e.description)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const setFiles = (e) => {
        const unset = document.querySelector(`.${e.target.id}Unset`)
        const set = document.querySelector(`.${e.target.id}Set`)
        const clear = document.querySelector(`.${e.target.id}Clear`)

        if (e.target.files.length === 1) {
            const text = document.querySelector(`.${e.target.id}Name`)
            text.innerText = e.target.files[0].name
            unset.classList.remove('Showed')
            set.classList.add('Showed')
            clear.classList.add('Showed')
            // setNewsImages(e.target.files[0])
            let files = []
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])
            }
            setNewsImages(files)
        }

        if (e.target.files.length > 1) {
            const text = document.querySelector(`.${e.target.id}Name`)
            text.innerText = 'Выбрано файлов: ' + e.target.files.length
            unset.classList.remove('Showed')
            set.classList.add('Showed')
            clear.classList.add('Showed')
            let files = []
            for (let i = 0; i < e.target.files.length; i++) {
                files.push(e.target.files[i])
            }
            setNewsImages(files)
        }
    }

    const clearFiles = (e) => {
        document.querySelector(`.${e.target.id}Input`).value = null
        document.querySelector(`.${e.target.id}Unset`).classList.add('Showed')
        document.querySelector(`.${e.target.id}Set`).classList.remove('Showed')
        document.querySelector(`.${e.target.id}Clear`).classList.remove('Showed')
    }

    useEffect(() => {
        const today = new Date()
        if (localStorage.getItem('admin') === today.toDateString()) {
            setIsAdmin(true)
            setAdminError(false)
        }
        console.log(today.toDateString())
        fetchServices().then(data => {
            setServices(data)
        })
        fetchRates().then(data => {
            setRates(data)
        })
        fetchPrices().then(data => {
            setPrices(data)
        })
        fetchIntensives().then(data => {
            setIntensives(data)
        })
        fetchImages().then(data => {
            setImages(data)
        })
        fetchNews().then(data => setNews(data))
        fetchNewsImages().then(data => {
            // setNewsImages(data)
            setNewsOldImages(data)
            // console.log(data)
        })
        fetchTeachers().then(data => setTeachers(data))
        fetchDocuments().then(data => setDocuments(data))
    }, [])

    return (
        <div className="ContentContainer" style={{ marginBottom: 30 }}>
            <div className="TopLink">
                <div className="Link" id="/" onClick={handleNavigate}>Главная</div>
                <div>&nbsp;/ Панель администратора</div>
            </div>
            <h1 className="AdminSub">Панель администратора</h1>
            {!isAdmin ?
                <>
                    <input className="AdminPassword" type="password" placeholder="Пароль" value={password} onChange={handlePassword} onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            submitPassword();
                        }
                    }}
                    />
                    {adminError &&
                        <div className="AdminError">Неверный пароль</div>
                    }
                    <button className="AdminSubmit" onClick={submitPassword}>ВОЙТИ</button>
                </>
                :
                <>
                    {category === '' ?
                        <>
                            <button className="AdminCategory MaxWidth" id="service" onClick={chooseCategory}>Услуги</button>
                            <button className="AdminCategory MaxWidth" id="price" onClick={chooseCategory}>Прайс</button>
                            <button className="AdminCategory MaxWidth" id="intensive" onClick={chooseCategory}>Интенсивы</button>
                            <button className="AdminCategory MaxWidth" id="rate" onClick={chooseCategory}>Отзывы</button>
                            <button className="AdminCategory MaxWidth" id="image" onClick={chooseCategory}>Фотогалерея</button>
                            <button className="AdminCategory MaxWidth" id="news" onClick={chooseCategory}>Новости</button>
                            <button className="AdminCategory MaxWidth" id="teachers" onClick={chooseCategory}>Сотрудники</button>
                            <button className="AdminCategory MaxWidth" id="documents" onClick={chooseCategory}>Документы</button>
                        </>
                        :
                        (category === 'service') ?
                            <>
                                <div className="AdminBack" onClick={clickBack}>Назад</div>
                                <h3 className="AdminPanelSub">Услуги</h3>
                                {services ?
                                    <>
                                        {toDelete &&
                                            <div className="ItemBox">
                                                <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                <div>Удалить услугу "{toDelete.name}"</div>
                                                <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteService(true)}>Удалить</button>
                                                <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteService(false)}>Отменить</button>
                                            </div>
                                        }
                                        <div className="ItemBox">
                                            {changeId ?
                                                <>
                                                    <div className="ItemTip" style={{ marginTop: 0 }}>Редактирование услуги</div>
                                                </>
                                                :
                                                <>
                                                    <div className="ItemTip" style={{ marginTop: 0 }}>Создание новой услуги</div>
                                                </>
                                            }
                                            <input className="AdminInput BoxInput" type="text" placeholder="Название услуги" value={name} onChange={handleName} />
                                            <textarea className="AdminInput BoxInput" placeholder="Описание" value={text} onChange={handleText}></textarea>
                                            <button className={`AdminCategory BoxBtn ${name.length > 0 && text.length > 0 ? '' : 'NonActive'}`} id="image" onClick={createService}><LuPlus size={20} /></button>
                                        </div>
                                        {services.map((item, i) => {
                                            return (
                                                <div className="ItemBox" key={item.id}>
                                                    <div className="ItemBoxSub">Услуга {i + 1}</div>
                                                    <div className="ItemTip">Название</div>
                                                    <div className="ItemText">{item.name}</div>
                                                    <div className="ItemTip">Описание</div>
                                                    <div className="ItemText">{item.text}</div>
                                                    <button className="ItemChange" onClick={() => { itemToChange(item) }} >Редактировать</button>
                                                    <button
                                                        className="ItemChange ItemDelete"
                                                        onClick={() => {
                                                            setToDelete(item)
                                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                                        }}
                                                    >
                                                        Удалить
                                                    </button>
                                                </div>
                                            )
                                        })}
                                    </>
                                    :
                                    <div className='LoaderBox LoaderBox2'>
                                        <span className="Loader"></span>
                                    </div>
                                }
                            </>
                            :
                            (category === 'price') ?
                                <>
                                    <div className="AdminBack" onClick={clickBack}>Назад</div>
                                    <h3 className="AdminPanelSub">Прайс</h3>
                                    {prices ?
                                        <>
                                            {toDelete &&
                                                <div className="ItemBox">
                                                    <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                    <div>Удалить цену "{toDelete.name}"</div>
                                                    <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deletePrice(true)}>Удалить</button>
                                                    <button className="AdminCategory BoxBtn" id="image" onClick={() => deletePrice(false)}>Отменить</button>
                                                </div>
                                            }
                                            <div className="ItemBox">
                                                {changeId ?
                                                    <>
                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Редактирование цены</div>
                                                    </>
                                                    :
                                                    <>
                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Создание новой цены</div>
                                                    </>
                                                }
                                                <div className="ItemTip">Категория</div>
                                                <select className="AdminInput SelectInput" id="selectOption" name="options" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="1">Диагностика и консультации специалистов</option>
                                                    <option value="2">АВА - поведенческая аналитика</option>
                                                    <option value="3">Индивидуальные и групповые занятия</option>
                                                    <option value="4">Индивидуальные программы</option>
                                                </select>
                                                <input className="AdminInput BoxInput" type="text" placeholder="Название услуги" value={name} onChange={handleName} />
                                                <textarea className="AdminInput BoxInput" placeholder="Описание" value={text} onChange={handleText}></textarea>
                                                <input className="AdminInput BoxInput" type="text" placeholder="Цена" value={price} onChange={handlePrice} />
                                                <button className={`AdminCategory BoxBtn ${name.length > 0 && text.length > 0 && price.length ? '' : 'NonActive'}`} id="image" onClick={createPrice}><LuPlus size={20} /></button>
                                            </div>
                                            {prices.map((item, i) => {
                                                return (
                                                    <div className="ItemBox" key={item.id}>
                                                        <div className="ItemBoxSub">Цена {i + 1}</div>
                                                        <div className="ItemTip">Название</div>
                                                        <div className="ItemText">{item.name}</div>
                                                        <div className="ItemTip">Описание</div>
                                                        <div className="ItemText">{item.text}</div>
                                                        <div className="ItemTip">Цена</div>
                                                        <div className="ItemText">{item.price}</div>
                                                        <button className="ItemChange" onClick={() => { itemToChange(item) }} >Редактировать</button>
                                                        <button
                                                            className="ItemChange ItemDelete"
                                                            onClick={() => {
                                                                setToDelete(item)
                                                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                                            }}
                                                        >
                                                            Удалить
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                        </>
                                        :
                                        <div className='LoaderBox LoaderBox2'>
                                            <span className="Loader"></span>
                                        </div>
                                    }
                                </>
                                :
                                (category === 'intensive') ?
                                    <>
                                        <div className="AdminBack" onClick={clickBack}>Назад</div>
                                        <h3 className="AdminPanelSub">Интенсивы</h3>
                                        {intensives ?
                                            <>
                                                {toDelete &&
                                                    <div className="ItemBox">
                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                        <div>Удалить интенсив "{toDelete.name}"</div>
                                                        <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteIntensive(true)}>Удалить</button>
                                                        <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteIntensive(false)}>Отменить</button>
                                                    </div>
                                                }
                                                <div className="ItemBox">
                                                    {changeId ?
                                                        <>
                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Редактирование интенсива</div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Создание нового интенсива</div>
                                                        </>
                                                    }
                                                    <input className="AdminInput BoxInput" type="text" placeholder="Название услуги" value={name} onChange={handleName} />
                                                    <textarea className="AdminInput BoxInput" placeholder="Описание" value={text} onChange={handleText}></textarea>
                                                    <input className="AdminInput BoxInput" type="text" placeholder="Цена" value={price} onChange={handlePrice} />
                                                    <button className={`AdminCategory BoxBtn ${name.length > 0 && text.length > 0 && price.length ? '' : 'NonActive'}`} id="image" onClick={createIntensive}><LuPlus size={20} /></button>
                                                </div>
                                                {intensives.map((item, i) => {
                                                    return (
                                                        <div className="ItemBox" key={item.id}>
                                                            <div className="ItemBoxSub">Интенсив {i + 1}</div>
                                                            <div className="ItemTip">Название</div>
                                                            <div className="ItemText">{item.name}</div>
                                                            <div className="ItemTip">Описание</div>
                                                            <div className="ItemText">{item.text}</div>
                                                            <div className="ItemTip">Цена</div>
                                                            <div className="ItemText">{item.price}</div>
                                                            <button className="ItemChange" onClick={() => { itemToChange(item) }} >Редактировать</button>
                                                            <button
                                                                className="ItemChange ItemDelete"
                                                                onClick={() => {
                                                                    setToDelete(item)
                                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                }}
                                                            >
                                                                Удалить
                                                            </button>
                                                        </div>
                                                    )
                                                })}
                                            </>
                                            :
                                            <div className='LoaderBox LoaderBox2'>
                                                <span className="Loader"></span>
                                            </div>
                                        }
                                    </>
                                    :
                                    (category === 'rate') ?
                                        <>
                                            <div className="AdminBack" onClick={clickBack}>Назад</div>
                                            <h3 className="AdminPanelSub">Отзывы</h3>
                                            {rates ?
                                                <>
                                                    {toDelete &&
                                                        <div className="ItemBox">
                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                            <div>Удалить отзыв "{toDelete.name}"</div>
                                                            <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteRate(true)}>Удалить</button>
                                                            <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteRate(false)}>Отменить</button>
                                                        </div>
                                                    }
                                                    <div className="ItemBox">
                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Создание нового отзыва</div>
                                                        <div className="ItemTip">Дата</div>
                                                        <input className="AdminInput BoxInput DateInput" type="date" placeholder="Дата" onChange={handleDate} />
                                                        <input className="AdminInput BoxInput" type="text" placeholder="Имя" value={name} onChange={handleName} />
                                                        <textarea className="AdminInput BoxInput" placeholder="Отзыв" value={text} onChange={handleText}></textarea>
                                                        <button className={`AdminCategory BoxBtn ${name.length > 0 && text.length > 0 && date.length ? '' : 'NonActive'}`} id="image" onClick={createRate}><LuPlus size={20} /></button>
                                                    </div>
                                                    {rates.map((item, i) => {
                                                        return (
                                                            <div className="ItemBox" key={item.id}>
                                                                <div className="ItemBoxSub">Отзыв {i + 1}</div>
                                                                <div className="ItemTip">Дата</div>
                                                                <div className="ItemText">{item.date}</div>
                                                                <div className="ItemTip">Имя</div>
                                                                <div className="ItemText">{item.name}</div>
                                                                <div className="ItemTip">Содержание</div>
                                                                <div className="ItemText">{item.text}</div>
                                                                <button
                                                                    className="ItemChange ItemDelete"
                                                                    onClick={() => {
                                                                        setToDelete(item)
                                                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                    }}
                                                                >
                                                                    Удалить
                                                                </button>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <div className='LoaderBox LoaderBox2'>
                                                    <span className="Loader"></span>
                                                </div>
                                            }
                                        </>
                                        :
                                        (category === 'image') ?
                                            <>
                                                <div className="AdminBack" onClick={clickBack}>Назад</div>
                                                <h3 className="AdminPanelSub">Фотогалерея</h3>
                                                {images ?
                                                    <>
                                                        {toDelete &&
                                                            <div className="ItemBox">
                                                                <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                                <div>Удалить фото "{toDelete.text}"</div>
                                                                <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteImage(true)}>Удалить</button>
                                                                <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteImage(false)}>Отменить</button>
                                                            </div>
                                                        }
                                                        <div className="ItemBox">
                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Добавление нового фото</div>
                                                            <input className="AdminInput BoxInput" type="text" placeholder="Надпись" value={text} onChange={handleText} />
                                                            <input className="AdminInput BoxInput DateInput" onChange={handleImage} type="file" />
                                                            <button className={`AdminCategory BoxBtn ${text.length > 0 && image ? '' : 'NonActive'}`} id="image" onClick={createImage}><LuPlus size={20} /></button>
                                                        </div>
                                                        {images.map((item, i) => {
                                                            return (
                                                                <div className="ItemBox" key={item.id}>
                                                                    <div className="ItemBoxSub">Фото {i + 1}</div>
                                                                    <div className="ItemTip">Надпись</div>
                                                                    <div className="ItemText">{item.text}</div>
                                                                    <img className="ItemImg" src={`${process.env.REACT_APP_API_URL + item.name}`} alt="Фото" />
                                                                    <button
                                                                        className="ItemChange ItemDelete"
                                                                        onClick={() => {
                                                                            setToDelete(item)
                                                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                        }}
                                                                    >
                                                                        Удалить
                                                                    </button>
                                                                </div>
                                                            )
                                                        })}
                                                    </>
                                                    :
                                                    <div className='LoaderBox LoaderBox2'>
                                                        <span className="Loader"></span>
                                                    </div>
                                                }
                                            </>
                                            : (category === 'news') ?
                                                <>
                                                    <div className="AdminBack" onClick={clickBack}>Назад</div>
                                                    <h3 className="AdminPanelSub">Новости</h3>
                                                    {news ?
                                                        <>
                                                            <div className="ItemBox2">
                                                                <div className="ItemTip" style={{ marginTop: 0 }}>Добавление новой новости</div>
                                                                <ReactQuill
                                                                    className='ReactQuill'
                                                                    style={{ marginTop: 10 }}
                                                                    theme="snow"
                                                                    value={newsText}
                                                                    onChange={handleChange}
                                                                    modules={{
                                                                        toolbar: [
                                                                            [{ 'header': '1' }, { 'header': '2' },],
                                                                            [{ size: [] }],
                                                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                                            [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                                                            { 'indent': '-1' }, { 'indent': '+1' }],
                                                                            ['link', 'video'],
                                                                        ],
                                                                    }}
                                                                    formats={[
                                                                        'header', 'font', 'size',
                                                                        'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                                        'list', 'bullet', 'indent',
                                                                        'link', 'image', 'video'
                                                                    ]}
                                                                />
                                                                <div className="FileInput origfiles">
                                                                    <input
                                                                        className="origfilesInput"
                                                                        type="file"
                                                                        accept=".jpg, .jpeg, .JPG, .JPEG, .png, .PNG"
                                                                        multiple={true}
                                                                        id="origfiles"
                                                                        name="files"
                                                                        onChange={(e) => {
                                                                            setFiles(e)
                                                                            // handleChangeItem(e)
                                                                        }}
                                                                    />
                                                                    <div className="FileInfo origfilesUnset Showed">
                                                                        <div className="FileText">
                                                                            <BiImageAdd className="FileImg" size={30} />
                                                                            <div className="FileTextLoad">Фотографии</div>
                                                                        </div>
                                                                        <div className="FileClue">Нажмите на поле или перетащите фото</div>
                                                                        <div className="FileClue">Формат - png или jpeg (jpg)</div>
                                                                    </div>
                                                                    <div className="FileInfo origfilesSet">
                                                                        <div className="FileText">
                                                                            <AiOutlineFileImage size={30} />
                                                                            <div className="FileTextLoad origfilesName"></div>
                                                                        </div>
                                                                        <div className="FileClue">Наведите курсор, чтобы увидеть названия файлов</div>
                                                                    </div>
                                                                </div>
                                                                <div className="files FileClear origfilesClear" id="origfiles" name="files" onClick={clearFiles}>Очистить поле</div>
                                                                <button className='AdminCategory Width100' onClick={handleSend}>Добавить</button>
                                                                {news && news.map(item =>
                                                                    <div key={item.id} className="AboutPanel NewsContainerAdmin">
                                                                        <div className='FullRowNews'>
                                                                            <div className="NewsDate">{formattedDate(item.createdAt)}</div>
                                                                            <div className='DeleteNewsBtn' onClick={() => newsToDelete(item.id)}>Удалить</div>
                                                                        </div>
                                                                        <div className='NewsToDelete' id={'news' + item.id}>
                                                                            <div className='NewsToDeleteText'>Удалить новость?</div>
                                                                            <div className='NewsToDeleteBtns'>
                                                                                <div className='NewsToDeleteBtn AdminCategory MaxWidth50 DeleteBtn' onClick={() => deleteNews(item.id)}>Удалить</div>
                                                                                <div className='NewsToDeleteBtn AdminCategory MaxWidth50' onClick={() => cancelDeleteNews(item.id)}>Отмена</div>
                                                                            </div>
                                                                        </div>
                                                                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                                                                        <div className="NewsImages">
                                                                            {newsOldImages.map(image => {
                                                                                if (Number(image.news_code) === Number(item.id)) {
                                                                                    return <img key={image.id} className="NewsImgAdmin" src={`${process.env.REACT_APP_API_URL + image.name}`} alt="Кр" />
                                                                                } else {
                                                                                    return null
                                                                                }
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                        :
                                                        <div className='LoaderBox LoaderBox2'>
                                                            <span className="Loader"></span>
                                                        </div>
                                                    }
                                                </>
                                                :
                                                (category === 'teachers') ?
                                                    <>
                                                        <div className="AdminBack" onClick={clickBack}>Назад</div>
                                                        <h3 className="AdminPanelSub">Сотрудники</h3>
                                                        {teachers ?
                                                            <>
                                                                {toDelete &&
                                                                    <div className="ItemBox">
                                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                                        <div>Удалить сотрудника "{toDelete.name}"</div>
                                                                        <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteTeacher(true)}>Удалить</button>
                                                                        <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteTeacher(false)}>Отменить</button>
                                                                    </div>
                                                                }
                                                                <div className="ItemBox">
                                                                    {changeId ?
                                                                        <>
                                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Редактирование сотрудника</div>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <div className="ItemTip" style={{ marginTop: 0 }}>Добавление нового сотрудника</div>
                                                                        </>
                                                                    }
                                                                    <input className="AdminInput BoxInput" type="text" placeholder="ФИО сотрудника" value={name} onChange={handleName} />
                                                                    <input className="AdminInput BoxInput" type="text" placeholder="Должность" value={position} onChange={(e) => setPosition(e.target.value)} />
                                                                    <input className="AdminInput BoxInput" type="text" placeholder="Образование" value={education} onChange={(e) => setEducation(e.target.value)} />
                                                                    <input className="AdminInput BoxInput" type="text" placeholder="Опыт работы" value={experience} onChange={(e) => setExperience(e.target.value)} />
                                                                    <textarea className="AdminInput BoxInput" placeholder="Дополнительно" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                                                    <input className="AdminInput BoxInput DateInput" onChange={handleImage} type="file" />
                                                                    <button className={`AdminCategory BoxBtn ${name.length > 0 && position.length > 0 && education.length > 0 && experience.length > 0 ? '' : 'NonActive'}`} id="image" onClick={createTeacher}><LuPlus size={20} /></button>
                                                                </div>
                                                                {teachers.map((item, i) => {
                                                                    return (
                                                                        <div className="ItemBox" key={item.id}>
                                                                            <div className="ItemBoxSub">Сотрудник {i + 1}</div>
                                                                            <div className="ItemTip">ФИО</div>
                                                                            <div className="ItemText">{item.name}</div>
                                                                            <div className="ItemTip">Должность</div>
                                                                            <div className="ItemText">{item.position}</div>
                                                                            <div className="ItemTip">Образование</div>
                                                                            <div className="ItemText">{item.education}</div>
                                                                            <div className="ItemTip">Опыт работы</div>
                                                                            <div className="ItemText">{item.experience}</div>
                                                                            {item.description &&
                                                                                <>
                                                                                    <div className="ItemTip">Дополнительно</div>
                                                                                    <div className="ItemText">{item.description}</div>
                                                                                </>
                                                                            }
                                                                            {item.img &&
                                                                                <img className='Width100 MT10' src={process.env.REACT_APP_API_URL + item.img} alt="" />
                                                                            }
                                                                            <button className="ItemChange" onClick={() => { itemToChange(item) }} >Редактировать</button>
                                                                            <button
                                                                                className="ItemChange ItemDelete"
                                                                                onClick={() => {
                                                                                    setToDelete(item)
                                                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                                }}
                                                                            >
                                                                                Удалить
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                            :
                                                            <div className='LoaderBox LoaderBox2'>
                                                                <span className="Loader"></span>
                                                            </div>
                                                        }
                                                    </>
                                                    :
                                                    (category === 'documents') &&
                                                    <>
                                                        <div className="AdminBack" onClick={clickBack}>Назад</div>
                                                        <h3 className="AdminPanelSub">Документы</h3>
                                                        {documents ?
                                                            <>
                                                                {toDelete &&
                                                                    <div className="ItemBox">
                                                                        <div className="ItemTip" style={{ marginTop: 0 }}>Подтвердите действие</div>
                                                                        <div>Удалить документ "{toDelete.name}"</div>
                                                                        <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteDocument(true)}>Удалить</button>
                                                                        <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteDocument(false)}>Отменить</button>
                                                                    </div>
                                                                }
                                                                <div className="ItemBox">
                                                                    <div className="ItemTip" style={{ marginTop: 0 }}>Добавление нового документа</div>
                                                                    <input className="AdminInput BoxInput" type="text" placeholder="Название документа" value={name} onChange={handleName} />
                                                                    <input className="AdminInput BoxInput DateInput" onChange={handleDocument} type="file" />
                                                                    <textarea className="AdminInput BoxInput" placeholder="Описание" value={text} onChange={handleText}></textarea>
                                                                    <button className={`AdminCategory BoxBtn ${name.length > 0 && text.length > 0 && document ? '' : 'NonActive'}`} id="image" onClick={createDocument}><LuPlus size={20} /></button>
                                                                </div>
                                                                {documents.map((item, i) => {
                                                                    return (
                                                                        <div className="ItemBox" key={item.id}>
                                                                            <div className="ItemBoxSub">Документ {i + 1}</div>
                                                                            <div className="ItemTip">Название</div>
                                                                            <div className="ItemText">{item.name}</div>
                                                                            <div className="ItemTip">Описание</div>
                                                                            <div className="ItemText">{item.text}</div>
                                                                            <a className='DocumentShow' href={process.env.REACT_APP_API_URL + item.document}>Просмотр</a>
                                                                            <button
                                                                                className="ItemChange ItemDelete"
                                                                                onClick={() => {
                                                                                    setToDelete(item)
                                                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                                                }}
                                                                            >
                                                                                Удалить
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </>
                                                            :
                                                            <div className='LoaderBox LoaderBox2'>
                                                                <span className="Loader"></span>
                                                            </div>
                                                        }
                                                    </>
                    }
                </>
            }
        </div>
    )
}

export default Admin