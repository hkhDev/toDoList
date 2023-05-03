// declare namespace NodeJS {
//   export interface ProcessEnv {
//     host: string;
//     user: string;
//     password?: string;
//     database?: string;
//   }
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      host: string;
      user: string;
      password: string;
      database: string;
      PORT?: number;
      NODE_ENV?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
