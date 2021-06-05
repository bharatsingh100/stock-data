import classes from './App.module.css';
import {useState} from 'react';
import Navbar from './components/navbar/navbar';
import Home from './containers/home/home';
import Compare from './containers/compare/compare';

function App() {
  const [screen,setScreen] = useState('Stocks');
  return (
    <div className={classes.App}>
      <Navbar screen = {screen} setScreen= {setScreen}/>
      {screen === 'Stocks'?<Home/>:<Compare/>}
    </div>
  );
}

export default App;
