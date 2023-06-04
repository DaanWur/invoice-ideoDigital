from flask import Flask, jsonify, request
from prisma import Prisma
import asyncio
from services import clientsService, invoiceService, customerService
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)


@app.route("/clients/create", methods=["POST"])
async def createClient():
    prisma = Prisma()
    await prisma.connect()
    client_service = clientsService.ClientService(prisma)
    return await client_service.create_client(request.data)


@app.route("/invoices/create", methods=["POST"])
async def createInvoice():
    prisma = Prisma()
    await prisma.connect()
    invoice_service = invoiceService.InvoiceService(prisma)
    return await invoice_service.create_invoice(request.data)


@app.route("/customers/create", methods=["POST"])
async def createCustomer():
    prisma = Prisma()
    await prisma.connect()
    customer_service = customerService.CustomerService(prisma)
    return await customer_service.create_customer(request.data)


@app.route("/customers/<int:customer_id>", methods=["GET"])
async def getCustomer(customer_id):
    prisma = Prisma()
    await prisma.connect()
    customer_service = customerService.CustomerService(prisma)
    return await customer_service.get_customer(customer_id)


@app.route("/invoices/<int:client_id>", methods=["GET"])
async def getInvoices(client_id):
    prisma = Prisma()
    await prisma.connect()
    invoice_service = invoiceService.InvoiceService(prisma)
    return await invoice_service.get_invoices(client_id)


@app.route("/invoices/edit", methods=["PATCH"])
async def editInvoices():
    prisma = Prisma()
    await prisma.connect()
    invoice_service = invoiceService.InvoiceService(prisma)
    return await invoice_service.edit_invoice(request.data)


@app.route("/clients/<int:client_id>", methods=["GET"])
async def getClient(client_id):
    prisma = Prisma()
    await prisma.connect()
    client_service = clientsService.ClientService(prisma)
    return await client_service.get_client(client_id)


async def main():
    app.run(host="127.0.0.1", port=8000, debug=True)

    prisma = Prisma()
    await prisma.connect()


if __name__ == "__main__":
    asyncio.run(main())
