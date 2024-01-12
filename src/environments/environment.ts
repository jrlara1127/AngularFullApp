// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { CREDENTIALS } from "../Constants";

export const environment = {
  production: false,
  firebase: {
      apiKey: CREDENTIALS.apiKey,
      authDomain: CREDENTIALS.authDomain,
      projectId: CREDENTIALS.projectId,
      storageBucket: CREDENTIALS.storageBucket,
      messagingSenderId: CREDENTIALS.messagingSenderId,
      appId: CREDENTIALS.appId    
  }
  
};
