import { ColumnValue } from 'tedious';

type DbRow = ColumnValue[];

interface Dictionary {
  [key: string]: any;
}

export { DbRow, Dictionary };
