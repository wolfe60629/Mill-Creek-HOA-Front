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

    // Filter out only files from the list of items
    const files = items.filter(async item => {
      const itemPath = path.join(sourceDir, item);
      const stats = await fs.stat(itemPath);
      return stats.isFile();
    });

    // Iterate over each file in the source directory
    for (const file of files) {
      // Skip the index.html file
      if (file === 'index.html') {
        continue;
      }

      // Iterate over each subdirectory in the source directory
      for (const subDir of items) {
        const subDirPath = path.join(sourceDir, subDir);

        // Ensure that the item is a directory
        const stats = await fs.stat(subDirPath);
        if (stats.isDirectory()) {
          const sourcePath = path.join(sourceDir, file);
          const destinationPath = path.join(subDirPath, file);

          try {
            // Copy the file from the source path to the destination path
            await fs.copy(sourcePath, destinationPath);
            console.log(`Copied ${file} to ${destinationPath} successfully.`);
          } catch (error) {
            console.error(`Error copying ${file}:`, error);
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