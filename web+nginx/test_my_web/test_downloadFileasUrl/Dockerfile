FROM python:3.9-slim

WORKDIR /app

COPY main.py /app

RUN pip install --no-cache-dir flask requests

EXPOSE 5000

ENV FLASK_APP=main.py

CMD ["python", "main.py"]