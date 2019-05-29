import { Connection as TediousConnection } from 'tedious';
import { execSqlAsync } from './extensions.ts/execSqlAsync';
import { onConnectAsync } from './extensions.ts/onConnectAsync';

class Connection extends TediousConnection {
  public execSqlAsync = execSqlAsync(this);
  public onConnectAsync = onConnectAsync(this);
}

export default Connection;
