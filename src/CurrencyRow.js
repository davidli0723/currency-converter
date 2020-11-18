import React from 'react'

export function FromCurrencyRow(props) {
    const {
        onChangeAmount,
        amount
    } = props

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select>
                <option value="USD">USD</option>
            </select>
        </div>
    )
}

export function ToCurrencyRow(props) {
    const {
        currencyOptions,
        selectCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props

    return (
        <div>
            <input type="number" className="input" value={amount} onChange={onChangeAmount}/>
            <select value = {selectCurrency} onChange={onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

