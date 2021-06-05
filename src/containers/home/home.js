import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import classes from './home.module.css';
import Chart from '../../components/chart/chart'
import SymbolsFile from '../../data/symbols.csv'
import SelectInput from '../../components/uiComponents/select/select'


export default function Home(props) {
  const [stocks,setStocks] = useState([]);
  const [selected,setSelected] = useState({flag: false});

  useEffect(() =>{
    // to initialize the stock list
    Papa.parse(process.env.PUBLIC_URL+'/data/symbols.csv', {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function(results) {
        const newArray = results.data.map(row =>{
          return {
            symbol: row.Symbol,
            name: row.Name?row.Name.slice(0,15):null
          }
        })
        setStocks(newArray);
      }
    });
  },[])

  const handleChange =async (event) =>{
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${event.target.value}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
    
    const data = [];
    const dailyData = response.data["Time Series (Daily)"];
    
    for(let key in dailyData){
      const date = new Date(key);
      const value = ((+dailyData[key]["2. high"]) + (+dailyData[key]["3. low"]))/2;
      data.push([date.getTime(),value]);
    }
    setSelected({
      flag:true,
      symbol: event.target.value,
      data: data
    })
  }

  return(
    <div className={classes.main}>
      <div className={classes.select}>
        <SelectInput list={stocks} handleChange={handleChange}/>
      </div>
      <div className={classes.chart}>
        {selected.flag ? <Chart stock={selected.symbol} data={selected.data} /> : null}
      </div>
    </div>
  )
}