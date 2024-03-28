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

async function copyFilesToSubfolders(sourceDir: string) {
  try {
    const files = await readdir(sourceDir);
    for (const file of files) {
      const filePath = path.join(sourceDir, file);
      const fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        // Recursively copy files inside subfolders
        await copyFilesToSubfolders(filePath);
      } else {
        // Copy file if it's not index.html
        if (file !== 'index.html') {
          // Assuming the target subfolder is named the same as the parent folder
          const targetDir = path.dirname(filePath);
          const targetFile = path.join(targetDir, file);
          await copyFile(filePath, targetFile);
          console.log(`Copied ${file} to ${targetDir}`);
        }
      }
    }
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

async function customAllDonePlugin() {
  const sourceDir = './dist/static';
  await copyFilesToSubfolders(sourceDir);
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);



