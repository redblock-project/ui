<script>
    import { AppStore } from "$lib/utils/Store";
    import messages from "$lib/_locales/messages.json";
</script>
<h6>{messages[$AppStore.lang].coming}</h6>
<style>
    h6 {
        font-family: "Rubik";
        font-style: normal;
        font-weight: 900;
        font-size: min(1.875vw, 36px);
        letter-spacing: 0.24em;
        margin: 64px 0 64px 0;
        color: #181818;
    }
    @media screen and (max-width: 640px) {
        h6 {
            font-size: 5.625vw;
            line-height: 6.71875vw;
            text-align: center;
        }
    }
</style>