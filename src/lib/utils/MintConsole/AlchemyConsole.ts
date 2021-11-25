import { MintContract } from "./MintContract/MintContract";
import { MintStore } from "$lib/utils/Store";

export const alchemyConsole = new class AlchemyConsole
{
    private window: any;

    private mintContract: MintContract;

    constructor()
    {
        this.mintContract = new MintContract();
    }

    async init(window: any): Promise<boolean>
    {
        this.window = window;
        await this.mintContract.init(this.window, "alchemy");
        
        return true;
    }

    async isSaleInPprogess(): Promise<boolean> {
        const stopped = await this.mintContract.saleStopped();
        return stopped;
    }

    async updateAvailable(): Promise<boolean>
    {
        try {
            const count = await this.mintContract.availableForMint();
            this.updateStore("ethAvailable", count.left);
            this.updateStore("dustAvailable", count.dust);
            this.updateStore("nctAvailable", count.nct);
            this.updateStore("whaleAvailable", count.whale);
            this.updateStore("artblockAvailable", count.artblock);
            this.updateStore("boxAvailable", count.box);
            return true;
        } catch (e) {
        }
    }

    private updateStore(key: string, val: any) {
        MintStore.update(v => {
            v[key] = val;
            return v;
        });
    }
}