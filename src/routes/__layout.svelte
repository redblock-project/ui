<script>
    import { AppStore } from "$lib/utils/Store";
    import Nav from "$lib/components/Nav.svelte";
    import Modal from "$lib/components/Modal.svelte";
    import { onMount } from "svelte";

    const preload = (src) => {
        return new Promise((resolve) => {
            const image = new Image();
            image.onload = () => {
                //console.log(src);
                resolve();
            };
            image.src = src;
        });
    }
    let navPath = "/", dataPromise;
    onMount(async () => {
        const images = ['coin.png', 'image.jpg', 'modal.png', 'mb-bg.jpg', 'CHE.png', 'LENIN.png', 'MAO.png'];
        const promises = [];
        for (let img of images) {
            promises.push(preload(`/img/${img}`));
        }
        dataPromise = Promise.all(promises);
        if ("ru" === document.location.pathname.split("/")[1])
            $AppStore.lang = "ru";
        "ru" === $AppStore.lang
            ? (navPath = "/" + document.location.pathname.replace("/ru/", ""))
            : (navPath = document.location.pathname);
        try {
            await screen.orientation.lock("portrait");
        } catch (e) {}

        await dataPromise;
        $AppStore.showLoader = false;
    });
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WDVMS78" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
{#if $AppStore.showLoader}
    <div class="loader">
        <img src="/img/logo.png" class="black" alt="redblock" />
        <img src="/img/logo_r.png" class="red" alt="redblock" />
    </div>
{/if}
<Nav />
{#await dataPromise then data}
    <slot />
{/await}
<!-- <div class="main-bg"></div> -->
<!-- <div class="decor-bg"></div> -->
<div class="transparent-bg"></div>
<button class="mb-switcher">
    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="open-button" on:click={() => { $AppStore.mobileMenuShowed = !$AppStore.mobileMenuShowed }} class:open={$AppStore.mobileMenuShowed}>
        <rect width="40" height="8" fill="white" id="top" />
        <rect y="12" width="40" height="8" fill="white" id="middle" />
        <rect y="24" width="40" height="8" fill="white" id="bottom" />
    </svg>
</button>
<Modal />

<style>
    .main-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 110vh;
        background-image: url('/img/paper.jpg');
        background-size: 100% 100%;
        z-index: 1;
    }
.transparent-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background: radial-gradient(50% 158.02% at 0% 0%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
  background-size: 100% 100%;
  z-index: 10;
}

.decor-bg {
  background-image: url('/img/bg.png');
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  mix-blend-mode: overlay;
  opacity: 0.2;
}
.mb-switcher {
  display: none;
}
.loader {
    top: 0;
    left: 0;
    position:absolute;
    z-index: 999999999;
    background: #F0ECDC;
    width: 100vw;
    height: 100vh;
}
.loader img {
    height: 192px;
    left: 50%;
    margin-top: -86px;
    margin-left: -86px;
    position: absolute;
    top: 50%;
    width: 192px;
}
.loader .red {
    transform: translateX(-1px) scale(1.02);
    opacity: 0;
    animation: clip 4s linear infinite;
}
@keyframes clip { 
    0% { 
        clip-path: inset(0  0 100%  0 ); 
        opacity: 1;
    }
    80% { 
        clip-path: inset(0); 
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
@media screen and (max-width: 640px) {
    .main-bg {
        background-image: url('/img/paper_s.jpg');
    }
    svg {
        transition: transform 0.3s ease-in-out;
    }
    svg rect {
		transition: transform 0.3s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out, opacity 0.05s ease-in-out;
	}
    .open {
        width: 11vw !important;
        height: 11vw !important;
        transform: translateX(-5vw);
    }
    .open #top {
		transform: translate(4.5px, -2.5px) rotate(45deg);
        width: 45px;
        height: 6px;
	}
	.open #middle {
		opacity: 0;
	}
    .open #bottom {
        transform: translate(-17.5px, 12.5px) rotate(-45deg);
        width: 45px;
        height: 6px;
	}
    .mb-switcher {
        position: fixed;
        width: 25vw;
        height: 25vw;
        top: 0;
        right: 0;
        z-index: 200;
        background: url(/img/triangle.svg);
        background-size: 100% 100%;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .mb-switcher .open-button {
        width: 6.25vw;
        height: 5vw;
    }
}
</style>