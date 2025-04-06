import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';

@Controller('files')
export class FileController {
  @Get(':filename')
  @UseGuards(AuthGuard('jwt'))
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..', '..', 'uploads', filename);
    return res.sendFile(filePath);
  }
}
