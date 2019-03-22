-- 1a
USE sakila;

SELECT first_name, last_name
	FROM actor;

-- 1b
SELECT CONCAT(first_name,' ', last_name) AS 'Actor Name'
	FROM actor;

-- 2a
SELECT actor_id, first_name, last_name
	FROM actor
	WHERE first_name IN ('Joe');

-- 2b
SELECT first_name, last_name
    FROM actor 
    WHERE last_name LIKE '%GEN%';
    
-- 2c
SELECT last_name, first_name
    FROM actor 
    WHERE last_name LIKE '%LI%';
    
-- 2d
SELECT country_id, country
	FROM country
	WHERE country IN ('Afghanistan', 'Bangladesh', 'China');

-- 3a
ALTER TABLE actor
	ADD description BLOB(200);

-- 3b
ALTER TABLE actor
	DROP COLUMN description;

-- 4a
SELECT last_name, COUNT(*)
	FROM actor
    GROUP BY last_name;

-- 4b
SELECT last_name, COUNT(*)
	FROM actor
    GROUP BY last_name
	HAVING COUNT(*) >= 2;

-- 4c
UPDATE actor
	SET first_name = 'HARPO', last_name = 'WILLIAMS'
	WHERE first_name = 'GROUCHO' AND last_name = 'WILLIAMS';

-- 4d
UPDATE actor
	SET first_name = 'GROUCHO'
	WHERE first_name = 'HARPO' AND actor_id = 172;

-- 5a
SHOW CREATE TABLE address;

-- 6a
SELECT staff.first_name, staff.last_name, address.address
	FROM staff
	JOIN address ON
	staff.address_id = address.address_id;

-- 6b
SELECT staff.first_name, staff.last_name, SUM(payment.amount) AS '08/2005 Payments'
	FROM staff
	JOIN payment ON
	staff.staff_id = payment.staff_id AND payment.payment_id >= 22 AND payment_id <= 32
    GROUP BY staff.staff_id;

-- 6c
SELECT film.title, COUNT(film_actor.actor_id) AS 'Number of Actors'
	FROM film_actor
	INNER JOIN film ON
	film_actor.film_id = film.film_id
	GROUP BY film.title;

-- 6d
SELECT title, 
	(SELECT COUNT(*) 
		FROM inventory 
        WHERE film.film_id = inventory.film_id ) AS 'Film Inventory'
	FROM film
	WHERE title = 'HUNCHBACK IMPOSSIBLE';

-- 6e
SELECT customer.first_name, customer.last_name, SUM(payment.amount) AS 'Total Amount Paid'
	FROM customer
	JOIN payment ON
	customer.customer_id = payment.customer_id
    GROUP BY customer.customer_id
    ORDER BY last_name;

-- 7a
SELECT title
	FROM film
    WHERE language_id
    IN (
		SELECT language_id
        FROM language
        WHERE language_id = 1
		AND title LIKE 'K%'
		OR title LIKE 'Q%'
        );

-- 7b
SELECT first_name, last_name
	FROM actor
	WHERE actor_id 
    IN (
		SELECT actor_id
		FROM film_actor
		WHERE film_id IN (
						SELECT film_id
						FROM film
						WHERE title = 'ALONE TRIP'
						)
		);

-- 7c
SELECT c.first_name, c.last_name, c.email
	FROM customer AS c
	JOIN address AS a ON c.address_id = a.address_id
	JOIN city AS ci ON ci.city_id = a.city_id
    JOIN country AS co ON ci.country_id = co.country_id
	WHERE co.country_id = 20;

-- 7d
SELECT title AS 'Family Films'
	FROM film AS f
	JOIN film_category AS fc ON fc.film_id = f.film_id
	JOIN category AS ca ON ca.category_id = fc.category_id
	WHERE ca.category_id = 8;

-- 7e
SELECT f.title, COUNT(r.inventory_id) AS 'Most Frequently Rented Movies'
	FROM payment AS p
	JOIN rental AS r ON p.rental_id = r.rental_id
	JOIN inventory AS i ON r.inventory_id = i.inventory_id
	JOIN film AS f ON f.film_id = i.film_id
	GROUP BY f.title
    ORDER BY COUNT(*) DESC;

-- 7f
SELECT s.store_id, SUM(p.amount) AS 'Store Revenue'
	FROM payment AS p
	JOIN rental AS r ON p.rental_id = r.rental_id
    JOIN inventory AS i ON i.inventory_id = r.inventory_id
    JOIN store AS s ON i.store_id = s.store_id
    GROUP BY s.store_id;
    
-- 7g
SELECT s.store_id, c.city, cou.country
	FROM address AS a
	JOIN city AS c ON a.city_id = c.city_id
    JOIN city ON c.city = c.city
    JOIN country AS cou ON cou.country_id = c.country_id
    JOIN country ON cou.country = cou.country
    JOIN store AS s ON s.address_id = a.address_id
    GROUP BY s.store_id;

-- 7h
SELECT c.name, SUM(p.amount) AS 'Genre Gross Revenue'
	FROM payment AS p
	JOIN rental AS r ON p.rental_id = r.rental_id
    JOIN inventory AS i ON i.inventory_id = r.inventory_id
    JOIN film AS f ON i.film_id = f.film_id
    JOIN film_category AS fc ON f.film_id = fc.film_id
    JOIN category AS c ON fc.category_id = c.category_id
    GROUP BY c.name
    ORDER BY SUM(p.amount) DESC LIMIT 5;

-- 8a
CREATE VIEW Top_Five_Genres
AS SELECT c.name, SUM(p.amount) AS 'Genre Gross Revenue'
	FROM payment AS p
	JOIN rental AS r ON p.rental_id = r.rental_id
    JOIN inventory AS i ON i.inventory_id = r.inventory_id
    JOIN film AS f ON i.film_id = f.film_id
    JOIN film_category AS fc ON f.film_id = fc.film_id
    JOIN category AS c ON fc.category_id = c.category_id
    GROUP BY c.name
    ORDER BY SUM(p.amount) DESC LIMIT 5;
    
-- 8b
SELECT * FROM Top_Five_Genres;

-- 8c
DROP VIEW Top_Five_Genres;

