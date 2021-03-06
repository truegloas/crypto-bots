import axios from 'axios'
import React, { useState, useEffect } from 'react'
import {Container, Row, Button, Col, InputGroup, FormControl} from 'react-bootstrap'

import './CryptoBots.css';
import TOKEN from './local/local.js';


function CryptoBots() {
    const BOT_URL_SERVICE = 'https://back.yourtar.ru/api/admin/bot/';
    const USER_URL_SERVICE = 'https://back.yourtar.ru/api/admin/bot/user';

    const [bots, setBots] = useState(null);
    const [url, setUrl] = useState(null);
    const [userId, setUserId] = useState(null);

    const getBots = async () => {
        const response = await axios.get(
            'https://back.yourtar.ru/api/admin/bot/?offset=0',
            {headers: {
                    "YT-AUTH-TOKEN": TOKEN
                }}
        ).catch(err => {
                console.log(err)
                alert("Ошибка: " + err.message)
            });
        setBots(response.data['data'])
    };

    useEffect(() => {
        getBots();
    }, []);

    const addBot = async (url) => {
        let regexp = new RegExp(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)

        if (!regexp.test(url)) {
            console.log("Ошибка при вводе URL")
            alert("Ошибка при вводе URL, проверьте правильность ввода данных")

            return null
        }

        let data = new FormData();
        data.append("url", url);

        const response = await fetch( BOT_URL_SERVICE, {
            method: 'POST',
            headers: {
                "YT-AUTH-TOKEN": TOKEN
            },
            body: data
        }).then(response => response.json())
            .catch(err => {
                console.log(err)
                alert("Ошибка: " + err.message + "\nВозможно бот с таким url существует")
            });

        getBots();
    };

    const deleteBotById = async (bot_id) => {
        // eslint-disable-next-line no-restricted-globals
        let isDelete = confirm("Вы уверены, что хотите удалить этого бота?")

        if (!isDelete) {
            return null;
        }

        const response = await axios.delete(
            BOT_URL_SERVICE,
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
                data: JSON.stringify({
                    "id": bot_id
                })
            }
        ).then(response => {})
            .catch(err => {
                console.log(err)
                alert("Ошибка: " + err.message)
            });

        getBots();
    }

    const addUserForBot = async (user_id, bot_id) => {
        let headers = new Headers()
        headers.append("YT-AUTH-TOKEN", TOKEN)

        let formData = new FormData()
        formData.append('user', user_id)
        formData.append('id', bot_id)

        let requestOptions = {
            method: 'POST',
            headers: headers,
            body: formData,
        }

        fetch(USER_URL_SERVICE, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(err => {
                console.log("Error", err)
                alert("Ошибка: " + err.message)
            })

        getBots();
    }

    const deleteUserFromBot = async (user_id, bot_id) => {
        // eslint-disable-next-line no-restricted-globals
        let isDelete = confirm("Вы уверены, что хотите удалить этого пользователя у бота?")

        if (isDelete) {
            return null
        }

        const response = await axios.delete(
            USER_URL_SERVICE,
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
                data: JSON.stringify({
                    "id": bot_id,
                    "user": user_id
                })
            }
        ).then(response => {})
            .catch(err => {
                console.log(err)
                alert("Ошибка: " + err.message)
            });

        getBots();
    }

    return (
        <Container className="CryptoBots">
            <Row className='flex-column justify-content-center align-items-center'>
                <h1>Crypto Bots</h1>
            </Row>

            <Row className='justify-content-around'>
                <InputGroup>
                    <Button onClick={() => addBot(url)}>
                        Добавить бота
                    </Button>
                    <FormControl
                        placeholder="URL"
                        onChange={event => setUrl(event.target.value)}
                    />
                </InputGroup>
            </Row>

            <Row className="flex-column justify-content-center align-items-center text-nowrap">
                {bots && bots.map((bot) => {
                    return (
                        <Row key={bot.id} className='flex-row flex-wrap justify-content-center align-items-center'>
                            <Col className='flex-row flex-nowrap'>
                                <span>Идентификатор бота: </span>
                                <span>{bot.id}</span>
                            </Col>

                            <Col className='flex-row flex-nowrap justify-content-between'>
                                <span>Пользователи бота: </span>
                                {bot.users.map((user) => {
                                    return (
                                        <Col>
                                            <span>{user}, </span>
                                            <Button onClick={() => deleteUserFromBot(user, bot.id)}>
                                                Удалить
                                            </Button>
                                        </Col>
                                    )
                                })}
                            </Col>

                            <Col>
                                <InputGroup>
                                    <Button onClick={() => addUserForBot(userId, bot.id)}>
                                        Добавить пользователя боту
                                    </Button>
                                    <FormControl
                                        placeholder="ID"
                                        onChange={event => setUserId(event.target.value)}
                                    />
                                </InputGroup>
                            </Col>

                            <Col>
                                <Button onClick={() => deleteBotById(bot.id)}>
                                    Удалить бота
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
            </Row>
        </Container>
    );
}

export default CryptoBots;