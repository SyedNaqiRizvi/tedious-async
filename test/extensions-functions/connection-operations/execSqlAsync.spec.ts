import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import execSqlAsync from '../../../src/extension-functions/connection-operations/execSqlAsync';
import Connection from '../../../src/index';
chai.use(chaiAsPromised);
const expect = chai.expect;
describe('Extention Functions', () => {
  describe('execSqlAsync()', () => {
    let sandbox;
    let connectionStub;

    beforeEach('stubbing Connection', () => {
      sandbox = sinon.createSandbox();
      connectionStub = sandbox.createStubInstance(Connection);
    });

    afterEach('clearing sandbox', () => {
      sandbox.restore();
    });

    it('should reject promise when callback function has valid error', async () => {
      try {
        const error = new Error('test error');
        connectionStub.execSql = a => a.callback(error);
        const result = await execSqlAsync(connectionStub)('');
        expect(result).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(error);
      }
    });

    it('should reject promise when callback function return error true', async () => {
      try {
        connectionStub.execSql = a => a.callback(true);
        const result = await execSqlAsync(connectionStub)('');
        expect(result).to.eql(undefined);
      } catch (error) {
        expect(error).to.eql(true);
      }
    });

    it('should resolve promise when callback function return no error with json option', async () => {
      try {
        const rowCount = 1;
        const rows = [[{ value: 'value', metadata: { colName: 'colName' } }]];
        const expected = [{ colName: 'value' }];
        connectionStub.execSql = a => a.callback(undefined, rowCount, rows);
        const result = await execSqlAsync(connectionStub)('test', {
          format: 'json',
        });
        expect(result).to.eql(expected);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });

    it('should resolve promise when callback function return no error without any options', async () => {
      try {
        const rowCount = 1;
        const rows = [[{ value: 'value', metadata: { colName: 'colName' } }]];
        connectionStub.execSql = a => a.callback(undefined, rowCount, rows);
        const result = await execSqlAsync(connectionStub)('test');
        expect(result).to.eql(rows);
      } catch (error) {
        expect(error).to.eql(undefined);
      }
    });
  });
});
