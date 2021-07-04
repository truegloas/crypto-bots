import axios from 'axios'
import React, { useState } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

import './CryptoBots.css';
import TOKEN from './local/local.js';


function CryptoBots() {
    const BOT_SERVICE_URL = 'https://back.yourtar.ru/api/admin/bot/?offset=0'

    const [bots, setBots] = useState(null);

    const getBots = async () => {
        const response = await axios.get(
            BOT_SERVICE_URL,
            {headers: {
                "YT-AUTH-TOKEN": TOKEN
            }});
        console.log(response.data['data'].id)
        setBots(response.data['data']);
    };

    return (
        <Container className="CryptoBots">
            <Row className='flex-column justify-content-center align-items-center'>
                <h1>Crypto Bots</h1>
                <h2>Manage data with the buttons below!</h2>
            </Row>

            <Row>
                <Button className="fetch-Button" onClick={getBots}>
                    Get Bots
                </Button>
            </Row>

            <Row className="flex-column justify-content-center align-items-center">
                {bots && bots.map((bot) => {
                    return (
                        <Row className="" key={bot.id}>
                            <Row className="">
                                <p>Идентификатор бота: {bot.id}</p>
                                <p>Пользователи бота: {bot.users.map((user) => {
                                    return (
                                        <p>{user}</p>
                                    )
                                })}</p>
                            </Row>
                        </Row>
                    );
                })}
            </Row>
        </Container>
    );
}

export default CryptoBots;