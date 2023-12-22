<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    import { page } from '$app/stores'
    const query = $page.url.searchParams.get('query')
    
    async function fetchPosts() {	   
        const response = await self.fetch(`${server}/posts`, {credentials: 'include'})	  
        return response.json();	
    }
    async function logout() {	   
        const response = await self.fetch(`${server}/logout`, {credentials: 'include', method: 'POST'})	  
        return response.json();	
    }
    let promise = fetchPosts();
    
</script>    

<div style="">
    <div><h1 style="display: inline-block">Argot</h1></div>
    <i>{message} <span style="float:right"><a href="/search">search</a> | <a href="/tags">tags</a> | <a href="/login">login</a> | 
            <a href="/login" on:click={() => {logout()}}>logout</a></span> </i>

    <hr />

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>Links</h2> <button style="max-height: 25px; cursor: pointer" on:click={() => {window.location.href="/submit"}}>UwU~! Suwubmit winky-wink!</button></div>

    {#await promise}
        <p>Loading... :3</p>
    {:then links}
        {#each links as link}
            <Link obj={link} />
        {/each}
    {/await}

</div>
