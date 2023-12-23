<script>
    export let obj; 
    import {server} from "$lib/constants.js";
    import {validURL} from "$lib/utils.js";
</script>

<div style="border: 1px dotted gray; margin: 10px 0; padding: 15px;">
    <span>
        <a href={obj.link} style="text-decoration: none; cursor:pointer"><span>{obj.title}</span>
            <span style="opacity: 0.4; color: blue; font-size: 10px"> {obj.link && obj.link.trim() != "" && obj.link.includes(".") && validURL(obj.link) ? (new URL(obj.link)).host : obj.link}</span></a>	
    </span>	  
    <div style="float:right; font-size: 1; display: flex; flex-direction: column; gap: 3px; z-index: 10000; position: relative;">	
      <span style="text-align: right;"><a href="/users/{obj.author}">{obj.author}</a></span>
       <span style="font-size: 13px">{obj.time}</span>
    </div>
    <!-- <br><span style="font-size: 13px;">edit</span> -->
    <div>
        {#if obj.private}
            <span style="margin-right: 3px; font-size: 13px; color: purple;">(private)</span>	
        {/if}

{#if !obj.private && obj.tags.length == 0 && obj.content == ""}
    <span style="opacity: 0.4; font-size: 13px;">No content or tags...</span>
{/if}

{#each obj.tags as tag}
    <span style="margin-right: 8px; font-size: 13px; color: hotpink; max-width: 100%; display: inline-block;">
        <a href="/query?q={tag}">{tag}</a>
    </span>
{/each}
{#if obj.content != null && obj.content != ""}
    <div style="margin-top:5px; font-size: 15px; white-space: pre-line;">{obj.content}</div>
<!-- {:else} -->
    <!--   <div style="opacity:0.3">Usuwu did nyot suwubmit contenty-wontent~!</div> -->
{/if}
  </div>
</div>    
