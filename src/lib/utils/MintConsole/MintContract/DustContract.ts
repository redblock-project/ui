import { getDustContract, getDustContractAddress, getDustDecimals } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ERC20Contract } from "./ERC20Contract";

export class DustContract extends ERC20Contract implements Contract
{
    async init(window: any): Promise<boolean> {
        this.getStore();
        this.decimals = getDustDecimals();

        if (null === this.store.dustContract) {
            this.updateStore("dustContract", getDustContract(window));
            this.store.dustContract.setProvider(window.ethereum);
        }

        if (null === this.store.dustInstance) {
            this.updateStore("dustInstance", await this.store.dustContract.at(getDustContractAddress()));
        }

        this.instance = this.store.dustInstance;

        return true;
    }
}