import React, { useEffect, useState } from 'react';
import './App.css';
import {FromCurrencyRow, ToCurrencyRow} from './CurrencyRow';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment'

var BASE_URL = 'https://openexchangerates.org/api/latest.json?app_id=cb1a41f02f59435aa4563c5b93815bcc'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date())

  let date = moment(selectedDate).format("YYYY-MM-DD")
  
  BASE_URL = `https://openexchangerates.org/api/historical/${date}.json?app_id=cb1a41f02f59435aa4563c5b93815bcc`
  
  let toAmount, fromAmount
  if (amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }
  

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const defaultcurrency = Object.keys(data.rates)[0]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setToCurrency(defaultcurrency)
      })
  }, [])

  useEffect(() => {
    fetch(`${BASE_URL}&symbols=${toCurrency}`)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
  })

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
      <div className="header">
        <h1>Currency Converter <img src="logo.png" alt="logo" height="64px"></img></h1>
      </div>

      <div className="content">
      <FromCurrencyRow 
        amount={fromAmount}
        onChangeAmount={handleFromAmountChange}
      />
      <h2>=</h2>
      <ToCurrencyRow 
        currencyOptions = {currencyOptions}
        selectCurrency = {toCurrency}
        onChangeCurrency = {e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
      <p>Current Converted Date: {date}</p>
      <DatePicker 
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        dateFormat = 'yyyy-MM-dd'
        minDate={new Date("1990-01-01")}
        maxDate={new Date()}
        inline
      />
      </div>
    </>
  );
}

export default App;
