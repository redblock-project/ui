import { writable } from "svelte/store";

export const AppStore = writable({
    lang: 'en',
    currentPath: '',
    showLoader: true,
    showModal: false,
    mobileMenuShowed: false,
    aboutWasSlided: 0,
    faqWasSlided: 0,
    presaleStarted: false,
    whitelistingStarted: true,
    walletStatus: 0,
    walletError: false,
    walletAddress: '',
    err: '',
    contract: '',
    whitelistContract: null,
    whitelistInstance: null,
    mintContract: null,
    mintInstance: null,
    artblockContract: null,
    artblockInstance: null,
    nftboxesContract: null,
    nftboxesInstance: null,
});
