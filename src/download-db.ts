import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const FILE_ID = '1DgGXJvAUt-Bx0x7il65HjzZY3VoC8jcW';
const OUTPUT_DIR = 'public';
const OUTPUT_PATH = path.join(process.cwd(), OUTPUT_DIR, 'data.sqlite');

async function downloadDB() {
  const command = `npx gdown https://drive.google.com/uc?id=${FILE_ID} -O ${OUTPUT_PATH}`;
  console.log('Downloading DB using gdown...');
  const execOptions = { stdio: 'inherit' };
  require('child_process').execSync(command, { stdio: 'inherit' });
  console.log('DB downloaded successfully.');
}

downloadDB().catch(console.error);
