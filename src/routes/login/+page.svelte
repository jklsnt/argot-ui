<script>

    import {messages, server} from "$lib/constants.js";
    import {setCookie} from "$lib/cookies.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";

    let nick = "";
    let password = "";
    let bio = "";
    let email = "";
    async function do_login() {
        let res = await self.fetch(`${server}/login`,
                                   {method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    credentials: 'include',
                                    body: JSON.stringify({
                                        nick,
                                        password
                                    })});

        let data = await res.json();
        // we store the user information for future UI use
        // for instance, we shouldn't bother rendering a delete
        // button for things that can't be deleted
        setCookie("argot__usr", JSON.stringify(data), null);

        window.location.href = "/";

    }
  
    async function submit() {
        await do_login();
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
        await do_login();
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

    <hr />

	<p> No account? Sign up! </p>	
	<ul>
        <li>Nick: <input type="text" bind:value={nick} /></li>
        <li>Password: <input type="password" bind:value={password} /></li>
		<li>Email: <input type="text" bind:value={email} /></li>
		<li>Bio<br> <textarea bind:value={bio} style="width: 400px; height: 100px;"></textarea></li>
    </ul>
	<button on:click={sign_submit}>Sign up</button>
	
</div>
