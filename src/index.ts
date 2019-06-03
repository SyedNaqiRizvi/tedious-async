import { Connection as TediousConnection } from 'tedious';
import execSqlAsync from './extension-functions/execSqlAsync';
import onConnectAsync from './extension-functions/onConnectAsync';
import onErrorAsync from './extension-functions/onErrorAsync';

class Connection extends TediousConnection {
  public execSqlAsync = execSqlAsync(this);
  public onConnectAsync = onConnectAsync(this);
  public onErrorAsync = onErrorAsync(this);
}

export default Connection;
