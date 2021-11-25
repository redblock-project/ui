import { MintContract } from "./MintContract/MintContract";

export const walletConsole = new class WalletConsole
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
        await this.mintContract.init(this.window);
        
        return true;
    }

    async getNftList(address: string): Promise<{id: number, src: string, selected: boolean}[]> {
        let list = [];
        const balance = await this.mintContract.balanceOf(address);
        for (let i = 0; i < balance; i++) {
            const id = await this.mintContract.tokenOfOwnerByIndex(address, i);
            const uri = await this.mintContract.tokenURI(id);
            const response = await fetch(uri, { mode: 'cors' });
            const src = await response.json();
            list = [...list, { id, src: src.image.replace("ipfs://", "https://redblock.mypinata.cloud/ipfs/") }];
        }
        return list;
    }
}