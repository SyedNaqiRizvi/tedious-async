import { Connection as TediousConnection } from 'tedious';
import execSqlAsync from './extension-functions/execSqlAsync';
import onConnectAsync from './extension-functions/onConnectAsync';

class Connection extends TediousConnection {
  public execSqlAsync = execSqlAsync(this);
  public onConnectAsync = onConnectAsync(this);
}

export default Connection;
