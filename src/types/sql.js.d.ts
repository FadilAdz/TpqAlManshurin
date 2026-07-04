declare module 'sql.js' {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number> | Buffer | null) => Database;
  }

  interface QueryResults {
    columns: string[];
    values: (string | number | null | Uint8Array)[][];
  }

  interface Statement {
    run(params?: (string | number | null | Uint8Array)[]): void;
    free(): void;
  }

  interface Database {
    run(sql: string, params?: (string | number | null | Uint8Array)[]): void;
    exec(sql: string, params?: (string | number | null | Uint8Array)[]): QueryResults[];
    prepare(sql: string): Statement;
    export(): Uint8Array;
    close(): void;
  }

  function initSqlJs(): Promise<SqlJsStatic>;
  export default initSqlJs;
  export type { Database, QueryResults, Statement, SqlJsStatic };
}
