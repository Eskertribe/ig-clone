import { readFile } from 'fs/promises';
import { join } from 'path';

export const imageToStringBuffer = async (imageName: string, mimeType: string): Promise<string> => {
  const filePath = join(__dirname, '..', '..', 'uploads', imageName);
  const imageBuffer = await readFile(filePath);
  const stringBuffer = imageBuffer.toString('base64');

  return `data:${mimeType};base64,${stringBuffer}`;
};
