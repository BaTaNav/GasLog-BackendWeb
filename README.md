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
Maak een .env bestand aan in de root van de `backend-api` map:
```bash
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>
PORT=3000
```

4. Database setup
   - Maak een PostgreSQL database aan (bijvoorbeeld via [Neon.tech](https://neon.tech))
   - Voer het database schema uit:
     ```bash
     # Kopieer de inhoud van backend-api/sql/schema.sql
     # Voer dit uit in je database console (bijv. Neon SQL Editor)
     ```
   - Of gebruik een PostgreSQL client om het bestand uit te voeren

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

## Testen 
Alle endpoints werden getest met Postman.
- Users CRUD: OK
- Fuel Entries: OK
- Filters + pagination: OK

## Git
- node_modules staat in .gitignore
- .env staat in .gitignore

## Bronvermeldingen

Tijdens de ontwikkeling van dit project zijn de volgende bronnen geraadpleegd:

### Officiële documentatie
- [Express.js Documentation](https://expressjs.com/) - Routing, middleware en request handling
- [Node.js Documentation](https://nodejs.org/docs/) - Core modules en ESM syntax
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - SQL queries en database design
- [node-postgres (pg) Documentation](https://node-postgres.com/) - Database connectie en queries

### Tutorials en guides
- [MDN Web Docs - HTTP Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) - Correcte implementatie van HTTP verbs
- [OWASP - Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) - Veilige wachtwoord opslag met bcrypt

### Packages
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [pg](https://www.npmjs.com/package/pg) - PostgreSQL client voor Node.js

### Database hosting
- [Neon.tech](https://neon.tech) - Serverless PostgreSQL hosting platform

