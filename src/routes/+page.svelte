<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    async function fetchPosts() {
        // const response = await self.fetch(`${server}/posts`)
        // return response.json();	
        return [
            {
                "author": "quantumish",
                "content": null,
                "id": 1,
                "link": "https://example.com",
                "private": false,
                "tags": [
                    "asm",
                    "cool",
                    "wack"
                ],
                "time": "7 hours ago",
                "title": "Whee"
            }];
    }
    let promise = fetchPosts();
    
</script>    

<div style="">
    <h1>Argot</h1>
    <i>{message}</i>

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
