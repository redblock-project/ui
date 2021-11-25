import { getNctContract, getNctContractAddress, getNctDecimals } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ERC20Contract } from "./ERC20Contract";

export class NctContract extends ERC20Contract implements Contract
{
    async init(window: any): Promise<boolean> {
        this.getStore();
        this.decimals = getNctDecimals();

        if (null === this.store.nctContract) {
            this.updateStore("nctContract", getNctContract(window));
            this.store.nctContract.setProvider(window.ethereum);
        }

        if (null === this.store.nctInstance) {
            this.updateStore("nctInstance", await this.store.nctContract.at(getNctContractAddress()));
        }

        this.instance = this.store.nctInstance;

        return true;
    }
}