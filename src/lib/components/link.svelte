<script>
    export let obj; 
    import {server} from "$lib/constants.js";
    import {getCookie} from "$lib/cookies.js";
    import {date_str} from "$lib/utils.js";

    import {marked} from "marked";
    import DOMPurify from "dompurify";

    // document.getElementById('content').innerHTML = marked.parse('# Marked in the browser\n\nRendered by **marked**.');
    
    let cookie = getCookie("argot__usr")
    let user = (cookie && cookie != "") ? JSON.parse(cookie) : {};

    async function delete_post() {
        await self.fetch(`${server}/posts/${obj.id}`,
                         {method: "DELETE",
                          credentials: 'include'});
        window.location.href = "/";
    }

    function getLink(link) {
        try {
            return new URL(link).host 
        }
        catch (e) {
            return link
        }
    }

    export let isStatic;

    import "./link.css";
</script>

<div class="link">
    <span class="header">
        <a href={obj.link} style="text-decoration: none; cursor:pointer"><span>{obj.title}</span>
            <span style="opacity: 0.4; color: blue; font-size: 10px"> {getLink(obj.link)}</span></a>	
    </span>	  
    <div style="float:right; font-size: 1; display: flex; flex-direction: column; gap: 3px; z-index: 10000; position: relative;" class="toolbox">	
        <span style="text-align: right;" class="author"><a href="/users/{obj.author}">{obj.author}</a></span>
        <span style="font-size: 13px;" class="tooltip"><a style={"font-size: 13px; min-height: 20px; z-index: 100000; display:"+(user.nick == obj.author ? "inline-block;":"none;")} on:click={async () => {
                await delete_post();
            }} href={"javascript:void(0)"}  class="tool">delete</a> <span style={"display:"+(user.nick == obj.author ? "inline-block;":"none;")}>| </span> <span style={"display: "+(isStatic?"none":"inline")}>{#if obj.num_comments != 0}({obj.num_comments}){/if} <a style="font-size: 13px; min-height: 20px; display: inline-block;z-index: 100000" href={`/posts/${obj.id}`} class="tool">discuss</a>  |</span> {date_str(obj.time)}</span>
                </div>
    <div>
        {#if obj.private}
            <span style="margin-right: 3px; font-size: 13px; color: purple;">(private)</span>	
        {/if}

{#if !obj.private && obj.tags.length == 0 && obj.content == ""}
    <span style="opacity: 0.4; font-size: 13px;">No content or tags...</span>
{/if}

{#each obj.tags as tag}
    <span style="margin-right: 8px; font-size: 13px; color: blue; max-width: 100%; display: inline-block">
        <a href="/query?q={tag}">{tag}</a>
    </span>
{/each}
{#if obj.content != null && obj.content != ""}
    {@html DOMPurify.sanitize(marked.parse(obj.content))}
{/if}
  </div>
</div>    

