import { get } from "svelte/store";
import { AppStore, MintStore } from "$lib/utils/Store";
import { Ethereum } from "./Ethereum";
import { ArtblockContract } from "./MintContract/ArtblockContract";
import { DustContract } from "./MintContract/DustContract";
import { MintContract } from "./MintContract/MintContract";
import { NctContract } from "./MintContract/NctContract";
import { NFTBoxesContract } from "./MintContract/NFTBoxesContract";
import { WhaleContract } from "./MintContract/WhaleContract";
import { getWhiteList } from "../abi";
import type { BaseCurrency } from "./BaseCurrency";
import { DustToken } from "./DustToken";
import { WhaleToken } from "./WhaleToken";
import { NctToken } from "./NctToken";
import { delay } from "../utils";
import { ArtblockToken } from "./ArtblockToken";
import { BoxToken } from "./BoxToken";

export const mintConsole = new class MintConsole
{
    private window: any;

    private mintContract: MintContract;
    private dustContract: DustContract;
    private nctContract: NctContract;
    private whaleContract: WhaleContract;
    private artblockContract: ArtblockContract;
    private nftBoxContract: NFTBoxesContract;

    private currencyList: { [key: string]: BaseCurrency };
    private currency: string;

    private isSaleInPprogess: boolean;
    private isWhitelistSaleInProgess: boolean;
    private walletAddress: string;

    private timer: any;

    constructor()
    {
        this.mintContract = new MintContract();
        this.dustContract = new DustContract();
        this.nctContract = new NctContract();
        this.whaleContract = new WhaleContract();
        this.artblockContract = new ArtblockContract();
        this.nftBoxContract = new NFTBoxesContract();

        this.currencyList = {};
        this.currencyList["eth"] = new Ethereum(this.mintContract);
        this.currencyList["dust"] = new DustToken(this.mintContract, this.dustContract);
        this.currencyList["whale"] = new WhaleToken(this.mintContract, this.whaleContract);
        this.currencyList["nct"] = new NctToken(this.mintContract, this.nctContract);
        this.currencyList["artblock"] = new ArtblockToken(this.mintContract, this.artblockContract);
        this.currencyList["box"] = new BoxToken(this.mintContract, this.nftBoxContract);

        this.currency = "eth";

        this.timer = null;
    }

    async init(window: any): Promise<boolean>
    {
        this.window = window;
        await this.mintContract.init(this.window);
        await this.dustContract.init(this.window);
        await this.nctContract.init(this.window);
        await this.whaleContract.init(this.window);
        await this.artblockContract.init(this.window);
        await this.nftBoxContract.init(this.window);
        
        return true;
    }

    async isMintStarted(): Promise<boolean>
    {
        try {
            const stopped = await this.mintContract.saleStopped();
            this.isSaleInPprogess = !stopped;
            this.updateStore("mintStarted", this.isSaleInPprogess);
            return this.isSaleInPprogess;
        } catch (e) {
            this.showError(e);
        }
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
            this.showError(e);
        }
    }

    async isWhitelistSaleEnabled(): Promise<boolean>
    {
        try {
            if (!this.isSaleInPprogess) {
                return false;
            }
            if (undefined === this.window.ethereum) {
                this.isWhitelistSaleInProgess = false;
                return this.isWhitelistSaleInProgess;
            }
    
            const endBlock = await this.mintContract.whitelistEndBlock();
            const currentBlock = await this.window.ethereum.request({
                "jsonrpc": "2.0",
                "method": "eth_blockNumber",
                "params": [],
                "id": 0
            });
    
            this.isWhitelistSaleInProgess = +currentBlock <= +endBlock;

            if (this.isWhitelistSaleInProgess) {
                const store = get(MintStore);
                if (0 === +store.whiteListSeconds) {
                    if (null === this.timer) {
                        const seconds = Math.ceil((+endBlock - +currentBlock) * 13.3);
                        this.updateStore("whiteListSeconds", seconds);
                        // this.timer = setInterval(() => {
                        //     const store = get(MintStore);
                        //     if (2 > store.whiteListSeconds) {
                        //         clearInterval(this.timer);
                        //     }
                        //     const seconds = +store.whiteListSeconds - 1;
                        //     this.updateStore("whiteListSeconds", seconds);
                        // }, 1e3);
                    }
                }
                this.updateStore("isWhitelistSale", true);
            } else {
                this.updateStore("isWhitelistSale", false);
            }
    
            return this.isWhitelistSaleInProgess;
        } catch (e) {
            this.showError(e);
        }
    }

    async checkMaxAmount(): Promise<boolean>
    {
        try {
            const store = get(AppStore);
            this.walletAddress = store.walletAddress;
            
            const store2 = get(MintStore);
            this.currency = store2.currency;
            this.validateCurrency();

            let limit = false;
            let count: { eth: number, nct: number, dust: number, whale: number, box: number, artblock: number };

            if (this.isWhitelistSaleInProgess) {
                const isInDefault = await this.mintContract.isInDefaultWhitelist(this.walletAddress);
                if (isInDefault) {
                    limit = true;
                    count = await this.mintContract.howManyICanMintWhitelist(this.walletAddress, 5);
                } else {
                    const whiteList = getWhiteList();
                    if (!whiteList.hasOwnProperty(this.walletAddress.toLocaleLowerCase())) {
                        count = await this.mintContract.howManyICanMintWhitelist(this.walletAddress, 0);
                    } else {
                        limit = true;
                        count = await this.mintContract.howManyICanMintWhitelist(this.walletAddress, whiteList[this.walletAddress.toLocaleLowerCase()][0]);
                    }
                }
            } else {
                limit = true;
                count = await this.mintContract.howManyICanMint(this.walletAddress);
            }

            this.updateStore("maxAmount", count[this.currency]);

            if (limit && 0 === +count.eth) {
                this.updateStore("limitExceed", true);
            } else {
                this.updateStore("limitExceed", false);
            }

            return true;
        } catch (e) {
            this.showError(e);
        }
    }

    async changeCurrency(currency: string): Promise<boolean>
    {
        try {
            this.currency = currency;
            this.validateCurrency();
            this.updateStore("currency", this.currency);
            await this.updateAvailable();
            await this.isWhitelistSaleEnabled();
            await this.checkMaxAmount();

            switch (this.currency) {
                case "eth":
                    this.updateStore("currencyType", "eth");
                    break;
                case "dust":
                case "whale":
                case "nct":
                    this.updateStore("currencyType", "erc20");
                    this.currencyList[this.currency].setWalletAddress(this.walletAddress);
                    const allowance = await this.currencyList[this.currency].checkAllowance();
                    this.updateStore("allowance", allowance);
                    break;
                case "artblock":
                case "box":
                    this.updateStore("currencyType", "erc721");
                    this.currencyList[this.currency].setWalletAddress(this.walletAddress);
                    const allowanceAll = await this.currencyList[this.currency].checkAllowance();
                    this.updateStore("allowance", allowanceAll);
                    break;
            }

            if ("artblock" === this.currency) {
                const balance = await this.artblockContract.balanceOf(this.walletAddress);
                this.updateStore("artblockBalance", balance);
            } else if ("box" === this.currency) {
                const balance = await this.nftBoxContract.balanceOf(this.walletAddress);
                this.updateStore("boxBalance", balance);
            }

            return true;
        } catch (e) {
            this.showError(e);
        }
    }

    async getNftList(): Promise<{id: number, src: string, selected: boolean}[]> {
        let list = [];
        if ('artblock' === this.currency) {
            const balance = await this.artblockContract.balanceOf(this.walletAddress);
            this.updateStore("artblockBalance", balance);
            for (let i = 0; i < balance; i++) {
                const id = await this.artblockContract.tokenOfOwnerByIndex(this.walletAddress, i);
                const response = await fetch(`https://api.opensea.io/api/v1/asset/0x059edd72cd353df5106d2b9cc5ab83a52287ac3a/${id}/`, { mode: 'cors' });
                const src = await response.json();
                list = [...list, { id, src: src.image_preview_url, selected: false }];
            }
        } else if ('box' === this.currency) {
            const balance = await this.nftBoxContract.balanceOf(this.walletAddress);
            this.updateStore("boxBalance", balance);
            for (let i = 0; i < balance; i++) {
                const id = await this.nftBoxContract.tokenOfOwnerByIndex(this.walletAddress, i);
                const response = await fetch(`https://api.opensea.io/api/v1/asset/0x6d4530149e5b4483d2f7e60449c02570531a0751/${id}/`, { mode: 'cors' })
                const src = await response.json();
                list = [...list, { id, src: src.image_preview_url, selected: false }];
            }
        }
        return list;
    }

    async approve(): Promise<boolean>
    {
        try {
            await this.isWhitelistSaleEnabled();
            const isInList = await this.validateForWhiteList();
            if (!isInList) {
                return;
            }

            const store = get(MintStore);
            const price = store.price;

            switch (this.currency) {
                case "dust":
                case "whale":
                case "nct":
                    this.currencyList[this.currency].setWalletAddress(this.walletAddress);
                    this.currencyList[this.currency].setPrice(price);

                    await this.currencyList[this.currency].makeApprove();
                    await delay(2e3);

                    const allowance = await this.currencyList[this.currency].checkAllowance();
                    this.updateStore("allowance", allowance);
                    break;
                case "artblock":
                case "box":
                    this.currencyList[this.currency].setWalletAddress(this.walletAddress);

                    await this.currencyList[this.currency].makeApprove();
                    await delay(2e3);

                    const allowanceAll = await this.currencyList[this.currency].checkAllowance();
                    this.updateStore("allowance", allowanceAll);
                    break;
            }

            return true;
        } catch (e) {
            this.showError(e);
        }
    }

    async mint(): Promise<number>
    {
        await this.isWhitelistSaleEnabled();
        const isInList = await this.validateForWhiteList();
        if (!isInList) {
            return;
        } 

        const store = get(AppStore);
        this.walletAddress = store.walletAddress;

        const store2 = get(MintStore);

        this.currencyList[this.currency].setWalletAddress(this.walletAddress);

        if (this.isWhitelistSaleInProgess) {
            this.currencyList[this.currency].enableWhitelist();
            const isInDefault = await this.mintContract.isInDefaultWhitelist(this.walletAddress);
            if (isInDefault) {
                this.currencyList[this.currency].setWalletReserve(5);
                this.currencyList[this.currency].setWalletLeaf("0x");
                this.currencyList[this.currency].setWalletProof([]);
            } else {
                const whiteList = getWhiteList();
                this.currencyList[this.currency].setWalletReserve(whiteList[this.walletAddress.toLocaleLowerCase()][0]);
                this.currencyList[this.currency].setWalletLeaf(whiteList[this.walletAddress.toLocaleLowerCase()][1]);
                this.currencyList[this.currency].setWalletProof(whiteList[this.walletAddress.toLocaleLowerCase()][2]);
            }
        } else {
            this.currencyList[this.currency].disableWhitelist();
        }

        switch (this.currency) {
            case "eth":
                this.currencyList[this.currency].setPrice(store2.price);
                this.currencyList[this.currency].setRedblockAmount(store2.amount);
                break;
            case "dust":
            case "whale":
            case "nct":
                this.currencyList[this.currency].setPrice(store2.price);
                this.currencyList[this.currency].setRedblockAmount(store2.amount);
                break;  
            case "artblock":      
            case "box":
                this.currencyList[this.currency].setNftList(store2.nftSelected);
                break;      
        }

        const balanceBefore = await this.mintContract.balanceOf(this.walletAddress);

        await this.currencyList[this.currency].makeMint();

        await delay(2e3);
        const balanceAfter = await this.mintContract.balanceOf(this.walletAddress);

        if (balanceAfter > balanceBefore) {
            this.updateStore("mintSucceed", true);
        }

        return balanceAfter - balanceBefore;
    }

    async getPrice(): Promise<number>
    {
        try {
            this.validateCurrency();
            switch (this.currency) {
                case "eth":
                    return await this.mintContract.pricePerTokenETH();
                case "dust":
                    return await this.mintContract.pricePerTokenDUST();
                case "whale":
                    return await this.mintContract.pricePerTokenWHALE();
                case "nct":
                    return await this.mintContract.pricePerTokenNCT();
            }
        } catch (e) {
            this.showError(e);
        }
    }

    private validateCurrency(): void
    {
        if (undefined === this.currency || null === this.currency || -1 === ["eth", "dust", "whale", "nct", "artblock", "box"].indexOf(this.currency)) {
            throw new Error("curreny must be defined");
        }
    }

    private showError(e: Error): void
    {
        if (-1 === e.message.indexOf("User denied transaction signature")) {
            AppStore.update(v => {
                v.someError = true;
                v.err = e.message;
                v.showModal = true;
                return v;
            });
        }
    }

    private updateStore(key: string, val: any) {
        MintStore.update(v => {
            v[key] = val;
            return v;
        });
    }

    private async validateForWhiteList(): Promise<boolean> {
        if (this.isWhitelistSaleInProgess) {
            const isInDefault = await this.mintContract.isInDefaultWhitelist(this.walletAddress);
            if (isInDefault) {
                return true;
            } else {
                const whiteList = getWhiteList();
                if (!whiteList.hasOwnProperty(this.walletAddress.toLocaleLowerCase())) {
                    AppStore.update(v => {
                        v.someError = true;
                        v.err = "not_whitelisted";
                        v.showModal = true;
                        return v;
                    });
                    return false;
                }
            }
        }
        return true;
    }
}