import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


function GuessingGame() {
    const [ guess, setGuess ] = useState("");
    const [ message, setMessage] = useState("Start Guessing");
    const [ randomNum, setRandomNum] = useState(null);
    const [ timesGuessed, setTimesGuessed] = useState(null);

    useEffect(() => {
        if (randomNum === null ) {

            setRandomNum(
                JSON.parse(localStorage.getItem("random")) || genereateNum()
            );
        };

        if (timesGuessed === null ) {

            setTimesGuessed(
                JSON.parse(localStorage.getItem("guesses")) || 0
            );
        };

    }, []);

    function genereateNum() {
        let random = Math.floor(Math.random() * 100);
        localStorage.setItem("random", JSON.stringify (random));
        return random;
    };

    function handleSubmit(event) {
        event.preventDefault();
        let parseNum = parseInt(guess);

        if (parseNum === randomNum) {
            setMessage('congrats you got it');
        } else if ( parseNum > randomNum ) {
            setMessage('thats to high');
        } else {
            setMessage('thats to low');
        };

        setTimesGuessed(timesGuessed + 1);
        localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));
    };

    function handeleChange(event) {
        if ( !isNaN(event.target.value)) {
            setGuess(event.target.value);
        } else {
            alert('please inpute a number')
        };
    };

    function reset() {
        setGuess("");
        setMessage("Start Guessing")
        setTimesGuessed(0)
        setRandomNum(genereateNum())
        localStorage.removeItem("guesses")
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='text-center'>
                    <Form.Label className='top'>
                        I am thinking of a number between 1 and 100, Guess the lucky number
                    </Form.Label>
                    <br />
                    <Form.Label className='counter'>
                        You have made {timesGuessed} guesses
                    </Form.Label><br/>
                    <input type='number' onChange={handeleChange} value={guess} name='guess' className='numberInput ' /><br/>
                        <Button type='submit' className="guessingBtn">Guess</Button>
                        <Button onClick={reset} type='button' className="resetBtn">Reset</Button><br />
                    <Form.Label>{message}</Form.Label>
                </Form.Group>
            </Form>
        </>
    );
};

export default GuessingGame;