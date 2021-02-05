import pandas as pd
import numpy as np
from ip_heatmap_api.models import IPAddress
from django.contrib.gis.geos import Point
from itertools import islice

FILE_PATH = "/home/brandon/GeoLite2-City-CSV_20190618/GeoLite2-City-Blocks-IPv4.csv"


def csv_to_IPAddress_model(file_path=FILE_PATH):
    """Turn CSV file data into Django Models stored in the database.

    Make sure that CSV has columns for latitude and longitude.

    Args:
        file_path (str): absolute file path to csv file
    """
    LAT, LNG = "latitude", "longitude"

    model_fields = [LAT, LNG]
    df = pd.read_csv(file_path, usecols=model_fields)

    # Drop any rows with missing data so that location data is not null.
    df.dropna(inplace=True)

    # Count the number of duplicate entries where lat and long are both the same.
    dups = df.pivot_table(index=[LAT, LNG], aggfunc='size')
    # Dataframe of unique lat/long values along with "count" column of duplicates.
    df2 = dups.reset_index()
    df2.columns = [LAT, LNG, "count"]

    # Try to create in batches because dataset is too large.
    # See: https://docs.djangoproject.com/en/3.1/ref/models/querysets/#bulk-create
    batch_size = 1000
    objs = (IPAddress(p=Point(vals[LAT], vals[LNG]), c=vals['count'])
            for vals in df2.to_dict('records'))
    while True:
        batch = list(islice(objs, batch_size))
        if not batch:
            break
        IPAddress.objects.bulk_create(batch, batch_size)
