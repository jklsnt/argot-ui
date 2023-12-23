<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import StaticComment from "$lib/components/staticcomment.svelte";
    import Header from "$lib/components/header.svelte";
    $: user = $page.params.user;

    let reply = "";
  let priv = false;

    async function fetchPost(username) {
      const response = await self.fetch(`${server}/users/${username}`, {credentials: 'include'})
	  let blah = await response.json();
	  console.log(blah);
      return blah;
    }

    $: promise = fetchPost(user);
</script>    

<div style="">
    <Header />

	<br>

    {#await promise}
        <div class="loadbar">
            <p>Loading... :3</p>
        </div>
    {:then user}
	  <h2 class="callout">{user.nick}</h2>
	  <p>{user.bio}</p>

	  <h3 class="secondary">Posts</h3>
      {#each user.posts as link}
        <Link obj={link}/>
      {/each}
	  <h3 class="secondary" style="margin-bottom: 20px">Comments</h3>

      {#each user.comments as comment}
        <StaticComment obj={comment} id={comment.id} />
      {/each}
    {/await}

    
</div>
