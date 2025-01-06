### Docker Compose

There are 2 services used for local development:

- `redis`
- `db`

**redis**:

- In memory database that might be used for caching.

**db**:

- PostgreSQL database with predefined `POSTGRES_DB: dev`. This creates a database called `dev` on the first-time container setup. After first-time setup Docker reuses the data in volume, and will not create any new database beside `dev`.
- If you want to change the database to some something else e.g. `local`. You first need to `down` the service (using `docker compose down`), and delete the service volume (using `docker compose volume rm volume-name`) before rebuilding it

**How to up services**

- Run `docker compose up` to up all services defined inside `docker-compose.yml`
