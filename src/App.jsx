import { useState } from 'react'
import './App.css'

function App() {
  const choices = ['Rock', 'Paper', 'Scissors'];
  const [message, setMessage] = useState('');
  const [wins, setWins] = useState(() => Number(localStorage.getItem('rps_wins')) || 0);
  const [losses, setLosses] = useState(() => Number(localStorage.getItem('rps_losses')) || 0);
  const [draws, setDraws] = useState(() => Number(localStorage.getItem('rps_draws')) || 0);
 
  function play(choice) {
    const computer = choices[Math.floor(Math.random() * 3)];
    let result = '';
    if (choice === computer) {
      result = 'Draw!';
      setDraws(prev => {
        const newVal = prev + 1;
        localStorage.setItem('rps_draws', newVal);
        return newVal;
      });
    } else if (
      (choice === 'Rock' && computer === 'Scissors') ||
      (choice === 'Paper' && computer === 'Rock') ||
      (choice === 'Scissors' && computer === 'Paper')
    ) {
      result = 'You win!';
      setWins(prev => {
        const newVal = prev + 1;
        localStorage.setItem('rps_wins', newVal);
        return newVal;
      });
    } else {
      result = 'You lose!';
      setLosses(prev => {
        const newVal = prev + 1;
        localStorage.setItem('rps_losses', newVal);
        return newVal;
      });
    }
    setMessage(`You: ${choice} | Computer: ${computer}\n${result}`);
  }

  function resetScores() {
    setWins(0);
    setLosses(0);
    setDraws(0);
    localStorage.setItem('rps_wins', 0);
    localStorage.setItem('rps_losses', 0);
    localStorage.setItem('rps_draws', 0);
  }

  return (
    <div>
      <h2>Rock Paper Scissors</h2>
      {choices.map(c => (
        <button key={c} onClick={() => play(c)}>{c}</button>
      ))}
      <div style={{marginTop: '18px', fontWeight: 'bold'}}>
        Wins: {wins} | Losses: {losses} | Draws: {draws}
      </div>
      <button style={{marginTop: '10px', padding: '8px 16px', borderRadius: '6px', background: '#170e77', border: 'none', cursor: 'pointer'}} onClick={resetScores}>Reset Score</button>
      {message && (
        <pre style={{fontSize: '1.2em'}}>{message}</pre>
      )}
    </div>
  );
}

export default App
