import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle

# Define the Survival model
class Survival(BaseModel):
    Age: float
    Fare: float
    Sex: float
    Pclass: float

# Create the FastAPI app
app = FastAPI()

# Load the classifier
try:
    with open("titanic_model.pkl", "rb") as pickle_in:
        classifier = pickle.load(pickle_in)
except Exception as e:
    raise RuntimeError(f"Failed to load model: {str(e)}")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://titanic-survival-prediction-eight.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get('/')
def root():
    return {"message": "Hello, World!"}

# Prediction endpoint
@app.post('/predict')
def predict(data: Survival):
    try:
        # Extract data from request
        Age = data.Age
        Fare = data.Fare
        Sex = data.Sex
        Pclass = data.Pclass
        
        # Perform prediction
        prediction = classifier.predict([[Age, Fare, Sex, Pclass]])
        
        # Process prediction result
        result = "Survived" if prediction[0] > 0.5 else "Died"
        
        return {"prediction": result}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI app using uvicorn
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
