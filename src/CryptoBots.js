import axios from 'axios'
import React, { useState } from 'react'
import './CryptoBots.css';
import TOKEN from './local/local.js';


function CryptoBots() {
    const BOT_SERVICE_URL = 'https://back.yourtar.ru/api/admin/bot/?offset=0'

    const [bots, setBots] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(
            BOT_SERVICE_URL,
            {headers: {
                "YT-AUTH-TOKEN": TOKEN
            }});
        console.log(response.data['data'].id)
        setBots(response.data['data']);
    };

    return (
        <div className="CryptoBots">
            <h1>GET Bots</h1>
            <h2>Fetch a list from an API and display it</h2>

            <div>
                <button className="fetch-button" onClick={fetchData}>
                    Fetch Data
                </button>
            </div>

            <div className="bots">
                {bots &&
                bots.map((bot) => {
                    return (
                        <div className="bot" key={bot.id}>
                            <div className="details">
                                <p>{bot.id}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CryptoBots;