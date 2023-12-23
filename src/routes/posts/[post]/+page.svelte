<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import Comment from "$lib/components/comment.svelte";
    import Header from "$lib/components/header.svelte";
    $: post = $page.params.post;

    let reply = "";
  let priv = false;

    async function fetchPost(postID) {
      const response = await self.fetch(`${server}/posts/${postID}`, {credentials: 'include'})
	  let blah = await response.json();
	  console.log(blah);
      return blah;	
    }

    async function submit(id) {
        await self.fetch(`${server}/comments`,
                         {method: "POST",
                          credentials: 'include',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({post: id, content:reply, private:priv})});
    }

    $: promise = fetchPost(post);
</script>    

<div style="">
   <Header />

    <hr />

    {#await promise}
        <p>Loading... :3</p>
    {:then link}
        <Link obj={link} />

        <div><textarea bind:value={reply} style="width:350px; height: 100px; margin: 20px 0 10px 0; max-width: 100%"></textarea></div>
        <div><button on:click={async () => {await submit(link.id); location.reload()}}>post</button>
		  <span style="margin-left: 3px; font-size: 13px">private? <input type="checkbox" bind:checked={priv}/></span>
		</div>
        <br />
        {#each link.comments as comment}
            <Comment obj={comment} id={link.id} />
        {/each}
    {/await}

    
</div>
