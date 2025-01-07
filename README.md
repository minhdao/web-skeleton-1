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

### Backend

Backend is a simple Node.js server with Expres.js. There are two main directories inside `backend`:

- `app`: This houses the core business logics of the application
- `db`: This is where interaction with database happens

`app` and `db` are coupled together to make development easier. However, there is still a clear seperation between them. The coupling of the `db` to the `app` is strong by locking the database into the application's entities. On the other hand, the coupling of the `app` to the `db` is loose, because we can easily switch out the database client E.g. `pgClient` vs `redisClient`.

**TypeORM**

TypeORM (Object realtion mapping) is used to make development faster and somewhat easier. TypeORM provides functions to do CRUD on enties out of the box. This allows developer to focus on the application feature rather than rewriting and testing queries for each entity created. On top of that, it also provide way to write and run migration out of the box.

With TypeORM, we should be able to think about the entity needed, define the entity, and use TypeORM to create table, and `repository` to immediately perform CRUD operation on it.

For example, we define a `UserEntity` inside `app/auth/`, then put it inside `DataSource` in `db/repo/pg/pg.client.ts`, and restart the backend server. That's all it take for TypeORM to help us create user table and do CRUD on `UserEntity`.
