import {registerPlugin, ScullyConfig} from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer'
import * as fs from "fs-extra";
import * as path from "path";
import {promisify} from "node:util";

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "dgm-app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
  }
};

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

async function copyFilesToDestinations(sourceDir: string, destinations: string[]) {
  try {
    const files = await readdir(sourceDir);
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        // Recursively copy files inside subfolders
        await copyFilesToDestinations(filePath, destinations);
      } else {
        // Copy file to specified destinations
        if (file !== 'index.html') {
          for (const destination of destinations) {
            const targetFile = path.join(destination, file);
            await copyFile(filePath, targetFile);
            console.log(`Copied ${file} to ${destination}`);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}


async function customAllDonePlugin() {
  const sourceDir = '/dist/static'; // Provide the path to your source directory
  const destinations = ['/dist/static/about', '/dist/static/admin' , '/dist/static/amenities', '/dist/static/contact', '/dist/static/documents', '/dist/static/login', '/dist/static/logout', '/dist/static/requests']; // Array of destination paths
  copyFilesToDestinations(sourceDir, destinations);
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);



