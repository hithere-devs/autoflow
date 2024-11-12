# TODO

- [x] DB Connection with Drizzle Config
- [x] Setup Server Flow on a PORT
- [x] Initialize a git repo and push this code
- [x] Setting Up Middlewares and Routing
- [x] Adding BullMQ Setup
- [ ] Writing starting tests
- [ ] Documenting required APIs
- [ ] Implement Authentication


# CMDs

1. Install Dependencies
```
npm install
```

2. Generate DB Schema
```
npm run db:generate
```

3. Push DB Schema
```
npm run db:push
```

4. Start a Docker Container or your local redis
```
docker run -d -p 6379:6379 redis:alpine
```

5. Run the Server
```
npm run dev
```

6. Important Links
```
API Docs -          http://localhost:PORT/api/docs
Health Check URL -  http://localhost:PORT/admin
Bull Board -        http://localhost:PORT/admin/queues
Server URL -        http://localhost:PORT/
```



# Project structure

```
  src/
    |-- config
    |-- lib
    |-- controllers
    |-- models
    |-- middlewares
    |-- db
    |-- services
    |-- tests
    |-- utils
    |-- nodes
    |-- types
    |-- queue
      |-- queues
      |-- workers
    |-- routes
      |-- swagger
      |-- v1
```
