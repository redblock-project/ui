<script>
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
</script>

<h6>{messages[$AppStore.lang].installMetamask}</h6>
<a href="https://metamask.io/download.html" target="_blank">https://metamask.io/download.html</a>

<style>
    h6 {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: 1.875vw;
        letter-spacing: 0.24em;
        margin: 64px 0 64px 0;
        color: #181818;
    }
    a {
        font-family: 'Roboto Slab';
        font-style: normal;
        font-weight: normal;
        font-size: 1.25vw;
        font-size: 24px;
        text-align: center;
        text-decoration-line: underline;
        color: #D81828;
        margin-top: -100px;
        margin-bottom: 50px;
        display: inline-block;
    }
    @media screen and (max-width: 640px) {
        h6 {
            font-size: 5.625vw;
            text-align: center;
        }
        a {
            font-size: 5vw;
            text-align: center;
        }
    }
</style>