<script>

    import {messages, server} from "$lib/constants.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    let nick = "";
    let password = "";
    let bio = "";
    let email = "";
  
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
        window.location.href = "/";
        a
    }

    async function sign_submit() {
        await self.fetch(`${server}/signup`,
                         {method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          credentials: 'include',
                          body: JSON.stringify({
                              nick,
                              password,
							  bio,
							  email
                          })});
	  await self.fetch(`${server}/login`,
                         {method: "POST",
                          headers: {
                              'Content-Type': 'application/json'
                          },
                          credentials: 'include',
                          body: JSON.stringify({
                              nick,
                              password,
                          })});
        window.location.href = "/";
        
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

	<p> No account? Sign up! </p>	
	<ul>
        <li>Nick: <input type="text" bind:value={nick} /></li>
        <li>Password: <input type="password" bind:value={password} /></li>
		<li>Email: <input type="text" bind:value={email} /></li>
		<li>Bio<br> <textarea bind:value={bio} style="width: 400px; height: 100px;"></textarea></li>
    </ul>
	<button on:click={sign_submit}>Sign up</button>
	
</div>
