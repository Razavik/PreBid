export interface Role {
    code: string;
    title: string;
}

export interface ApiUserResponse {
    role: {
        code: string;
        title: string;
    };
    user: {
        email: string;
        id: number;
    };
    client: {
        name_ru: string;
        second_name_ru: string;
    };
}

export interface Client {
    id: number;
    email: string;
    name_ru: string;
    second_name_ru: string;
    role: Role | null;
}
