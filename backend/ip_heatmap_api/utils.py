import pandas as pd
from ip_heatmap_api.models import IPAddress
from django.contrib.gis.geos import Point


def csv_to_IPAddress_model(file_path):
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

    # Try to create in batches because dataset is too large.
    from itertools import islice
    batch_size = 100000
    objs = (IPAddress(position=Point(vals[LAT], vals[LNG]))
            for vals in df.to_dict('records'))
    while True:
        batch = list(islice(objs, batch_size))
        if not batch:
            break
        IPAddress.objects.bulk_create(batch, batch_size)
