<script>
    export let obj;
    export let id;
    import {getCookie} from "$lib/cookies.js";
    import {date_str} from "$lib/utils.js";

    import {marked} from "marked";
    import DOMPurify from "dompurify";

    let user = {};
    import { onMount } from 'svelte';

    onMount(async () => {
        let cookie = getCookie("argot__usr");
        user = (cookie && cookie != "") ? JSON.parse(cookie) : {};
    });

    $: isLogged = user.nick != undefined;

    let replying=false;
    let reply="";
    let priv=false;
    
    import {server} from "$lib/constants.js";

    async function delete_comment() {
        await self.fetch(`${server}/comments/${obj.id}`,
                         {method: "DELETE",
                          credentials: 'include'});
        location.reload();
    }
    
    async function submit() {
        await self.fetch(`${server}/comments`,
                         {method: "POST",
                          credentials: 'include',
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({post: id, parent: obj.id, content:reply, private:priv})});
    }

    function copy(comment_id) {
	  navigator.clipboard.writeText(
		location.protocol+'//'+location.hostname+(location.port ? ":"+location.port : "")+
		  "/posts/"+id+"#"+comment_id
	  );
    }  
  
    import "./comment.css";
</script>

<section id={obj.id}>
<div style="padding: 0 0 0 20px; min-width: 200px">
    <div style="font-size: 12px; margin:0; padding:0;" class="tooltip"><a  class="author" href="/users/{obj.author}">{obj.author}</a>
        {#if obj.private}
            <span style="font-size: 13px; color: purple;">(private)</span> 
        {/if}
        | {date_str(obj.time)} {#if isLogged}| <a href="javascript:void(0);" on:click={()=>{replying=true}}  class="tool">reply</a>{/if}
            <span style={"display:"+(user.nick == obj.author ? "inline-block;":"none;")}>| </span>
            <a style={"font-size: 12px; min-height: 20px; z-index: 100000; display:"+(user.nick == obj.author ? "inline-block;":"none;")}  class="tool" on:click={async () => {
                await delete_comment();
              }} href={"javascript:void(0)"}>delete</a> |
			<a class="tool" on:click={copy(obj.id)}>copy link</a>
    </div>
    <span style="font-size: 13px;">	
        <!-- <span style={"display:"+(user.nick == obj.author ? "inline-block;":"none;")}> -->
            
            <div style="padding-top: 5px; white-space: pre-wrap;">{@html DOMPurify.sanitize(marked.parse(obj.content))}</div>
            {#if replying}
                <div style="margin: 0 0 20px 0">
                <textarea bind:value={reply} style="width:350px; height: 100px; max-width: 100%" placeholder="Whatcha gotta say? Yarr!"></textarea>
                <div style="width: 350px; max-width: 100%;">
                    <span style="font-size: 13px; color: var(--blue) ">Private? &nbsp; <input type="checkbox" bind:checked={priv}/></span>
                    <div class="action">
                        <a href="javascript:void(0)" on:click={() => {reply=""; replying=false;}}>cancel</a>
                        <a href="javascript:void(0)" class="primary" on:click={async () => {
                            await submit();
                            location.reload();
                        }}>post</a> 
                    </div>
                </div>
                </div>
            {/if}

<div>
    {#each obj.children as child}
        <svelte:self obj={child} id={id} />
    {/each}
</div>
</div>    
</section>
