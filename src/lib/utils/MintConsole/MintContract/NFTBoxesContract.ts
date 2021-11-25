import { getNFTBoxesContract, getNFTBoxesContractAddress } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ERC721Contract } from "./ERC721Contract";

export class NFTBoxesContract extends ERC721Contract implements Contract
{
    async init(window: any): Promise<boolean> {
        this.getStore();

        if (null === this.store.nftboxesContract) {
            this.updateStore("nftboxesContract", getNFTBoxesContract(window));
            this.store.nftboxesContract.setProvider(window.ethereum);
        }

        if (null === this.store.nftboxesInstance) {
            this.updateStore("nftboxesInstance", await this.store.nftboxesContract.at(getNFTBoxesContractAddress()));
        }

        this.instance = this.store.nftboxesInstance;

        return true;
    }
}