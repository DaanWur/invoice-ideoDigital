from marshmallow import Schema, fields, ValidationError


class InvoiceModel(Schema):
    client_id = fields.Integer(required=True)
    customer_id = fields.Integer(required=True)
    cost = fields.Number(required=True)
    created_at = fields.DateTime(required=False)
    updated_at = fields.DateTime(required=False)
