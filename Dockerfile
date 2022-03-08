FROM node:14 as build-step
WORKDIR /app
COPY ./package*.json .
COPY ./src ./src
COPY ./public ./public
RUN npm install && npm run build

FROM python:3.8-slim-buster
WORKDIR /app
COPY --from=build-step /app/build ./build
COPY ./backend ./backend
COPY ./ip_heatmap_api ./ip_heatmap_api
ADD GeoLite2-City-Blocks-IPv4.csv.tar.gz ./
COPY ./requirements.txt ./manage.py  ./
RUN python -m pip install -r requirements.txt

# Switching to a non-root user, please refer to https://aka.ms/vscode-docker-python-user-rights
RUN useradd appuser && chown -R appuser /app
USER appuser

EXPOSE 8000
CMD python3 manage.py collectstatic --noinput && \
    python3 manage.py migrate && \
    python3 manage.py load_ips_csv && \
    gunicorn --bind 0.0.0.0:8000 backend.wsgi:application
