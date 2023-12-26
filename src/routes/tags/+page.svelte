<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";

    import { page } from '$app/stores'
    const query = $page.url.searchParams.get('query')

    let newtag = "";
    
    async function fetchTags() {	   
        const response = await self.fetch(`${server}/tags`, {credentials: 'include'})	  
        return response.json();	
    }
    async function addTag(name) {	   
        await self.fetch(`${server}/tags/${name}`,
                         {method: "POST",
                          credentials: 'include',
                         });				
    }   
    let promise = fetchTags();
    
</script>    

<div style="">
    <Header />

    <br />

    <h2 class="callout">Tags</h2> 

    <input bind:value={newtag} type="text" style="min-width: 100px; margin-right: 10px;"/> <button on:click={async () => {await addTag(newtag); location.reload()}}>Add</button><br><br>
    
    {#await promise}
        <p>Loading... :3</p>
    {:then tags}
        {#each tags as tag}
            <span style="width: 10px; background-color: #d9d9d9; padding: 5px; border-radius: 5px;">
                <a href="/query?q={tag.name}" style="background-color: #d9d9d9">{tag.name}</a>
            </span><br><br>
        {/each}
    {/await}

<!-- <button style="max-height: 25px; cursor: pointer" on:click={() => {window.location.href="/submit"}}>UwU~! Suwubmit winky-wink!</button>) -->

</div>
