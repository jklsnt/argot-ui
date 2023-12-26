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



    <input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
    <label for="theme-toggle" />

<style lang="postcss">
    #wrapper {
        position: absolute;
        top: -6px;
        right: -75px;
    }

    #theme-toggle {
        @apply invisible;
        position: absolute;
    }

    #theme-toggle + label {
      @apply inline-block cursor-pointer h-5 w-5 absolute top-12 right-10 rounded-full duration-300 content-[''];
    }

    #theme-toggle:not(:checked) + label {
        @apply bg-orange-300;
    }

    #theme-toggle:checked + label {
        @apply bg-transparent;
        box-shadow: inset -5px -3px 0px 0px #ddd;
        /*box-shadow: inset -18px -16px 1px 1px #ddd;*/
    }
</style>
