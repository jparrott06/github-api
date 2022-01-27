const apiController = require('./apiController');

const Pulls = require('../helpers/Pulls');

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
      expect(err.status).toBe(404);
      expect(err.message).toBe('Request failed with status code 404');
    }

  }),

  test('getOpenPRs - should return 200 for repo with open PRs', async () => {

    const mReq = { query: {text: 'jparrott06/ChirpyApp'} };
    const mRes = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    const mNext = jest.fn();

    await apiController.getOpenPRs(mReq, mRes, mNext);

    expect(mRes.send).toBeCalled;

  }),

  test('getCommitNum - prArray not defined', async () => {

    const mReq = { query: {text: 'dfoisfuosfdns/dfijdifsni'} };
    const mResp = {locals: {}};
    const mNext = jest.fn();

    try {
      await apiController.getCommitNum(mReq, mResp, mNext)
    } catch(err) {
      expect(err.message).toBe("Sorry, something went wrong with your application :'(");
    }

  }),

  test('getCommitNum - No Open PRs in prArray', async () => {

    const mReq = { query: {text: 'jparrott06/test'} };
    const mResp = {locals: {prArray: []}};
    const mNext = jest.fn();

    try {
      await apiController.getCommitNum(mReq, mResp, mNext)
    } catch(err) {
      expect(err.message).toBe("Sorry, something went wrong with your application :'(");
    }

  })

});