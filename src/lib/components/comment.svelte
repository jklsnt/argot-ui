<script>
    export let obj;
    export let id;

    let replying=false;
    let reply="";
    let priv=false;
  
    import {messages, server} from "$lib/constants.js";
    async function submit() {
        await self.fetch(`${server}/comments`,
                         {method: "POST",
                          credentials: 'include',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({post: id, parent: obj.id, content:reply, private:priv})});
    }
</script>

<div style="padding: 15px 0 0 15px">
  <div style="font-size: 12px"><a href="/users/{obj.author}">{obj.author}</a>
	{#if obj.private}
	  <span style="font-size: 13px; color: purple;">(private)</span> 
	{/if}
	| {obj.time} | <a href="javascript:void(0);" on:click={()=>{replying=true}}>reply</a></div>
    <div style="padding-top: 5px">{obj.content}</div>
    {#if replying}
        <textarea bind:value={reply} style="width:350px; height: 100px; margin: 20px 0 10px 0"></textarea>
        <div><button on:click={async () => {
                await submit();
                location.reload();
            }}>Pyost (* ω)</button> <button on:click={() => {reply=""; replying=false;}}>Cawncew</button>
		  <span style="margin-left: 3px; font-size: 13px">private? <input type="checkbox" bind:checked={priv}/></span>
		</div>
    {/if}

    <div>
        {#each obj.children as child}
            <svelte:self obj={child} id={id} />
        {/each}
    </div>
</div>    
