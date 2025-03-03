import React, { useState } from 'react';
import './TaxForm.css';
import AdviceDisplay from './AdviceDisplay';

function TaxForm() {
  
  const [salaryIncome, setSalaryIncome] = useState(0);
  const [freelanceIncome, setFreelanceIncome] = useState(0);
  const [propertyIncome, setPropertyIncome] = useState(0);
  const [investmentGains, setInvestmentGains] = useState(0);
  
  const [propertyInfos, setPropertyInfos] = useState([0]);
  const [loans, setLoans] = useState(0);
  const [businessExpenses, setBusinessExpenses] = useState(0);
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  

  
  const handlePropertyChange = (index, value) => {
    const updatedProperties = [...propertyInfos];
    updatedProperties[index] = Number(value);
    setPropertyInfos(updatedProperties);
  };

  
  const handleAddProperty = () => {
    setPropertyInfos([...propertyInfos, 0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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
          businessExpenses: Number(businessExpenses)
        })
      });
      const data = await response.json();
      setAdvice(data.advice || data.error);
    } catch (error) {
      console.error('Error:', error);
      setAdvice('Error retrieving tax advice.');
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <div className="app-description">
        <h2>Περιγραφή Εφαρμογής</h2>
        <p>
          Αυτή η εφαρμογή σας επιτρέπει να υπολογίσετε τις φορολογικές σας
          υποχρεώσεις για διάφορες πηγές εισοδήματος σύμφωνα με την Ελληνική
          φορολογική νομοθεσία. Συμπληρώστε όλα τα απαιτούμενα πεδία,
          συμπεριλαμβανομένων των εισοδημάτων, των ακινήτων και των εξόδων σας,
          για να λάβετε προσωποποιημένες φορολογικές συμβουλές.
        </p>
      </div>

      <div className="tax-form-container">
        <h1>Φορολογική Συμβουλή</h1>
        <form onSubmit={handleSubmit} className="tax-form">
          <label>
            Εισοδήματα απο μισθούς:
            <input
              type="number"
              value={salaryIncome}
              onChange={(e) => setSalaryIncome(e.target.value)}
              required
            />
          </label>
          <label>
            Εισοδήματα Ελεύθερων Επαγγελμάτων:
            <input
              type="number"
              value={freelanceIncome}
              onChange={(e) => setFreelanceIncome(e.target.value)}
              required
            />
          </label>
          <label>
            Εισοδήματα απο ακινήτη περιουσία:
            <input
              type="number"
              value={propertyIncome}
              onChange={(e) => setPropertyIncome(e.target.value)}
              required
            />
          </label>
          <label>
            Επενδυτικά Κέρδη:
            <input
              type="number"
              value={investmentGains}
              onChange={(e) => setInvestmentGains(e.target.value)}
              required
            />
          </label>

          
          <div className="property-section">
            <label>Πληροφορίες για ακίνητα (τετραγωνικά μέτρα):</label>
            {propertyInfos.map((prop, index) => (
              <div key={index} className="property-info">
                <input
                  type="number"
                  value={prop}
                  onChange={(e) => handlePropertyChange(index, e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddProperty}>
              Προσθήκη ακινήτου
            </button>
          </div>

          <label>
            Δάνεια:
            <input
              type="number"
              value={loans}
              onChange={(e) => setLoans(e.target.value)}
              required
            />
          </label>
          <label>
            Επαγγελματικά Έξοδα:
            <input
              type="number"
              value={businessExpenses}
              onChange={(e) => setBusinessExpenses(e.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? 'Υπολογισμός...' : 'Αποστολή'}
          </button>
        </form>

        {advice && <AdviceDisplay advice={advice} />}
      </div>
    </div>
  );
}

export default TaxForm;
