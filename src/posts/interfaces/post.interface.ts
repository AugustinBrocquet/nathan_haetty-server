export interface Post {
    title: string;
    description: string;
    picture: Blob;
    sub_pictures: Blob;
    created_at: Date;
    updated_at?: Date;
}
