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

async function copyFilesToDestinations(sourceDir: string, destinations: string[], processedFiles: Set<string>) {
  try {
    const files = await readdir(sourceDir);
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        await copyFilesToDestinations(filePath, destinations, processedFiles);
      } else {
        if (file.endsWith('.html')) {
          // Skip HTML files
          continue;
        }
        if (!processedFiles.has(file)) {
          for (const destination of destinations) {
            const targetFile = path.join(destination, file);
            await fsExtra.ensureDir(destination);
            await copyFile(filePath, targetFile);
            console.log(`Copied ${file} to ${destination}`);
          }
          processedFiles.add(file); // Mark the file as processed
        }
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

async function customAllDonePlugin() {
  const sourceDir = './dist/static';
  const destinations = ['./dist/static/about', './dist/static/admin', './dist/static/amenities', './dist/static/contact', './dist/static/documents', './dist/static/login', './dist/static/logout', './dist/static/requests'];
  const processedFiles = new Set<string>(); // Set to keep track of processed files
  await copyFilesToDestinations(sourceDir, destinations, processedFiles);
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);
