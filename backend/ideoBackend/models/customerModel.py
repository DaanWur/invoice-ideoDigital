from marshmallow import Schema, fields, ValidationError


class CustomerModel(Schema):
    email = fields.Email(required=True)
    name = fields.String(required=True)
    phone_number = fields.String(required=True)
    clientId = fields.Integer(required=True)
