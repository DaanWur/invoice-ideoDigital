import json
from flask import abort, jsonify, request
from models.customerModel import CustomerModel


class CustomerService:
    def __init__(self, prisma) -> None:
        self.prisma = prisma

    async def create_customer(self, info):
        try:
            req_data = request.json
            schema = CustomerModel()
            try:
                schema.load(req_data)
                user = await self.prisma.customer.create(req_data)

                return jsonify(user.json(), 201)
            except Exception as validationErr:
                abort(404, validationErr)

        except Exception as err:
            return abort(400, err)

    async def get_customer(self, customer_id):
        try:
            cust = await self.prisma.customer.find_first(where={"id": customer_id})
            return jsonify(cust.json(), 200)

        except Exception as err:
            abort(404, err)
