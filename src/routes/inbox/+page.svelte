<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import StaticComment from "$lib/components/staticcomment.svelte";
    import Header from "$lib/components/header.svelte";
    import "$lib/components/comment.css";
    $: user = $page.params.user;

    let reply = "";
    let priv = false;
  
    async function fetchInbox(username) {
      const response = await self.fetch(`${server}/inbox`, {credentials: 'include'})
	  return response.json();	  
    }

    async function markRead(comment_id) {
      const response = await self.fetch(`${server}/inbox/read/${comment_id}`, {method: "POST", credentials: 'include'})
	  return response.json();	  
    }

  
  
    $: promise = fetchInbox(user);
</script>    

<div style="">
    <Header />


    <hr />
    {#await promise}
        <div class="loadbar">
            <p>Loading... :3</p>
        </div>
    {:then comments}	  
	  <h3 class="secondary">Inbox</h3>

      {#each comments as comment}
		<a on:click={markRead(comment.id)} class="tool">(mark read)</a>
        <StaticComment obj={comment} id={comment.id} />
      {/each}
    {/await}

    
</div>
