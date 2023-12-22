<script>

    import {messages, server} from "$lib/constants.js";


    let message = messages[Math.floor(Math.random() * messages.length)];

    let url = "";
    let title = "";
    let content = "";
    let priv = false;

    let curtag = "";
    let tags = [];
  
    import Link from "$lib/components/link.svelte";

    async function fetchTags() {	   
	    const response = await self.fetch(`${server}/tags`, {credentials: 'include'})
	    return response.json();
	}
    let promise = fetchTags();
  
    async function submit() {
        await self.fetch(`${server}/posts`,
                         {method: "POST",
                          credentials: 'include',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                              title: title,
                              link: url,
                              content: content,
							  private: priv,
							  tags: tags.map((t) => t.id)
                          })});
        window.location.href = "/";      
    }

    let used = [];
</script>

<div style="">
    <h1>Argot</h1>
    <i>{message}</i>

    <hr />

    <ul>
        <li>URL (* ω): <input type="text" bind:value={url} /></li>
        <li>Titwe (*≧▽≦):: <input type="text" bind:value={title} /></li>
        <li>Content (⁄ ⁄•⁄ω⁄•⁄ ⁄): <br><textarea style="width: 400px;"bind:value={content}></textarea></li>
		<li>Private?: <input type="checkbox" bind:checked={priv}/></li>		
    </ul>
	Tags:
	{#await promise}
      <p>Loading... :3</p>
    {:then avail_tags}
	  <select bind:value={curtag}>
		{#each avail_tags as tag}
            {#if !used.includes(tag.name)}
                <option value="{tag}">{tag.name}</option>
            {/if}
		{/each}
	  </select>
	{/await}
	<button on:click={() => {tags.push(curtag); tags=tags; used.push(curtag.name); used=used;}}>+</button><br>	

	
    <hr />

    <!-- <div style="display: flex; justify-content: space-between; align-items:center"><h2>winkie-linkies OwO</h2> <button style="max-height: 25px; cursor: pointer" on:click={() => {window.location.href="/submit"}}>UwU~! Suwubmit winky-wink!</button></div> -->

    <!-- {#each links as link} -->
        <!-- <Link obj={link} /> -->
    <!-- {/each} -->

    Pwease dewight in this exclusive linkie cuwated by none othew than meowself:
    <Link obj={{title: "​"+title, link:url, author:"you", content: content, time:"just now", tags: tags.map((t) => t.name), private: priv}} />
    <hr />
    <button on:click={submit}>UwU~! (*≧ω≦) Suwubmit this wink nyow, desu~! (´•̥ ω •̥`) Nyaa~ (∩^ω^∩)</button>
</div>
