
<script>
    export let obj;
    export let id;
    export let markread;
    import {date_str} from "$lib/utils.js";
    import {marked} from "marked";
    import DOMPurify from "dompurify";
    import "./comment.css";
</script>

<div style="min-width: 200px">
    <div style="font-size: 12px" class="tooltip">
        <div style="font-size: 12px; margin:0; padding:0;" class="tooltip"><a  class="author" href="/users/{obj.author}">{obj.author}</a>
        {#if obj.private}
            <span style="font-size: 13px; color: purple;">(private)</span> 
        {/if}
        | {date_str(obj.time)} | <a href="/posts/{obj.post_id}"  class="tool">context</a> {#if markread} | <a href="javascript:void(0)" on:click={() => markread()} class="tool">mark as read</a>{/if}
        </div>
</div>

    <div style="padding-top: 5px; white-space: pre-wrap;">{@html DOMPurify.sanitize(marked.parse(obj.content))}</div>
</div>
