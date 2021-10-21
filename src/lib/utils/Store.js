import { writable } from "svelte/store";

export const AppStore = writable({
    lang: 'en',
    currentPath: '',
    showLoader: true,
    showModal: false,
    mobileMenuShowed: false,
    aboutWasSlided: 0,
    faqWasSlided: 0,
});
