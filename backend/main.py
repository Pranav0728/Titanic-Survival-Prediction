import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pickle
import pandas as pd

# Define the Survival model
class Survival(BaseModel):
    Age: float
    Fare: float
    Sex: float
    Pclass: float

# Create the FastAPI app
app = FastAPI()

# Load the classifier
pickle_in = open("titanic_model.pkl", "rb")
classifier = pickle.load(pickle_in)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://titanic-survival-prediction-eight.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def getvalue():
    return {"message": "Hello, World!"}
# Define the prediction endpoint
@app.post('/predict')
def predict(data: Survival):
    data = data.dict()
    Age = data['Age']
    Fare = data['Fare']
    Sex = data['Sex']
    Pclass = data['Pclass']
    
    prediction = classifier.predict([[Age, Fare, Sex, Pclass]])
    
    if prediction[0] > 0.5:
        result = 'Survived'
    else:
        result = "Died"
    
    return {"prediction": result}

# To run the app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
