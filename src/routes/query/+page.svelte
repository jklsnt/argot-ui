<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";

    import { page } from '$app/stores'
    const query = $page.url.searchParams.get('q')
  
  async function fetchPosts() {
	 let response = "";
	if (query != null) {		
      response = await self.fetch(`${server}/posts/query`, {credentials: 'include',
													  headers: {
														'Content-Type': 'text/plain'
													  },
													  body: query,
													  method: "PUT"})
	  } else {
		response = await self.fetch(`${server}/posts`, {credentials: 'include'})
	  }
        return response.json();	
    }
    let promise = fetchPosts();
    
</script>    

<div style="">
    <Header />

    <hr />
	<br />
    <div class="links-header">
      <h2>Links</h2>
	  <a style="cursor: pointer; float:right" href="/submit" class="mono">(submit)</a>
    </div>
    <hr />
    
    {#await promise}
        <p>Loading... :3</p>
    {:then links}
        {#each links as link}
          <Link obj={link} />
		  <hr />
        {/each}
    {/await}

</div>
