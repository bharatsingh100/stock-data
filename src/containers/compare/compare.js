
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';
import classes from './compare.module.css'
import SymbolsFile from '../../data/symbols.csv'
import SelectInput from '../../components/uiComponents/select/select'
import CompareTable from '../../components/compareTable/compareTable'

export default function Compare(props){
  const [stocks,setStocks] = useState([]);
  const [selectedStocks,setSelected] = useState([]);
  const [tableRows,setRows] = useState([]);

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


  const handleChange = async (event) =>{
    const newArray = [...selectedStocks]
    let symbolIsSelected= false
    newArray.forEach(symbol =>{
      if(symbol === event.target.value){
        symbolIsSelected = true;
      }
    })

    if(symbolIsSelected) return

    //Load new stockdata from api
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${event.target.value}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`)
    const newRows= [...tableRows];
    const date = new Date();
    const maxDateDiff = date - (new Date(0));
    let latestDate;
    for(let day in response.data["Time Series (Daily)"]){
      const dateDiff = date - (new Date(day))
      if(dateDiff < maxDateDiff) latestDate = day;
    }
    newRows.push({
      ...response.data["Time Series (Daily)"][latestDate],
      symbol: event.target.value
    })
    console.log(newRows)
    newArray.push(event.target.value)
    setSelected(newArray);
    setRows(newRows);
  }
  
  return (
    <div className={classes.main}>
      <div className={classes.select}>
        <SelectInput list={stocks} handleChange={handleChange} />
      </div>
      <div className={classes.Table}>
        <CompareTable rows ={tableRows}/>
      </div>
    </div>
  )
}