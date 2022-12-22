import { PrismaClient } from "@prisma/client";
import request from 'supertest';
import app  from '../../src/app';
import { BadRequestError } from '../../src/utils/errors/BadRequestError';

describe('Create User Controller', () => {
  let prismaClient: PrismaClient;
    
  beforeAll(async () => {
      prismaClient = new PrismaClient();
  
      await prismaClient.$connect();
    });
  
    beforeEach(async () => {
      await prismaClient.user.deleteMany();
    });
  
    afterAll(async () => {
      await prismaClient.user.deleteMany();
      await prismaClient.$disconnect();
    });
  it('create_whenPassUserValid_returnSuccess', async () => {
    const response = await request(app).post('/users').send({
      username: 'test-integration',
      email: 'testIntegration@test.com.br',
      name: 'Test Integration',
    });

    expect(response.status).toBe(201);
    expect(async () => { await request(app).post('/users').send({
      username: 'test-integration',
      email: 'testIntegration@test.com.br',
      name: 'Test Integration',
    })}).not.toThrow(BadRequestError);
    
  });

  it('create_whenPassEmailExistent_returnBadRequestError', async () => {
    await request(app).post('/users').send({
      username: 'test-integration-exist',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    });

    const response = await request(app).post('/users').send({
      username: 'test-integration-exist2',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    });

    expect(response.status).toBe(400);
  });
  it('create_whenPassUsernameExistent_returnBadRequestError', async () => {
    await request(app).post('/users').send({
      username: 'test-integration-exist',
      email: 'testIntegrationExisting@test.com.br',
      name: 'Test Integration Exist User',
    });

    const response = await request(app).post('/users').send({
      username: 'test-integration-exist',
      email: 'testIntegrationExisting2@test.com.br',
      name: 'Test Integration Exist User',
    });

    expect(response.status).toBe(400);
  });
});
