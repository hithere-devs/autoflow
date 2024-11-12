// src/tests/index.test.ts
import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import { db } from '../db';
import { config } from '../config';

// Import all test suites
import './auth/google-auth.test';

beforeAll(async () => {
	// Setup test environment
	process.env.NODE_ENV = 'test';
	process.env.DB_PATH = ':memory:';

	// Initialize test database
	// await db.schema.createTables();
});

afterEach(async () => {
	// Clear all mocks between tests
	vi.clearAllMocks();
});

afterAll(async () => {
	// Close test database
});
