<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    let nick = "";
    let password = "";

    async function submit() {
        await self.fetch(`${server}/login`,
                         {method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          credentials: 'include',
                          body: JSON.stringify({
                              nick,
                              password
                          })});
        // window.location.href = "/";
        
    }
</script>    

<div style="">
    <div><h1 style="display: inline-block">Argot</h1></div>
    <i>{message}</i>

    <hr />

    <ul>
        <li>UrName (* ω): <input type="text" bind:value={nick} /></li>
        <li>NyuzzlePaws (*≧▽≦):: <input type="password" bind:value={password} /></li>
    </ul>


    <button on:click={submit}>Nyaa~! The usew entews a kwaii wo-wld, login with nya-joy! (* ω) Nyaa~ (∩^ω^∩)</button>
</div>
