import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { DustContract } from "./MintContract/DustContract";
import type { MintContract } from "./MintContract/MintContract";

export class DustToken extends BaseCurrency implements Currency {
    private mintContract: MintContract;
    private dustContract: DustContract;

    constructor(contract: MintContract, dust: DustContract) {
        super();
        this.mintContract = contract;
        this.dustContract = dust;
    }

    async checkAllowance(): Promise<number> {
        this.validateWalletAddress();
        this.allowance = await this.dustContract.allowance(this.walletAddress);
        return this.allowance;
    }

    async makeApprove(): Promise<boolean> {
        this.validateWalletAddress();
        this.validatePrice();
        await this.dustContract.approve(this.walletAddress, this.price);
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validateRedblockAmount();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForDUSTWhitelist(this.walletAddress, this.redblocksAmount, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForDUST(this.walletAddress, this.redblocksAmount);
        }

        return true;
    }
}