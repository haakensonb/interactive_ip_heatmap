# Interactive IP Address Heatmap

## Description

The goal of this project was to take a dataset with IPv4 address locations and plot them as an interactive heatmap.

## Try it out!
See the project live [here](http://ec2-3-142-142-166.us-east-2.compute.amazonaws.com/)

## Run Locally With Docker
```
docker build -t ip-heatmap .

docker run -d -p 8000:8000 \
--env DEBUG=True \
--env PROD_HOST=https://localhost \
--env SECRET_KEY=insecure_dev_key \
ip-heatmap
```

## Technologies Used
- React, React-leaflet
- Typescript
- Leaflet, Leaflet.heat
- Django Rest Framework
