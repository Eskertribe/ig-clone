import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Controller('v1/files')
export class FileController {
  @Get(':filename')
  @UseGuards(AuthGuard('jwt'))
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    if (!filename) {
      return res.status(400).send('Filename is required');
    }

    try {
      const filePath = join(__dirname, '..', '..', 'uploads', filename);
      const fileBuffer = await readFile(filePath);

      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      });

      return res.send(fileBuffer);
    } catch (error) {
      console.error('Error reading file:', error);
      res.status(404).send('File not found');
    }
  }
}
