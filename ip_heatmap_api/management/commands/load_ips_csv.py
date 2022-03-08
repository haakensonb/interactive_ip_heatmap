from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = 'Load ip addresses from csv to database'

    def handle(self, *args, **kwargs):
        try:
            # Load csv data to db
            from ip_heatmap_api.utils import csv_to_IPAddress_model
            file_path = "./GeoLite2-City-Blocks-IPv4.csv"
            csv_to_IPAddress_model(file_path)
        except:
            raise CommandError('Failed to load ip address csv')