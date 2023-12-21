<script>
    import {messages, server} from "$lib/constants.js";

    import { page } from '$app/stores';
    let message = messages[Math.floor(Math.random() * messages.length)];
    import Link from "$lib/components/link.svelte";
    import Comment from "$lib/components/comment.svelte";

    $: post = $page.params.post;

    let reply = "";

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
                            "children": [{
                            "author": "quantumish",
                            "children": [],
                            "content": "Damn that's crazy. Engage in the most adowable and cozy dwiscussion, where thoughts awe expwessed with the utmost kawaii vibes! (* >ω<) Conversations unfurl like gentle nyuzzles, as pwecious ideas dance together in the soft moonlight of uwu. Each topic is embraced with a warm hug of nya-magic, turning mundane discussions into an enchanting journey through the whimsical land of kawaii communication. So, let's gathew awound, nya-friends, and embark on a delightful adventure of dwiscovewy and nyuance together! (´∩｡• ᵕ •｡∩`) Nyaa~ (∩^ω^∩)",
                            "id": 2,
                            "private": false,
                            "time": "7 hours ago"
                            }, {
                            "author": "quantumish",
                            "children": [],
                            "content": "this is an ice cone",
                            "id": 2,
                            "private": false,
                            "time": "7 hours ago"
                        }],
                            "content": "Damn that's crazy. Engage in the most adowable and cozy dwiscussion, where thoughts awe expwessed with the utmost kawaii vibes! (* >ω<) Conversations unfurl like gentle nyuzzles, as pwecious ideas dance together in the soft moonlight of uwu. Each topic is embraced with a warm hug of nya-magic, turning mundane discussions into an enchanting journey through the whimsical land of kawaii communication. So, let's gathew awound, nya-friends, and embark on a delightful adventure of dwiscovewy and nyuance together! (´∩｡• ᵕ •｡∩`) Nyaa~ (∩^ω^∩)",
                            "id": 2,
                            "private": false,
                            "time": "7 hours ago"
                        },
                        {
                            "author": "quantumish",
                            "children": [],
                            "content": "Damn that's crazy. Engage in the most adowable and cozy dwiscussion, where thoughts awe expwessed with the utmost kawaii vibes! (* >ω<) Conversations unfurl like gentle nyuzzles, as pwecious ideas dance together in the soft moonlight of uwu. Each topic is embraced with a warm hug of nya-magic, turning mundane discussions into an enchanting journey through the whimsical land of kawaii communication. So, let's gathew awound, nya-friends, and embark on a delightful adventure of dwiscovewy and nyuance together! (´∩｡• ᵕ •｡∩`) Nyaa~ (∩^ω^∩)",
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
                    "children": [{
                    "author": "quantumish",
                    "children": [],
                    "content": "this is NOT an ICE CREAM CONe.",
                    "id": 3,
                    "private": false,
                    "time": "7 hours ago"
                }],
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

    async function submit(id) {
        await self.fetch(`${server}/comments`,
                         {method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({post: id, content:reply})});
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

        <div><textarea bind:value={reply} style="width:350px; height: 100px; margin: 20px 0 10px 0"></textarea></div>
        <div><button on:click={() => {submit(link.id)}}>Pyost Comment (* ω)</button></div>
        <br />
        {#each link.comments as comment}
            <Comment obj={comment} id={link.id} />
        {/each}
    {/await}

    
</div>
