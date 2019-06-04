import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import onErrorAsync from '../../../src/extension-functions/connection/onErrorAsync';
import Connection from '../../../src/index';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Extention Functions', () => {
  describe('onErrorAsync()', () => {
    let sandbox;
    let connectionStub;
    beforeEach('stubbing Connection', () => {
      sandbox = sinon.createSandbox();
      connectionStub = sandbox.createStubInstance(Connection);
    });

    afterEach('clearing sandbox', () => {
      sandbox.restore();
    });

    it('should reject promise when on function callback does not have error', async () => {
      try {
        connectionStub.on = (event, callback) => callback();
        const onErrorResult = await onErrorAsync(connectionStub)();
        expect(onErrorResult).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should reject promise when on function callback has error as undefined', async () => {
      try {
        connectionStub.on = (event, callback) => callback(undefined);
        const onErrorResult = await onErrorAsync(connectionStub)();
        expect(onErrorResult).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should reject promise when on function callback has error as null', async () => {
      try {
        connectionStub.on = (event, callback) => callback(null);
        const onErrorResult = await onErrorAsync(connectionStub)();
        expect(onErrorResult).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(null);
      }
    });

    it('should resolve promise when on function callback has true for error', async () => {
      try {
        connectionStub.on = (event, callback) => callback(true);
        const onErrorResult = await onErrorAsync(connectionStub)();
        expect(onErrorResult).to.eql(true);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should resolve promise when on function callback has Error for error', async () => {
      try {
        const error = new Error('test error');
        connectionStub.on = (event, callback) => callback(error);
        const onErrorResult = await onErrorAsync(connectionStub)();
        expect(onErrorResult).to.eql(error);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });
  });
});
