<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { BadgeCheck, Check, ChevronDown, CircleHelp, Code2, Cookie, Github, Heart, Landmark, Languages, LockKeyhole, Moon, QrCode, RefreshCw, Save, ShieldCheck, Sun, TrendingUp, WalletCards, X, Zap } from 'lucide-svelte';
  import { trackEvent } from '$lib/analytics';
  import { buildVersion } from '$lib/buildInfo';
  import { defaultCurrency, fiatCurrencies, setDefaultCurrency } from '$lib/currency';
  import { localeConfigs, supportedLocales, type Locale } from '$lib/i18n/locales';
  import { messagesForLocale } from '$lib/i18n/messages';
  import { localizedHref, parseLocalePath } from '$lib/i18n/routing';
  import { coinLandingPages, productName } from '$lib/seo';
  import { loadStorage, saveStorage } from '$lib/storage';
  import { theme, toggleTheme } from '$lib/theme';
  import { startVersionCheck } from '$lib/versionCheck';

  export let reloadPage = () => window.location.reload();

  const primaryNav = [
    { href: '/generate', labelKey: 'generator', icon: QrCode },
    { href: '/verify', labelKey: 'verify', icon: BadgeCheck },
    { href: '/saved', labelKey: 'saved', icon: Save },
    { href: '/markets', labelKey: 'markets', icon: TrendingUp }
  ] as const;

  const secondaryNav = [
    { href: '/fees', labelKey: 'fees', icon: Zap },
    { href: '/exchanges', labelKey: 'exchanges', icon: Landmark },
    { href: '/api-docs', labelKey: 'api', icon: Code2 },
    { href: '/faq', labelKey: 'faq', icon: CircleHelp },
    { href: '/security', labelKey: 'security', icon: ShieldCheck },
    { href: '/privacy', labelKey: 'privacy', icon: Cookie }
  ] as const;

  $: pathname = $page.url.pathname;
  $: routePath = parseLocalePath(pathname).routePath;
  $: activeLocale = (($page.data?.locale as Locale | undefined) ?? parseLocalePath(pathname).locale);
  $: t = messagesForLocale(activeLocale);
  $: currentRouteWithSearch = `${pathname}${$page.url.search}${$page.url.hash}`;
  $: selectedCurrency = fiatCurrencies.find((option) => option.code === $defaultCurrency) ?? fiatCurrencies[0];

  let updateAvailable = false;
  let updateDismissed = false;
  let currencyMenu: HTMLDetailsElement;
  let languageMenu: HTMLDetailsElement;
  let desktopMoreMenu: HTMLDetailsElement;
  let mobileMoreMenu: HTMLDetailsElement;

  onMount(() => {
    return startVersionCheck(() => {
      updateAvailable = true;
      updateDismissed = false;
    });
  });

  function reloadApp() {
    reloadPage();
  }

  function closeMenus() {
    if (currencyMenu) currencyMenu.open = false;
    if (languageMenu) languageMenu.open = false;
    if (desktopMoreMenu) desktopMoreMenu.open = false;
    if (mobileMoreMenu) mobileMoreMenu.open = false;
  }

  function selectCurrency(currency: string) {
    setDefaultCurrency(currency);
    trackEvent('currency_selected', { currency });
    if (currencyMenu) currencyMenu.open = false;
  }

  function selectLocale(locale: Locale) {
    saveStorage({ ...loadStorage(), locale });
    trackEvent('language_selected', { locale });
    closeMenus();
  }
</script>

<header class="sticky top-0 z-50 border-b border-outline-variant/50 bg-surface/86 backdrop-blur-xl">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
    <a href={localizedHref('/', activeLocale)} class="flex items-center gap-3 font-bold text-on-surface" aria-label={t.shell.homeAria}>
      <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-action text-white">
        <QrCode size={20} />
      </span>
      <span class="text-xl">{productName}</span>
    </a>
    <nav class="hidden items-center gap-1 md:flex" aria-label={t.nav.primaryNavigation}>
      {#each primaryNav as item}
        <a
          href={localizedHref(item.href, activeLocale)}
          on:click={closeMenus}
          class={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            routePath === item.href
              ? 'bg-surface-high text-primary'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
          }`}
        >
          <svelte:component this={item.icon} size={16} />
          {t.nav[item.labelKey]}
        </a>
      {/each}
      <details bind:this={desktopMoreMenu} class="group relative">
        <summary
          class={`flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition marker:hidden ${
            secondaryNav.some((item) => routePath === item.href)
              ? 'bg-surface-high text-primary'
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
          }`}
        >
          {t.nav.more}
          <ChevronDown size={16} class="transition group-open:rotate-180" />
        </summary>
        <div class="absolute right-0 top-12 w-48 rounded-lg border border-outline-variant bg-surface-high p-2 shadow-2xl">
          {#each secondaryNav as item}
            <a
              href={localizedHref(item.href, activeLocale)}
              on:click={closeMenus}
              class={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                routePath === item.href ? 'bg-surface-container text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <svelte:component this={item.icon} size={16} />
              {t.nav[item.labelKey]}
            </a>
          {/each}
        </div>
      </details>
    </nav>
    <div class="flex items-center gap-2">
      <details bind:this={languageMenu} class="group relative">
        <summary
          class="flex h-10 min-w-[5.25rem] cursor-pointer list-none items-center gap-2 rounded-xl border border-outline-variant bg-surface-high/95 px-2.5 text-left transition marker:hidden hover:border-primary/60 hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 group-open:border-primary/70 group-open:bg-surface-container"
          aria-label={t.nav.language}
        >
          <Languages size={16} class="text-primary" aria-hidden="true" />
          <span class="text-xs font-semibold uppercase text-on-surface">{activeLocale}</span>
          <ChevronDown size={14} class="shrink-0 text-on-surface-variant transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div class="absolute right-0 top-[calc(100%+0.5rem)] z-50 max-h-[min(70vh,32rem)] w-[16rem] overflow-auto rounded-2xl border border-outline-variant bg-surface-highest/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <div class="px-2.5 pb-1.5 pt-1">
            <p class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-primary/80">{t.nav.language}</p>
          </div>
          {#each supportedLocales as locale}
            <a
              class={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition ${
                activeLocale === locale ? 'bg-primary-action text-white shadow-glow' : 'text-on-surface hover:bg-surface-container'
              }`}
              aria-current={activeLocale === locale ? 'page' : undefined}
              href={localizedHref(currentRouteWithSearch, locale)}
              hreflang={localeConfigs[locale].hreflang}
              on:click={() => selectLocale(locale)}
            >
              <span
                class={`flex h-8 w-12 shrink-0 items-center justify-center rounded-lg text-[0.65rem] font-bold ${
                  activeLocale === locale ? 'bg-white/16 text-white' : 'bg-primary/12 text-primary'
                }`}
                aria-hidden="true"
              >
                {locale}
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-semibold leading-none">{localeConfigs[locale].nativeLabel}</span>
                <span class={`mt-1 block text-[0.7rem] leading-none ${activeLocale === locale ? 'text-white/75' : 'text-on-surface-variant'}`}>
                  {localeConfigs[locale].label}
                </span>
              </span>
              {#if activeLocale === locale}
                <Check size={16} class="shrink-0" aria-hidden="true" />
              {/if}
            </a>
          {/each}
        </div>
      </details>
      <details bind:this={currencyMenu} class="group relative">
        <summary
          class="flex h-10 min-w-[8.5rem] cursor-pointer list-none items-center gap-2 rounded-xl border border-outline-variant bg-surface-high/95 px-2.5 text-left transition marker:hidden hover:border-primary/60 hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 group-open:border-primary/70 group-open:bg-surface-container"
          aria-label={t.nav.defaultCurrency}
        >
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/12 text-xs font-bold text-primary" aria-hidden="true">
            {selectedCurrency.symbol}
          </span>
          <span class="min-w-0 flex-1">
            <span class="block text-xs font-semibold uppercase tracking-[0.18em] text-on-surface">{selectedCurrency.code}</span>
          </span>
          <ChevronDown size={14} class="shrink-0 text-on-surface-variant transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div class="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-[14rem] rounded-2xl border border-outline-variant bg-surface-highest/95 p-1.5 shadow-2xl backdrop-blur-xl">
          <div class="px-2.5 pb-1.5 pt-1">
            <p class="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-primary/80">{t.nav.displayCurrency}</p>
          </div>
          {#each fiatCurrencies as option}
            <button
              type="button"
              class={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition ${
                $defaultCurrency === option.code
                  ? 'bg-primary-action text-white shadow-glow'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
              aria-pressed={$defaultCurrency === option.code}
              on:click={() => selectCurrency(option.code)}
            >
              <span
                class={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
                  $defaultCurrency === option.code ? 'bg-white/16 text-white' : 'bg-primary/12 text-primary'
                }`}
                aria-hidden="true"
              >
                {option.symbol}
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-sm font-semibold leading-none">{option.code}</span>
                <span class={`mt-1 block text-[0.7rem] leading-none ${$defaultCurrency === option.code ? 'text-white/75' : 'text-on-surface-variant'}`}>
                  {option.label}
                </span>
              </span>
              {#if $defaultCurrency === option.code}
                <Check size={16} class="shrink-0" aria-hidden="true" />
              {/if}
            </button>
          {/each}
        </div>
      </details>
      <button
        type="button"
        class="icon-button"
        title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        on:click={toggleTheme}
      >
        {#if $theme === 'dark'}
          <Sun size={18} />
        {:else}
          <Moon size={18} />
        {/if}
      </button>
      <a href={localizedHref('/security', activeLocale)} class="icon-button" title={t.shell.localPrivacyModel} aria-label={t.shell.localPrivacyModel}>
        <LockKeyhole size={18} />
      </a>
    </div>
  </div>
  <nav
    class="relative max-md:!grid md:!hidden grid-cols-5 gap-1 border-t border-outline-variant/40 px-3 py-2"
    style="display: none"
    aria-label={t.nav.mobileNavigation}
  >
    {#each primaryNav as item}
      <a
        href={localizedHref(item.href, activeLocale)}
        on:click={closeMenus}
        class={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold ${
          routePath === item.href ? 'bg-surface-high text-primary' : 'text-on-surface-variant'
        }`}
      >
        <svelte:component this={item.icon} size={16} />
        <span class="max-w-full truncate">{t.nav[item.labelKey]}</span>
      </a>
    {/each}
    <details bind:this={mobileMoreMenu} class="group relative min-w-0">
      <summary
        class={`flex h-full cursor-pointer list-none flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-xs font-semibold marker:hidden ${
          secondaryNav.some((item) => routePath === item.href) ? 'bg-surface-high text-primary' : 'text-on-surface-variant'
        }`}
      >
        <ChevronDown size={16} class="transition group-open:rotate-180" />
        <span class="max-w-full truncate">{t.nav.more}</span>
      </summary>
      <div class="absolute right-0 top-12 z-50 w-48 rounded-lg border border-outline-variant bg-surface-high p-2 shadow-2xl">
        {#each secondaryNav as item}
          <a
            href={localizedHref(item.href, activeLocale)}
            on:click={closeMenus}
            class={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
              routePath === item.href ? 'bg-surface-container text-primary' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
            }`}
          >
            <svelte:component this={item.icon} size={16} />
            {t.nav[item.labelKey]}
          </a>
        {/each}
      </div>
    </details>
  </nav>
</header>

<slot />

{#if updateAvailable && !updateDismissed}
  <div
    class="fixed right-4 top-20 z-[80] w-[min(calc(100vw-2rem),28rem)] rounded-card border border-primary/30 bg-surface-high p-4 shadow-2xl"
    role="alert"
    aria-live="assertive"
    data-testid="update-notice"
  >
    <div class="flex items-start gap-3">
      <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-action text-white">
        <RefreshCw size={17} />
      </span>
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-on-surface">{t.shell.updateTitle}</p>
        <p class="mt-1 text-sm text-on-surface-variant">{t.shell.updateBody}</p>
        <div class="mt-3 flex items-center gap-2">
          <button class="btn-primary px-3 py-2" type="button" on:click={reloadApp}>
            <RefreshCw size={16} />
            {t.shell.reload}
          </button>
          <button
            class="icon-button h-9 w-9"
            type="button"
            title={t.shell.dismissUpdate}
            aria-label={t.shell.dismissUpdate}
            on:click={() => {
              updateDismissed = true;
            }}
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<footer class="border-t border-outline-variant/50 bg-surface-lowest/70">
  <div class="mx-auto grid max-w-7xl gap-6 px-5 py-10 text-sm text-on-surface-variant md:grid-cols-[1fr_auto] md:px-8">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-semibold text-primary">
        <ShieldCheck size={16} />
        <span>{t.shell.dataBadge}</span>
      </div>
      <p class="mt-4">{t.shell.footerBody}</p>
      <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        {#each coinLandingPages as item}
          <a class="hover:text-primary" href={localizedHref(`/${item.slug}`, activeLocale)}>{t.shell.footerGenerator(item.ticker ?? 'QR')}</a>
        {/each}
      </div>
      <div class="mt-4 flex flex-wrap gap-x-4 gap-y-2">
        <a class="hover:text-primary" href={localizedHref('/faq', activeLocale)}>{t.nav.faq}</a>
        <a class="hover:text-primary" href={localizedHref('/privacy', activeLocale)}>{t.shell.privacyNotice}</a>
        <a class="hover:text-primary" href={localizedHref('/security', activeLocale)}>{t.shell.securityModel}</a>
        <a class="hover:text-primary" href={localizedHref('/terms', activeLocale)}>{t.shell.terms}</a>
      </div>
    </div>
    <div class="flex flex-col gap-2 md:items-end">
      <div class="flex items-center gap-2 text-primary">
        <WalletCards size={16} />
        <span>{t.shell.noAccounts}</span>
      </div>
      <div class="flex items-center gap-2 text-on-surface">
        <span>{t.shell.madeWith}</span>
        <Heart size={15} class="fill-error text-error" />
        <span>{t.shell.forPrivacy}</span>
      </div>
      <a
        class="inline-flex items-center gap-2 text-on-surface-variant transition hover:text-primary"
        href="https://github.com/Unrelated5768/cryptoqrtool"
        rel="noopener noreferrer"
        target="_blank"
      >
        <Github size={16} />
        <span>{t.shell.viewSource}</span>
      </a>
      <p class="text-xs text-on-surface-variant/70">{t.shell.version(buildVersion)}</p>
    </div>
  </div>
</footer>
