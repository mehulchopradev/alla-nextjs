import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

export async function getStaticProps() {
  const { data } = await axios.get('https://my-json-server.typicode.com/mehulchopradev/calc-service/defaultCalcData');

  return {
    props: {
      firstNo: data.firstNo,
      secondNo: data.secondNo,
      ans: data.ans
    }
  }
}

export default function Calc(props) {
  const [calcData, setCalcData] = useState({
    firstNo: props.firstNo,
    secondNo: props.secondNo,
    ans: props.ans,
    operation: '+'
  });

  const handleChange = (event) => {
    const { target: { name, value } } = event;
    setCalcData({
      ...calcData,
      [name]: value,
    });
  }

  const { firstNo, secondNo, ans, operation } = calcData;

  const isDisabled = !firstNo || isNaN(parseInt(firstNo)) || !secondNo || isNaN(parseInt(secondNo));

  return (
    <div className='calculator-form'>
      <div className='row'>
        <input type="text" data-testid="firstNo" name="firstNo" value={firstNo} onChange={handleChange} placeholder="Enter first no"/>
        <select name="operation" value={operation} onChange={handleChange}>
          <option>+</option>
          <option>-</option>
          <option>*</option>
        </select>
        <input type="text" data-testid="secondNo" name="secondNo" onChange={handleChange} value={secondNo} placeholder="Enter second no"/>
      </div>
      <div className='row'>
        <button disabled={isDisabled} data-testid="calculate">Calculate</button>
      </div>
      <div className='row'>
        <input type="text" data-testid="ans" value={ans} name="ans" readOnly/>
      </div>
      <Link href='/'>Back</Link>
    </div>
  )
}