import pandas as pd
from ip_heatmap_api.models import IPAddress
from itertools import islice

def csv_to_IPAddress_model(file_path):
    """Turn CSV file data into Django Models stored in the database.

    Make sure that CSV has columns for 'latitude' and 'longitude'.

    Args:
        file_path (str): file path to csv file
    """
    LAT, LNG = "latitude", "longitude"

    model_fields = [LAT, LNG]
    df = pd.read_csv(file_path, usecols=model_fields)

    # Round to limit precision
    df[LAT] = df[LAT].round(6)
    df[LNG] = df[LNG].round(6)

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
    objs = (IPAddress(lat=vals[LAT], lng=vals[LNG], count=vals['count'])
            for vals in df2.to_dict('records'))
    while True:
        batch = list(islice(objs, batch_size))
        if not batch:
            break
        IPAddress.objects.bulk_create(batch, batch_size)
