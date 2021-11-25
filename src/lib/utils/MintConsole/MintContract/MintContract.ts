import { getDustDecimals, getEthDecimals, getMintContract, getMintContractAddress, getNctDecimals, getWhaleDecimals } from "$lib/utils/abi";
import { delay, divide, mutiply } from "$lib/utils/utils";
import type { Contract } from "./Contract";
import { ERC721Contract } from "./ERC721Contract";

export class MintContract extends ERC721Contract implements Contract  {
    async init(window: any, alchemy: string = ""): Promise<boolean> {
        this.getStore();

        if ("" === alchemy) {
            if (null === this.store.mintContract) {
                this.updateStore("mintContract", getMintContract(window));
                this.store.mintContract.setProvider(window.ethereum);
            }
    
            if (null === this.store.mintInstance) {
                await delay(1e3);
                this.updateStore("mintInstance", await this.store.mintContract.at(getMintContractAddress()));
            }
    
            this.instance = this.store.mintInstance;
    
            return true;
        } else {
            if (null === this.store.mintContractAlchemy) {
                this.updateStore("mintContractAlchemy", getMintContract(window));
                if (undefined !== window.ethereum && '0x4' === window.ethereum.chainId) {
                    this.store.mintContractAlchemy.setProvider('https://eth-rin' + 'keby.alc' + 'hemyapi.io/v2/SmIHdUwCz_B_v0DZ8xwYm1p_fpEi3XkY');
                } else {
                    this.store.mintContractAlchemy.setProvider('https://eth-mai' + 'nnet.alc' + 'hemyapi.io/v2/ngeaOsBJ00Wv0kBcFRgt9xjS1AhxTODC');
                }
                
            }
    
            if (null === this.store.mintInstanceAlchemy) {
                this.updateStore("mintInstanceAlchemy", await this.store.mintContractAlchemy.at(getMintContractAddress()));
            }
    
            this.instance = this.store.mintInstanceAlchemy;
    
            return true;
        }
    }

    address(): string {
        return getMintContractAddress();
    }

    async pricePerTokenETH(): Promise<number> {
        let price = await this.instance.pricePerTokenETH();
        price = divide(price, getEthDecimals());
        return +price;
    }

    async pricePerTokenDUST(): Promise<number> {
        let price = await this.instance.pricePerTokenDUST();
        price = divide(price, getDustDecimals());
        return +price;
    }

    async pricePerTokenNCT(): Promise<number> {
        let price = await this.instance.pricePerTokenNCT();
        price = divide(price, getNctDecimals());
        return +price;
    }

    async pricePerTokenWHALE(): Promise<number> {
        let price = await this.instance.pricePerTokenWHALE();
        price = divide(price, getWhaleDecimals());
        return +price;
    }

    async mintForETH(address: string, value: number, amount: number): Promise<boolean> {
        value = mutiply(value, getEthDecimals());
        await this.instance.mintForETH(amount, { value, from: address });
        return true;
    }

    async mintForETHWhitelist(address: string, value: number, amount: number, cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        value = mutiply(value, getEthDecimals());
        await this.instance.mintForETHWhitelist(amount, cnt, leaf, proof, { value, from: address });
        return true;
    }

    async mintForDUST(address: string, amount: number): Promise<boolean> {
        await this.instance.mintForDUST(amount, { from: address });
        return true;
    }

    async mintForDUSTWhitelist(address: string, amount: number, cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        await this.instance.mintForDUSTWhitelist(amount, cnt, leaf, proof, { from: address });
        return true;
    }

    async mintForNCT(address: string, amount: number): Promise<boolean> {
        await this.instance.mintForNCT(amount, { from: address });
        return true;
    }

    async mintForNCTWhitelist(address: string, amount: number, cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        await this.instance.mintForNCTWhitelist(amount, cnt, leaf, proof, { from: address });
        return true;
    }

    async mintForWHALE(address: string, amount: number): Promise<boolean> {
        await this.instance.mintForWHALE(amount, { from: address });
        return true;
    }

    async mintForWhaleWhitelist(address: string, amount: number, cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        await this.instance.mintForWhaleWhitelist(amount, cnt, leaf, proof, { from: address });
        return true;
    }

    async mintForArtblocks(address: string, tokens: number[]): Promise<boolean> {
        await this.instance.mintForArtblocks(tokens, { from: address });
        return true;
    }

    async mintForArtblocksWhitelist(address: string, tokens: number[], cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        await this.instance.mintForArtblocksWhitelist(tokens, cnt, leaf, proof, { from: address });
        return true;
    }

    async mintForNFTBoxes(address: string, tokens: number[]): Promise<boolean> {
        await this.instance.mintForNFTBoxes(tokens, { from: address });
        return true;
    }

    async isInDefaultWhitelist(address: string): Promise<boolean> {
        return await this.instance.isInDefaultWhitelist(address);
    }

    async mintForNFTBoxesWhitelist(address: string, tokens: number[], cnt: number, leaf: string, proof: string[]): Promise<boolean> {
        await this.instance.mintForNFTBoxesWhitelist(tokens, cnt, leaf, proof, { from: address });
        return true;
    }

    async howManyICanMint(address: string): Promise<{ eth: number, nct: number, dust: number, whale: number, box: number, artblock: number }> {
        const count = await this.instance.howManyICanMint(address);
        return {
            eth: count[0],
            nct: count[1],
            dust: count[2],
            whale: count[3],
            box: count[4],
            artblock: count[5],
        };
    }

    async howManyICanMintWhitelist(address: string, cnt: number): Promise<{ eth: number, nct: number, dust: number, whale: number, box: number, artblock: number }> {
        const count = await this.instance.howManyICanMintWhitelist(address, cnt);
        return {
            eth: count[0],
            nct: count[1],
            dust: count[2],
            whale: count[3],
            box: count[4],
            artblock: count[5],
        };
    }

    async availableForMint(): Promise<{ left: number, nct: number, dust: number, whale: number, box: number, artblock: number }> {
        const count = await this.instance.availableForMint();
        return {
            left: 9917 - count[0],
            nct: 100 - count[1],
            dust: 100 - count[2],
            whale: 100 - count[3],
            box: 100 - count[4],
            artblock: 100 - count[5],
        };
    }

    async isWhitelistEnded(): Promise<boolean> {
        const val = await this.instance.isWhitelistEnded();
        return val;
    }

    async saleStopped(): Promise<boolean> {
        const val = await this.instance.saleStopped();
        return val;
    }

    async whitelistEndBlock(): Promise<number> {
        const val = await this.instance.whitelistEndBlock();
        return +val;
    }
}