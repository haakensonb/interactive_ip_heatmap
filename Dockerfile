# Use buster instead of alpine for better pip build times
FROM python:3.8-slim-buster

EXPOSE 8000

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install Psycopg dependencies
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y postgresql libpq-dev gcc python3-dev python3-psycopg2 && \
    apt-get install -y binutils libproj-dev gdal-bin && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_15.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean

# Install pip requirements
COPY requirements.txt .
RUN python3 -m pip install -r requirements.txt

# Install node requirements
# FROM node:14
COPY package*.json ./
RUN npm install

WORKDIR /app
COPY . /app

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN useradd appuser && chown -R appuser /app
USER appuser

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
# File wsgi.py was not found in subfolder: 'interactive_ip_heatmap'. Please enter the Python path to wsgi file.
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "./backend/wsgi.py"]
