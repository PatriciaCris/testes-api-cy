/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

     let email

    it('Deve validar contrato de usuários', () => {
          cy.request('usuarios').then(response => {
               return contrato.validateAsync(response.body)
          })
    });

    it('Deve listar usuários cadastrados', () => {
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {
               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(15)
          })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
          email = `email@${Math.floor(Math.random() * 100000)}.com`
          cy.request({
          method: 'POST',
          url: 'usuarios',
          body:{
                    "nome": "Patricia",
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
          }) 
    });

    it('Deve validar um usuário com email inválido', () => {
          cy.request({
          method: 'POST',
          url: 'usuarios',
          body:{
                    "nome": "Patricia",
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               },
               failOnStatusCode: false
          }).then((response) => {
               expect(response.status).to.equal(400)
               expect(response.body.message).to.equal('Este email já está sendo usado')
          }) 
    });

    it('Deve editar um usuário previamente cadastrado', () => {
          email = `email@${Math.floor(Math.random() * 100000)}.com`
          cy.request('usuarios').then(response => {
               let id = response.body.usuarios[1]._id
               cy.request({
               method: 'PUT',
               url: `usuarios/${id}`,
               body: 
               {
                    "nome": "Patricia Editado",
                    "email": email,
                    "password": "patricia",
                    "administrador": "true"
               }
               }).then(response => {
                    expect(response.status).to.equal(200)
                    expect(response.body.message).to.equal('Registro alterado com sucesso')
               })
          })
    });

    it('Deve deletar um usuário previamente cadastrado', () => {
          email = `email@${Math.floor(Math.random() * 100)}.com`
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body:{
                         "nome": "Patricia",
                         "email": email,
                         "password": "teste",
                         "administrador": "true"
                    }
               })
          .then(response => {
          let id = response.body._id
          cy.request({
               method: 'DELETE',
               url: `usuarios/${id}`,
          }).then(response =>{
               expect(response.body.message).to.equal('Registro excluído com sucesso')
               expect(response.status).to.equal(200)
          })
          })
    });


});
