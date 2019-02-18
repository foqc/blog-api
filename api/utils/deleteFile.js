import fs from 'fs';

const deleteFile = (folderPath) => {
    fs.unlink(folderPath, (err) => {
        if (err) console.log(err);
    });
};

export default deleteFile;