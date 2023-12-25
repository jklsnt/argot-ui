<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

  import Link from "$lib/components/link.svelte";
  import StaticComment from "$lib/components/staticcomment.svelte";
    import Header from "$lib/components/header.svelte";
    let search = "";
    let posts = [];
    let comments = [];

    async function fetchPosts(query) {
        const response = await self.fetch(`${server}/posts/search`,
                                          {method: "PUT",
										   credentials: 'include',
                                          headers: {
                                              'Content-Type': 'text/plain'
                                          },
                                          body: search});
      posts = await response.json();
    }
    async function fetchComments(query) {
        const response = await self.fetch(`${server}/comments/search`,
                                          {method: "PUT",
										   credentials: 'include',
                                          headers: {
                                              'Content-Type': 'text/plain'
                                          },
                                          body: search});
      comments = await response.json();
    }
    
</script>    

<div style="">
    <Header />
    <br />
    <h3 class="callout" style="padding-bottom: 5px">Search</h3>
    <input 
        bind:value={search}
        on:keydown={e => {e.keyCode == 13 && (() => {fetchPosts(search); fetchComments(search)})()}}
        type="text" style="min-width: 400px; margin-right: 10px;"/>
        <button on:click={() => {fetchPosts(search); fetchComments(search);}}>search</button>
    <br />
	<br />

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>Links</h2></div>

    {#each posts as link}
        <Link obj={link} />
      {/each}

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>Comments</h2></div>

    {#each comments as comment}
        <StaticComment obj={comment} />
    {/each}

</div>
