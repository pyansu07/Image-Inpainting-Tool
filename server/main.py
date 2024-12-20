from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from pymongo import MongoClient

app = FastAPI()

# Allow CORS for your React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this to your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB setup
mongo_uri = "mongodb+srv://pyansu07:280304@cluster0.t1qot.mongodb.net/appointment-system?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client["image_inpainting"]
images_collection = db["images"]

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    file_location = f"images/{file.filename}"
    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Save metadata to MongoDB
    images_collection.insert_one({"filename": file.filename})
    
    return {"filename": file.filename}

@app.get("/images/{filename}")
async def get_image(filename: str):
    return FileResponse(f"images/{filename}")

if __name__ == "__main__":
    if not os.path.exists("images"):
        os.makedirs("images")
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
