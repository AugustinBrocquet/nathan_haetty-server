import {
    Controller,
    Get,
    Post,
    UseInterceptors,
    UploadedFile,
    UploadedFiles,
    Res,
    Param,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter, csvFileFilter, pdfFileFilter, excelFileFilter } from './utils/file-upload.utils';

@Controller('upload')
export class UploadController {

    private arrayBuffer: any;

    constructor() { }

    @Post('image')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }

    @Post('images')
    @UseInterceptors(
        FilesInterceptor('images', 20, {
            storage: diskStorage({
                destination: './resources/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadMultipleFiles(@UploadedFiles() files) {
        const response = [];
        files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                filename: file.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Post('csv')
    @UseInterceptors(
        FileInterceptor('csv', {
            storage: diskStorage({
                destination: './resources/csv',
                filename: editFileName,
            }),
            fileFilter: csvFileFilter,
        }),
    )
    async uploadedCsv(@UploadedFile() csv) {

        const response = {
            originalname: csv.originalname,
            filename: csv.filename,
        };
        return response;
    }

    @Post('csvS')
    @UseInterceptors(
        FilesInterceptor('csvS', 20, {
            storage: diskStorage({
                destination: './resources/csv',
                filename: editFileName,
            }),
            fileFilter: csvFileFilter,
        }),
    )
    async uploadCsvS(@UploadedFiles() csvS) {
        const response = [];
        csvS.forEach(csv => {
            const fileReponse = {
                originalname: csv.originalname,
                filename: csv.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }


    @Post('pdf')
    @UseInterceptors(
        FileInterceptor('pdf', {
            storage: diskStorage({
                destination: './resources/pdf',
                filename: editFileName,
            }),
            fileFilter: pdfFileFilter,
        }),
    )
    async uploadedPdf(@UploadedFile() pdf) {

        const response = {
            originalname: pdf.originalname,
            filename: pdf.filename,
        };
        return response;
    }

    @Post('pdfS')
    @UseInterceptors(
        FilesInterceptor('pdfS', 20, {
            storage: diskStorage({
                destination: './resources/pdf',
                filename: editFileName,
            }),
            fileFilter: pdfFileFilter,
        }),
    )
    async uploadPdfS(@UploadedFiles() pdfS) {
        const response = [];
        pdfS.forEach(pdf => {
            const fileReponse = {
                originalname: pdf.originalname,
                filename: pdf.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

    @Post('xlsx')
    @UseInterceptors(
        FileInterceptor('xlsx', {
            storage: diskStorage({
                destination: './resources/xlsx',
                filename: editFileName,
            }),
            fileFilter: excelFileFilter,
        }),
    )
    async uploadedXlsx(@UploadedFile() xlsx) {

        const response = {
            originalname: xlsx.originalname,
            filename: xlsx.filename,
        };
        return response;
    }

    @Post('xlsxS')
    @UseInterceptors(
        FilesInterceptor('xlsxS', 20, {
            storage: diskStorage({
                destination: './resources/xlsx',
                filename: editFileName,
            }),
            fileFilter: excelFileFilter,
        }),
    )
    async uploadXlsxS(@UploadedFiles() xlsxS) {
        const response = [];
        xlsxS.forEach(xlsx => {
            const fileReponse = {
                originalname: xlsx.originalname,
                filename: xlsx.filename,
            };
            response.push(fileReponse);
        });
        return response;
    }

}
