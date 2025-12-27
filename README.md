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

    -users

    -cars

    -fuel_entries

SQL voor het aanmaken van de tabellen staat in het project en werd uitgevoerd op Neon.
