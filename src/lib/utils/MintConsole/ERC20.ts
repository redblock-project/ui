export interface ERC20 {
    checkAllowance(): Promise<number | boolean>;

    approve(amount: number): Promise<boolean>;
}