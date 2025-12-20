-- USERS
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CARS
CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


-- FUEL ENTRIES
CREATE TABLE fuel_entries (
    id SERIAL PRIMARY KEY,
    car_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    date DATE NOT NULL,
    liters NUMERIC(6,2) NOT NULL CHECK (liters > 0),
    price_per_liter NUMERIC(6,3) NOT NULL CHECK (price_per_liter > 0),
    total_amount NUMERIC(8,2) NOT NULL,
    odometer INTEGER CHECK (odometer >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_car
        FOREIGN KEY (car_id)
        REFERENCES cars(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- INDEXEN
CREATE INDEX idx_fuel_entries_car_id ON fuel_entries(car_id);
CREATE INDEX idx_fuel_entries_user_id ON fuel_entries(user_id);
CREATE INDEX idx_fuel_entries_date ON fuel_entries(date);