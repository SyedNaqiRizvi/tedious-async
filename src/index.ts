import { Connection as TediousConnection, ConnectionConfig } from 'tedious';
import onCharsetChangeAsync from './extension-functions/connection-events/onCharsetChangeAsync';
import onConnectAsync from './extension-functions/connection-events/onConnectAsync';
import onDatabaseChangeAsync from './extension-functions/connection-events/onDatabaseChangeAsync';
import onDebugAsync from './extension-functions/connection-events/onDebugAsync';
import onEndAsync from './extension-functions/connection-events/onEndAsync';
import onErrorAsync from './extension-functions/connection-events/onErrorAsync';
import onErrorMessageAsync from './extension-functions/connection-events/onErrorMessageAsync';
import onInfoMessageAsync from './extension-functions/connection-events/onInfoMessageAsync';
import onLanguageChangeAsync from './extension-functions/connection-events/onLanguageChangeAsync';
import execSqlAsync from './extension-functions/connection-operations/execSqlAsync';

class Connection extends TediousConnection {
  public execSqlAsync = execSqlAsync(this);
  public onConnectAsync = onConnectAsync(this);
  public onErrorAsync = onErrorAsync(this);
  public onDebugAsync = onDebugAsync(this);
  public onEndAsync = onEndAsync(this);
  public onErrorMessageAsync = onErrorMessageAsync(this);
  public onInfoMessageAsync = onInfoMessageAsync(this);
  public onDatabaseChangeAsync = onDatabaseChangeAsync(this);
  public onLanguageChangeAsync = onLanguageChangeAsync(this);
  public onCharsetChangeAsync = onCharsetChangeAsync(this);
  constructor(config: ConnectionConfig) {
    super(config);
  }
}

export default Connection;
