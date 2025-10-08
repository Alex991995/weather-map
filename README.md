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
