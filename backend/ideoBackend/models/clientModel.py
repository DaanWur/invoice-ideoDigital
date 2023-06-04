import datetime
from marshmallow import Schema, fields, ValidationError


class ClientModel(Schema):
    name = fields.String(required=True)
    joined_at = fields.DateTime(dump_default=datetime.datetime.now())
    phone_number = fields.String(required=True)
