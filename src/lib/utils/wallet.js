// @ts-nocheck
import { AppStore } from "$lib/utils/Store";
export const WalletStatus = {
    notFound: 0,
    connected: 1,
    disconnected: 2,
    err: 3
}
export const connectWallet = async (window) => {
    if (undefined !== window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({ method: "eth_requestAccounts" });
            AppStore.update(v => {
                v.walletStatus = WalletStatus.connected;
                v.walletAddress = addressArray[0];
                v.someError = false;
                v.err = '';
                return v;
            });
            return ;
        } catch (err) {
            AppStore.update(v => {
                v.walletStatus = WalletStatus.err;
                v.walletAddress = '';
                v.someError = true;
                v.err = err.message;
                v.showModal = true;
                return v;
            });
            return ;
        }
    }
    AppStore.update(v => {
        v.walletStatus = WalletStatus.notFound;
        v.walletAddress = '';
        v.someError = false;
        v.err = '';
        v.showModal = true;
        return v;
    });
};
export const getWalletState = async (window) => {
    if (undefined !== window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({ method: "eth_accounts" });
            if (0 < addressArray.length) {
                AppStore.update(v => {
                    v.walletStatus = WalletStatus.connected;
                    v.walletAddress = addressArray[0];
                    v.someError = false;
                    v.err = '';
                    v.chain = window.ethereum.chainId
                    return v;
                });
            } else {
                AppStore.update(v => {
                    v.walletStatus = WalletStatus.disconnected;
                    v.walletAddress = '';
                    v.someError = false;
                    v.err = '';
                    return v;
                });
            }
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    AppStore.update(v => {
                        v.walletStatus = WalletStatus.connected;
                        v.walletAddress = accounts[0];
                        v.someError = false;
                        v.err = '';
                        return v;
                    });
                } else {
                    AppStore.update(v => {
                        v.walletStatus = WalletStatus.disconnected;
                        v.walletAddress = '';
                        v.someError = false;
                        v.err = '';
                        return v;
                    });
                }
            });
            window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
            return ;
        } catch (err) {
            AppStore.update(v => {
                v.walletStatus = WalletStatus.err;
                v.walletAddress = '';
                v.someError = true;
                v.err = err.message;
                return v;
            });
            return ;
        }
    }
    AppStore.update(v => {
        v.walletStatus = WalletStatus.notFound;
        v.walletAddress = '';
        v.someError = false;
        v.err = '';
        return v;
    });
}