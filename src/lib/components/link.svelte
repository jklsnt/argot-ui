<script>
    export let obj;
</script>

<div style="border: 1px dotted gray; margin: 10px 0; padding: 15px;">
    <a href={obj.link} style="text-decoration: none; cursor:pointer"><span>{obj.title}</span> <span style="opacity: 0.4; color: blue; font-size: 10px"> {obj.link}</span></a>
    <div style="float:right; font-size: 1; display: flex; flex-direction: column; gap: 3px">
        <span style="text-align: right;">{obj.author}</span>
        <span style="font-size: 13px;">{obj.time}</span>
    </div>
    <div style="margin-top:5px">
    {#if obj.content != null && obj.content != ""}
    <div>{obj.content}</div>
    {:else}
        <div style="opacity:0.3">Usuwu did nyot suwubmit contenty-wontent~!</div>
    {/if}
    </div>

</div>    




