// import Button from "./Button";
// import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
    const [counter, setCounter] = useState(0);
    const [keyword, setKeyword] = useState("");

    const onClick = () => setCounter((prev) => prev + 1);
    const onChange = (event) => setKeyword(event.target.value);

    useEffect(() => {
        console.log("Call the API");
    }, []);
    // 지켜볼 대상이 없기 때문에 코드가 한 번만 실행된다.

    useEffect(() => {
        if ((keyword !== "") & (keyword.length > 2)) {
            console.log("Search for", keyword);
        }
    }, [keyword]);
    // [keyword]: keyword가 변화할 때 코드를 실행할 거라고 알려준다.

    useEffect(() => {
        console.log("i run when counter changes");
    }, [counter]);

    useEffect(() => {
        console.log("i run when counter&keyword changes");
    }, [counter, keyword]);
    // 여러 개 가능

    return (
        <div>
            <input
                value={keyword}
                onChange={onChange}
                type="text"
                placeholder="Search here..."
            />
            <h1>{counter}</h1>
            <button onClick={onClick}>click me</button>
        </div>
    );
}

export default App;
