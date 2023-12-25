<script>

    import {messages, server} from "$lib/constants.js";

    import {validURL} from "$lib/utils.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    let url = "";
    let title = "";
    let content = "";
    let priv = false;

    let curtag = "";
    let tags = [];
  
    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";

    async function fetchTags() {
	    const response = await self.fetch(`${server}/tags`, {credentials: 'include'})
	    return response.json();
	}
    let promise = fetchTags();
  
    async function submit() {
        if (url.trim() != "" && !validURL(url)) {
            alert("Not a valid URL! Don't forget the protocol.");
            return;
        }
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
                              tags: tags.map(t => t.id)
                          })});
        window.location.href = "/";      
    }

    let used = [];
    import "./submit.css";
</script>

<div style="">
  <Header />
  <br />
  <h2 class="callout">New Post</h2>
  <div>
    <ul style="margin-top: 10px; margin-bottom: 10px;">
        <li>Title: <input type="text" bind:value={title} placeholder="Titles are Good" /></li>
        <li>URL (optional): <input type="text" bind:value={url} placeholder="https://example.com" /></li>
        <li>Content (optional): <br><textarea style="width: 400px; max-width: 100%; padding: 7px" placeholder="Why does a woodchuck? Chuck?" bind:value={content}></textarea></li>
		<li>Private? &nbsp; <input type="checkbox" bind:checked={priv}/></li>
		<li><div>
    
	<button style="float:right" on:click={submit}>Submit!</button>
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
	</div></li>
	</ul>

    </div>
  <br />
    <hr />
  <br />
    
    <Link obj={{title: "​"+title, link:url, author:"you", content: content, time:"just now", tags: tags.map((t) => t.name), private: priv}} isStatic />
    
</div>
