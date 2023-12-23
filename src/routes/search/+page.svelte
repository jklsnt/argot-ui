<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";
    let search = "";
    let posts = []

    async function fetchPosts(query) {
        const response = await self.fetch(`${server}/posts/search`,
                                          {method: "PUT",
										   credentials: 'include',
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
    <Header />
    <hr />

    <br />
    <input bind:value={search} type="text" style="min-width: 400px; margin-right: 10px;"/> <button on:click={() => {fetchPosts(search)}}>search</button>
    <br />
	<br />

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>Results</h2></div>

    {#each posts as link}
        <Link obj={link} />
    {/each}

</div>
