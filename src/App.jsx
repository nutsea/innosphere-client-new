import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoClose, IoMenuOutline } from "react-icons/io5";

import './styles/base.scss'
import './styles/app.scss'

import logo from './assets/images/logo.png'
import location from './assets/images/location.png'
import phone from './assets/images/phone.png'
import email from './assets/images/email.png'
import whats from './assets/images/whats.png'
import tg from './assets/images/tg.png'
import AppRoutes from './AppRoutes'
import { sendToBot } from './http/innoAPI';

function App() {
    const navigate = useNavigate()
    const [phoneNumber, setPhoneNumber] = useState('')
    // eslint-disable-next-line
    const [sendNumber, setSendNumber] = useState('')
    const [sendName, setSendName] = useState('')
    const [sendText, setSendText] = useState('')
    const [scrollPos, setScrollPos] = useState(0)

    const handleNavigate = (e) => {
        if (e.key && e.key !== 'Enter') {
            return
        }
        document.querySelector('.AppContainer').classList.remove('Lock')
        window.scrollTo(0, scrollPos)
        document.querySelector('.AppContainer').setAttribute('style', 'transform: translateY(0)')
        window.scrollTo({
            top: 0,
            left: 0
        })
        navigate(`${e.target.id}`)
        document.querySelector('.AppMenu').classList.add('None')
        document.querySelector('.MenuShow').classList.remove('None')
        document.querySelector('.MenuClose').classList.add('None')
    }

    const toGallery = (e) => {
        if (e.key && e.key !== 'Enter') {
            return
        }
        navigate('/')
        document.querySelector('.AppContainer').classList.remove('Lock')
        window.scrollTo(0, scrollPos)
        document.querySelector('.AppContainer').setAttribute('style', 'transform: translateY(0)')
        document.querySelector('.AppMenu').classList.add('None')
        document.querySelector('.MenuShow').classList.remove('None')
        document.querySelector('.MenuClose').classList.add('None')
        setTimeout(() => {
            const element = document.getElementById('photogallery');
            if (element) {
                const topOffset = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: topOffset - 60,
                    behavior: 'smooth',
                })
            }
        }, 10)
    }

    const handleBackspace = (e) => {
        if (e.keyCode === 8 || e.key === 'Backspace') {
            e.preventDefault()
            const cleaned = ('' + e.target.value).replace(/\D/g, '')
            const match = cleaned.split('')
            let formattedNumber
            switch (cleaned.length) {
                case 10:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}${match[7]}-${match[8]}`
                    break
                case 9:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}${match[7]}-`
                    break
                case 8:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-${match[6]}`
                    break
                case 7:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}${match[5]}-`
                    break
                case 6:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}${match[4]}`
                    break
                case 5:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) ${match[3]}`
                    break
                case 4:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}${match[2]}) `
                    break
                case 3:
                    formattedNumber = !match ? '' :
                        `(${match[0]}${match[1]}`
                    break
                case 2:
                    formattedNumber = !match ? '' :
                        `(${match[0]}`
                    break
                case 1:
                    formattedNumber = !match ? '' : ``
                    break
                case 0:
                    formattedNumber = !match ? '' : ``
                    break

                default:
                    break
            }
            const newCleaned = ('7' + formattedNumber).replace(/\D/g, '')
            setPhoneNumber(formattedNumber)
            setSendNumber(newCleaned)
        }
    }

    const handlePhoneChange = (e) => {
        const formattedNumber = formatPhoneNumber(e)
        const cleaned = ('' + e.target.value).replace(/\D/g, '')
        setPhoneNumber(formattedNumber)
        setSendNumber('7' + cleaned)
        setTimeout(() => {
            console.log(sendNumber.length)
        }, 100);
    }

    const handleName = (e) => {
        setSendName(e.target.value)
    }

    const handleText = (e) => {
        setSendText(e.target.value)
    }

    const formatPhoneNumber = (e) => {
        const cleaned = ('' + e.target.value).replace(/\D/g, '')
        setSendNumber('7' + cleaned)
        const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/)
        let formattedNumber
        switch (cleaned.length) {
            case 10:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
                break
            case 9:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-${match[4]}`
                break
            case 8:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}-`
                break
            case 7:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-${match[3]}`
                break
            case 6:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}-`
                break
            case 5:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}`
                break
            case 4:
                formattedNumber = !match ? '' : `(${match[1]}) ${match[2]}`
                break
            case 3:
                formattedNumber = !match ? '' : `(${match[1]}) `
                break
            case 2:
                formattedNumber = !match ? '' : `(${match[1]}`
                break
            case 1:
                formattedNumber = !match ? '' : `(${match[1]}`
                break
            case 0:
                formattedNumber = !match ? '' : ``
                break

            default:
                break
        }

        return formattedNumber;
    }

    const closeModal = (e) => {
        if (e.key && e.key !== 'Enter') {
            return
        }
        if (!e.target.classList.contains('modal')) {
            document.querySelector('.FeedbackModal').classList.add('None')
            document.querySelector('.AppContainer').classList.remove('Lock')
            window.scrollTo(0, scrollPos)
            document.querySelector('.AppContainer').setAttribute('style', 'transform: translateY(0)')
            setSendName('')
            setSendNumber('')
            setSendText('')
            setPhoneNumber('')
        }
    }

    const sendMessage = async (e) => {
        if (sendName && sendNumber) {
            await sendToBot(sendName, sendNumber, sendText)
        }
        closeModal(e)
    }

    const showModal = () => {
        document.querySelector('.FeedbackModal').classList.remove('None')
        setScrollPos(window.scrollY)
        document.querySelector('.AppContainer').setAttribute('style', `transform: translateY(-${window.scrollY}px)`)
        document.querySelector('.AppContainer').classList.add('Lock')
    }

    const showMenu = () => {
        document.querySelector('.AppMenu').classList.toggle('None')
        document.querySelector('.MenuShow').classList.toggle('None')
        document.querySelector('.MenuClose').classList.toggle('None')
        if (!document.querySelector('.AppMenu').classList.contains('None')) {
            setScrollPos(window.scrollY)
            document.querySelector('.AppContainer').setAttribute('style', `transform: translateY(-${window.scrollY}px)`)
            document.querySelector('.AppContainer').classList.add('Lock')
        } else {
            document.querySelector('.AppContainer').classList.remove('Lock')
            window.scrollTo(0, scrollPos)
            document.querySelector('.AppContainer').setAttribute('style', 'transform: translateY(0)')
        }
    }

    const handleScrollPos = (value) => {
        setScrollPos(value)
    }

    return (
        <div className="App">
            <div className='AppMenu None'>
                <ul className='NavList2'>
                    <li id='/about' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='О нас'>О нас</li>
                    <li id='/price' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Прайс-лист'>Прайс-лист</li>
                    <li onClick={toGallery} onKeyDown={toGallery} tabIndex={0} aria-roledescription='Фотогалерея'>Галерея</li>
                    <li id='/competition' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Конкурсы'>Конкурсы</li>
                    <li id='/news' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Новости'>Новости</li>
                    {/* <li>Благотворительность</li> */}
                    <li onClick={showModal} onKeyDown={showModal} tabIndex={0} aria-roledescription='Обратная связь'>Обратная связь</li>
                </ul>
            </div>
            <header className='AppHeader'>
                <nav className='HeaderNav'>
                    <div className='HeaderLogo' id='/' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='На главную'>
                        <img src={logo} alt="Логотип" id='/' />
                    </div>
                    <ul className='NavList'>
                        <li id='/about' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='О нас'>О нас</li>
                        <li id='/price' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Прайс-лист'>Прайс-лист</li>
                        <li onClick={toGallery} onKeyDown={toGallery} tabIndex={0} aria-roledescription='Фотогалерея'>Галерея</li>
                        <li id='/competition' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Конкурсы'>Конкурсы</li>
                        {/* <li id='/charity' onClick={handleNavigate}>Благотворительность</li> */}
                        <li id='/news' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Новости'>Новости</li>
                    </ul>
                </nav>
                <button className='HeaderFeedback' onClick={showModal} aria-roledescription='Обратная связь'>Обратная связь</button>
                <button className='HeaderMenu' onClick={showMenu}><IoMenuOutline className='MenuShow' size={40} aria-roledescription='Открыть/закрыть меню' /><IoClose className='MenuClose None' size={40} /></button>
            </header>
            <div className='FeedbackModal None' onClick={closeModal}>
                <div className='FeedbackBox modal'>
                    <button className='CloseBtn' onClick={closeModal} aria-roledescription='Закрыть окно записи'><IoClose size={30} /></button>
                    <h3 className='modal'>Получить консультацию</h3>
                    <input className='InputName modal' type="text" value={sendName} placeholder='Ваше имя' onChange={handleName} tabIndex={0} />
                    <div className='InputPhone modal'>
                        <span className='modal'>+7</span>
                        <input
                            className='modal'
                            type="text"
                            placeholder='(999) 999-99-99'
                            maxLength="15"
                            value={phoneNumber}
                            onChange={(e) => {
                                handlePhoneChange(e)
                            }}
                            onKeyDown={handleBackspace}
                            tabIndex={0}
                        />
                    </div>
                    <textarea className='InputTextarea modal' type="text" value={sendText} onChange={handleText} placeholder='Что хотели бы узнать?' tabIndex={0} />
                    <button className={`SendBtn ${sendName.length > 0 && sendNumber.length === 11 ? '' : 'NonActive'}`} onClick={sendMessage} aria-roledescription='Отправить заявку'>Отправить заявку</button>
                </div>
            </div>
            <div className="AppContainer">
                <AppRoutes onChildValueChange={handleScrollPos} />
                <footer>
                    {!window.location.href.includes('admin') &&
                        <div className='FooterMap'>
                            <h2>Мы на карте</h2>
                            <iframe title='Карта' className='YandexMap' src="https://yandex.ru/map-widget/v1/?um=constructor%3A3f7798a40fc52ff81ff351f93a309bc61576924d56a14426c250f94c3a918b1a&amp;source=constructor" width="872" height="400"></iframe>
                        </div>
                    }
                    <div className='FooterContent'>
                        <div className='FooterRow'>
                            <div className='FooterCol'>
                                <div className='FooterLogo' id='/' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='На главную'>
                                    <img src={logo} alt="Логотип" id='/' />
                                    <div className='FLogoText' id='/'>
                                        <div id='/'>Научно-развивающий центр</div>
                                        <div id='/'>«Инносфера»</div>
                                    </div>
                                </div>
                            </div>
                            <div className='FooterCol'>
                                <ul className='FooterNav'>
                                    <li id='/about' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='О нас' role='button'>О нас</li>
                                    <li id='/price' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Прайс-лист'>Прайс-лист</li>
                                    <li onClick={toGallery} onKeyDown={toGallery} tabIndex={0} aria-roledescription='Фотогалерея'>Галерея</li>
                                    <li id='/competition' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Конкурсы'>Конкурсы</li>
                                    {/* <li id='/charity' onClick={handleNavigate}>Благотворительность</li> */}
                                    <li id='/news' onClick={handleNavigate} onKeyDown={handleNavigate} tabIndex={0} aria-roledescription='Новости'>Новости</li>
                                </ul>
                            </div>
                            <div className='FooterCol'>
                                <h3>Контакты</h3>
                                <div className='FooterContact'>
                                    <img src={location} alt="Местоположение" />
                                    <a href="https://yandex.ru/maps/?um=constructor%3A3f7798a40fc52ff81ff351f93a309bc61576924d56a14426c250f94c3a918b1a&source=constructorLink" target='_blank' rel='noreferrer'>г. Альметьевск, ул. Белоглазова 20</a>
                                </div>
                                <div className='FooterContact'>
                                    <img src={phone} alt="Телефон" />
                                    <a href="tel:+79872297205">+7 (987) 229-72-05</a>
                                </div>
                                <div className='FooterContact'>
                                    <img src={email} alt="Почта" />
                                    <a href="mailto">aaa@email.com</a>
                                </div>
                                <div className='FooterContact'>
                                    <img src={whats} alt="Ватсап" />
                                    <a href="http://wa.me/79872297205" target='_blank' rel='noreferrer'>Написать в Whatsapp</a>
                                </div>
                                <div className='FooterContact'>
                                    <img src={tg} alt="Телеграм" />
                                    <a href="http://t.me/Lanaleon83" target='_blank' rel='noreferrer'>Написать в Telegram</a>
                                </div>
                            </div>
                        </div>
                        <div className='FooterRights'>© Все права защищены 2023, Инносфера</div>
                    </div>
                </footer>
            </div>
            {/* <div className='FeedbackModal None' onClick={closeModal}>
                <div className='FeedbackBox modal'>
                    <button className='CloseBtn modal' onClick={closeModal} aria-roledescription='Закрыть окно записи'><IoClose size={30} /></button>
                    <h3 className='modal'>Получить консультацию</h3>
                    <input className='InputName modal' type="text" value={sendName} placeholder='Ваше имя' onChange={handleName} tabIndex={0} />
                    <div className='InputPhone modal'>
                        <span className='modal'>+7</span>
                        <input
                            className='modal'
                            type="text"
                            placeholder='(999) 999-99-99'
                            maxLength="15"
                            value={phoneNumber}
                            onChange={(e) => {
                                handlePhoneChange(e)
                            }}
                            onKeyDown={handleBackspace}
                            tabIndex={0}
                        />
                    </div>
                    <textarea className='InputTextarea modal' type="text" value={sendText} onChange={handleText} placeholder='Что хотели бы узнать?' tabIndex={0} />
                    <button className={`SendBtn ${sendName.length > 0 && sendNumber.length === 11 ? '' : 'NonActive'}`} onClick={sendMessage} aria-roledescription='Отправить заявку'>Отправить заявку</button>
                </div>
            </div> */}
        </div>
    );
}

export default App;
