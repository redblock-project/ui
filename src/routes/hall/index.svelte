<script lang="ts">
   import Hall from '$lib/pages/Hall.svelte';
   import { AppStore }  from '$lib/utils/Store'
</script>

<div class:hide={$AppStore.showLoader}>
   <Hall />
</div>

<style>
   .hide {
       display: none;
   }
</style>