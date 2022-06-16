import { exit } from 'process';
import { createManifestFile } from './createManifestFile';

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV in the env is missing!');
}

(async () => {
  try {
    const data = await createManifestFile();
    console.log(data);
  } catch (error) {
    console.error(error);
    exit(1);
  }
})();
