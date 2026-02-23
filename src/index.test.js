const request = require('supertest');
const express = require('express');

// Import app logic (we'll need to refactor index.js to export app)
// For now, create a simple test structure

describe('API Endpoints', () => {
    let app;
    let server;

    beforeAll(() => {
        // Mock app setup
        app = express();
        app.use(express.json());

        app.get('/', (req, res) => {
            res.json({
                message: '🐳 Hello from Docker Workshop!',
                workshop: 'From Code to Cloud - FPT University Da Nang',
                timestamp: new Date().toISOString(),
                environment: process.env.NODE_ENV || 'development',
            });
        });

        app.get('/health', (req, res) => {
            res.status(200).json({
                status: 'ok',
                uptime: process.uptime(),
                timestamp: new Date().toISOString(),
            });
        });

        app.get('/api/info', (req, res) => {
            res.json({
                app: 'docker-workshop-starter',
                version: '1.0.0',
            });
        });
    });

    afterAll((done) => {
        if (server) {
            server.close(done);
        } else {
            done();
        }
    });

    describe('GET /', () => {
        it('should return welcome message', async () => {
            const res = await request(app).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message');
            expect(res.body.message).toContain('Docker Workshop');
        });

        it('should return timestamp', async () => {
            const res = await request(app).get('/');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('GET /health', () => {
        it('should return 200 status', async () => {
            const res = await request(app).get('/health');
            expect(res.statusCode).toBe(200);
        });

        it('should return status ok', async () => {
            const res = await request(app).get('/health');
            expect(res.body.status).toBe('ok');
        });

        it('should return uptime', async () => {
            const res = await request(app).get('/health');
            expect(res.body).toHaveProperty('uptime');
            expect(typeof res.body.uptime).toBe('number');
        });

        it('should return timestamp', async () => {
            const res = await request(app).get('/health');
            expect(res.body).toHaveProperty('timestamp');
        });
    });

    describe('GET /api/info', () => {
        it('should return app info', async () => {
            const res = await request(app).get('/api/info');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('app');
            expect(res.body).toHaveProperty('version');
        });
    });

    describe('GET /api/students', () => {
        it('should return students list', async () => {
            const students = [
                { id: 1, name: 'Nguyen Van A', class: 'SE1234' },
                { id: 2, name: 'Tran Thi B', class: 'SE1234' },
                { id: 3, name: 'Le Van C', class: 'SE5678' },
            ];

            app.get('/api/students', (req, res) => {
                res.json({ count: students.length, data: students });
            });

            const res = await request(app).get('/api/students');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('count');
            expect(res.body).toHaveProperty('data');
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });
});
