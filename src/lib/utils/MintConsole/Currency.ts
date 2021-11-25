export interface Currency {
    checkAllowance(): Promise<number>;

    makeApprove(): Promise<boolean>;

    makeMint(): Promise<boolean>;
}