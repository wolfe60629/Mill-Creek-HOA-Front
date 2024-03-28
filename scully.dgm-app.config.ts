import {registerPlugin, ScullyConfig} from '@scullyio/scully';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'
import * as fs from "fs-extra";
import * as path from "path";

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "dgm-app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
  },
  extraRoutes: [ '/documents' ]
};


async function copyFilesToSubfolders(sourceDir) {
  try {
    // Ensure that the source directory exists
    if (!(await fs.exists(sourceDir))) {
      throw new Error(`Source directory '${sourceDir}' does not exist.`);
    }

    // Get a list of all subdirectories in the source directory
    const subDirs = await fs.readdir(sourceDir);

    // Iterate over each subdirectory
    for (const subDir of subDirs) {
      const subDirPath = path.join(sourceDir, subDir);

      // Ensure that the item is a directory
      if ((await fs.stat(subDirPath)).isDirectory()) {
        // Get a list of all files in the source directory excluding index.html
        const files = (await fs.readdir(sourceDir)).filter(file => file !== 'index.html');

        // Iterate over each file in the source directory
        for (const file of files) {
          const sourcePath = path.join(sourceDir, file);
          const destinationPath = path.join(subDirPath, file);

          // Copy the file from the source path to the destination path
          await fs.copy(sourcePath, destinationPath);
          console.log(`Copied ${file} to ${destinationPath} successfully.`);
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
