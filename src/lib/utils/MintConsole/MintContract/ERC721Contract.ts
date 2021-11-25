import { getMintContractAddress } from "$lib/utils/abi";
import type { Contract } from "./Contract";
import { ContractStore } from "./ContractStore";

export abstract class ERC721Contract extends ContractStore implements Contract {
    async balanceOf(address: string): Promise<number> {
        const balance = await this.instance.balanceOf(address);
        return balance.toNumber();
    }

    async tokenOfOwnerByIndex(address: string, index: number): Promise<number> {
        const id = await this.instance.tokenOfOwnerByIndex(address, index);
        return id.toNumber();
    }

    async tokenURI(id: number): Promise<string> {
        const uri = await this.instance.tokenURI(id);
        return uri.toString();
    }

    async setApprovalForAll(address: string): Promise<boolean> {
        await this.instance.setApprovalForAll(getMintContractAddress(), true, { from: address });
        return true;
    }

    async isApprovedForAll(address: string): Promise<boolean> {
        return await this.instance.isApprovedForAll(address, getMintContractAddress());
    }
}