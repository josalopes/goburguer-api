import * as fs from 'fs';
import * as path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const oldFilename = path.resolve(uploadConfig.tmpFolder, file);
    const newFilename = path.resolve(uploadConfig.uploadsFolder, file);

    await fs.promises.rename(oldFilename, newFilename);
    const newFile = `${uploadConfig.uploadsFolder}/${file}`;
    return newFile;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
