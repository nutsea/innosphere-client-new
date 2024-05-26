import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import '../styles/price.scss'
import {fetchIntensives, fetchPrices} from "../http/innoAPI";

const Price = ({onChildValueChange}) => {
    const navigate = useNavigate()
    const [services, setServices] = useState(null)
    const [intesives, setIntensives] = useState(null)

    const handleNavigate = (e) => {
        window.scrollTo({
            top: 0,
            left: 0
        })
        navigate(`${e.target.id}`)
    }

    useEffect(() => {
        fetchPrices().then(data => {
            setServices(data)
        })
        fetchIntensives().then(data => {
            setIntensives(data)
        })
//        setServices([
//            { category_id: 1, name: 'Комплексная консультация специалистов (первичная)', text: 'Количество специалистов зависит от запроса. Обследование проводится в присутствии родителей, в игровой форме.\nДлительность  1 час.', price: '2000 ₽' },
//            { category_id: 1, name: 'Индивидуальная консультация специалистов: Логопед, Дефектолог, Нейропсихолог, Психолог, ведущий специалист по АПФ-стимуляции', text: 'Консультация проводится в присутствии родителей, в игровой форме. Длительность 50 минут.', price: '1500 ₽' },
//            { category_id: 1, name: 'Нейропсихологическая диагностика для детей школьного возраста', text: 'Диагностика проводится в присутствии родителей. Длительность – от 1,5 до 2,5 часов.', price: '2500 ₽' },
//            { category_id: 2, name: 'Диагностика навыков ребенка (тестирование VB-MAPP)', text: 'Длительность диагностики зависит от уровня сформированности навыков ребенка – от 1 до 3 часов.', price: '2000 ₽ / час' },
//            { category_id: 2, name: 'Индивидуальное занятие старшего АВА-специалиста', text: 'Длительность – 50 минут.', price: '2000 ₽' },
//            { category_id: 2, name: 'Индивидуальное занятие АВА-специалиста', text: 'Длительность – 50 минут.', price: '1700 ₽' },
//            { category_id: 2, name: 'Индивидуальная программа (2 недели)', text: 'Программа включает:\n • 10 занятий с АВА-специалистом – не менее 5 часов в неделю, длительностью 50 минут с диагностикой;\n • 1 час курации (встречи с родителями, тренинги родителей, контроль динамики развития ребенка)', price: '23000 ₽' },
//            { category_id: 2, name: 'Разработка индивидуальной программы', text: 'В программе отражены результаты диагностики и подробно описаны процедуры формирования навыков и коррекции поведения ребенка. Стоимость рассчитывается исходя из периода, на который составляется программа и уровня сформированности навыков ребенка.', price: 'от 5000 ₽' },
//            { category_id: 3, name: 'Логопед, Дефектолог, Психолог, Нейропсихолог', text: 'Специальное предложение при покупке абонемента, стоимость 1 занятия:\n50 минут – 1350;\n30 минут – 1080 руб;\n5 занятий по 50 минут – 6 750 руб;\n10 занятий по 50 минут – 13 500 руб;\n5 занятий по 30 минут – 5 400 руб;\n10 занятий по 30 минут – 10 080 руб.', price: '50 мин – 1500 ₽ / 30 мин – 1200 ₽' },
//            { category_id: 3, name: 'Нейрогимнастика', text: 'Группа формируется от 3 до 5 человек.', price: 'Индивидуальное занятия: 50 мин – 1400 ₽ / 30 мин – 1100 ₽\nГрупповое занятие: 50 мин – 700 ₽ / чел.' },
//            { category_id: 4, name: 'Программа по запуску речи, коррекции поведения для детей от 3 до 7 лет «Говорю и понимаю»', text: 'Программа, включает занятия с нейропсихологом, логопедом, сенсорная интеграция, АВА – терапия, логоритмика. Стоимость рассчитывается с учетом периода программы и уровня сформированности навыков ребенка', price: 'Цена по согласованию' },
//        ])
//        setIntensives([
//            {name: 'Интенсив 1', text: 'Длительность – 15 дней.\n • 1 Комплексная консультация 3-х специалистов (логопед-дефектолог, специалист по сенсорной интеграции, нейропсихолог) и краткое заключение на бланке Центра и рекомендации по дальнейшей коррекции\n • Курс по аудио-психо-фонологической стимуляции методом Томатис Besson (Швейцария) из 29 сессий. Диагностика в начале и конце курса- в подарок\n • Курс биоакустической коррекции из 10 процедур\n • 6 занятий с нейропсихологом\n • 6 занятий с логопедом-дефектологом\n • 6 занятий по сенсорной интеграции\n • 1 диагностическое занятие АВА (поведенческая аналитика), необходимо присутствие родителя(ей)\n • 12 занятий АВА (поведенческая аналитика)\n • 1 кураторский час с родителем(ями)\n • 4 групповых занятия арт-терапией', price: '96 000 ₽'},
//            {name: 'Интенсив 2', text: 'Длительность – 15 дней.\n • 1 Комплексная консультация 3-х специалистов (специалист АВА (поведенческая аналитика), нейропсихолог, специалист по сенсорной интеграции), краткое заключение на бланке Центра и рекомендации по дальнейшей коррекции\n • Курс по аудио-психо-фонологической стимуляции методом Томатис Besson (Швейцария) из 29 сессий. Диагностика в начале и конце курса- в подарок.\n • 6 занятий с нейропсихологом\n • 12 занятий АВА (поведенческая аналитика)\n • 1 кураторский час с родителем(ями)\n • 6 занятий по сенсорной интеграции\n • 4 групповых занятия арт-терапией', price: '77 500 ₽'}
//        ])
    }, [])

    const textSplit = (text) => {
        return text.split('\n')
    }

    const showModal = () => {
        document.querySelector('.FeedbackModal').classList.remove('None')
        onChildValueChange(window.scrollY)
        document.querySelector('.AppContainer').setAttribute('style', `transform: translateY(-${window.scrollY}px)`)
        document.querySelector('.AppContainer').classList.add('Lock')
    }

    return (
        <section className="ContentContainer">
            <div className="TopLink">
                <div className="Link" id="/" onClick={handleNavigate}>Главная</div>
                <div>&nbsp;/ О нас</div>
            </div>
            <div className="AboutContainer PB0">
                <div className="AboutPanel">
                    <h1>Прайс-лист на услуги</h1>
                    {services && intesives ?
                        <>
                            <h2>Диагностика и консультации специалистов</h2>
                            {services.filter(service => service.category_id === 1).map((item, i) => {
                                return (
                                    <div className="PriceCard" key={i}>
                                        <h3>{item.name}</h3>
                                        {textSplit(item.text).map((text, j) => {
                                            return (
                                                <p key={j}>{text}</p>
                                            )
                                        })}
                                        {textSplit(item.price).map((price, j) => {
                                            return (
                                                <h2 key={j}>{price}</h2>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <h2 className="MT30">АВА - поведенческая аналитика</h2>
                            {services.filter(service => service.category_id === 2).map((item, i) => {
                                return (
                                    <div className="PriceCard" key={i}>
                                        <h3>{item.name}</h3>
                                        {textSplit(item.text).map((text, j) => {
                                            return (
                                                <p key={j}>{text}</p>
                                            )
                                        })}
                                        {textSplit(item.price).map((price, j) => {
                                            return (
                                                <h2 key={j}>{price}</h2>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <h2 className="MT30">Индивидуальные и групповые занятия</h2>
                            {services.filter(service => service.category_id === 3).map((item, i) => {
                                return (
                                    <div className="PriceCard" key={i}>
                                        <h3>{item.name}</h3>
                                        {textSplit(item.text).map((text, j) => {
                                            return (
                                                <p key={j}>{text}</p>
                                            )
                                        })}
                                        {textSplit(item.price).map((price, j) => {
                                            return (
                                                <h2 key={j}>{price}</h2>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <h2 className="MT30">Индивидуальные программы</h2>
                            {services.filter(service => service.category_id === 4).map((item, i) => {
                                return (
                                    <div className="PriceCard" key={i}>
                                        <h3>{item.name}</h3>
                                        {textSplit(item.text).map((text, j) => {
                                            return (
                                                <p key={j}>{text}</p>
                                            )
                                        })}
                                        {textSplit(item.price).map((price, j) => {
                                            return (
                                                <h2 key={j}>{price}</h2>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <h1 className="MT50">Интенсивы</h1>
                            <p>Мы ждем на ИНТЕНСИВЫ детей с задержками в развитии и речи, в том числе с ЗПР, ЗПРР, ЗРР, РАС, ОВЗ, ФФНР, СДВГ, синдромом Дауна, алалией, дислалией, а также неговорящих детей, слабослышащих. Наши специалисты имеют большой опыт работы с данными отклонениями с детьми от 3 до 12 лет.</p>
                            <h2 className="MT30">Сроки проведения</h2>
                            <p>01 мая – 14 мая</p>
                            <p>19 июня – 2 июля</p>
                            <p>01 июля – 15 июля</p>
                            <p>17 июля – 30 июля</p>
                            <p>7 августа – 20 августа</p>
                            <p>Обращаем ваше внимание, что количество мест на интенсивы ограничено.</p>
                            <p>Просим подавать заявки и бронировать время специалистов заблаговременно.</p>
                            <h2 className="MT30">Программа интенсива</h2>
                            <p><b>В зависимости от выбранного пакета услуг, в программу входят:</b></p>
                            <p>• &nbsp; В процессе проведения интенсива важна командная работа всех специалистов, поэтому в начале курса ребенок проходит <b>Комплексную консультацию 3-х специалистов</b> продолжительностью около 1 часа. По результатам консультации составляется индивидуальный план работы с ребенком.</p>
                            <p>По окончании интенсива выдается краткое заключение на бланке Центра и рекомендации по дальнейшей коррекции.</p>
                            <p>• &nbsp; <b>Курс занятий по аудио-психо-фонологической стимуляции методом Томатис Besson (Швейцария)</b> состоит из 15 процедур (29 сессий).Из которых: 14 процедур длительностью 2 часа, 15-ая процедура - 1 час. В подарок от Центра, перед началом курса и в конце курса проводится диагностика без оплаты.</p>
                            <p>• &nbsp; <b>Курс биоакустической коррекции (БАК)</b> состоит из 10 процедур длительностью 20 минут. Обращаем ваше внимание! Курс проводится только по медицинским показаниям на основании назначения врача- невролога. При выборе программы с курсом БАК, родители предоставляют копию назначения врача-невролога.</p>
                            <p>• &nbsp; <b>Индивидуальные занятия с Нейропсихологом</b> продолжительностью 50 минут по индивидуальному плану. В зависимости от плана, с ребенком проводят: занятия по сенсорной интеграции, баламетрикс, мозжечковая стимуляция и другие нейропсихологические методики. Занятия проводятся в специально оборудованных кабинетах, в том числе, сенсорной комнате, в спортивном или тренажерном залах, в антигравитационной комнате.</p>
                            <p>• &nbsp; <b>Индивидуальные занятия с Логопедом Дефектологом</b> продолжительностью 50 минут по индивидуальному плану. При необходимости, согласно задачам коррекции, в процессе занятия проводится логопедический массаж. Для достижения максимальных результатов, логопедическая коррекция сочетается с нейрокоррекцией. Занятия проводятся в оборудованном кабинете.</p>
                            <p>• &nbsp; <b>ABA (поведенческая аналитика)</b> продолжительностью 50 минут. До начала проведения данного курса родитель заполняет анкету (заочно, в электронном виде). Куратор АВА проводит первичную консультацию, диагностирует навыки и наблюдает поведение ребенка, дает предварительное видение стратегии обучения («стратегии вмешательства»). В курс АВА включена 1 курация родителей –консультация, на которой вы сможете задать волнующие вопросы относительно развития ребенка и получить необходимые рекомендации. За отдельную плату, по запросу родителей может быть составлена индивидуальная АВА-программа развития навыков и коррекции поведения ребенка в домашних условиях.</p>
                            <p>• &nbsp; <b>Групповые занятия арт-терапией</b> продолжительностью 60 минут. В зависимости от возможностей и потребностей ребенка арт-терапевт может применять различную комбинацию методов: сказкотерапию, игровую терапию, песочная терапия, психологические игры, упражнения и иные виды и техники арт-терапии. Специалист работает с группой детей 2-4 человека в специально оборудованном кабинете.</p>
                            <h2 className="MT30">Стоимость и содержание программ</h2>
                            {intesives.map((intensive, i) => {
                                return (
                                    <div className="IntensiveCard" key={i}>
                                        <h3>{intensive.name}</h3>
                                        {textSplit(intensive.text).map((text, j) => {
                                            return (
                                                <p key={j}>{text}</p>
                                            )
                                        })}
                                        {textSplit(intensive.price).map((price, j) => {
                                            return (
                                                <h2 key={j}>{price}</h2>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                            <h3 className="MT30">Возможно составление ИНДИВИДУАЛЬНЫХ ИНТЕНСИВОВ для ребенка под ваш запрос.</h3>
                            <p className="MT20">В индивидуальные курсы интенсивов могут войти любые другие занятия нейропсихологии, логопедии, психотерапии.</p>
                            <p className="MB0 MT20">Для составления индивидуального курса интенсива обращайтесь по телефону +7 (987) 229-72-05 с информацией:</p>
                            <p className="MT5">• &nbsp; интересующие занятия</p>
                            <p>• &nbsp; возраст ребенка на начало интенсива</p>
                            <p>• &nbsp; диагноз и задачи, которые хотите решить.</p>
                            <p>• &nbsp; контактные данные, телефон.</p>
                            <p className="MB0 MT20">В ответ вам пришлем информацию о наличии свободных мест и варианты программы, их стоимость, анкету.</p>
                            <p className="MT5">Также, вы можете подать заявку, заполнив <button className="GreenLink" onClick={showModal}>форму</button>.</p>
                        </>
                        :
                        <div className='LoaderBox'>
                            <span className="Loader"></span>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default Price;