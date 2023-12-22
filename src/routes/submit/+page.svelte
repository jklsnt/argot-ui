<script>

    import {messages, server} from "$lib/constants.js";


    let message = messages[Math.floor(Math.random() * messages.length)];

    let url = "";
    let title = "";
    let content = "";
    let priv = false;

    import Link from "$lib/components/link.svelte";

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
                          })});
        window.location.href = "/";
        
    }
</script>

<div style="">
    <h1>Argot</h1>
    <i>{message}</i>

    <hr />

    <ul>
        <li>URL (* ω): <input type="text" bind:value={url} /></li>
        <li>Titwe (*≧▽≦):: <input type="text" bind:value={title} /></li>
        <li>Content (⁄ ⁄•⁄ω⁄•⁄ ⁄): <textarea bind:value={content}></textarea></li>
		<li>Private?: <input type="checkbox" bind:checked={priv}/></li>
    </ul>
    <hr />

    <!-- <div style="display: flex; justify-content: space-between; align-items:center"><h2>winkie-linkies OwO</h2> <button style="max-height: 25px; cursor: pointer" on:click={() => {window.location.href="/submit"}}>UwU~! Suwubmit winky-wink!</button></div> -->

    <!-- {#each links as link} -->
        <!-- <Link obj={link} /> -->
    <!-- {/each} -->

    Pwease dewight in this exclusive linkie cuwated by none othew than meowself:
    <Link obj={{title: "​"+title, link:url, author:"you", content: content, time:"just now", tags: [], private: priv}} />
    <hr />
    <button on:click={submit}>UwU~! (*≧ω≦) Suwubmit this wink nyow, desu~! (´•̥ ω •̥`) Nyaa~ (∩^ω^∩)</button>
</div>
