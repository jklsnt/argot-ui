<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import Comment from "$lib/components/comment.svelte";

    $: post = $page.params.post;

    async function fetchPost(postID) {
        console.log(`fetching ${postID}`)
        // const response = await self.fetch(`${server}/posts`)
        // return response.json();	
        return {
            "author": "quantumish",
            "comments": [
                {
                    "author": "quantumish",
                    "children": [
                        {
                            "author": "quantumish",
                            "children": [],
                            "content": "Damn that's crazy.",
                            "id": 2,
                            "private": false,
                            "time": "7 hours ago"
                        }
                    ],
                    "content": "Deep personal info.",
                    "id": 1,
                    "private": true,
                    "time": "7 hours ago"
                },
                {
                    "author": "quantumish",
                    "children": [],
                    "content": "Boring stuff.",
                    "id": 3,
                    "private": false,
                    "time": "7 hours ago"
                }
            ],
            "content": null,
            "id": 1,
            "link": "https://example.com",
            "private": false,
            "tags": [
                "asm",
                "cool",
                "wack"
            ],
            "time": "7 hours ago",
            "title": "Whee"
        }
    }

    $: promise = fetchPost(post);
</script>    

<div style="">
    <h1>Argot</h1>
    <i>{message}</i>

    <hr />

    {#await promise}
        <p>Loading... :3</p>
    {:then link}
        <Link obj={link} />
        {#each link.comments as comment}
            <Comment obj={comment} />
        {/each}
    {/await}

    
</div>
