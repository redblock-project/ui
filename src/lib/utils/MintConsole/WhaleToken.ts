import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { WhaleContract } from "./MintContract/WhaleContract";
import type { MintContract } from "./MintContract/MintContract";

export class WhaleToken extends BaseCurrency implements Currency {
    private mintContract: MintContract;
    private whaleContract: WhaleContract;

    constructor(contract: MintContract, whale: WhaleContract) {
        super();
        this.mintContract = contract;
        this.whaleContract = whale;
    }

    async checkAllowance(): Promise<number> {
        this.validateWalletAddress();
        this.allowance = await this.whaleContract.allowance(this.walletAddress);
        return this.allowance;
    }

    async makeApprove(): Promise<boolean> {
        this.validateWalletAddress();
        this.validatePrice();
        await this.whaleContract.approve(this.walletAddress, this.price);
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validateRedblockAmount();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForWhaleWhitelist(this.walletAddress, this.redblocksAmount, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForWHALE(this.walletAddress, this.redblocksAmount);
        }

        return true;
    }
}