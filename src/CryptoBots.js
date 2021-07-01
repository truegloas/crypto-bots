import axios from 'axios'
import React, { useState } from 'react'
import './CryptoBots.css';


function CryptoBots() {
    const BOT_SERVICE_URL = 'https://back.yourtar.ru/api/admin/bot/?offset=0'

    const [bots, setBots] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(BOT_SERVICE_URL);
        setBots(response.data);
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
                        <div className="bot" key={bot}>
                            <div className="details">
                                <p>{bot}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CryptoBots;