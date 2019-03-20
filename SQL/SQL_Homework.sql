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

    



















