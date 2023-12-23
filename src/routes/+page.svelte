<script>

    import { onMount } from 'svelte';
    import {messages, server} from "$lib/constants.js";
    import { getCookie, deleteCookie } from "$lib/cookies.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";
    
  
    let user = {};
    let promise = new Promise((res, _) => res([]));
    
    async function fetchPosts() {	   
        const response = await self.fetch(`${server}/posts`, {credentials: 'include'})	  
        return response.json();	
    }
  
    onMount(async () => {
        let cookie = getCookie("argot__usr");
        user = (cookie && cookie != "") ? JSON.parse(cookie) : {};
        promise = fetchPosts();
    });
    
    $: isLogged = user.nick != undefined;

    async function logout() {	   
        const response = await self.fetch(`${server}/logout`, {credentials: 'include', method: 'POST'})	  
        deleteCookie("argot__usr");
        return response.json();	
    }

    import "./home.css";
    
</script>    

<div style="">
    <Header />
    <br />
    <div class="links-header">
      <h2 class="callout">Links</h2>
      {#if isLogged}
        <a style={"cursor: pointer; float:right;"} href="/submit" class="mono">(submit)</a>
      {/if}
    </div>

    {#await promise}
        <div class="loadbar">
            <p>Loading...</p>
        </div>
    {:then links}
        {#if links.length == 0}
            <div class="empty">Such emptiness... Submit something?</div>
        {:else}
            {#each links as link}
                <Link obj={link} />
            {/each}
        {/if}
    {/await}


</div>
