# GasLog Backend API

Backend API voor het beheren van gebruikers, auto's en tankbeurten (fuel entries).  
Gebouwd met Node.js, Express en PostgreSQL (Neon).

## Technische stack

- **Node.js** (v20+, ESM modules)  
- **Express** (v5.2.1)  
- **PostgreSQL** (Neon cloud database)  
- **pg** (PostgreSQL client)  
- **bcrypt** (Password hashing)  
- **dotenv** (Environment variables)  

## Project Structuur

```
backend-api/
├── src/
│   ├── controllers/
│   │   ├── fuelEntriesController.js  # Fuel entries logic
│   │   └── usersController.js        # Users logic
│   ├── db/
│   │   └── index.js                  # Database connectie
│   ├── docs/
│   │   ├── index.html               # API documentatie
│   │   └── style.css                # Documentatie styling
│   ├── routes/
│   │   ├── fuelEntries.js           # Fuel entries routes
│   │   └── users.js                 # Users routes
│   ├── app.js                       # Express app setup
│   └── server.js                    # Server entry point
├── sql/
│   └── schema.sql                   # Database schema
├── package.json
└── .env                             # Environment variables (niet in git)
```  

## Installatie

### 1. Repository clonen  
```bash
git clone https://github.com/BaTaNav/GasLog-BackendWeb.git
cd GasLog-BackendWeb
```

### 2. Dependencies installeren
```bash
npm install
```

### 3. Environment variables configureren
Maak een `.env` bestand aan in de `backend-api` folder:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>
PORT=3000
```
> Tip: gebruik in Neon de connection string uit je dashboard.

### 4. Database setup
- Maak een PostgreSQL database aan (bijvoorbeeld via [Neon.tech](https://neon.tech))
- Voer het schema uit: inhoud van `backend-api/sql/schema.sql` uitvoeren in je DB (Neon console, psql of een GUI).

### 5. Server starten
```bash
npm install
npm start
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

## Users CRUD 

- GET /users
Haalt alle gebruikers op. Ondersteunt sorteren:
- `sort` - Sorteer veld (id, username, created_at)
- `order` - Sorteer richting (asc, desc)

Voorbeelden:
```bash
# Alle gebruikers
/users

# Alfabetisch gesorteerd
/users?sort=username&order=asc

# Nieuwste gebruikers eerst
/users?sort=created_at&order=desc
```

- GET /users/:id
Haalt één gebruiker op.

- POST /users
Maakt een nieuwe gebruiker aan. Wachtwoorden worden gehashed opgeslagen.

```bash
{
    "username": "your_username",
    "password": "your_password"
}
```

**Validatie:**
- Username moet minimaal 3 karakters bevatten
- Username mag geen cijfers bevatten
- Password moet minimaal 6 karakters bevatten

- PUT /users/:id
Update username en/of password (zelfde validatie als POST).

- DELETE /users/:id
Verwijdert een gebruiker.

## Fuel Entries CRUD

- GET /fuel
Lijst van fuel entries.
Ondersteunt:
- `limit` - Aantal resultaten (default: 10)
- `offset` - Start positie (default: 0)
- `user_id` - Filter op gebruiker
- `car_id` - Filter op auto
- `date` - Filter op datum
- `sort` - Sorteer veld (date, liters, price_per_liter, odometer, total_amount, created_at)
- `order` - Sorteer richting (asc, desc)

Voorbeelden:
```bash
# Basis paginatie
/fuel?limit=10&offset=0

# Filter op gebruiker
/fuel?user_id=3&limit=10&offset=0

# Sorteer op liters (hoogste eerst)
/fuel?sort=liters&order=desc

# Combinatie: filter en sorteer
/fuel?user_id=3&sort=total_amount&order=desc&limit=5
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

**Validatie:**
- Alle verplichte velden moeten ingevuld zijn
- Liters en price_per_liter moeten positieve getallen zijn
- Datum mag niet in de toekomst liggen
- Odometer mag niet negatief zijn

- PUT /fuel/:id
Update bestaande fuel entry (partiële updates, zelfde validatie)

- DELETE /fuel/:id
Verwijdert een fuel entry.

## Extra Features

### Geavanceerde Validatie
- **Username validatie**: Geen cijfers toegestaan, minimaal 3 karakters
- **Password validatie**: Minimaal 6 karakters voor veiligheid
- **Datum validatie**: Tankbeurten kunnen niet in de toekomst geregistreerd worden
- **Numerieke validatie**: Liters, prijzen en kilometerstanden worden strikt gevalideerd
- **Business logic**: Odometer kan niet negatief zijn

### Sorteer Functionaliteit
Beide endpoints (/users en /fuel) ondersteunen flexibele sortering:
- Keuze uit meerdere sorteer velden
- Oplopend (asc) of aflopend (desc)
- Veilige implementatie met whitelist validatie

### Zoeken & Filteren
Fuel entries kunnen gefilterd worden op meerdere criteria tegelijk:
- user_id (welke gebruiker)
- car_id (welke auto)
- date (specifieke datum)

### Security Features
- Password hashing met bcrypt (10 salt rounds)
- SQL injection preventie via parameterized queries
- Input sanitization en validatie
- Environment variables voor gevoelige data

### Database Optimalisatie
- Foreign key constraints met CASCADE deletes
- Indexes op veelgebruikte zoekvelden (car_id, user_id, date)
- CHECK constraints voor data integriteit

## Testen 
Alle endpoints werden uitgebreid getest met Postman:
- Users CRUD operaties
- Fuel Entries CRUD operaties
- Filters & pagination
- Sorteer functionaliteit
- Validatie (username, datum, numerieke velden)
- Error handling

## Bronvermeldingen

### Documentatie & Referenties
- **Express.js officiële documentatie**: https://expressjs.com/
  - Gebruikt voor routing, middleware setup en best practices
- **Node.js pg library documentatie**: https://node-postgres.com/
  - Gebruikt voor database connectie en parameterized queries
- **Bcrypt documentatie**: https://www.npmjs.com/package/bcrypt
  - Gebruikt voor password hashing implementatie

### Tutorials & Inspiratie
- **MDN Web Docs - HTTP Methods**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
  - Referentie voor correcte HTTP verb usage (GET, POST, PUT, DELETE)
- **PostgreSQL documentatie**: https://www.postgresql.org/docs/
  - Gebruikt voor SQL queries, indexes en constraints
- **Stack Overflow**: Diverse specifieke problemen opgelost met hulp van de community
  - Date validatie in JavaScript
  - Dynamic SQL query building met WHERE clauses

### Code Snippets
Alle gebruikte code snippets zijn aangepast en uitgebreid voor dit specifieke project. Geen directe copy-paste van tutorials.

## Git
- node_modules staat in .gitignore
- .env staat in .gitignore

## Bronvermeldingen

Tijdens de ontwikkeling van dit project zijn de volgende bronnen geraadpleegd:

### Officiële documentatie
- [Express.js Documentation](https://expressjs.com/) - Routing, middleware en request handling
- [Node.js Documentation](https://nodejs.org/docs/latest/api/) - Core modules en ESM syntax
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

### AI
- styling van de index pagina is met ai gemaakt

