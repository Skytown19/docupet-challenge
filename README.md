# Docupet Coding Challenge &middot; Seth Stevenson

## Installation

This coding challenge can be built and ran using docker compose.

* Clone this repository and change directory into the root of the project.
* Run the following
```
docker compose up --build -d 
```
* Then to initialize the Database
```
docker exec -it docupet-challenge-symfony-1 php bin/console doctrine:migrations:migrate
```
* Finally, to fill the DB with data
```
cat db_dumps/breed_table.sql | docker exec -i docupet-challenge-docupet-db-1 mysql -u docupet -ppassword docupet
cat db_dumps/dangerous_breed_table.sql | docker exec -i docupet-challenge-docupet-db-1 mysql -u docupet -ppassword docupet
```

## Notes

The database has been initialized with default of password of `password`.   
You can feel free to change this in the following environment/config files:
* compose.yaml
* .env

Happy Testing! 🐶
