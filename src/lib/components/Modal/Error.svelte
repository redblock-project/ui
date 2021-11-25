<script>
    // @ts-nocheck
  
      import { onMount } from "svelte"; 
      import { AppStore, MintStore } from "$lib/utils/Store";
      import messages from "$lib/_locales/messages.json";
      export let err = '';
  
      if ("not_whitelisted" === err) {
          err = messages[$AppStore.lang].nowhitelist;
      }
      if (-1 !== err.indexOf("Cannot create instance of")) {
          err = "Please switch the network to Ethereum mainnet";
      }
  
      onMount(() => {
   
      });
  </script>
  
  <h5>{messages[$AppStore.lang].error}</h5>
  <h6>{@html err}</h6>
  
  <style>
      h5, h6 {
          font-family: "Rubik";
          font-style: normal;
          font-weight: 900;
          font-size: 1.875vw;
          letter-spacing: 0.24em;
          margin: 64px 0 64px 0;
          color: #181818;
      }
      h6 {
          margin: auto;
          margin-bottom: 64px;
          font-size: 1vw;
      }
      @media screen and (max-width: 640px) {
          h5 {
              font-size: 5.625vw;
              margin: 32px 0 32px 0;
              text-align: center;
          }
          h6 {
              font-size: 4.625vw;
              text-align: center;
          }
      }
  </style>