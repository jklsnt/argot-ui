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
        response.json();	  

        location.reload();
    }

  
  
    $: promise = fetchInbox(user);
</script>    

<div style="">
    <Header />


    <br />
    <h3 class="callout">Inbox</h3>
    {#await promise}
        <div class="loadbar">
            <p>Loading... :3</p>
        </div>
    {:then comments}	  

    <div style="margin-top: 10px">
      {#each comments as comment}
        <StaticComment obj={comment} id={comment.id} markread={() => {markRead(comment.id)}} />
      {/each}
    </div>
    {/await}

    
</div>
