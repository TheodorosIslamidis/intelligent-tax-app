from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()


# Load environment variables if using .env (optional)
# from dotenv import load_dotenv
# load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

client = openai.OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

@app.route('/tax', methods=['POST'])
def tax_advice():
    data = request.get_json()
    income = data.get('income')
    expenses = data.get('expenses')
    
    prompt = (
        f"Provide tax advice for a user with an income of {income} "
        f"and expenses of {expenses}. Include any tax deductions or credits they might be eligible for."
    )
    
    
    response = client.chat.completions.create(
        model="gpt-4o",  
        messages=[
            {"role": "system", "content": "You are a helpful assistant that provides clear tax advice."},
            {"role": "user", "content": prompt},
        ],
        max_tokens = 200,
    )
    advice = response.choices[0].message.content
    return jsonify({'advice': advice})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
