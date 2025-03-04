import pytest
from app import app, client as openai_client


@pytest.fixture
def test_client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def fake_openai_response(*args, **kwargs):
    class FakeMessage:
        pass
    fake_message = FakeMessage()
    fake_message.content = "Fake tax advice"

    class FakeChoice:
        pass
    fake_choice = FakeChoice()
    fake_choice.message = fake_message

    class FakeResponse:
        pass
    fake_response = FakeResponse()
    fake_response.choices = [fake_choice]
    return fake_response

# Test the /tax endpoint
def test_tax_advice(test_client, monkeypatch):
    
    monkeypatch.setattr(openai_client.chat.completions, "create", fake_openai_response)

    
    payload = {
        "salaryIncome": 50000,
        "freelanceIncome": 10000,
        "propertyIncome": 20000,
        "investmentGains": 5000,
        "propertyInfos": [100, 200],
        "loans": 10000,
        "businessExpenses": 3000
    }

    
    response = test_client.post("/tax", json=payload)
    data = response.get_json()

    
    assert response.status_code == 200
    assert "advice" in data
    assert data["advice"] == "Fake tax advice"
