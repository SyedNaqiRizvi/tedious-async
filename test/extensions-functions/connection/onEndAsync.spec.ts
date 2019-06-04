import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import onEndAsync from '../../../src/extension-functions/connection/onEndAsync';
import Connection from '../../../src/index';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Extention Functions', () => {
  describe('onEndAsync()', () => {
    let sandbox;
    let connectionStub;
    beforeEach('stubbing Connection', () => {
      sandbox = sinon.createSandbox();
      connectionStub = sandbox.createStubInstance(Connection);
    });

    afterEach('clearing sandbox', () => {
      sandbox.restore();
    });

    it('should resolve promise void', async () => {
      try {
        connectionStub.on = (event, callback) => callback();
        const onEndResult = await onEndAsync(connectionStub)();
        expect(onEndResult).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });
  });
});
