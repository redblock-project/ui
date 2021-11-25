import { getMintContractAddress } from "$lib/utils/abi";
import { divide, mutiply } from "$lib/utils/utils";
import type { Contract } from "./Contract";
import { ContractStore } from "./ContractStore";

export abstract class ERC20Contract extends ContractStore implements Contract 
{
    protected decimals: number;

    async approve(address: string, amount: number): Promise<boolean> {
        amount = mutiply(amount, this.decimals);
        await this.instance.approve(getMintContractAddress(), amount.toString(), { from: address });
        return true;
    }

    async allowance(address: string): Promise<number> {
        let amount = await this.instance.allowance(address, getMintContractAddress());
        amount = divide(amount, this.decimals);
        return +amount;
    }
}