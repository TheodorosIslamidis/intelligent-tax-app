import React, { useState, useEffect } from 'react';
import './TaxForm.css';
import ReactMarkdown from 'react-markdown';

function TaxForm() {
  // Form fields
  const [salaryIncome, setSalaryIncome] = useState(0);
  const [freelanceIncome, setFreelanceIncome] = useState(0);
  const [propertyIncome, setPropertyIncome] = useState(0);
  const [investmentGains, setInvestmentGains] = useState(0);
  const [propertyInfos, setPropertyInfos] = useState([0]);
  const [loans, setLoans] = useState(0);
  const [businessExpenses, setBusinessExpenses] = useState(0);

  // States for API response and typewriter effect
  const [advice, setAdvice] = useState('');
  const [displayedAdvice, setDisplayedAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  // Update property info value for a specific index
  const handlePropertyChange = (index, value) => {
    const updatedProperties = [...propertyInfos];
    updatedProperties[index] = Number(value);
    setPropertyInfos(updatedProperties);
  };

  // Add a new property info input
  const handleAddProperty = () => {
    setPropertyInfos([...propertyInfos, 0]);
  };

  // Submit the form and fetch tax advice
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisplayedAdvice(''); // Reset streaming text

    try {
      const response = await fetch('http://localhost:5000/tax', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salaryIncome: Number(salaryIncome),
          freelanceIncome: Number(freelanceIncome),
          propertyIncome: Number(propertyIncome),
          investmentGains: Number(investmentGains),
          propertyInfos: propertyInfos.map(Number),
          loans: Number(loans),
          businessExpenses: Number(businessExpenses),
        }),
      });
      const data = await response.json();

      console.log('Full advice from server:', data.advice);

      const fullAdvice = data.advice || data.error;
      setAdvice(fullAdvice);
    } catch (error) {
      console.error('Error:', error);
      setAdvice('Σφάλμα στην ανάκτηση των φορολογικών συμβουλών.');
    }
    setLoading(false);
  };

  

  // Typewriter effect to stream the advice text faster (20ms per character)
  useEffect(() => {
  if (!loading && advice) {
    let currentIndex = 0;
    const typeNextCharacter = () => {
      if (currentIndex < advice.length-1) {
        setDisplayedAdvice((prev) => prev + advice[currentIndex]);
        currentIndex++;
        setTimeout(typeNextCharacter, 10);
      }
    };
    typeNextCharacter();
  }
}, [loading, advice]);


  return (
    <div className="app-container">
      <div className="app-description">
        <h2>Έξυπνος Φορολογικός Βοηθός</h2>
        <p>
          Αυτή η εφαρμογή σας επιτρέπει να υπολογίσετε τις φορολογικές σας
          υποχρεώσεις για διάφορες πηγές εισοδήματος σύμφωνα με την Ελληνική
          φορολογική νομοθεσία. Συμπληρώστε όλα τα απαιτούμενα πεδία για να λάβετε προσωποποιημένες φορολογικές συμβουλές.
        </p>
      </div>
      <div className="form-and-advice-container">
        <form onSubmit={handleSubmit} className="tax-form">
          <h1>Φορολογική Συμβουλή</h1>
          <label>
            Εισοδηματα απο μισθους:
            <input type="number" value={salaryIncome} onChange={(e) => setSalaryIncome(e.target.value)} required />
          </label>
          <label>
            Εισοδηματα Ελευθερων Επαγγελματων:
            <input type="number" value={freelanceIncome} onChange={(e) => setFreelanceIncome(e.target.value)} required />
          </label>
          <label>
            Εισοδηματα απο ακινητη περιουσια:
            <input type="number" value={propertyIncome} onChange={(e) => setPropertyIncome(e.target.value)} required />
          </label>
          <label>
            Επενδυτικα Κερδη:
            <input type="number" value={investmentGains} onChange={(e) => setInvestmentGains(e.target.value)} required />
          </label>
          <div className="property-section">
            <label>Πληροφοριες για ακινητα (τετραγωνικά μέτρα):</label>
            {propertyInfos.map((prop, index) => (
              <div key={index} className="property-info">
                <input type="number" value={prop} onChange={(e) => handlePropertyChange(index, e.target.value)} required />
              </div>
            ))}
            <button type="button" onClick={handleAddProperty}>Προσθήκη ακινήτου</button>
          </div>
          <label>
            Δανεια:
            <input type="number" value={loans} onChange={(e) => setLoans(e.target.value)} required />
          </label>
          <label>
            Επαγγελματικα Εξοδα:
            <input type="number" value={businessExpenses} onChange={(e) => setBusinessExpenses(e.target.value)} required />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Υπολογισμός...' : 'Αποστολή'}
          </button>
        </form>
        <div className="advice streaming-advice">
          {displayedAdvice && <ReactMarkdown>{displayedAdvice}</ReactMarkdown>}
        </div>
      </div>
    </div>
  );
}

export default TaxForm;
