import subprocess
import os
from dotenv import load_dotenv
from threading import Thread

load_dotenv()

backend_command = "flask run"
frontend_command = "npm start --prefix frontend"

backend_port = os.getenv("BACKEND_PORT", "5000")
frontend_port = os.getenv("FRONTEND_PORT", "3000")

backend_command += f" --port {backend_port}"
frontend_command += f" --port {frontend_port}"

def start_backend():
    os.environ["FLASK_APP"] = os.getenv("FLASK_APP", "app.py")
    os.environ["FLASK_ENV"] = os.getenv("FLASK_ENV", "development")
    subprocess.run(backend_command, shell=True)

def start_frontend():
    subprocess.run(frontend_command, shell=True)

if __name__ == "__main__":
    backend_thread = Thread(target=start_backend)
    frontend_thread = Thread(target=start_frontend)

    backend_thread.start()
    frontend_thread.start()

    backend_thread.join()
    frontend_thread.join()