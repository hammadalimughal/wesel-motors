const fs = require('fs');
const path = require('path');
const Letter = require('./schema/Letter');
require('./db'); // Ensure you have a connection to your database

const baseDir = path.join(__dirname, 'views', 'uploads', 'images', 'color-letters'); // Adjust this path

const isImage = (filename) => /\.(jpg|jpeg|png|gif|webp)$/i.test(filename);

const bulkUpload = async (baseDir) => {
    const letters = fs.readdirSync(baseDir, { withFileTypes: true })
    for (let ind = 0; ind < letters.length; ind++) {
        const dirent = letters[ind];
        if (dirent.isDirectory()) {
            let object = {}
            const folderName = dirent.name;
            object.letter = folderName;
            // object.letterType = 'sepia'
            object.letterType = 'color'
            object.images = []
            const folderPath = path.join(baseDir, folderName);
            const files = fs.readdirSync(folderPath).filter(isImage);

            // Second pass: Rename to final sequential names
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const imagePath = path.join(folderPath, file);
                const imageName = path.basename(imagePath);
                // console.log('oldPath', folderName, ' ', imageName)
                object.images.push(`/uploads/images/color-letters/${folderName}/${imageName}`);
            }
            await Letter.create(object);
            console.log(`folderName:${folderName} images:${object.images.length} uploaded`);
        }
    }
    console.log('✅ Uploading complete.');
}

bulkUpload(baseDir)