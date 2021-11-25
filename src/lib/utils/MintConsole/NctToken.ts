import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { NctContract } from "./MintContract/NctContract";
import type { MintContract } from "./MintContract/MintContract";

export class NctToken extends BaseCurrency implements Currency {
    private mintContract: MintContract;
    private nctContract: NctContract;

    constructor(contract: MintContract, nct: NctContract) {
        super();
        this.mintContract = contract;
        this.nctContract = nct;
    }

    async checkAllowance(): Promise<number> {
        this.validateWalletAddress();
        this.allowance = await this.nctContract.allowance(this.walletAddress);
        return this.allowance;
    }

    async makeApprove(): Promise<boolean> {
        this.validateWalletAddress();
        this.validatePrice();
        await this.nctContract.approve(this.walletAddress, this.price);
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validateRedblockAmount();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForNCTWhitelist(this.walletAddress, this.redblocksAmount, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForNCT(this.walletAddress, this.redblocksAmount);
        }

        return true;
    }
}