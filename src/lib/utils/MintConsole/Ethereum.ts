import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { MintContract } from "./MintContract/MintContract";

export class Ethereum extends BaseCurrency implements Currency {
    private mintContract: MintContract;

    constructor(contract: MintContract) {
        super();
        this.mintContract = contract;
    }

    async checkAllowance(): Promise<number> {
        return 1;
    }

    async makeApprove(): Promise<boolean> {
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validatePrice();
        this.validateRedblockAmount();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForETHWhitelist(this.walletAddress, this.price, this.redblocksAmount, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForETH(this.walletAddress, this.price, this.redblocksAmount);
        }

        return true;
    }

    
}