<script lang="ts">
    import { browser } from '$app/environment';

    let darkMode = true;

    function handleSwitchDarkMode() {
        darkMode = !darkMode;

        localStorage.setItem('theme', darkMode ? 'dark' : 'light');

        darkMode
            ? document.documentElement.setAttribute('data-theme', 'dark')
            : document.documentElement.setAttribute('data-theme', 'light');
    }

    if (browser) {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.setAttribute('data-theme', 'dark')
            darkMode = true;
        } else {
            document.documentElement.setAttribute('data-theme', 'light')
            darkMode = false;
        }
    }
</script>



<div id="wrapper">
    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />
</div>

<style lang="postcss">
    #wrapper {
        position: absolute;
        top: -6px;
        right: -75px;
    }

    #theme-toggle {
        @apply invisible;
    }

    #theme-toggle + label {
        @apply inline-block cursor-pointer h-6 w-6 absolute top-6 right-24 rounded-full duration-300 content-[''];
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-orange-300;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -9px -8px 0px 0px #ddd;
        /*box-shadow: inset -18px -16px 1px 1px #ddd;*/
    }
</style>
