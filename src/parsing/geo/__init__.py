import json
import os


class Parser:

    def __init__(self, input_dir='/tmp/table_data/'):

        self.input_dir = input_dir
        self.template_dir = "{}/templates/".format(os.path.dirname(os.path.realpath(__file__)))

        self.person_org_table = self.load_record("person_organization")
        self.institution_table = self.load_record("institution")
        self.geo_table = self.load_record("geography")
        self.township_table = self.load_record("township")
        self.county_table = self.load_record("county")
        self.prefecture_table = self.load_record("prefecture")
        self.province_table = self.load_record("province")

        self.records = None

    def load_record(self, rec_type):
        """
        Load a table from file.
        """

        with open("{0}/{1}.json".format(self.input_dir, rec_type), 'r') as f:

            ret = json.loads(f.read())

        return ret

    def build_records(self):

        # overridden in subclasses

        pass

    def write_records(self, out_path="/tmp/person_geo.json"):
        """
        Write GeoJson formatted records to file
        """

        if self.records is None:
            self.build_records()

        geo_data = \
            {
                "features": self.records
            }

        with open(out_path, 'w') as f:

            json.dump(geo_data, f, indent=4, sort_keys=True)
