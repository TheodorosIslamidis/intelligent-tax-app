import React, { useState } from 'react';

function TaxForm() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [advice, setAdvice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ income, expenses }),
      });
      const data = await response.json();
      setAdvice(data.advice);
    } catch (error) {
      console.error('Error fetching tax advice:', error);
    }
  };

  return (
    <div>
      <h2>Tax Filing Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Income:</label>
          <input type="number" value={income} onChange={(e) => setIncome(e.target.value)} />
        </div>
        <div>
          <label>Expenses:</label>
          <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        </div>
        <button type="submit">Get Tax Advice</button>
      </form>
      {advice && (
        <div>
          <h3>Tax Advice:</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
}

export default TaxForm;
