import { Connection as TediousConnection } from 'tedious';
import onCharsetChangeAsync from './extension-functions/connection/onCharsetChangeAsync';
import onConnectAsync from './extension-functions/connection/onConnectAsync';
import onDatabaseChangeAsync from './extension-functions/connection/onDatabaseChangeAsync';
import onDebugAsync from './extension-functions/connection/onDebugAsync';
import onEndAsync from './extension-functions/connection/onEndAsync';
import onErrorAsync from './extension-functions/connection/onErrorAsync';
import onErrorMessageAsync from './extension-functions/connection/onErrorMessageAsync';
import onInfoMessageAsync from './extension-functions/connection/onInfoMessageAsync';
import onLanguageChangeAsync from './extension-functions/connection/onLanguageChangeAsync';
import execSqlAsync from './extension-functions/execSqlAsync';

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
}

export default Connection;
