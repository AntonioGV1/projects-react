import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// un lugar adecuado para definir un componente
const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return <p>No feedback given</p>;
  }
  return(
    <>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={all} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive} />
        </tbody>
      </table>
    </>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);


  const calculoAverage = (good, bad, all) => {
    console.log(good, bad, all)
    return ((good - bad)/all)
  }

  const calculoComentarioPositivo = (good, all) => {
    console.log(good)
    return (((good)/all) * 100)
  }

  const handleClickGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage(calculoAverage(good + 1, bad, all + 1))
    setPositive(calculoComentarioPositivo(good + 1, all + 1))
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage(calculoAverage(good, bad, all + 1));
    setPositive(calculoComentarioPositivo(good, all + 1))
  }

  const handleClickBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(calculoAverage(good, bad + 1, all + 1))
    setPositive(calculoComentarioPositivo(good, all + 1))
  }
 

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClickGood} text="Good"></Button>
      <Button handleClick={handleClickNeutral} text="Neutral"></Button>
      <Button handleClick={handleClickBad} text="Bad"></Button>

      <h2>Statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />    
    </div>
  )
}

export default App
