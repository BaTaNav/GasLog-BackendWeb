-- Dit bestand voegt test data toe aan de database voor demonstratie doeleinden

-- ============================================
-- USERS TEST DATA
-- ============================================
-- Notitie: In productie zouden passwords gehashed moeten worden met bcrypt
-- Deze zijnvoorbeeld hashes voor het wachtwoord "Test123!"

INSERT INTO users (username, password_hash) VALUES
('jan.smit', '$2b$10$YourHashHere1234567890123456789012345678901234567890'),
('lisa.vos', '$2b$10$YourHashHere2345678901234567890123456789012345678901'),
('piet.jansen', '$2b$10$YourHashHere3456789012345678901234567890123456789012'),
('emma.de.boer', '$2b$10$YourHashHere4567890123456789012345678901234567890123');

-- ============================================
-- CARS TEST DATA
-- ============================================
INSERT INTO cars (name) VALUES
('Toyota Corolla'),
('Volkswagen Golf'),
('BMW 3 Serie'),
('Tesla Model 3'),
('Ford Fiesta'),
('Audi A4'),
('Mercedes C-Klasse'),
('Peugeot 208');

-- ============================================
-- FUEL ENTRIES TEST DATA
-- ============================================
-- Tankbeurten voor Jan Smit (user_id: 1) met Toyota Corolla (car_id: 1)
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(1, 1, '2025-12-15', 45.50, 1.899, 86.40, 45000),
(1, 1, '2025-12-22', 42.30, 1.919, 81.17, 45650),
(1, 1, '2025-12-29', 48.20, 1.879, 90.57, 46300),
(1, 1, '2026-01-05', 44.75, 1.899, 84.98, 46980);

-- Tankbeurten voor Lisa Vos (user_id: 2) met Volkswagen Golf (car_id: 2)
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(2, 2, '2025-11-20', 50.00, 1.849, 92.45, 78000),
(2, 2, '2025-11-28', 47.80, 1.869, 89.36, 78720),
(2, 2, '2025-12-10', 52.30, 1.889, 98.79, 79450),
(2, 2, '2025-12-18', 49.20, 1.909, 93.92, 80200),
(2, 2, '2025-12-28', 51.00, 1.879, 95.83, 80950),
(2, 2, '2026-01-07', 48.50, 1.899, 92.10, 81680);

-- Tankbeurten voor Piet Jansen (user_id: 3) met BMW 3 Serie (car_id: 3)
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(3, 3, '2025-12-01', 55.00, 1.929, 106.10, 102000),
(3, 3, '2025-12-12', 58.30, 1.949, 113.63, 102850),
(3, 3, '2025-12-23', 56.75, 1.919, 108.90, 103700),
(3, 3, '2026-01-03', 57.20, 1.939, 110.91, 104550);

-- Tankbeurten voor Emma de Boer (user_id: 4) met Tesla Model 3 (car_id: 4)
-- Let op: elektrische auto, dus "liters" kan kWh zijn, prijs per kWh
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(4, 4, '2025-12-05', 50.00, 0.350, 17.50, 25000),
(4, 4, '2025-12-15', 48.50, 0.380, 18.43, 25620),
(4, 4, '2025-12-25', 52.00, 0.350, 18.20, 26250),
(4, 4, '2026-01-04', 49.00, 0.360, 17.64, 26880);

-- Extra tankbeurten voor Piet met Ford Fiesta (car_id: 5)
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(5, 3, '2025-11-25', 38.00, 1.859, 70.64, 55000),
(5, 3, '2025-12-08', 35.50, 1.889, 67.06, 55580),
(5, 3, '2025-12-20', 37.20, 1.899, 70.64, 56140),
(5, 3, '2026-01-02', 36.80, 1.879, 69.15, 56710);

-- Tankbeurten voor Jan met Audi A4 (car_id: 6) - tweede auto
INSERT INTO fuel_entries (car_id, user_id, date, liters, price_per_liter, total_amount, odometer) VALUES
(6, 1, '2025-12-10', 60.00, 1.929, 115.74, 88000),
(6, 1, '2025-12-28', 62.50, 1.909, 119.31, 89100),
(6, 1, '2026-01-06', 58.75, 1.899, 111.57, 90150);