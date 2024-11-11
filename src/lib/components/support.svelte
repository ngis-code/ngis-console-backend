<script lang="ts">
    import { Button } from '$lib/elements/forms';
    import { app } from '$lib/stores/app';
    import { wizard } from '$lib/stores/wizard';
    import SupportWizard from '$routes/(console)/supportWizard.svelte';
    import { showSupportModal } from '$routes/(console)/wizard/support/store';
    import { isCloud } from '$lib/system';
    import { organization } from '$lib/stores/organization';
    import { BillingPlan } from '$lib/constants';
    import { trackEvent } from '$lib/actions/analytics';
    import { localeTimezoneName, utcHourToLocaleHour } from '$lib/helpers/date';
    import { upgradeURL } from '$lib/stores/billing';

    export let show = false;

    $: isPaid =
        $organization?.billingPlan === BillingPlan.PRO ||
        $organization?.billingPlan === BillingPlan.SCALE;

    $: supportTimings = `${utcHourToLocaleHour('16:00')} - ${utcHourToLocaleHour('00:00')} ${localeTimezoneName()}`;
</script>

{#if isCloud}
    <section class="drop-section u-grid u-gap-24 u-padding-24">
        <div>
            <h4 class="eyebrow-heading-3">Premium support</h4>
            {#if isPaid}
                <p class="u-line-height-1-5 u-margin-block-start-8">
                    Get personalized support from the Appwrite team from <b>{supportTimings}</b>
                </p>
            {/if}
        </div>
        {#if $organization?.billingPlan === BillingPlan.FREE}
            <Button
                fullWidth
                href={$upgradeURL}
                on:click={() => {
                    trackEvent('click_organization_upgrade', {
                        from: 'button',
                        source: 'support_menu'
                    });
                }}>
                <span class="text">Get Premium support</span>
            </Button>
        {:else}
            <Button
                secondary
                fullWidth
                on:click={() => {
                    show = false;
                    $showSupportModal = false;
                    wizard.start(SupportWizard);
                }}>
                <span class="text">Contact our Support Team</span>
            </Button>
        {/if}
    </section>
{/if}
<section class="drop-section u-grid u-gap-24 u-padding-24">
    <div>
        <h4 class="eyebrow-heading-3">Troubleshooting</h4>

   

    <div class="u-flex u-gap-16">
        <a
            href="https://www.royalcaribbean.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="button is-secondary u-padding-inline-12 u-stretch u-main-center u-gap-4 u-flex-basis-auto">
            <span class="icon-book-open" aria-hidden="true" />
            <span class="text">Open Ticket</span>
        </a>
       
    </div>
</section>

