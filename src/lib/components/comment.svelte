<script>
    export let obj;
    export let id;

    let replying=false;
    let reply="";

    import {messages, server} from "$lib/constants.js";
    async function submit() {
        await self.fetch(`${server}/comments`,
                         {method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({post: id, parent: obj.id, content:reply})});
    }
</script>

<div style="padding: 15px 0 0 15px">
    <div style="font-size: 12px">{obj.author} | {obj.time} | <a href="javascript:void(0);" on:click={()=>{replying=true}}>reply</a></div>
    <div style="padding-top: 5px">{obj.content}</div>
    {#if replying}
        <textarea bind:value={reply} style="width:350px; height: 100px; margin: 20px 0 10px 0"></textarea>
        <div><button on:click={async () => {
                await submit();
                location.reload();
                }}>Pyost (* ω)</button> <button on:click={() => {reply=""; replying=false;}}>Cawncew</button></div>
    {/if}

    <div>
        {#each obj.children as child}
            <svelte:self obj={child} id={id} />
        {/each}
    </div>
</div>    
