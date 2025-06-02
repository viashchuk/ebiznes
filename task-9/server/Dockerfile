FROM python:latest

WORKDIR /python-server

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

# CMD ["fastapi", "dev", "main.py"]
CMD ["fastapi", "run", "main.py", "--port", "8000"]
