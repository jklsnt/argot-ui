<script>

    import {messages, server} from "$lib/constants.js";
    import {setCookie} from "$lib/cookies.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    import Link from "$lib/components/link.svelte";
    import Header from "$lib/components/header.svelte";
  
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
        setCookie("argot__usr", JSON.stringify(data));

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

    import "./signup.css";

  
</script>    

<div style="">
    <Header />

    <hr />

	<h2 style="margin-bottom: 10px; margin-top: 10px;"> login </h2>
    <ul>
        <li>nick: <input type="text" bind:value={nick} /></li>
        <li>password: <input type="password" bind:value={password} /></li>
    </ul>

    <button style="margin-bottom: 10px;" on:click={submit}>log in</button>	

    <hr />

	<h2 style="margin-bottom: 10px; margin-top: 10px;"> signup </h2>
    <p class="note">Available to authorised users only.</p>
	<ul>
        <li>nick: <input type="text" bind:value={nick} /></li>
        <li>password: <input type="password" bind:value={password} /></li>
		<li>email (optional): <input type="text" bind:value={email} /></li>
		<li>bio (optional):<br> <textarea bind:value={bio} style="width: 400px; height: 100px; padding: 10px; margin-top: 5px; margin-left: 0;" placeholder="I like tomatos and I cannot lie."></textarea></li>
    </ul>
	<button on:click={sign_submit}>sign up</button>
	
</div>
