
<script>
  export let obj;
  export let id;
</script>

<div style="padding: 15px 0 0 15px">
  <div style="font-size: 12px">{obj.author} 
	{#if obj.private}
	  <span style="font-size: 13px; color: purple;">(private)</span> 
	{/if}
	| {obj.time} | <a href="/posts/{obj.post_id}">context</a></div>
    <div style="padding-top: 5px">{obj.content}</div>    
</div>
