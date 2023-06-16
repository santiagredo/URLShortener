// @ts-check
import fs from "fs";
import path from "path";

function deleteDist (dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach((file) => {
            const filePath = path.join(dirPath, file);

            if (fs.lstatSync(filePath).isDirectory()) {
                deleteDist(filePath);
            } else {
                fs.unlinkSync(filePath);
            };
        });

        fs.rmdirSync(dirPath);
    };
};

const outDirPath = "../dist";
deleteDist(outDirPath);