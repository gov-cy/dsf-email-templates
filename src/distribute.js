const fs = require('fs-extra');

(async function() {
    try {
        // Delete dist folder
        console.log(`## Deleting built folder`);
        const folderPath = './dist';
        await fs.rm(folderPath, { recursive: true, force: true });
        console.log(`Folder ${folderPath} has been deleted successfully.`);

        // Create empty dist folder
        console.log(`## Create dist folder`);
        await fs.mkdir(folderPath);
        console.log(`Folder ${folderPath} has been created successfully.`);

        // Copy contents of src/njk to dist
        console.log(`## Copying contents of src/njk to dist`);
        const sourceDir = './src/njk';
        await fs.copy(sourceDir, folderPath);
        console.log(`Contents of ${sourceDir} copied successfully to ${folderPath}`);
    } catch (error) {
        console.error(error);
    }
})();
