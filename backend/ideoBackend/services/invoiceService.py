import datetime
import json
from flask import abort, jsonify, request
from models.invoiceModel import InvoiceModel


class InvoiceService:
    def __init__(self, prisma) -> None:
        self.prisma = prisma

    async def create_invoice(self, info):
        try:
            req_data = request.json
            print(type(req_data["cost"]))
            schema = InvoiceModel()
            try:
                schema.load(req_data)
                user = await self.prisma.invoice.create(
                    {
                        "client_id": int(req_data["client_id"]),
                        "customer_id": int(req_data["customer_id"]),
                        "cost": float(req_data["cost"]),
                    }
                )

                return jsonify(user.json(), 201)
            except Exception as validationErr:
                abort(404, validationErr)

        except Exception as err:
            return abort(400, err)

    async def get_invoices(self, client_id):
        try:
            invoices = await self.prisma.invoice.find_many(
                where={"client_id": client_id}
            )
            invoices = [elm.json() for elm in invoices]

            return jsonify(invoices, 200)
        except Exception as err:
            abort(404, err)

    async def edit_invoice(self, data):
        try:
            req_data = request.json
            splitted = req_data["created_at"].split("/")
            print("here")
            invoice_to_edit = await self.prisma.invoice.find_first(
                where={
                    "client_id": int(req_data["client_id"]),
                    "customer_id": int(req_data["customer_id"]),
                    "created_at": {
                        "gte": datetime.datetime(
                            int(splitted[0]), int(splitted[1]), int(splitted[2])
                        ),
                    },
                }
            )
            print(invoice_to_edit)
            invoice = await self.prisma.invoice.update(
                where={"id": invoice_to_edit.id},
                data={
                    "cost": float(req_data["cost"]),
                    "edited_at": datetime.datetime.now(),
                },
            )
            return invoice.json()
        except Exception as err:
            abort(400, err)
