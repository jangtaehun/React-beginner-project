import { useEffect, useState } from "react";

function App() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);

    const [keyword, setKeyword] = useState(0);
    const onChange = (e) => setKeyword(e.target.value);

    const [choice, setChoice] = useState(0);
    const onChoice = (e) => setChoice(e.target.value);

    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json()) //url에서 가져온 정보를 json으로 변환
            .then((json) => {
                setCoins(json); // 변환된 json을 coins(빈 array)에 넣기
                setLoading(false); // loading 글자 지우기
            });
    }, []);

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(count: ${coins.length})`}</h1>
            {loading ? (
                <strong>Loading...</strong>
            ) : (
                <select onChange={onChoice}>
                    {coins.map((coin, index) => (
                        <option value={coin.quotes.USD.price.toFixed(2)}>
                            {coin.name}({coin.symbol}) :{" "}
                            {coin.quotes.USD.price.toFixed(2)} USD
                        </option>
                    ))}
                </select>
            )}
            <div>
                <input
                    onChange={onChange}
                    value={keyword}
                    type="text"
                    placeholder="How much USD?"
                />
            </div>
            <div>
                <h2>
                    you can buy:{" "}
                    {choice > 0 ? (keyword / choice).toFixed(2) : null} coin!!
                </h2>
            </div>
        </div>
    );
}

export default App;
