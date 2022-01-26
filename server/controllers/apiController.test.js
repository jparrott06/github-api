const apiController = require('./apiController');

// Unit & Integration Testing for apiController

describe('Test apiController ', () => {

  test('getOpenPRs - should throw error if query is empty', async () => {
    
    const mReq = { query: { text: '' } };
    const mResp = {};
    const mNext = jest.fn();

    try {
      await apiController.getOpenPRs(mReq, mResp, mNext);
    } catch(err) {
      expect(err);
    }

  }),

  test('getOpenPRs - should return 404 if no repo found', async () => {

    const mReq = { query: {text: 'dfoisfuosfdns/dfijdifsni'} };
    const mResp = {};
    const mNext = jest.fn();

    try {
      await apiController.getOpenPRs(mReq, mResp, mNext)
    } catch(err) {
      //Error: Request failed with status code 404
      expect(err);
    }

  }),

  test('getCommitNum - prArray not defined', async () => {

    const mReq = { query: {text: 'dfoisfuosfdns/dfijdifsni'} };
    const mResp = {locals: {}};
    const mNext = jest.fn();

    try {
      await apiController.getCommitNum(mReq, mResp, mNext)
    } catch(err) {
      //Error: 
      expect(err);
    }

  }),

  test('getCommitNum - No Open PRs in prArray', async () => {

    const mReq = { query: {text: 'dfoisfuosfdns/dfijdifsni'} };
    const mResp = {locals: {prArray: [{}]}};
    const mNext = jest.fn();

    try {
      await apiController.getCommitNum(mReq, mResp, mNext)
    } catch(err) {
      //Error: 
      expect(err);
    }

  })

  /*
  TODO: Test successful cases for apiController functions
  for unit/integration testing

  Warning: tests using HTTP requests to api.github
  can return false negative since repeated GET calls testing triggers rate limit

  api/github.com/rate_limit

  res.locals = {prArray: [{
    number: 1,
    state: 'open',
    compareUrl: etc.
  }]}

  */

});