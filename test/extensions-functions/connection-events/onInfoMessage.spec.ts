import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import onInfoMessageAsync from '../../../src/extension-functions/connection-events/onInfoMessageAsync';
import Connection from '../../../src/index';
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Extention Functions', () => {
  describe('onInfoMessageAsync()', () => {
    let sandbox;
    let connectionStub;
    beforeEach('stubbing Connection', () => {
      sandbox = sinon.createSandbox();
      connectionStub = sandbox.createStubInstance(Connection);
    });

    afterEach('clearing sandbox', () => {
      sandbox.restore();
    });

    it('should resolve promise info object', async () => {
      try {
        const info = {
          number: 1,
          state: 'info',
          class: 4,
          message: 'message',
          procName: 'proc',
          lineNumber: 23,
        };
        connectionStub.on = (event, callback) => callback(info);
        const onDebugResult = await onInfoMessageAsync(connectionStub)();
        expect(onDebugResult).to.eql(info);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should resolve promise empty object', async () => {
      try {
        connectionStub.on = (event, callback) => callback({});
        const onDebugResult = await onInfoMessageAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql({});
      }
    });

    it('should reject promise when undefined', async () => {
      try {
        connectionStub.on = (event, callback) => callback(undefined);
        const onDebugResult = await onInfoMessageAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should reject promise when null', async () => {
      try {
        connectionStub.on = (event, callback) => callback(null);
        const onDebugResult = await onInfoMessageAsync(connectionStub)();
      } catch (error) {
        expect(error).to.eql(null);
      }
    });
  });
});
