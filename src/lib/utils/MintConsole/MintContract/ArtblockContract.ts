import { getArtblockContract, getArtblockContractAddress } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ERC721Contract } from "./ERC721Contract";

export class ArtblockContract extends ERC721Contract implements Contract
{
    async init(window: any): Promise<boolean> {
        this.getStore();

        if (null === this.store.artblockContract) {
            this.updateStore("artblockContract", getArtblockContract(window));
            this.store.artblockContract.setProvider(window.ethereum);
        }

        if (null === this.store.artblockInstance) {
            this.updateStore("artblockInstance", await this.store.artblockContract.at(getArtblockContractAddress()));
        }

        this.instance = this.store.artblockInstance;

        return true;
    }
}