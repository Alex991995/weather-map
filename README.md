
<img width="1899" height="861" alt="Снимок экрана 2025-10-29 в 11 26 34" src="https://github.com/user-attachments/assets/7c04786c-45ab-48e3-9d48-52f1b72baf9e" />

<img width="1899" height="861" alt="Снимок экрана 2025-10-29 в 11 26 52" src="https://github.com/user-attachments/assets/d1210be3-0e6d-460c-b4e4-f89700c063f7" />

<img width="1899" height="861" alt="Снимок экрана 2025-10-29 в 11 26 59" src="https://github.com/user-attachments/assets/ed561d01-208e-491a-83bb-15e9c25b7885" />



## First of all pls open docker

1. enter into backend folder
2. create env. with

DATABASE_URL="postgresql://postgres:prisma@postgres:5432/postgres?schema=public"

PORT=3000

SECRET=YourSecretKey

SALT=10

3. run some commands

docker compose -f docker-compose.yml up --build

docker compose exec app npx prisma migrate dev --name init

4. enter into server folder and run
   node index

5. go to the http://localhost:4200
