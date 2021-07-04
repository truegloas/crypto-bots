import axios from 'axios'
import React, { useState } from 'react'
import {Container, Row, Button, Col} from 'react-bootstrap'

import './CryptoBots.css';
import TOKEN from './local/local.js';


function CryptoBots() {
    const BOT_URL_SERVICE = 'https://back.yourtar.ru/api/admin/bot/';

    const [bots, setBots] = useState(null);

    const getBots = async () => {
        const response = await axios.get(
            'https://back.yourtar.ru/api/admin/bot/?offset=0',
            {headers: {
                    "YT-AUTH-TOKEN": TOKEN
                }}
        );
        setBots(response.data['data'])
    };

    const addBot = async () => {
        const response = await axios.post(
            BOT_URL_SERVICE,
            {user: 1},
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
                data: {
                    user: 1
                }
            }
        );
    };

    const deleteBotById = async (bot_id) => {
        const response = await axios.delete(
            BOT_URL_SERVICE,
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
                data: {
                    "id": bot_id
                }
            }
        )
    }

    const addUserForBot = async (user_id, bot_id) => {
        const response = await axios.post(
            BOT_URL_SERVICE,
            {user: user_id, id: bot_id},
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
            }
        );
    }

    const deleteUserFromBot = async (user_id, bot_id) => {
        const response = await axios.delete(
            BOT_URL_SERVICE,
            {
                headers: {
                    "YT-AUTH-TOKEN": TOKEN
                },
                data: {
                    "id": bot_id,
                    "user": user_id
                }
            }
        );
    }

    return (
        <Container className="CryptoBots">
            <Row className='flex-column justify-content-center align-items-center'>
                <h1>Crypto Bots</h1>
            </Row>

            <Row className='justify-content-around'>
                <Button onClick={getBots}>
                    Список ботов
                </Button>
                <Button onClick={addBot}>
                    Добавить бота
                </Button>
            </Row>

            <Row className="flex-column justify-content-center align-items-center text-nowrap">
                {bots && bots.map((bot) => {
                    return (
                        <Row key={bot.id}>
                            <Col className='flex-row flex-nowrap'>
                                <p>Идентификатор бота: </p>
                                <p>{bot.id}</p>
                            </Col>

                            <Col className='flex-row flex-nowrap col-auto'>
                                <p>Пользователи бота: </p>
                                {bot.users.map((user) => {
                                    return (
                                        <p>{user}, </p>
                                    )
                                })}
                            </Col>

                            <Col>
                                <Button onClick={addUserForBot(1, bot.id)}>
                                    Добавить пользователя боту
                                </Button>
                            </Col>

                            <Col>
                                <Button onClick={deleteUserFromBot(1, bot.id)}>
                                    Удалить пользователя у бота
                                </Button>
                            </Col>

                            {/*<Col>*/}
                            {/*    <Button onClick={deleteBotById(bot.id)}>*/}
                            {/*        Удалить бота*/}
                            {/*    </Button>*/}
                            {/*</Col>*/}
                        </Row>
                    );
                })}
            </Row>
        </Container>
    );
}

export default CryptoBots;