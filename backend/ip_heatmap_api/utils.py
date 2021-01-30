import pandas as pd

def csv_to_model(file_path, Model):
    """Turn CSV file data into Django Models stored in the database.
    
    Make sure that CSV values fit in the fields specifed by the model.

    Args:
        file_path (str): absolute file path to csv file
        Model (models.Model): name of Django Model from models.py
    """
    # Id field should not be included.
    model_fields = [f.name for f in Model._meta.get_fields() if f.name != "id"]
    df = pd.read_csv(file_path, usecols=model_fields)
    # Drop any rows with missing data so that location data is not null.
    df.dropna(inplace=True)
    Model.objects.bulk_create(
        Model(**vals) for vals in df.to_dict('records')
    )
