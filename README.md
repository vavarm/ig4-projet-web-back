<p align="center">
  <h1>Festival du jeu de Montpellier - Système de gestion des bénévoles
    <br/>
    Backend
  </h1>
</p>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://ig4-projet-web-front.onrender.com/assets/logo-LIKW8LqM.png" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Service backend développé avec NestJS permettant de gérer des bénévoles et leurs inscriptions à des postes bénévoles lors d'évènements.</p>

## Dependencies

- NodeJS
- Docker

## Installation

- Install the required NPM libraries

  ```bash
  $ yarn install
  ```

- Setup the database

  Run [Docker container script](run_postgresql_container.sh) to create the database with the right credentials

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
