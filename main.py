import subprocess
import os
from dotenv import load_dotenv
from threading import Thread

load_dotenv()

def run_command(command):
    subprocess.run(command, shell=True)

def get_command(port_var, default_port, prefix=""):
    port = os.getenv(port_var, default_port)
    return f"{prefix} --port {port}"

if __name__ == "__main__":
    os.environ["FLASK_APP"] = os.getenv("FLASK_APP", "app.py")
    os.environ["FLASK_ENV"] = os.getenv("FLASK_ENV", "development")

    backend_command = get_command("BACKEND_PORT", "5000", "flask run")
    frontend_command = get_command("FRONTEND_PORT", "3000", "npm start --prefix frontend")

    backend_thread = Thread(target=run_command, args=(backend_command,))
    frontend_thread = Thread(target=run_command, args=(frontend_command,))

    backend_thread.start()
    frontend_thread.start()

    backend_thread.join()
    frontend_thread.join()