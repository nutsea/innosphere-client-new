import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import { LuPlus } from "react-icons/lu";

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

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
            left: 0
        })
        navigate(`${e.target.id}`)
    }

    const submitPassword = () => {
        if (password === process.env.REACT_APP_ADMIN) {
            setIsAdmin(true)
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
        if (e.id) setChangeId(e.id)
        if (e.name) setName(e.name)
        if (e.text) setText(e.text)
        if (e.price) setPrice(e.price)
        if (e.date) setDate(e.date)
        if (e.category_id) setSelectedOption(e.category_id)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    useEffect(() => {
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
    }, [])

    return (
        <div className="ContentContainer" style={{marginBottom: 30}}>
            <div className="TopLink">
                <div className="Link" id="/" onClick={handleNavigate}>Главная</div>
                <div>&nbsp;/ Панель администратора</div>
            </div>
            <h1 className="AdminSub">Панель администратора</h1>
            {!isAdmin ?
                <>
                <input className="AdminPassword" type="password" value={password} onChange={handlePassword} onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        submitPassword();
                    }
                }} />
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
                                                <div className="ItemTip" style={{marginTop: 0}}>Подтвердите действие</div>
                                                <div>Удалить услугу "{toDelete.name}"</div>
                                                <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteService(true)}>Удалить</button>
                                                <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteService(false)}>Отменить</button>
                                            </div>
                                        }
                                    <div className="ItemBox">
                                        {changeId ?
                                                <>
                                                <div className="ItemTip" style={{marginTop: 0}}>Редактирование услуги</div>
                                                </>
                                                :
                                                <>
                                                <div className="ItemTip" style={{marginTop: 0}}>Создание новой услуги</div>
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
                                                <button className="ItemChange" onClick={() => {itemToChange(item)}} >Редактировать</button>
                                                <button
                                                    className="ItemChange ItemDelete"
                                                    onClick={() => {
                                                    setToDelete(item)
                                                        window.scrollTo({top: 0, behavior: 'smooth'})
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
                                                    <div className="ItemTip" style={{marginTop: 0}}>Подтвердите действие</div>
                                                    <div>Удалить цену "{toDelete.name}"</div>
                                                    <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deletePrice(true)}>Удалить</button>
                                                    <button className="AdminCategory BoxBtn" id="image" onClick={() => deletePrice(false)}>Отменить</button>
                                                </div>
                                            }
                                        <div className="ItemBox">
                                            {changeId ?
                                                    <>
                                                    <div className="ItemTip" style={{marginTop: 0}}>Редактирование цены</div>
                                                    </>
                                                    :
                                                    <>
                                                    <div className="ItemTip" style={{marginTop: 0}}>Создание новой цены</div>
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
                                                    <button className="ItemChange" onClick={() => {itemToChange(item)}} >Редактировать</button>
                                                    <button
                                                        className="ItemChange ItemDelete"
                                                        onClick={() => {
                                                        setToDelete(item)
                                                            window.scrollTo({top: 0, behavior: 'smooth'})
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
                                                        <div className="ItemTip" style={{marginTop: 0}}>Подтвердите действие</div>
                                                        <div>Удалить интенсив "{toDelete.name}"</div>
                                                        <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteIntensive(true)}>Удалить</button>
                                                        <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteIntensive(false)}>Отменить</button>
                                                    </div>
                                                }
                                            <div className="ItemBox">
                                                {changeId ?
                                                        <>
                                                        <div className="ItemTip" style={{marginTop: 0}}>Редактирование интенсива</div>
                                                        </>
                                                        :
                                                        <>
                                                        <div className="ItemTip" style={{marginTop: 0}}>Создание нового интенсива</div>
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
                                                        <button className="ItemChange" onClick={() => {itemToChange(item)}} >Редактировать</button>
                                                        <button
                                                            className="ItemChange ItemDelete"
                                                            onClick={() => {
                                                            setToDelete(item)
                                                                window.scrollTo({top: 0, behavior: 'smooth'})
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
                                                            <div className="ItemTip" style={{marginTop: 0}}>Подтвердите действие</div>
                                                            <div>Удалить отзыв "{toDelete.name}"</div>
                                                            <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteRate(true)}>Удалить</button>
                                                            <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteRate(false)}>Отменить</button>
                                                        </div>
                                                    }
                                                <div className="ItemBox">
                                                    <div className="ItemTip" style={{marginTop: 0}}>Создание нового отзыва</div>
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
                                                                    window.scrollTo({top: 0, behavior: 'smooth'})
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
                                        (category === 'image') &&
                                            <>
                                            <div className="AdminBack" onClick={clickBack}>Назад</div>
                                            <h3 className="AdminPanelSub">Фотогалерея</h3>
                                            {images ?
                                                <>
                                                {toDelete &&
                                                            <div className="ItemBox">
                                                                <div className="ItemTip" style={{marginTop: 0}}>Подтвердите действие</div>
                                                                <div>Удалить фото "{toDelete.text}"</div>
                                                                <button className="AdminCategory BoxBtn ItemDelete" id="image" onClick={() => deleteImage(true)}>Удалить</button>
                                                                <button className="AdminCategory BoxBtn" id="image" onClick={() => deleteImage(false)}>Отменить</button>
                                                            </div>
                                                        }
                                                <div className="ItemBox">
                                                    <div className="ItemTip" style={{marginTop: 0}}>Добавление нового фото</div>
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
                                                                    window.scrollTo({top: 0, behavior: 'smooth'})
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