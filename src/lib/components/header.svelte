<script>
    import { onMount } from 'svelte';
    import {messages, server} from "$lib/constants.js";
    import { getCookie, deleteCookie } from "$lib/cookies.js";
    let message = messages[Math.floor(Math.random() * messages.length)];

    let user = {};
    onMount(async () => {
        let cookie = getCookie("argot__usr");
        user = (cookie && cookie != "") ? JSON.parse(cookie) : {};
    });
    
    $: isLogged = user.nick != undefined;

    async function logout() {	   
        const response = await self.fetch(`${server}/logout`, {credentials: 'include', method: 'POST'})	  
        deleteCookie("argot__usr");
        return response.json();	
    }

    import "./header.css";
    
</script>    

<div>
    <div class="header-callout">
        <a href="/"><div style="display: inline-block;" class="square">&nbsp;</div><h1 style="display: inline-block">Argot</h1></a>
    </div>
    <div><a class="header-user" href={!isLogged ?"javascript:void(0)":`users/${user.nick}`}>{isLogged?`${user.nick}`:"unauthenticated"}</a> <span class="menu" style="float:right; "><a href="/search">search</a> | <a href="/tags">tags</a> | <a href="/login" on:click={() => {if(isLogged) logout();}}>{isLogged ? "logout" : "login"}</a></span> </div>
</div>
