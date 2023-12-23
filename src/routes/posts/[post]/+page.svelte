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

    import "./post.css";
</script>    

<div style="">
   <Header />


   <br />
    {#await promise}
        <div class="loadbar">
            <p>Loading...</p>
        </div>
    {:then link}
        <Link obj={link} />

        <br />
        <h1 class="secondary" style="font-size: 15px; margin-bottom: 0px">{link.num_comments} Comments</h1>


        <div><textarea placeholder="Replies? Comments? Angry tomatos?" bind:value={reply} style="width:100%; height: 100px; margin: 6px 0 10px 0"></textarea></div>
        <div><a href="javascript:void(0)" on:click={async () => {await submit(link.id); location.reload()}} class="post">Submit</a>
		  <span style="font-size: 13px; color: var(--blue)">Private? &nbsp; <input type="checkbox" bind:checked={priv}/></span>
		</div>
        <br />
        <div style="transform: translateX(-20px);">
            {#each link.comments as comment}
                <Comment obj={comment} id={link.id} />
            {/each}
        </div>
    {/await}

    
</div>
