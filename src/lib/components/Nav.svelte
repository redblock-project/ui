<script>
    // @ts-nocheck

    import '$lib/css/style.css';
    import { onMount } from "svelte";
    import { AppStore } from "$lib/utils/Store.js";
    import messages from "$lib/_locales/messages.json";

    export let dark = true;
    const logoSrc = dark ? '/img/logo.png' : '/img/logo_w.png';

    const links = ['about', 'mint', 'whitelist', 'allies', 'farm', 'rarity', 'hall', 'wallet', 'roadmap', 'team', 'faq'];

    let chainID = '';
    let navPath = "/", account = '';
    onMount(async () => {
        if ("ru" === document.location.pathname.split("/")[1])
            $AppStore.lang = "ru";
        if ("cn" === document.location.pathname.split("/")[1])
            $AppStore.lang = "cn";
        if ("ru" === $AppStore.lang) {
            navPath = "/" + document.location.pathname.replace("/ru/", "");
        } else if ("cn" === $AppStore.lang) {
            navPath = "/" + document.location.pathname.replace("/cn/", "");
        } else {
            navPath = document.location.pathname
        }
        navPath = '/' === navPath[navPath.length - 1] ? navPath.slice(0, -1) : navPath;
        try {
            await screen.orientation.lock("portrait");
        } catch (e) {}

        window.addEventListener("unhandledrejection", function(promiseRejectionEvent) { 
            const text = promiseRejectionEvent.reason.message.split('{')[0];
            if (-1 === text.indexOf("User denied transaction signature")) {
                $AppStore.showModal = true;
                $AppStore.someError = true;
                $AppStore.err = text;
            } else if (-1 !== text.indexOf("Failed to fetch dynamically imported module")) {
                document.location.reload();
            }
        });
    });

    const getHref = (href, lang) => {
        href = "/" === href[0] ? href.substr(1) : href;
        href = "/" === href[0] ? href.substr(1) : href;
        if ("ru" === lang) {
            href = "" === href ? `/${lang}` : `/ru/${href}/`;
        } else if ("cn" === lang) {
            href = "" === href ? `/${lang}` : `/cn/${href}/`;
        } else {
            href = `/${href}/`;
        }
        return '//' === href ? '/' : href;
    };
    const navigate = (href) => {
        if (-1 !== href.indexOf('#roadmap')) {
            href = '/';
            $AppStore.roadmap = true;
        }
        if (-1 !== href.indexOf('#about')) {
            href = '/';
            $AppStore.about = true;
        }
        hideDesktopMenu();
        $AppStore.mobileMenuShowed = false;
        navPath = href;
        return true;
    };
    $: {
        if (0 === $AppStore.walletAddress.length) {
            account = '';
        } else {
            account = `${($AppStore.walletAddress.substr(0, 6))}...${($AppStore.walletAddress.substr($AppStore.walletAddress.length - 4))}`;
        }
        switch ($AppStore.chain) {
            case '0x1':
                chainID = 'mainnet';
                break;
            case '0x4':
                chainID = 'rinkeby';
                break;
            default:
                chainID = $AppStore.chain;
                break;
        }
    }

    let desktopMenu = false;
    const showDesktopMenu = () => {
        desktopMenu = true;
    }
    const hideDesktopMenu = () => {
        desktopMenu = false;
    }
</script>

<header class="header" class:light={!dark} class:open={$AppStore.mobileMenuShowed}>
    <div class="wrapper">
        <a
            href={getHref("/", $AppStore.lang)}
            class="logotype"
            on:click={() => {
                navigate("/");
            }}
        >
            <img src="{logoSrc}" alt="logotype" />
        </a>
        <a
            href={getHref("/", $AppStore.lang)}
            class="logotype mobile-logo"
            on:click={() => {
                navigate("/");
            }}
        >
            <img src="/img/logo_w.png" alt="logotype" />
        </a>
        <div class="header__nav_desktop">
            <button class="m-switcher" class:white={!dark} on:click|self|stopPropagation={showDesktopMenu}>
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" class="open-button" on:click={showDesktopMenu}>
                    <rect y="8" width="40" height="4" fill="#444444" id="top" />
                    <rect y="16" width="40" height="4" fill="#565656" id="middle" />
                    <rect y="24" width="40" height="4" fill="#444444" id="bottom" />
                </svg>
            </button>
            <a
                href={getHref("mint", $AppStore.lang)}
                class:current={"/mint" === navPath}
                on:click={() => {
                    navigate("/mint");
                }}>{messages[$AppStore.lang].nav_mint}</a
            >
            <a
                href={getHref("wallet", $AppStore.lang)}
                class:current={"/wallet" === navPath}
                on:click={() => {
                    navigate("/wallet");
                }}>{messages[$AppStore.lang].nav_wallet}</a
            >
            <a
                href={getHref("/", $AppStore.lang) + "#roadmap"}
                class:current={"/#roadmap" === navPath}
                on:click={() => {
                    navigate("/#roadmap");
                }}>{messages[$AppStore.lang].nav_roadmap}</a
            >
            <a
                href={getHref("team", $AppStore.lang)}
                class:current={"/team" === navPath}
                on:click={() => {
                    navigate("/team");
                }}>{messages[$AppStore.lang].nav_team}</a
            >
            <a
                href={getHref("faq", $AppStore.lang)}
                class:current={"/faq" === navPath}
                on:click={() => {
                    navigate("/faq");
                }}>{messages[$AppStore.lang].nav_faq}</a
            >
        </div>
        <div class="backdrop" class:backdrop_open={desktopMenu} on:click|self|stopPropagation={hideDesktopMenu}></div>
        <div class="header__nav_desktop_exp" class:desktop_open={desktopMenu}>
            <a
                href={getHref("/", $AppStore.lang)}
                class="logotype"
                on:click={() => {
                    navigate("/");
                }}
            >
                <img src="/img/logo_w.png" alt="logotype" />
            </a>
            {#each links as link (link)}
                {#if 'roadmap' === link}
                    <a
                        href={getHref("/", $AppStore.lang) + "#roadmap"}
                        class:current={"/#roadmap" === navPath}
                        on:click={() => {
                            navigate("/#roadmap");
                        }}>{messages[$AppStore.lang].nav_roadmap}</a
                    >
                {:else if 'about' === link}
                    <a
                        href={getHref("/", $AppStore.lang) + "#about"}
                        class:current={"/#about" === navPath}
                        on:click={() => {
                            navigate("/#about");
                        }}>{messages[$AppStore.lang].nav_about}</a
                    >
                {:else}
                    <a
                        href={getHref(link, $AppStore.lang)}
                        class:current={`/${link}` === navPath}
                        on:click={() => {
                            navigate(`/${link}`);
                        }}>{messages[$AppStore.lang][`nav_${link}`]}</a
                    >
                {/if}
            {/each}
        </div>
        <div class="header__nav">
            {#each links as link (link)}
                {#if 'roadmap' === link}
                    <a
                        href={getHref("/", $AppStore.lang) + "#roadmap"}
                        class:current={"/#roadmap" === navPath}
                        on:click={() => {
                            navigate("/#roadmap");
                        }}>{messages[$AppStore.lang].nav_roadmap}</a
                    >
                {:else if 'about' === link}
                    <a
                        href={getHref("/", $AppStore.lang) + "#about"}
                        class:current={"/#about" === navPath}
                        on:click={() => {
                            navigate("/#about");
                        }}>{messages[$AppStore.lang].nav_about}</a
                    >
                {:else}
                    <a
                        href={getHref(link, $AppStore.lang)}
                        class:current={`/${link}` === navPath}
                        on:click={() => {
                            navigate(`/${link}`);
                        }}>{messages[$AppStore.lang][`nav_${link}`]}</a
                    >
                {/if}
            {/each}
        </div>
        <div class="right">
            <div class="wallet" class:hide={0 === $AppStore.walletAddress.length}>
                {account}
                <span class="chainID">{chainID}</span>
            </div>
            <div class="contacts">
                <a href="https://opensea.io/collection/redblock" target="_blank">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iOTAiIHZpZXdCb3g9IjAgMCA5MCA5MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkwIDQ1QzkwIDY5Ljg1MTQgNjkuODUxNCA5MCA0NSA5MEMyMC4xNDg2IDkwIDAgNjkuODUxNCAwIDQ1QzAgMjAuMTQ4NiAyMC4xNDg2IDAgNDUgMEM2OS44NTY2IDAgOTAgMjAuMTQ4NiA5MCA0NVoiIGZpbGw9IiMyMDgxRTIiLz4KPHBhdGggZD0iTTIyLjIwMTEgNDYuNTEyTDIyLjM5NTMgNDYuMjA2OUwzNC4xMDE2IDI3Ljg5MzlDMzQuMjcyNiAyNy42MjU3IDM0LjY3NDkgMjcuNjUzNSAzNC44MDQzIDI3Ljk0NDdDMzYuNzYgMzIuMzI3NyAzOC40NDc1IDM3Ljc3ODYgMzcuNjU2OSA0MS4xNzIxQzM3LjMxOTQgNDIuNTY4MyAzNi4zOTQ4IDQ0LjQ1OTMgMzUuMzU0NSA0Ni4yMDY5QzM1LjIyMDQgNDYuNDYxMiAzNS4wNzI1IDQ2LjcxMDkgMzQuOTE1MyA0Ni45NTEzQzM0Ljg0MTMgNDcuMDYyMiAzNC43MTY1IDQ3LjEyNyAzNC41ODI0IDQ3LjEyN0gyMi41NDMyQzIyLjIxOTYgNDcuMTI3IDIyLjAzMDEgNDYuNzc1NiAyMi4yMDExIDQ2LjUxMloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik03NC4zOCA0OS45MTQ5VjUyLjgxMzdDNzQuMzggNTIuOTgwMSA3NC4yNzgzIDUzLjEyODEgNzQuMTMwNCA1My4xOTI4QzczLjIyNDIgNTMuNTgxMiA3MC4xMjE5IDU1LjAwNTIgNjguODMyIDU2Ljc5OUM2NS41NDAyIDYxLjM4MDcgNjMuMDI1MSA2Ny45MzIgNTcuNDAzMSA2Ny45MzJIMzMuOTQ5QzI1LjYzNjIgNjcuOTMyIDE4LjkgNjEuMTcyNyAxOC45IDUyLjgzMjJWNTIuNTY0QzE4LjkgNTIuMzQyMSAxOS4wODAzIDUyLjE2MTggMTkuMzAyMyA1Mi4xNjE4SDMyLjM3N0MzMi42MzU5IDUyLjE2MTggMzIuODI1NSA1Mi40MDIyIDMyLjgwMjQgNTIuNjU2NUMzMi43MDk5IDUzLjUwNzIgMzIuODY3MSA1NC4zNzY0IDMzLjI2OTMgNTUuMTY3QzM0LjA0NjEgNTYuNzQzNSAzNS42NTUgNTcuNzI4MyAzNy4zOTM0IDU3LjcyODNINDMuODY2VjUyLjY3NUgzNy40NjczQzM3LjEzOTEgNTIuNjc1IDM2Ljk0NDkgNTIuMjk1OSAzNy4xMzQ1IDUyLjAyNzdDMzcuMjAzOCA1MS45MjE0IDM3LjI4MjQgNTEuODEwNCAzNy4zNjU2IDUxLjY4NTZDMzcuOTcxMyA1MC44MjU3IDM4LjgzNTggNDkuNDg5NSAzOS42OTU4IDQ3Ljk2ODRDNDAuMjgyOSA0Ni45NDIxIDQwLjg1MTYgNDUuODQ2MyA0MS4zMDkzIDQ0Ljc0NkM0MS40MDE4IDQ0LjU0NzIgNDEuNDc1OCA0NC4zNDM4IDQxLjU0OTcgNDQuMTQ0OUM0MS42NzQ2IDQzLjc5MzYgNDEuODA0IDQzLjQ2NTMgNDEuODk2NSA0My4xMzcxQzQxLjk4ODkgNDIuODU5NyA0Mi4wNjI5IDQyLjU2ODQgNDIuMTM2OSA0Mi4yOTU2QzQyLjM1NDIgNDEuMzYxNyA0Mi40NDY3IDQwLjM3MjMgNDIuNDQ2NyAzOS4zNDU5QzQyLjQ0NjcgMzguOTQzNyA0Mi40MjgyIDM4LjUyMyA0Mi4zOTEyIDM4LjEyMDdDNDIuMzcyNyAzNy42ODE1IDQyLjMxNzIgMzcuMjQyMyA0Mi4yNjE3IDM2LjgwMzFDNDIuMjI0NyAzNi40MTQ3IDQyLjE1NTQgMzYuMDMxIDQyLjA4MTQgMzUuNjI4OEM0MS45ODg5IDM1LjA0MTYgNDEuODU5NSAzNC40NTkxIDQxLjcxMTUgMzMuODcxOUw0MS42NjA3IDMzLjY1QzQxLjU0OTcgMzMuMjQ3OCA0MS40NTczIDMyLjg2NCA0MS4zMjc4IDMyLjQ2MThDNDAuOTYyNiAzMS4xOTk2IDQwLjU0MTggMjkuOTY5OCA0MC4wOTggMjguODE4NkMzOS45MzYyIDI4LjM2MDkgMzkuNzUxMiAyNy45MjE3IDM5LjU2NjMgMjcuNDgyNUMzOS4yOTM1IDI2LjgyMTMgMzkuMDE2MSAyNi4yMjAzIDM4Ljc2MTkgMjUuNjUxNkMzOC42MzI0IDI1LjM5MjcgMzguNTIxNCAyNS4xNTY5IDM4LjQxMDUgMjQuOTE2NUMzOC4yODU3IDI0LjY0MzcgMzguMTU2MiAyNC4zNzEgMzguMDI2OCAyNC4xMTJDMzcuOTM0MyAyMy45MTMyIDM3LjgyNzkgMjMuNzI4MyAzNy43NTQgMjMuNTQzNEwzNi45NjM0IDIyLjA4MjRDMzYuODUyNCAyMS44ODM2IDM3LjAzNzQgMjEuNjQ3OCAzNy4yNTQ2IDIxLjcwNzlMNDIuMjAxNiAyMy4wNDg3SDQyLjIxNTVDNDIuMjI0NyAyMy4wNDg3IDQyLjIyOTQgMjMuMDUzMyA0Mi4yMzQgMjMuMDUzM0w0Mi44ODU5IDIzLjIzMzZMNDMuNjAyNSAyMy40MzdMNDMuODY2IDIzLjUxMVYyMC41NzA2QzQzLjg2NiAxOS4xNTEyIDQ1LjAwMzQgMTggNDYuNDA4OSAxOEM0Ny4xMTE2IDE4IDQ3Ljc0OTYgMTguMjg2NiA0OC4yMDczIDE4Ljc1MzZDNDguNjY1IDE5LjIyMDYgNDguOTUxNyAxOS44NTg2IDQ4Ljk1MTcgMjAuNTcwNlYyNC45MzVMNDkuNDc4NyAyNS4wODI5QzQ5LjUyMDQgMjUuMDk2OCA0OS41NjIgMjUuMTE1MyA0OS41OTkgMjUuMTQzQzQ5LjcyODQgMjUuMjQwMSA0OS45MTMzIDI1LjM4MzUgNTAuMTQ5MSAyNS41NTkxQzUwLjMzNDEgMjUuNzA3MSA1MC41MzI5IDI1Ljg4NzQgNTAuNzczMyAyNi4wNzIzQzUxLjI0OTUgMjYuNDU2MSA1MS44MTgxIDI2Ljk1MDggNTIuNDQyMyAyNy41MTk0QzUyLjYwODcgMjcuNjYyOCA1Mi43NzA2IDI3LjgxMDcgNTIuOTE4NSAyNy45NTg3QzUzLjcyMyAyOC43MDc2IDU0LjYyNDUgMjkuNTg2MSA1NS40ODQ1IDMwLjU1N0M1NS43MjQ5IDMwLjgyOTcgNTUuOTYwNyAzMS4xMDcxIDU2LjIwMTEgMzEuMzk4NEM1Ni40NDE1IDMxLjY5NDMgNTYuNjk1OCAzMS45ODU2IDU2LjkxNzcgMzIuMjc2OUM1Ny4yMDkgMzIuNjY1MiA1Ny41MjMzIDMzLjA2NzQgNTcuNzk2MSAzMy40ODgyQzU3LjkyNTYgMzMuNjg3IDU4LjA3MzUgMzMuODkwNCA1OC4xOTg0IDM0LjA4OTJDNTguNTQ5NyAzNC42MjA5IDU4Ljg1OTUgMzUuMTcxMSA1OS4xNTU0IDM1LjcyMTJDNTkuMjgwMiAzNS45NzU1IDU5LjQwOTcgMzYuMjUyOSA1OS41MjA2IDM2LjUyNTdDNTkuODQ4OSAzNy4yNjA4IDYwLjEwNzggMzguMDA5OCA2MC4yNzQyIDM4Ljc1ODhDNjAuMzI1MSAzOC45MjA2IDYwLjM2MjEgMzkuMDk2MyA2MC4zODA2IDM5LjI1MzVWMzkuMjkwNEM2MC40MzYgMzkuNTEyNCA2MC40NTQ1IDM5Ljc0ODIgNjAuNDczIDM5Ljk4ODZDNjAuNTQ3IDQwLjc1NiA2MC41MSA0MS41MjM1IDYwLjM0MzYgNDIuMjk1NkM2MC4yNzQyIDQyLjYyMzkgNjAuMTgxOCA0Mi45MzM2IDYwLjA3MDggNDMuMjYxOUM1OS45NTk4IDQzLjU3NjMgNTkuODQ4OSA0My45MDQ1IDU5LjcwNTYgNDQuMjE0M0M1OS40MjgyIDQ0Ljg1NjkgNTkuMDk5OSA0NS40OTk2IDU4LjcxMTUgNDYuMTAwNkM1OC41ODY3IDQ2LjMyMjUgNTguNDM4OCA0Ni41NTgzIDU4LjI5MDggNDYuNzgwMkM1OC4xMjkgNDcuMDE2IDU3Ljk2MjYgNDcuMjM4IDU3LjgxNDYgNDcuNDU1M0M1Ny42MTEyIDQ3LjczMjcgNTcuMzkzOSA0OC4wMjM5IDU3LjE3MiA0OC4yODI4QzU2Ljk3MzIgNDguNTU1NiA1Ni43Njk3IDQ4LjgyODQgNTYuNTQ3OCA0OS4wNjg4QzU2LjIzODEgNDkuNDM0IDU1Ljk0MjIgNDkuNzgwOCA1NS42MzI0IDUwLjExMzdDNTUuNDQ3NSA1MC4zMzEgNTUuMjQ4NyA1MC41NTI5IDU1LjA0NTIgNTAuNzUxN0M1NC44NDY0IDUwLjk3MzYgNTQuNjQzIDUxLjE3MjQgNTQuNDU4MSA1MS4zNTczQzU0LjE0ODMgNTEuNjY3MSA1My44ODk0IDUxLjkwNzUgNTMuNjcyMSA1Mi4xMDYzTDUzLjE2MzUgNTIuNTczM0M1My4wODk2IDUyLjYzOCA1Mi45OTI1IDUyLjY3NSA1Mi44OTA4IDUyLjY3NUg0OC45NTE3VjU3LjcyODNINTMuOTA3OUM1NS4wMTc1IDU3LjcyODMgNTYuMDcxNiA1Ny4zMzUzIDU2LjkyMjMgNTYuNjE0MUM1Ny4yMTM2IDU2LjM1OTggNTguNDg1IDU1LjI1OTQgNTkuOTg3NiA1My41OTk3QzYwLjAzODQgNTMuNTQ0MiA2MC4xMDMyIDUzLjUwMjYgNjAuMTc3MSA1My40ODQxTDczLjg2NjggNDkuNTI2NUM3NC4xMjExIDQ5LjQ1MjUgNzQuMzggNDkuNjQ2NyA3NC4zOCA0OS45MTQ5WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" />
                </a>
                <a href="https://twitter.com/RedBlockCommune" target="_blank">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDQ4QzM3LjI1NDggNDggNDggMzcuMjU0OCA0OCAyNEM0OCAxMC43NDUyIDM3LjI1NDggMCAyNCAwQzEwLjc0NTIgMCAwIDEwLjc0NTIgMCAyNEMwIDM3LjI1NDggMTAuNzQ1MiA0OCAyNCA0OFoiIGZpbGw9IiMxQjlERjAiLz4KPHBhdGggZD0iTTE5LjYwODIgMzYuNjZDMzAuMjUyMiAzNi42NiAzNi4wNzIyIDI3Ljg0IDM2LjA3MjIgMjAuMTk2QzM2LjA3MjIgMTkuOTQ0IDM2LjA3MjIgMTkuNjkyIDM2LjA2MDIgMTkuNDUyQzM3LjE4ODIgMTguNjM2IDM4LjE3MjIgMTcuNjE2IDM4Ljk1MjIgMTYuNDUyQzM3LjkyMDIgMTYuOTA4IDM2LjgwNDIgMTcuMjIgMzUuNjI4MiAxNy4zNjRDMzYuODI4MiAxNi42NDQgMzcuNzQwMiAxNS41MTYgMzguMTcyMiAxNC4xNkMzNy4wNTYyIDE0LjgyIDM1LjgyMDIgMTUuMyAzNC41MDAyIDE1LjU2NEMzMy40NDQyIDE0LjQzNiAzMS45NDQyIDEzLjc0IDMwLjI3NjIgMTMuNzRDMjcuMDg0MiAxMy43NCAyNC40OTIyIDE2LjMzMiAyNC40OTIyIDE5LjUyNEMyNC40OTIyIDE5Ljk4IDI0LjU0MDIgMjAuNDI0IDI0LjY0ODIgMjAuODQ0QzE5LjgzNjIgMjAuNjA0IDE1LjU3NjIgMTguMyAxMi43MjAyIDE0Ljc5NkMxMi4yMjgyIDE1LjY0OCAxMS45NDAyIDE2LjY0NCAxMS45NDAyIDE3LjdDMTEuOTQwMiAxOS43MDQgMTIuOTYwMiAyMS40OCAxNC41MjAyIDIyLjUxMkMxMy41NzIyIDIyLjQ4OCAxMi42ODQyIDIyLjIyNCAxMS45MDQyIDIxLjc5MkMxMS45MDQyIDIxLjgxNiAxMS45MDQyIDIxLjg0IDExLjkwNDIgMjEuODY0QzExLjkwNDIgMjQuNjcyIDEzLjg5NjIgMjcgMTYuNTQ4MiAyNy41NEMxNi4wNjgyIDI3LjY3MiAxNS41NTIyIDI3Ljc0NCAxNS4wMjQyIDI3Ljc0NEMxNC42NTIyIDI3Ljc0NCAxNC4yOTIyIDI3LjcwOCAxMy45MzIyIDI3LjYzNkMxNC42NjQyIDI5Ljk0IDE2LjgwMDIgMzEuNjA4IDE5LjMzMjIgMzEuNjU2QzE3LjM1MjIgMzMuMjA0IDE0Ljg1NjIgMzQuMTI4IDEyLjE0NDIgMzQuMTI4QzExLjY3NjIgMzQuMTI4IDExLjIyMDIgMzQuMTA0IDEwLjc2NDIgMzQuMDQ0QzEzLjI5NjIgMzUuNyAxNi4zNDQyIDM2LjY2IDE5LjYwODIgMzYuNjZaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" />
                </a>
                <a href="https://discord.gg/redblock" target="_blank">
                    <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjQiIGN5PSIyNCIgcj0iMjQiIGZpbGw9IiM1ODY0RjIiLz4KPHBhdGggZD0iTTMyLjM4MTggMTYuMTA5OEMzMC44MDIxIDE1LjM4NSAyOS4xMDgxIDE0Ljg1MDkgMjcuMzM2OCAxNC41NDUxQzI3LjMwNDYgMTQuNTM5MiAyNy4yNzI0IDE0LjU1MzkgMjcuMjU1OCAxNC41ODM0QzI3LjAzNzkgMTQuOTcwOSAyNi43OTY2IDE1LjQ3NjQgMjYuNjI3NiAxNS44NzM4QzI0LjcyMjUgMTUuNTg4NiAyMi44MjcyIDE1LjU4ODYgMjAuOTYxMiAxNS44NzM4QzIwLjc5MjIgMTUuNDY3NiAyMC41NDIxIDE0Ljk3MDkgMjAuMzIzMyAxNC41ODM0QzIwLjMwNjYgMTQuNTU0OSAyMC4yNzQ0IDE0LjU0MDEgMjAuMjQyMiAxNC41NDUxQzE4LjQ3MTkgMTQuODUgMTYuNzc3OSAxNS4zODQgMTUuMTk3MiAxNi4xMDk4QzE1LjE4MzUgMTYuMTE1NyAxNS4xNzE4IDE2LjEyNTYgMTUuMTY0IDE2LjEzODNDMTEuOTUwOCAyMC45Mzg4IDExLjA3MDUgMjUuNjIxMyAxMS41MDIzIDMwLjI0NThDMTEuNTA0MyAzMC4yNjg0IDExLjUxNyAzMC4yOSAxMS41MzQ2IDMwLjMwMzhDMTMuNjU0NiAzMS44NjA3IDE1LjcwODEgMzIuODA1OCAxNy43MjM2IDMzLjQzMjNDMTcuNzU1OCAzMy40NDIyIDE3Ljc5IDMzLjQzMDQgMTcuODEwNSAzMy40MDM4QzE4LjI4NzMgMzIuNzUyNyAxOC43MTIzIDMyLjA2NjIgMTkuMDc2NyAzMS4zNDQzQzE5LjA5ODIgMzEuMzAyMSAxOS4wNzc2IDMxLjI1MTkgMTkuMDMzNyAzMS4yMzUyQzE4LjM1OTYgMzAuOTc5NSAxNy43MTc3IDMwLjY2NzcgMTcuMTAwMyAzMC4zMTM2QzE3LjA1MTQgMzAuMjg1MSAxNy4wNDc1IDMwLjIxNTMgMTcuMDkyNSAzMC4xODE4QzE3LjIyMjQgMzAuMDg0NSAxNy4zNTI0IDI5Ljk4MzIgMTcuNDc2NCAyOS44ODA5QzE3LjQ5ODkgMjkuODYyMiAxNy41MzAxIDI5Ljg1ODIgMTcuNTU2NSAyOS44N0MyMS42MTI4IDMxLjcyMiAyNi4wMDQzIDMxLjcyMiAzMC4wMTI3IDI5Ljg3QzMwLjAzOTEgMjkuODU3MyAzMC4wNzA0IDI5Ljg2MTIgMzAuMDkzOCAyOS44Nzk5QzMwLjIxNzkgMjkuOTgyMiAzMC4zNDc4IDMwLjA4NDUgMzAuNDc4NyAzMC4xODE4QzMwLjUyMzcgMzAuMjE1MyAzMC41MjA3IDMwLjI4NTEgMzAuNDcxOSAzMC4zMTM2QzI5Ljg1NDUgMzAuNjc0NiAyOS4yMTI2IDMwLjk3OTUgMjguNTM3NSAzMS4yMzQyQzI4LjQ5MzYgMzEuMjUwOSAyOC40NzQgMzEuMzAyMSAyOC40OTU1IDMxLjM0NDNDMjguODY3NyAzMi4wNjUyIDI5LjI5MjcgMzIuNzUxNyAyOS43NjA3IDMzLjQwMjhDMjkuNzgwMiAzMy40MzA0IDI5LjgxNTQgMzMuNDQyMiAyOS44NDc2IDMzLjQzMjNDMzEuODcyOCAzMi44MDU4IDMzLjkyNjQgMzEuODYwNyAzNi4wNDY0IDMwLjMwMzhDMzYuMDY1IDMwLjI5IDM2LjA3NjcgMzAuMjY5NCAzNi4wNzg2IDMwLjI0NjdDMzYuNTk1NCAyNC45MDA0IDM1LjIxMyAyMC4yNTYzIDMyLjQxNDEgMTYuMTM5M0MzMi40MDcyIDE2LjEyNTYgMzIuMzk1NSAxNi4xMTU3IDMyLjM4MTggMTYuMTA5OFpNMTkuNjgyNCAyNy40M0MxOC40NjEyIDI3LjQzIDE3LjQ1NDkgMjYuMzA4OCAxNy40NTQ5IDI0LjkzMTlDMTcuNDU0OSAyMy41NTUgMTguNDQxNyAyMi40MzM4IDE5LjY4MjQgMjIuNDMzOEMyMC45MzI5IDIyLjQzMzggMjEuOTI5NCAyMy41NjQ4IDIxLjkwOTggMjQuOTMxOUMyMS45MDk4IDI2LjMwODggMjAuOTIzMSAyNy40MyAxOS42ODI0IDI3LjQzWk0yNy45MTgxIDI3LjQzQzI2LjY5NjkgMjcuNDMgMjUuNjkwNyAyNi4zMDg4IDI1LjY5MDcgMjQuOTMxOUMyNS42OTA3IDIzLjU1NSAyNi42Nzc0IDIyLjQzMzggMjcuOTE4MSAyMi40MzM4QzI5LjE2ODYgMjIuNDMzOCAzMC4xNjUxIDIzLjU2NDggMzAuMTQ1NiAyNC45MzE5QzMwLjE0NTYgMjYuMzA4OCAyOS4xNjg2IDI3LjQzIDI3LjkxODEgMjcuNDNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K" />
                </a>
            </div>
            <div class="header__lang">
                <a
                    href={getHref(navPath, "en")}
                    class:active={"en" === $AppStore.lang}
                    on:click={() => {
                        $AppStore.lang = "en";
                        $AppStore.mobileMenuShowed = false;
                    }}>EN</a
                >
                <a
                    href={getHref(navPath, "ru")}
                    class:active={"ru" === $AppStore.lang}
                    on:click={() => {
                        $AppStore.lang = "ru";
                        $AppStore.mobileMenuShowed = false;
                    }}>RU</a
                >
                <a
                    href={getHref(navPath, "cn")}
                    class:active={"cn" === $AppStore.lang}
                    on:click={() => {
                        $AppStore.lang = "cn";
                        $AppStore.mobileMenuShowed = false;
                    }}>CN</a
                >
                <!-- AND FIRST CHILD MARGIN RIGHT DELETE IN MEDIA
                     <a
                    href={getHref(navPath, "ru")}
                    class:active={"ru" === $AppStore.lang}
                    on:click={() => {
                        $AppStore.lang = "ru";
                        $AppStore.mobileMenuShowed = false;
                    }}>RU</a
                > -->
            </div>
        </div>
    </div>
</header>
<div class="logomob">
    <a
        href={getHref("/", $AppStore.lang)}
        class="logotype"
        on:click={() => {
            navigate("/");
        }}
    >
        <img src="{logoSrc}" alt="logotype" />
    </a>
</div>

<style>
    .chainID {
        display: flex;
        position: absolute;
        top: -8px;
        font-size: 12px;
        color: #ffffff;
        right: 0;
        background: #000000;
        height: 13px;
        align-items: center;
        padding: 0 5px;
    }
    .white svg rect {
        fill: #dcdcdc;
    }
    .backdrop_open {
        display: block !important;
    }
    .desktop_open {
        display: flex !important;
        opacity: 0;
        animation: fade 0.1s forwards;
    }
    @keyframes fade {
        100% { opacity: 1; }
    }
    .backdrop {
        display: none;
        position: fixed;
        left: 0;
        top: 0;
        background: #000000a3;
        width: 100vw;
        height: 100vh;
        z-index: 99999;
    }
    .header__nav_desktop_exp {
        display: none;
        position: fixed;
        top: 0;
        background: url('/img/mb-bg.jpg');
        z-index: 99999;
        height: 100vh;
    }
    .header__nav_desktop_exp {
        flex-direction: column;
    }
    .header__nav_desktop_exp a {
        text-decoration: none;
        margin-right: 0;
        font-size: 1.25vw;
        padding: 32px 48px 0 48px;
        color: #ffffff;
        text-transform: none;
    }
    .header__nav_desktop_exp a:hover {
        transform: scale(0.95);
        color: #181818;
    }
    .header__nav_desktop {
        display: flex;
        align-items: center;
    }
    .header__nav_desktop a {
        font-weight: normal;
        font-size: 1.25vw;
        line-height: 1.6666666667vw;
        text-transform: uppercase;
        color: #181818;
        text-decoration: none;
        margin-right: 2.8645833333vw;
        transition: all 0.1s;
    }
    .light .header__nav_desktop a {
        color:#ffffff;
    }
    .header__nav_desktop a:hover {
        transform: scale(0.95);
        color: #e01828;
    }
    .header__nav_desktop a:last-child {
        margin-right: 0;
    }
    .header__nav_desktop button {
        margin-right: 2vw;
        transition: all 0.1s;
    }
    .header__nav_desktop button:hover {
        transform: scale(0.95);
    }
    .header__nav_desktop button:hover svg rect {
        fill: #e01828 !important;
    }

    .m-switcher {
        border: 0;
        outline: 0;
        background: none;
        cursor: pointer;
    }
    .wallet {
        width: 160px;
        height: 48px;
        margin-right: 32px;
        background: #F8C000;
        border: 2px solid #F8D858;
        box-sizing: border-box;
        border-radius: 4px;

        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 48px;
        color: #181818;
        
        position: relative;
    }
    .hide {
        display: none;
    }
    .wrapper {
        width: 100%;
        max-width: 83.3333333333vw;
        margin: 0 auto;
    }
    .header {
        z-index: 999;
        position: relative;
    }
    .header .wrapper {
        display: flex;
        align-items: center;
    }
    .header .logotype {
        margin-right: 32px;
        transition: transform 0.1s;
    }
    .header .logotype:hover {
        transform: scale(0.95);
    }
    .header .logotype.mobile-logo {
        display: none;
    }

    .header .logotype img {
        width: 5vw;
        height: 5vw;
    }
    .header__nav {
        display: none;
        align-items: center;
    }
    .header__nav a {
        font-weight: normal;
        font-size: 1.25vw;
        line-height: 1.6666666667vw;
        text-transform: uppercase;
        color: #181818;
        text-decoration: none;
        margin-right: 2.8645833333vw;
        transition: all 0.1s;
    }
    .right {
        display: flex;
        align-items: center;
        margin-left: auto;
        position: relative;
    }
    .contacts {
        display: flex;
        margin-right: 24px;
    }
    .contacts a {
        transition: transform 0.1s;
    }
    .contacts a:first-child {
        margin-right: 8px;
    }
    .contacts a:nth-child(2) {
        margin-right: 8px;
    }
    .contacts a:hover {
        transform: scale(0.95);
    }
    .contacts img {
        max-width: 48px;
    }
    .header__lang {
        display: flex;
        align-items: center;
        margin-left: auto;
        position: relative;
    }
    .header__lang a {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: normal;
        font-size: 18px;
        line-height: 24px;
        color: #ffffff;
        background: #181818;
        text-decoration: none;
        cursor: pointer;
        transition: transform 0.1s;
    }
    .header__lang a:hover {
        transform: scale(0.95);
    }
    .header__lang a:first-child {
        margin-right: 8px;
    }
    .header__lang a:nth-child(2) {
        margin-right: 8px;
    }
    .header__lang a.active {
        background: #e01828;
    }
    .current {
        transform: scale(1) !important;
        color: #686060 !important;
    }
    .logomob {
        display: none;
    }
    @media screen and (max-width: 640px) {
        .logomob {
            display: block;
            position: fixed;
            z-index: 99999;
            top: 3.5vw;
            left: 5vw;
        }
        .logomob img {
            width: 20vw;
            height: 20vw;
        }
        .wallet {
            margin-right: 0;
            margin-bottom: 16px;
        }
        .header {
            position: fixed;
            top: 0;
            bottom: 0;
            left: auto;
            background: url(/img/mb-bg.jpg);
            background-size: auto 100%;
            z-index: 50;
            right: -100%;
            transition: right 0.3s ease-in-out;
            overflow-y: scroll;
        }
        .header.open {
            position: fixed;
            display: block;
            right: 0;
            left: 0;
            width: 100vw;
            height: 100%;
        }
        .header .wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .header .logotype {
            position: fixed;
            top: 3.5vw;
            left: 5vw;
            z-index: 999;
        }
        .header .logotype img {
            width: 20vw !important;
            height: 20vw !important;
        }
        .header .logotype.mobile-logo {
            display: block;
            position: absolute;
        }
        .header.open .logotype.mobile-logo {
            position: fixed;
        }
        .header__nav {
            flex-direction: column;
        }
        .header__nav a {
            margin-right: 0;
            font-size: 5.625vw;
            line-height: 250%;
            color: #ffffff;
            text-transform: none;
        }
        .right {
            flex-wrap: wrap;
            flex-direction: column;
            top: 24px;
            margin-left: 0;
        }
        .contacts {
            margin-right: 0;
        }
        .header__lang {
            margin-left: 0;
            top: 24px;
            margin-bottom: 64px;
        }
        .header__lang a:first-child {
            margin-right: 0;
        }
        .header__lang a {
            font-size: 3.75vw;
            line-height: 5vw;
            width: 15vw;
            height: 15vw;
        }
        .header__lang a:first-child, .header__lang a:nth-child(2) {
            margin-right: 2.5vw;
        }
        .header__nav_desktop {
            display: none;
        }
        .header__nav {
            display: flex;
            margin-top: 280px;
        }
    }
</style>
