import 'reflect-metadata';

import CreateCardService from './CreateCardService';
import FakeCardRepository from '../repositories/fakes/FakeCardRepository';

let createCardService: CreateCardService;
let fakeCardRepository: FakeCardRepository;

describe('CreateCard', () => {
  beforeEach(() => {
    fakeCardRepository = new FakeCardRepository();
    createCardService = new CreateCardService(fakeCardRepository);
  });

  it('should be able to create card');
  it('should not be able to create card without name');
  it('should not be able to create card without flag');
  it('should not be able to create card without due date');
  it('should not be able to create two cards with same name');
});
