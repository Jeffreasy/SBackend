# SBackend

## Overzicht
SBackend is een backend applicatie gebouwd met Express.js en TypeScript, en maakt gebruik van MongoDB als database. Deze applicatie bevat functionaliteiten zoals authenticatie, donatiebeheer, vrijwilligersbeheer en evenementbeheer.

## Vereisten
- Node.js (v14 of hoger)
- npm (v6 of hoger)
- MongoDB (bij voorkeur MongoDB Atlas)

## Installatie
1. Clone de repository:
    ```bash
    git clone https://github.com/Jeffreasy/SBackend.git
    cd SBackend
    ```

2. Installeer de afhankelijkheden:
    ```bash
    npm install
    ```

3. Maak een `.env` bestand aan in de root directory met de volgende inhoud:
    ```env
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    ```

## Scripts
- Start de ontwikkelserver:
    ```bash
    npm run dev
    ```

- Bouw de applicatie:
    ```bash
    npm run build
    ```

- Start de productie server:
    ```bash
    npm start
    ```

## Endpoints

### Authenticatie
- **Registreren**
    ```http
    POST /api/v1/authenticatie/registreren
    ```

    #### Request
    ```json
    {
        "naam": "John Doe",
        "email": "john.doe@example.com",
        "wachtwoord": "securepassword"
    }
    ```

    #### Response
    ```json
    {
        "token": "jwt_token"
    }
    ```

- **Inloggen**
    ```http
    POST /api/v1/authenticatie/inloggen
    ```

    #### Request
    ```json
    {
        "email": "john.doe@example.com",
        "wachtwoord": "securepassword"
    }
    ```

    #### Response
    ```json
    {
        "token": "jwt_token"
    }
    ```

### Donaties
- **Maak een donatie**
    ```http
    POST /api/v1/donaties
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Request
    ```json
    {
        "bedrag": 50,
        "donateurNaam": "Jane Doe",
        "bericht": "Veel succes!"
    }
    ```

    #### Response
    ```json
    {
        "bedrag": 50,
        "donateurNaam": "Jane Doe",
        "bericht": "Veel succes!",
        "_id": "donatie_id",
        "__v": 0
    }
    ```

- **Haal alle donaties op**
    ```http
    GET /api/v1/donaties
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Response
    ```json
    [
        {
            "bedrag": 50,
            "donateurNaam": "Jane Doe",
            "bericht": "Veel succes!",
            "_id": "donatie_id",
            "__v": 0
        }
    ]
    ```

### Vrijwilligers
- **Registreer een vrijwilliger**
    ```http
    POST /api/v1/vrijwilligers
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Request
    ```json
    {
        "naam": "John Doe",
        "email": "john.doe@example.com",
        "telefoonnummer": "123456789"
    }
    ```

    #### Response
    ```json
    {
        "naam": "John Doe",
        "email": "john.doe@example.com",
        "telefoonnummer": "123456789",
        "_id": "vrijwilliger_id",
        "__v": 0
    }
    ```

- **Haal alle vrijwilligers op**
    ```http
    GET /api/v1/vrijwilligers
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Response
    ```json
    [
        {
            "naam": "John Doe",
            "email": "john.doe@example.com",
            "telefoonnummer": "123456789",
            "_id": "vrijwilliger_id",
            "__v": 0
        }
    ]
    ```

### Evenementen
- **Maak een evenement**
    ```http
    POST /api/v1/evenementen
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Request
    ```json
    {
        "naam": "Evenement Naam",
        "datum": "2023-08-01",
        "locatie": "Amsterdam"
    }
    ```

    #### Response
    ```json
    {
        "naam": "Evenement Naam",
        "datum": "2023-08-01",
        "locatie": "Amsterdam",
        "_id": "evenement_id",
        "__v": 0
    }
    ```

- **Haal alle evenementen op**
    ```http
    GET /api/v1/evenementen
    ```

    #### Headers
    ```json
    {
        "Authorization": "Bearer <jwt_token>"
    }
    ```

    #### Response
    ```json
    [
        {
            "naam": "Evenement Naam",
            "datum": "2023-08-01",
            "locatie": "Amsterdam",
            "_id": "evenement_id",
            "__v": 0
        }
    ]
    ```

## Bijdragen
Bijdragen aan dit project zijn welkom. Open een issue of stuur een pull request met eventuele wijzigingen.

## Licentie
Dit project is gelicenseerd onder de MIT Licentie.
