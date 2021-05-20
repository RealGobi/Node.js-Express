import Chai from 'chai';
import ChaiHTTP from 'chai-http';
import { describe, it as test } from 'mocha';

import app from '../jim.js';

import ItemModel from '../models/Item-Model.js';

Chai.should();
Chai.use(ChaiHTTP);

const randomString = Math.random().toString(36).substring(7);
const randomNumber = Math.floor(Math.random() * 100);

//Before each test, empty the database
describe('Items', () => {
  beforeEach((done) => {
    ItemModel.remove({}, (err) => {
      done();
    });
  });

  const testingNonExistingRoute = () => {
    describe('API call to none existing route', () => {
      test('Expecting 404, not found', (done) => {
        Chai.request(app)
          .get(`/${randomString}`)
          .end((req, res) => {
            res.should.have.a.status(404);
            done();
          });
      });
    });
  };

  const getAllItems = () => {
    describe('GET all items from DB', () => {
      test('Expect status 200 and array of items from DB', (done) => {
        Chai.request(app)
          .get('/item')
          .end((req, res) => {
            res.should.have.a.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eq(res.body.length);
            done();
          });
      });
    });
  };

  const getItemById = () => {
    describe('/GET/:id item', () => {
      test('GET one item by the given id', (done) => {
        let item = new ItemModel({
          itemName: randomString,
          itemCategory: randomString,
          // number
          itemPrice: randomNumber,
          itemDescription: randomString,
        });

        item.save((err, item) => {
          Chai.request(app)
            .get(`/item/${item.id}`)
            .send(item)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('itemName');
              res.body.should.have.property('itemCategory');
              res.body.should.have.property('itemPrice');
              res.body.should.have.property('itemDescription');
              res.body.should.have.property('_id').eq(item.id);
              done();
            });
        });
      });
    });
  };

  const deleteItemById = () => {
    describe('/DELETE/:id item', () => {
      test('DELETE a item given the id', (done) => {
        let item = new ItemModel({
          itemName: randomString,
          itemCategory: randomString,
          // number
          itemPrice: randomNumber,
          itemDescription: randomString,
        });

        item.save((err, item) => {
          Chai.request(app)
            .delete(`/item/${item.id}`)
            .end((req, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have
                .property('msg')
                .eq(`Item deleted: ${item.itemName}`);
              done();
            });
        });
      });
    });
  };

  const updateItem = () => {
    describe('/PUT/:id item', () => {
      test(' UPDATE a item given the id', (done) => {
        let item = new ItemModel({
          itemName: randomString,
          itemCategory: randomString,
          // number
          itemPrice: randomNumber,
          itemDescription: randomString,
        });

        item.save((err, item) => {
          Chai.request(app)
            .put(`/update-item/${item.id}`)
            .send({
              itemName: 'test-update',
              itemCategory: 'test-update',
              itemPrice: 0,
              itemDescription: 'test-update',
            })
            .end((req, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('itemCategory').eq('test-update');
              done();
            });
        });
      });
    });
  };

  const createItems = () => {
    let item = new ItemModel({
      itemName: randomString,
      itemCategory: randomString,
      // number
      itemPrice: randomNumber,
      itemDescription: randomString,
    });

    describe('Create an item', () => {
      test('Expect status 201 and create a item and send to DB', (done) => {
        Chai.request(app)
          .post('/item')
          .send(item)
          .end((req, res) => {
            res.should.have.a.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('itemName').eq(item.itemName);
            res.body.should.have.property('itemCategory').eq(item.itemCategory);
            res.body.should.have.property('itemPrice').eq(item.itemPrice);
            res.body.should.have
              .property('itemDescription')
              .eq(item.itemDescription);
            done();
          });
      });
    });
  };

  describe('Testing item api-route', () => {
    testingNonExistingRoute();
    getAllItems();
    createItems();
    getItemById();
    deleteItemById();
    updateItem();
  });
});
