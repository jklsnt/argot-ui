<script>

    import {messages} from "$lib/constants.js";


    let message = messages[Math.floor(Math.random() * messages.length)];

    let links = [
        {
            "title": "ChickenGPT",
            "link": "https://chickengpt.com",
            "author": "jemoka",
            "time": "two minutes ago",
            "content": null
        },
        {
            "title": "Assembly micro-optimizations",
            "link": "https://example2.com",
            "author": "quantumish",
            "time": "five minutes ago",
            "content": "I'm a big potato."
        },
        {
            "title": "Assembly micro-optimizations",
            "link": "https://example2.com",
            "author": "quantumish",
            "time": "four hours ago",
            "content": "UwU~! (ฅ^・ω・^ ฅ) Nyaa~! In the whimsical realm of JavaScript, imagine a playful dance with the elusive DateTimeFormat object. With a sprinkle of coding magic, the current date and time gracefully transform into a delightful string, adorned in the format of hh:mm:ss mm/dd/yyyy. This enchanting snippet creates a mesmerizing output, offering a glimpse into a world where digits waltz harmoniously, revealing a charming display like 08:30:45 01/25/2023. The script invites you to tailor the date object to your liking, ensuring a personalized touch to this joyous ballet of time formatting. Nyaa~ (∩^ω^∩)"
        },
        {
            "title": "Fast code tricks",
            "link": "https://example.com",
            "author": "quantumish",
            "time": "seven days ago",
            "content": null
        }
    ]

    import Link from "$lib/components/link.svelte";
    
</script>    

<div style="">
    <h1>Argot</h1>
    <i>{message}</i>

    <hr />

    <div style="display: flex; justify-content: space-between; align-items:center"><h2>winkie-linkies OwO</h2> <button style="max-height: 25px; cursor: pointer" on:click={() => {window.location.href="/submit"}}>UwU~! Suwubmit winky-wink!</button></div>

    {#each links as link}
        <Link obj={link} />
    {/each}

</div>
