<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import StaticComment from "$lib/components/staticcomment.svelte";

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
    <h1>Argot</h1>
    <i>{message}</i>

    <hr />

    {#await promise}
        <p>Loading... :3</p>
    {:then user}
	  <h3>{user.nick}</h3>
	  <p>{user.bio}</p>

	  <br>
	  <h4> Posts </h4>
      {#each user.posts as link}
        <Link obj={link}/>
      {/each}
	  <h4> Comments </h4>

      {#each user.comments as comment}
        <StaticComment obj={comment} id={comment.id} />
      {/each}
    {/await}

    
</div>
