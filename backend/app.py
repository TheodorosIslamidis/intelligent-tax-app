from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()




app = Flask(__name__)
CORS(app)  

client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/tax', methods=['POST'])
def tax_advice():
    data = request.get_json()
    
    
    salaryIncome = data.get('salaryIncome', 0)
    freelanceIncome = data.get('freelanceIncome', 0)
    propertyIncome = data.get('propertyIncome', 0)
    investmentGains = data.get('investmentGains', 0)
    propertyInfos = data.get('propertyInfos', [])
    property_info_str = ", ".join(str(p) for p in propertyInfos)
    loans = data.get('loans', 0)
    businessExpenses = data.get('businessExpenses', 0)
    
    
    prompt = (
        f"Provide comprehensive tax advice in Greek for the following user details, formatted in markdown "
        f"with clear headings and bullet points for readability. Use a step-by-step analysis and include strategic insights. \n\n"
        f"### Income Breakdown\n"
        f"Salary Income: {salaryIncome}\n"
        f"Freelance Income: {freelanceIncome}\n"
        f"Property Income (e.g., rental income, property sale details): {propertyIncome}\n"
        f"Investment Gains (capital gains, dividends, etc.): {investmentGains}\n"
        f"### Property Information\n"
        f"Property Information (square meters per property): {property_info_str}\n"
        f"### Other Deductions\n"
        f"Loans (including mortgage interest and other loan details): {loans}\n"
        f"Business Expenses (deductible costs related to business activities): {businessExpenses}\n"
        f"Based on the Greek tax laws, break down the potential tax rates,taxes the user will pay ,deductions, credits, and exemptions for each category. "
        f"Offer strategic advice, such as leveraging deductions, income splitting, and investment considerations. "
        f"Ensure the final output is well-organized,easy to read and contains the total amount of taxes."
    )

    
    
    response = client.chat.completions.create(
        model="gpt-4o",  
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides clear tax advice in Greek."},
            {"role": "user", "content": prompt},
        ],
    )
    advice = response.choices[0].message.content
    return jsonify({'advice': advice})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
