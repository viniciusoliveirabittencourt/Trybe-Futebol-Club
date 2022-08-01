import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import users from '../database/models/users';
import * as BCY from 'bcryptjs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota "Login"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
     sinon
       .stub(users, "findOne")
       .resolves({
        username: 'admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: 'super_admin_password',
       } as users);
      sinon
       .stub(BCY, 'compareSync')
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
         password: 'super_admin_password',
       });

    console.log(chaiHttpResponse);

    expect(chaiHttpResponse).to.be.a('object');
    expect(chaiHttpResponse).to.have.property('token');
  });
});
