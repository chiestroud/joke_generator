import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import getJokes from '../helpers/jokeData';
import logo from '../assets/jokeGenerator.jpg';

function App() {
  const [allJokes, setAllJokes] = useState();
  const [singleJoke, setSingleJoke] = useState([]);
  const [showJoke, setShowJoke] = useState(true);
  const [showPunchline, setShowPunchline] = useState(true);

  console.warn(allJokes);

  const handleClick = () => {
    setShowJoke(true);
    setShowPunchline(false);
  };

  const handlePunchlineClick = () => {
    setShowPunchline(true);
  };

  const handleNewClick = () => {
    setSingleJoke(allJokes[Math.floor(Math.random() * allJokes.length)]);
    setShowPunchline(false);
  };

  useEffect(() => {
    getJokes()
      .then((jokes) => {
        setAllJokes(jokes);
        setSingleJoke(jokes[Math.floor(Math.random() * jokes.length)]);
        setShowJoke(false);
        setShowPunchline(false);
      });
  }, []);

  return (
    <div className='App'>
      <img className="logo" src={logo} alt="logo" />
      <h2 className="joke">{showJoke && singleJoke.setup}</h2>
      <h2 className="joke">{showPunchline && singleJoke.punchline}</h2>
      {!showJoke && <Button color="dark" onClick={handleClick} className="button">GET A JOKE</Button>}
      {showJoke && !showPunchline ? <Button color="dark" onClick={handlePunchlineClick} className="button">GET PUNCHLINE</Button> : ''}
      {showJoke && showPunchline ? <Button color="dark" onClick={handleNewClick} className="button">GET A NEW JOKE</Button> : ''}
    </div>
  );
}

export default App;
