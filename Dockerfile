# Use buster instead of alpine for better pip build times
FROM python:3.8-slim-buster

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install dependencies: psycopg, Geospatial libs, node
RUN apt-get update && apt-get install -y \
    gcc libpq-dev python3-dev python3-psycopg2 \
    binutils libproj-dev gdal-bin \
    curl && \
    curl -fsSL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Install pip requirements
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt

# Install npm requirements
COPY package*.json ./
RUN npm install

WORKDIR /app
COPY . /app

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN useradd appuser && chown -R appuser /app
USER appuser

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "backend.wsgi:application"]
