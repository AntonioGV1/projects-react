import { useState } from 'react'

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.', //0
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const points = { 0: 1, 1: 3, 2: 4, 3: 2, 4: 0, 5: 0, 6: 1, 7: 2 };
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(points)

  const handleClickVote = () => {
    const copy = { ...vote };
    copy[selected] += 1; 
    setVote(copy);
    console.log(copy)
  };


  const handleClickNextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {vote[selected]} votes</p>
        <Button handleClick={handleClickVote} text="Vote"></Button>
        <Button handleClick={handleClickNextAnecdote} text="Next Anecdote"></Button>
      </div>
      <h1>Anecdote with most votes</h1>
      <div>
        <p>{anecdotes[Object.keys(vote).reduce((a, b) => vote[a] > vote[b] ? a : b)]}</p>
        <p>has {Object.values(vote).reduce((a, b) => Math.max(a, b))} votes</p>
      </div>
    </div>
  )
}

export default App
