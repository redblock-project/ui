import type { Currency } from "./Currency";

export abstract class BaseCurrency implements Currency
{
    protected walletAddress: string;
    protected walletReserve: number;
    protected walletLeaf: string;
    protected walletProof: string[];
    protected price: number;
    protected redblocksAmount: number;
    protected isWhitelistInProgress: boolean;
    protected nftList: number[];

    protected allowance: number;
    protected maxAmount: number;

    getAllowance(): number {
        return this.allowance;
    }

    setWalletAddress(address: string): void {
        this.walletAddress = address;
    }

    setWalletReserve(reserve: number): void {
        this.walletReserve = reserve;
    }

    setWalletLeaf(leaf: string): void {
        this.walletLeaf = leaf;
    }

    setWalletProof(proof: string[]): void {
        this.walletProof = proof;
    }

    setPrice(price: number): void {
        this.price = price;
    }

    setRedblockAmount(count: number): void {
        this.redblocksAmount = count;
    }

    enableWhitelist(): void {
        this.isWhitelistInProgress = true;
    }

    disableWhitelist(): void {
        this.isWhitelistInProgress = false;
    }

    setNftList(ids: number[]): void {
        this.nftList = ids;
    }

    checkMaxCount(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    checkAllowance(): Promise<number> {
        throw new Error("Method not implemented.");
    }

    makeApprove(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    makeMint(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    protected validateWalletAddress(): void
    {
        const key = "wallet address";
        this.validate(key, this.walletAddress);
        this.validateLength(key, this.walletAddress);
    }

    protected validateWalletReserve(): void
    {
        const key = "wallet reserve";
        this.validate(key, this.walletReserve);
        //this.validateZero(key, this.walletReserve);
    }

    protected validateWalletLeaf(): void
    {
        const key = "wallet leaf";
        this.validate(key, this.walletLeaf);
        //this.validateLength(key, this.setWalletLeaf);
    }

    protected validateWalletProof(): void
    {
        const key = "wallet proof";
        this.validate(key, this.walletProof);
        //this.validateLength(key, this.walletProof);
    }

    protected validatePrice(): void
    {
        const key = "price";
        this.validate(key, this.price);
        this.validateZero(key, this.price);
    }

    protected validateRedblockAmount(): void
    {
        const key = "redblock amount";
        this.validate(key, this.redblocksAmount);
        this.validateZero(key, this.redblocksAmount);
    }

    protected validateNftList(): void
    {
        const key = "nft list";
        this.validate(key, this.nftList);
        this.validateLength(key, this.nftList);
    }

    private validate(key: string, val: any): void
    {
        if (undefined === val || null === val) {
            throw new Error(`undefined ${key} value`);
        }
    }

    private validateZero(key: string, val: any): void {
        if (0 === +val) {
            throw new Error(`${key} must be not empty`);
        }
    }

    private validateLength(key: string, val: any): void {
        if (1 > val.length) {
            throw new Error(`${key} must be not empty`);
        }
    }
}