import { BaseCurrency } from "./BaseCurrency";
import type { Currency } from "./Currency";
import type { ArtblockContract } from "./MintContract/ArtblockContract";
import type { MintContract } from "./MintContract/MintContract";

export class ArtblockToken extends BaseCurrency implements Currency {
    private mintContract: MintContract;
    private artblockContract: ArtblockContract;

    constructor(contract: MintContract, artblock: ArtblockContract) {
        super();
        this.mintContract = contract;
        this.artblockContract = artblock;
    }

    async checkAllowance(): Promise<number> {
        this.validateWalletAddress();
        const isAllowed = await this.artblockContract.isApprovedForAll(this.walletAddress);
        console.log(isAllowed);
        this.allowance = isAllowed ? 1 : 0;
        return this.allowance;
    }

    async makeApprove(): Promise<boolean> {
        this.validateWalletAddress();
        await this.artblockContract.setApprovalForAll(this.walletAddress);
        return true;
    }

    async makeMint(): Promise<boolean> {
        this.validateWalletAddress();
        this.validateNftList();

        if (this.isWhitelistInProgress) {
            this.validateWalletReserve();
            this.validateWalletLeaf();
            this.validateWalletProof();
            await this.mintContract.mintForArtblocksWhitelist(this.walletAddress, this.nftList, this.walletReserve, this.walletLeaf, this.walletProof);
        } else {
            await this.mintContract.mintForArtblocks(this.walletAddress, this.nftList);
        }

        return true;
    }
}