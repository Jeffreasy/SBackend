# SBackend Documentatie

## Overzicht

SBackend is een krachtige backend applicatie, gebouwd met **Express.js** en **TypeScript**, die **MongoDB** als database gebruikt. Deze applicatie biedt essentiële functionaliteiten voor het beheren van donaties, vrijwilligers en evenementen, met inbegrip van veilige authenticatie via **JSON Web Tokens (JWT)**.

## Vereisten

*   Node.js (v14 of hoger)
*   npm (v6 of hoger)
*   MongoDB (bij voorkeur MongoDB Atlas)

## Installatie

1.  **Clone de repository:**

    ```bash
    git clone [https://github.com/Jeffreasy/SBackend.git](https://github.com/Jeffreasy/SBackend.git)
    cd SBackend
    ```

2.  **Installeer de afhankelijkheden:**

    ```bash
    npm install
    ```

3.  **Maak een `.env` bestand aan:**

    Plaats in de root directory van het project een `.env` bestand met de volgende inhoud (vervang de placeholders met je eigen waarden):

    ```
    PORT=3000
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    ```

## Scripts

*   **Ontwikkelserver starten:**

    ```bash
    npm run dev
    ```

*   **Applicatie bouwen:**

    ```bash
    npm run build
    ```

*   **Productieserver starten:**

    ```bash
    npm start
    ```

## Endpoints

### Authenticatie

*   **`POST /api/v1/authenticatie/registreren`**
    *   Registreert een nieuwe gebruiker.
    *   **Request body:**

    ```json
    {
      "naam": "John Doe",
      "email": "john.doe@example.com",
      "wachtwoord": "securepassword"
    }
    ```

    *   **Response:**

    ```json
    {
      "token": "jwt_token"
    }
    ```

*   **`POST /api/v1/authenticatie/inloggen`**
    *   Logt een gebruiker in en retourneert een JWT voor authenticatie.
    *   **Request body:**

    ```json
    {
      "email": "john.doe@example.com",
      "wachtwoord": "securepassword"
    }
    ```

    *   **Response:**

    ```json
    {
      "token": "jwt_token"
    }
    ```

### Donaties

*   **`POST /api/v1/donaties`**
    *   Maakt een nieuwe donatie aan.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Request body:**

    ```json
    {
      "bedrag": 50,
      "donateurNaam": "Jane Doe",
      "bericht": "Veel succes!"
    }
    ```

    *   **Response:**

    ```json
    {
      "bedrag": 50,
      "donateurNaam": "Jane Doe",
      "bericht": "Veel succes!",
      "_id": "donatie_id",
      "__v": 0
    }
    ```

*   **`GET /api/v1/donaties`**
    *   Haalt alle donaties op.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Response:**

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

*   **`POST /api/v1/vrijwilligers`**
    *   Registreert een nieuwe vrijwilliger.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Request body:**

    ```json
    {
      "naam": "John Doe",
      "email": "john.doe@example.com",
      "telefoonnummer": "123456789"
    }
    ```

    *   **Response:**

    ```json
    {
      "naam": "John Doe",
      "email": "john.doe@example.com",
      "telefoonnummer": "123456789",
      "_id": "vrijwilliger_id",
      "__v": 0
    }
    ```

*   **`GET /api/v1/vrijwilligers`**
    *   Haalt alle geregistreerde vrijwilligers op.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Response:**

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

*   **`POST /api/v1/evenementen`**
    *   Maakt een nieuw evenement aan.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Request body:**

    ```json
    {
      "naam": "Evenement Naam",
      "datum": "2023-08-01",
      "locatie": "Amsterdam"
    }
    ```

    *   **Response:**

    ```json
    {
      "naam": "Evenement Naam",
      "datum": "2023-08-01",
      "locatie": "Amsterdam",
      "_id": "evenement_id",
      "__v": 0
    }
    ```

*   **`GET /api/v1/evenementen`**
    *   Haalt alle evenementen op.
    *   **Headers:**
        *   `Authorization: Bearer <jwt_token>`
    *   **Response:**

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

## Testen van de RBAC-functionaliteit (PowerShell)

1.  **Gebruiker registreren:**

    ```powershell
    $uri = "http://localhost:3000/api/v1/authenticatie/registreren"
    $body = @{
        naam = "John Doe"
        email = "john.doe@example.com"
        wachtwoord = "securepassword"
        rol = "donateur"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -ContentType "application/json"
    $response
    ```

2.  **Gebruiker inloggen:**

    ```powershell
    $uri = "http://localhost:3000/api/v1/authenticatie/inloggen"
    $body = @{
        email = "john.doe@example.com"
        wachtwoord = "securepassword"
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Uri $uri -Method Post -Body $body -ContentType "application/json"
    $token = $response.token
    $token
    ```

3.  **Beveiligde route testen:**

    ```powershell
    $token = "VERKREGEN_JWT_TOKEN" # Vervang door de verkregen token
    $uri = "http://localhost:3000/api/v1/donaties"
    $headers = @{
        Authorization = "Bearer $token"
    }
    
    $response = Invoke-RestMethod -Uri $uri -Method Get -Headers $headers
    $response
    ```

## Bijdragen

Bijdragen aan dit project zijn welkom. Open een *issue* of stuur een *pull request* met eventuele wijzigingen.

## Licentie

Dit project is gelicenseerd onder de MIT Licentie.

---

**2. `markdown-preview-enhanced.css` (CSS bestand):**

```css
