# Greek Tax Advice API

A Flask-based API that provides comprehensive tax advice in Greek using OpenAI's GPT-4 model. This service receives user income and expense data, constructs a detailed prompt, and returns step-by-step tax advice formatted in Markdown.

## Features

- **REST API Endpoint:** A single `/tax` endpoint that accepts POST requests.
- **OpenAI Integration:** Utilizes OpenAI's GPT-4 model to generate personalized tax advice.
- **CORS Support:** Enables cross-origin requests.
- **Environment Configuration:** Uses a `.env` file for securely managing API keys and other environment variables.
- **Markdown Output:** Returns tax advice formatted with clear headings and bullet points for easy readability.

## Prerequisites

- **Python 3.11**
- **Flask**
- **Flask-CORS**
- **OpenAI Python Client**
- **python-dotenv**

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/greek-tax-advice-api.git
   cd greek-tax-advice-api

2. **Create a Virtual Environment**
    ```bash
    python -m venv venv
    venv\Scripts\activate

3. **Install Dependencies**
    ```bash
    pip install -r requirements.txt

## Configuration

Create a .env file in the root directory and add your OpenAI API key:
OPENAI_API_KEY=your_openai_api_key_here

## Usage
1. **Run the Application**
    Start the Flask server by running:
    ```bash
    python app.py

2. **API Endpoint**
    Endpoint: /tax
    Method: POST
    Content-Type: applcation/json
    Example Payload:
        {
            "salaryIncome": 50000,
            "freelanceIncome": 10000,
            "propertyIncome": 15000,
            "investmentGains": 2000,
            "propertyInfos": [100, 150],
            "loans": 5000,
            "businessExpenses": 3000
        }
## How it Works
1. Data Reception:
    The API receives user data (income, property details, loans, business expenses, etc.) via a POST request.
2. Prompt Construction:
    A detailed prompt is generated using the input data. The prompt is structured to include income breakdown, property information, and other deductions, ensuring a comprehensive analysis in the response.
3. OpenAI Request:
    The prompt is sent to OpenAI's GPT-4 model through the OpenAI API. The model processes the input and returns a formatted response containing tax advice.
4. Response Delivery:
    The generated tax advice is returned to the client in a JSON format with Markdown formatting for clarity.

