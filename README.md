# TODO

- [x] DB Connection with Drizzle Config
- [x] Setup Server Flow on a PORT
- [x] Initialize a git repo and push this code
- [x] Setting Up Middlewares and Routing
- [x] Adding BullMQ Setup
- [x] Swagger Setup
- [x] Implement Authentication
- [x] Documenting required APIs
- [x] Design the pipeline creation API
- [x] Design the Text Input Node
- [ ] Design the AI Node
- [ ] Let's Save both the nodes and node_types and some example edges in the db before implementing the workers
- [ ] Implementing AI Node Worker
- [ ] Implementing Text Input Node Worker
- [ ] Integrate it with the pipeline, and implement running a pipeline
- [ ] Start writing tests for pipeline excution
- [ ] Implement APIs
- [ ] Writing tests for APIs


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

# APIs
