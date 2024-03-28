import {registerPlugin, ScullyConfig} from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer'
import * as fs from "fs-extra";
import * as path from "path";

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "dgm-app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
  }
};

async function copyFilesToSubfolders(sourceDir) {
  try {
    // Ensure that the source directory exists
    if (!(await fs.exists(sourceDir))) {
      throw new Error(`Source directory '${sourceDir}' does not exist.`);
    }

    // Get a list of all items (files and directories) in the source directory
    const items = await fs.readdir(sourceDir);

    // Filter out only files (excluding index.html) from the list of items
    const files = items.filter(async item => {
      const itemPath = path.join(sourceDir, item);
      const stats = await fs.stat(itemPath);
      return stats.isFile() && item !== 'index.html';
    });

    // Iterate over each file in the source directory
    for (const file of files) {
      // Get the full path of the current file
      const filePath = path.join(sourceDir, file);

      // Iterate over each subdirectory in the source directory
      for (const item of items) {
        const itemPath = path.join(sourceDir, item);

        // Ensure that the item is a directory
        const stats = await fs.stat(itemPath);
        if (stats.isDirectory()) {
          // Destination directory path
          const destDir = path.join(itemPath, path.basename(filePath));

          try {
            // Copy the file from the source path to the destination directory
            await fs.copy(filePath, destDir);
            console.log(`Copied ${file} to ${destDir} successfully.`);
          } catch (error) {
            console.error(`Error copying ${file} to ${destDir}:`, error);
          }
        }
      }
    }

    console.log('All files copied successfully.');
  } catch (error) {
    console.error('Error copying files:', error);
  }
}

async function customAllDonePlugin() {
  const sourceDir = './dist/static/'; // Replace with your source directory
  await copyFilesToSubfolders(sourceDir);
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);