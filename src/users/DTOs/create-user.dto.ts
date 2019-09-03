export class CreateUserDto {
    readonly username: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly email: string;
    readonly password: string;
    readonly reset_password_token?: String;
    readonly reset_password_expires?: Date;
    readonly created_at: Date;
    readonly updated_at?: Date;
}
