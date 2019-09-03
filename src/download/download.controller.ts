import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('download')
export class DownloadController {

    @Get('image/:image_path')
    getImage(@Param('image_path') image, @Res() res) {
        return res.sendFile(image, { root: './resources/img' });
    }

    @Get('csv/:csv_path')
    getCsv(@Param('csv_path') image, @Res() res) {
        return res.sendFile(image, { root: './resources/csv' });
    }

    @Get('xlsx/:xlsx_path')
    getXlsx(@Param('xlsx_path') image, @Res() res) {
        return res.sendFile(image, { root: './resources/xlsx' });
    }

    @Get('csv/:pdf_path')
    getPdf(@Param('pdf_path') image, @Res() res) {
        return res.sendFile(image, { root: './resources/pdf' });
    }

}
