<script>
    export let obj;
</script>

<div style="padding: 15px 0 0 15px">
    <div style="font-size: 12px">{obj.author} | {obj.time}</div>
    <div style="padding-top: 5px">{obj.content}</div>
    <div>
        {#each obj.children as child}
            <svelte:self obj={child} />
        {/each}
    </div>
</div>    
