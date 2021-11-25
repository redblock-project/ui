import { get } from "svelte/store";
import { MintStore } from "$lib/utils/Store";
import type { Contract } from "./Contract";

export abstract class ContractStore implements Contract
{
    protected store: {
        mintContract: any,
        mintInstance: any,
        mintContractAlchemy: any,
        mintInstanceAlchemy: any,
        dustContract: any,
        dustInstance: any,
        nctContract: any,
        nctInstance: any,
        whaleContract: any,
        whaleInstance: any,
        artblockContract: any,
        artblockInstance: any,
        nftboxesContract: any,
        nftboxesInstance: any,
        mintSucceed: any,
        mintedCount: any,
        maxAmount: any,
    };

    protected instance: any;

    init(window: any): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    address(): string {
        throw new Error("Method not implemented.");
    }
    
    protected getStore() {
        this.store = get(MintStore);
    }

    protected updateStore(key: string, val: any) {
        MintStore.update(v => {
            v[key] = val;
            return v;
        });
        this.getStore();
    }
}