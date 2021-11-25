import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { NFTBoxesContract } from "./MintContract/NFTBoxesContract";
import type { MintContract } from "./MintContract/MintContract";

export class BoxToken extends BaseCurrency implements Currency {
    private mintContract: MintContract;
    private boxContract: NFTBoxesContract;

    constructor(contract: MintContract, box: NFTBoxesContract) {
        super();
        this.mintContract = contract;
        this.boxContract = box;
    }

    async checkAllowance(): Promise<number> {
        this.validateWalletAddress();
        const isAllowed = await this.boxContract.isApprovedForAll(this.walletAddress);
        this.allowance = isAllowed ? 1 : 0;
        return this.allowance;
    }

    async makeApprove(): Promise<boolean> {
        this.validateWalletAddress();
        await this.boxContract.setApprovalForAll(this.walletAddress);
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validateNftList();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForNFTBoxesWhitelist(this.walletAddress, this.nftList, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForNFTBoxes(this.walletAddress, this.nftList);
        }

        return true;
    }
}