import { getWhaleContract, getWhaleContractAddress, getWhaleDecimals } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ERC20Contract } from "./ERC20Contract";

export class WhaleContract extends ERC20Contract implements Contract
{
    async init(window: any): Promise<boolean> {
        this.getStore();
        this.decimals = getWhaleDecimals();

        if (null === this.store.whaleContract) {
            this.updateStore("whaleContract", getWhaleContract(window));
            this.store.whaleContract.setProvider(window.ethereum);
        }

        if (null === this.store.whaleInstance) {
            this.updateStore("whaleInstance", await this.store.whaleContract.at(getWhaleContractAddress()));
        }

        this.instance = this.store.whaleInstance;

        return true;
    }
}