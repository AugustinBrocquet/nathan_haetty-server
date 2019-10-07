export class CreateMessageDto {
    readonly fullname: string;
    readonly email: string;
    readonly phone: string;
    readonly content: string;
    pictures?: string[];
}
