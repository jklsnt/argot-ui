<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    let search = "";
    let posts = []

    async function fetchPosts(query) {
        const response = await self.fetch(`${server}/posts/search`,
                                         {method: "PUT",
                                          headers: {
                                              'Content-Type': 'text/plain'
                                          },
                                          body: search});
      posts = await response.json();
	  console.log(posts);
    }
    // let promise = fetchPosts();
    // let promise = handleSearch();
    
</script>    

<div style="">
    <div><h1 style="display: inline-block">Argot (Search)</h1></div>
    <i>{message}</i>

    <hr />

    <br />
    <input bind:value={search} type="text" style="min-width: 400px; margin-right: 10px;"/> <button on:click={() => {fetchPosts(search)}}>Fetch~!" (≧◡≦)</button>
    <br />

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>Results</h2></div>

    {#each posts as link}
        <Link obj={link} />
    {/each}

</div>
