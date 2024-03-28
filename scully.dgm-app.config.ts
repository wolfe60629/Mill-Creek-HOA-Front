import { registerPlugin, ScullyConfig } from '@scullyio/scully';
import { promisify } from 'util';
import * as fsExtra from 'fs-extra';
import * as path from 'path';

const readdir = promisify(fsExtra.readdir);
const stat = promisify(fsExtra.stat);
const copyFile = promisify(fsExtra.copyFile);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'dgm-app',
  outDir: './dist/static',
  routes: {}
};

async function copyFilesToDestinations(sourceDir: string, destinations: string[]) {
  try {
    const files = await readdir(sourceDir);
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        // Recursively copy files from subdirectories
        // await copyFilesToDestinations(filePath, destinations);
      } else {
        if (file.endsWith('.html')) {
          // Skip HTML files
          continue;
        } else {
          for (const destination of destinations) {
            // Copy file to each destination directory
            const destinationFilePath = path.join(destination, file);
            console.log("Copying: " + filePath + " into " + destinationFilePath);
            await fsExtra.copy(filePath, destinationFilePath);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

async function customAllDonePlugin() {
  const sourceDir = './dist/static';
  const destinations = [
    './dist/static/about',
    './dist/static/admin',
    './dist/static/amenities',
    './dist/static/contact',
    './dist/static/documents',
    './dist/static/login',
    './dist/static/logout',
    './dist/static/requests'
  ];
  await copyFilesToDestinations(sourceDir, destinations);
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);
