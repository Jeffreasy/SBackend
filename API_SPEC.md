# API Specificatie

## Authenticatie

### POST /api/v1/authenticatie/registreren
Registreert een nieuwe gebruiker.

#### Request
```json
{
    "naam": "John Doe",
    "email": "john.doe@example.com",
    "wachtwoord": "securepassword"
}


#### response
{
    "token": "jwt_token"
}
POST /api/v1/authenticatie/inloggen
Logt een bestaande gebruiker in.

Request
{
    "email": "john.doe@example.com",
    "wachtwoord": "securepassword"
}


Response

{
    "token": "jwt_token"
}



Donaties
POST /api/v1/donaties
Maakt een nieuwe donatie aan.

Headers
{
    "Authorization": "Bearer <jwt_token>"
}

Request

{
    "bedrag": 50,
    "donateurNaam": "Jane Doe",
    "bericht": "Veel succes!"
}


Response

{
    "bedrag": 50,
    "donateurNaam": "Jane Doe",
    "bericht": "Veel succes!",
    "_id": "donatie_id",
    "__v": 0
}


GET /api/v1/donaties
Haalt alle donaties op.

Headers
json
Code kopiëren
{
    "Authorization": "Bearer <jwt_token>"
}
Response
json
Code kopiëren
[
    {
        "bedrag": 50,
        "donateurNaam": "Jane Doe",
        "bericht": "Veel succes!",
        "_id": "donatie_id",
        "__v": 0
    }
]
Vrijwilligers
POST /api/v1/vrijwilligers
Registreert een nieuwe vrijwilliger.

Headers
json
Code kopiëren
{
    "Authorization": "Bearer <jwt_token>"
}
Request
json
Code kopiëren
{
    "naam": "John Doe",
    "email": "john.doe@example.com",
    "telefoonnummer": "123456789"
}
Response
json
Code kopiëren
{
    "naam": "John Doe",
    "email": "john.doe@example.com",
    "telefoonnummer": "123456789",
    "_id": "vrijwilliger_id",
    "__v": 0
}
GET /api/v1/vrijwilligers
Haalt alle vrijwilligers op.

Headers
json
Code kopiëren
{
    "Authorization": "Bearer <jwt_token>"
}
Response
json
Code kopiëren
[
    {
        "naam": "John Doe",
        "email": "john.doe@example.com",
        "telefoonnummer": "123456789",
        "_id": "vrijwilliger_id",
        "__v": 0
    }
]
Evenementen
POST /api/v1/evenementen
Maakt een nieuw evenement aan.

Headers
json
Code kopiëren
{
    "Authorization": "Bearer <jwt_token>"
}
Request
json
Code kopiëren
{
    "naam": "Evenement Naam",
    "datum": "2023-08-01",
    "locatie": "Amsterdam"
}
Response
json
Code kopiëren
{
    "naam": "Evenement Naam",
    "datum": "2023-08-01",
    "locatie": "Amsterdam",
    "_id": "evenement_id",
    "__v": 0
}
GET /api/v1/evenementen
Haalt alle evenementen op.

Headers
json
Code kopiëren
{
    "Authorization": "Bearer <jwt_token>"
}
Response
json
Code kopiëren
[
    {
        "naam": "Evenement Naam",
        "datum": "2023-08-01",
        "locatie": "Amsterdam",
        "_id": "evenement_id",
        "__v": 0
    }
]