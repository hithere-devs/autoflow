# TODO

- [x] DB Connection with Drizzle Config
- [x] Setup Server Flow on a PORT
- [x] Initialize a git repo and push this code
- [ ] Adding BullMQ Setup
- [ ] Writing starter tests

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

4. Run the Server
```
npm run dev
```

5. Start a Docker Container or your local redis
```
docker run -d -p 6379:6379 redis:alpine
```

# Project structure

```
src/
  ├── api/          # API routes and controllers
  ├── services/     # Business logic
  ├── queue/        # BullMQ setup
  ├── workers/      # Node execution workers
  ├── models/       # Database models
  ├── utils/        # Helper functions
  └── tests/        # Test suites
```

# Backend Architecture

```
flowchart TB
    subgraph API["API Layer"]
        Router["Express Router"]
        Controllers["Controllers"]
    end

    subgraph Queue["Queue System"]
        direction TB
        NodeQueue["Node Execution Queue"]
        PipelineQueue["Pipeline Execution Queue"]
        WorkerPool["Worker Pool"]

        NodeQueue --> WorkerPool
        PipelineQueue --> WorkerPool
    end

    subgraph Storage["Storage Layer"]
        SQLite[(SQLite DB)]
        Cache["Redis Cache"]
    end

    Router --> Controllers
    Controllers --> Queue
    Queue --> Storage
    Controllers --> Storage

    subgraph Workers["Worker Types"]
        direction LR
        AIWorker["AI Node Worker"]
        ScriptWorker["Script Node Worker"]
        FileWorker["File Node Worker"]
    end

    WorkerPool --> Workers
```
