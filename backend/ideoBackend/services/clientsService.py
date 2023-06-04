from dataclasses import asdict
import json
from flask import abort, jsonify, make_response, request
from prisma import Prisma
import datetime
from models.clientModel import ClientModel


class ClientService:
    def __init__(self, prisma) -> None:
        self.prisma = prisma

    async def create_client(self, info):
        try:
            req_data = request.json
            schema = ClientModel()
            try:
                schema.load(req_data)
                user = await self.prisma.client.create(json.loads(info))

                return jsonify(user.json(), 201)
            except Exception as validationErr:
                abort(404, validationErr)

        except Exception as err:
            return abort(400, err)

    async def get_client(self, client_id):
        try:
            client = await self.prisma.client.find_first(
                where={"id": client_id}, include={"customer": True}
            )
            return client.json()
        except Exception as err:
            abort(404, err)
