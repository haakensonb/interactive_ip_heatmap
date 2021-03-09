# Interactive IP Address Heatmap

- [Interactive IP Address Heatmap](#interactive-ip-address-heatmap)
- [Description](#description)
- [Run Locally With Docker](#run-locally-with-docker)
- [Technologies Used](#technologies-used)
- [Steps Taken](#steps-taken)
- [Challenges](#challenges)
- [Questions](#questions)
- [Observations](#observations)

# Description

The goal of this project was to take a dataset with IPv4 address locations and plot them as an interactive heatmap.

# Run Locally With Docker

1. Build containers `docker-compose build`
2. Run containers `docker-compose up -d`
3. Run `docker ps` and copy "Container Id" for Postgres.
4. Run `docker exec -it <Container Id here> bash`
5. Run `./loadDB.sh` then `exit`.
6. Browse to [http://localhost:8000/]()

# Technologies Used
- React, React-leaflet
- Typescript
- Leaflet, Leaflet.heat
- Django Rest Framework
- PostGIS

# Steps Taken

1. Research heatmaps and possible technologies to use.
2. Start making a list of possible tasks. Then break tasks down into further subtasks as needed.
3. Parse initial CSV file and store in database.
4. Create endpoint to query data within specific bounding box coordinates.
5. Setup basic map rendering with Leaflet.
6. Refactor backend to use PostGIS for more efficient bounding box queries.
7. Refactor CSV parsing so that file size is reduced. Remove duplicates coordinates and keep track of duplicate occurrences. Then use number of occurrences for heatmap intensity value.
8. Extend frontend functionality.


# Challenges

- How to parse and store CSV file? Handcode geography query or use special type?
- How to optimize rendering of heatmap on frontend?
- How to optimize backend queries? Use geospatial database for more efficient queries of points within a bounding box.
- How to reduce size of dataset? Clustering was far too resource intensive. Made more sense to make dataset unique based on lat and long while keeping track of the number of duplicates. The number of duplicates is stored as a count which influences the intensity of the heatmap.
- Leaflet.heat has a bug which causes the intensity setting for a point to not work. This was fixed in pull request which was never merged to main. This means you must install from this particular branch. See: [https://github.com/Leaflet/Leaflet.heat/pull/78](https://github.com/Leaflet/Leaflet.heat/pull/78)

# Questions

- What is the correct way to handle storing and querying this much location data?

# Observations

- The easiest solution to performance issues would have been to use Mapbox to make heatmap raster tiles server side and then query the Mapbox service. I tried this and while the performance was much better, I didn't like the query limits of the free tier. Instead I decided to try rendering points using Leaflet.

- Even after reducing the size of the dataset, I could not find a way to efficiently render the entire zoomed out map. Instead I had to limit the zoom out function at a certain point. I don't think it is feasible to use Leaflet to render so many points. Instead, I think the better solution would have been to create some raster tiles and query based on the bounds that are in view.

- Interesting: According to this dataset, there are (still) about 165,000 IP addresses located in the middle of a lake in Kansas.  A company used to use this location as the default location for IP addresses but it resulted in the residents being harassed. The company's solution was to move the default to the middle of a nearby lake. See: [https://arstechnica.com/tech-policy/2016/08/kansas-couple-sues-ip-mapping-firm-for-turning-their-life-into-a-digital-hell/](https://arstechnica.com/tech-policy/2016/08/kansas-couple-sues-ip-mapping-firm-for-turning-their-life-into-a-digital-hell/)