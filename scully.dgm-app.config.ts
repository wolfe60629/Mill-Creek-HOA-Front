import {registerPlugin, ScullyConfig} from '@scullyio/scully';


/** this loads the default render plugin, remove when switching to something else. */
import '@scullyio/scully-plugin-puppeteer'
import * as fs from "fs-extra";

export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "dgm-app",
  // add spsModulePath when using de Scully Platform Server,
  outDir: './dist/static',
  routes: {
  },
  extraRoutes: [ '/documents' ]
};


async function copyScriptFile() {
  try {
    // Source and destination paths for the script file
    const sourcePath = './dist/static/scripts.4db5fb272383bd6a.js';
    const destinationPath = './dist/static/documents/scripts.4db5fb272383bd6a.js';

    // Copy the script file from the source path to the destination path
    await fs.copy(sourcePath, destinationPath);

    console.log('Script file copied successfully.');
  } catch (error) {
    console.error('Error copying script file:', error);
  }
}

async function customAllDonePlugin() {
  // Call the function to copy the script file
  await copyScriptFile();
}

const validator = async () => [];
registerPlugin('allDone', 'customAllDonePlugin', customAllDonePlugin, validator);
