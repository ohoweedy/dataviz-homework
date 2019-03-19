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


SELECT * FROM actor;






















