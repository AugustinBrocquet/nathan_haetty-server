import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import Instagram from 'node-instagram';

@Controller('instagram')
export class InstagramController {

    private instagram: Instagram;

    constructor() {
        // Create a new instance.
        this.instagram = new Instagram({
            clientId: '5ebf70a29ef74bf6a87882cd8f5e68a1',
            clientSecret: '703aae9e3fe04a2eaf078280d303d236',
            accessToken: '1176616020.5ebf70a.7c1e2e024e714a48a9a13a111e61eaa3',
        });

    }

    @Get('selfuser')
    // @UseGuards(AuthGuard())
    async getUserInformation() {
        return await this.instagram.get('users/self');
    }

    @Get('images')
    // @UseGFuards(AuthGuard())
    async getRecentImages() {
        return await this.instagram.get('users/self/media/recent');
    }

}
