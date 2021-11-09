<script lang="ts">
   import Team from '$lib/pages/Team.svelte';
   import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
   <Team />
</div>

<style>
   .hide {
       display: none;
   }
</style>