# GasLog Backend API

Backend API voor het beheren van gebruikers, auto’s en tankbeurten (fuel entries).  
Gebouwd met Node.js, Express en PostgreSQL (Neon).

## Technische stack

- Node.js (ESM)  
- Express  
- PostgreSQL (Neon)  
- pg  
- bcrypt  
- dotenv  

## Installatie

1. Repository clonen  
```bash
git clone <repo-url>
cd backend-api
```

2.  **Dependencies installeren:**
    ```bash
    npm install
    ```

3. Environment variables
Maak een .env bestand aan in de root:
```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>
PORT=3000
 ```

 ## Database

 De database bevat de volgende tabellen:

- users
- cars
- fuel_entries

SQL voor het aanmaken van de tabellen staat in het project en werd uitgevoerd op Neon.

## Relaties
- Eén user kan meerdere cars hebben
- Eén car kan meerdere fuel entries hebben

## Starten van de server

```bash
node src/server.js
```

Console output:
```bash
Server running on port 3000
DB connected
```

## API Documentatie
De API-documentatie is beshikbaar via de root van het project:
```bash
http://localhost:3000
```

Code van de documentatie is te vinden in:
```bash
src/
 └─ docs/
     ├─ index.html
     └─ style.css
```
> [!NOTE]
> De documentatie van de api is beschikbaar met css via live server extension in VS Code.

## Users CRUD 

- GET /users
Haalt alle gebruikers op.
- GET /users/:id
Haalt één gebruiker op.
- POST /users
Maakt een nieuwe gebruiker aan. Wachtwoorden worde gehashed opgeslagen.

```bash
{
    "username": "your_username"
    "password": "your_password"
}
```
- PUT /users/:id
Update username en/of password.
- DELETE /users/:id
Verwijderd een gebruiker

## Fuel Entries CRUD

- GET /fuel
Lijst van fuel entries.
Ondersteunt:
- limit
- offset
- user_id (filter)

Voorbeeld:
```bash
/fuel?user_id=3&limit=10&offset=0

```
- GET /fuel/:id
Haalt één fuel entry op.

- POST /fuel
Maakt een fuel entry aan.
```bash
{
  "car_id": 1,
  "user_id": 3,
  "date": "2025-01-12",
  "liters": 42.5,
  "price_per_liter": 1.79,
  "odometer": 128400
}

```

- PUT /fuel/:id
Update bestaande fuel entry (partiële updates)

- DELETE /fuel/:id
Verwijderd een fuel entry.

