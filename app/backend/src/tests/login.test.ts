import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import users from '../database/models/users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota "/login"', () => {

  let chaiHttpResponse: Response;

  beforeEach(async () => {
     sinon
       .stub(users, "findOne")
       .resolves({
        id: 1,
        username: 'admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
       } as users);
  });

  afterEach(()=>{
    (users.findOne as sinon.SinonStub).restore();
  })

  it('Testando se ao fazer uma chamada ao endpoint "/login", ele permita o acesso de dados válidos no front-end', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login/')
       .send({
          email: 'admin@admin.com',
          password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body.token).be.a('string');
  });

  it('Testanto que a rota "/login", não permite acesso sem email', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login/')
       .send({
          email: '',
          password: 'secret_admin',
       });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).be.equal('All fields must be filled');
  });

  it('Testanto que a rota "/login", não permite acesso sem password', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login/')
       .send({
          email: 'admin@admin.com',
          password: '',
       });

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).be.equal('All fields must be filled');
  });

  it('Testanto que a rota "/login", não permite acesso com um password inválido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login/')
       .send({
          email: 'naoadmin@naoadmmin.com',
          password: 'secret_ad',
       });

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).be.equal('Incorrect email or password');
  });

  it('Testanto que a rota "/login/validate", retorna os dados esperados', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login/')
       .send({
          email: 'admin@admmin.com',
          password: 'secret_admin',
       });

    const toke = chaiHttpResponse.body.token;

    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set('authorization', toke);

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.have.property('role');
    expect(chaiHttpResponse.body.role).be.equal('admin');
  });
});
