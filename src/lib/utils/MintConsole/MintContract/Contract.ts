export interface Contract {
    init(window: any): Promise<boolean>;

    address(): string;
}