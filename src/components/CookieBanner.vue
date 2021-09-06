<template>
  <div>
    <div v-if="showCookieNotice" class="content">
      <div class="modal is-active" 
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
      >
        <div class="modal-background"></div>
        <div class="modal-card has-text-centered mt-6">
          <header class="modal-card-head">
            <h2 class="modal-card-title">{{ browserlanguage.header }}</h2>
          </header>
          <section class="modal-card-body">
            <div>
              <div v-html="browserlanguage.title"></div>
              <div class="line-height-1 inherit-m-0" v-html="browserlanguage.contentList"></div>
              <div v-html="browserlanguage.contentTag"></div>
            </div>
            <div class="mt-2 mb-2">
              <label class="checkbox mr-2" disabled>
                <input type="checkbox" disabled v-model="functional" />
                {{ browserlanguage.functional }}
              </label>
              <label class="checkbox mr-2">
                <input type="checkbox" v-model="analytics" />
                {{ browserlanguage.analytics }}
              </label>
              <!-- <label class="checkbox">
                <input type="checkbox" v-model="marketing" />
                Marketing
              </label> -->
            </div>
          </section>
          <footer class="modal-card-foot is-justify-content-center">
            <button class="button is-danger" @click="setSelection">
              {{ browserlanguage.selection }}
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted, computed } from "vue";

export default {
  setup() {
    const state = reactive({
      showCookieNotice: false,
    });
    const cookieSetting = reactive({
      functional: true,
      analytics: true,
      // marketing: false,
    });

    //Language Handler
    const bannerContent = {
      en: {
        header: "Notice from the pâtisserie",
        title: "This cookie uses websites!",
        contentList:
          "<p>One crumb.</p> <p>Two crumbs.</p> <p>Three crumbs.</p> <p>Four!</p>",
        contentTag: "<p>How many do you want to share?</p>",
        functional: "functional",
        analytics: "analytics",
        selection: "Accept Selection",
      },
      de: {
        header: "Mitteilung von der Konditorei",
        title: "Dieser Cookie verwendet Webseiten!",
        contentList:
          "<p>Ein Krümel.</p> <p>Zwei Krümel.</p> <p>Drei Krümel.</p> <p>Vier!</p>",
        contentTag: "<p>Wie viele möchten Sie teilen?</p>",
        functional: "Notwendig",
        analytics: "Statistiken",
        selection: "Auswahl zulassen",
      },
      fr: {
        header: "Notification de la pâtisserie",
        title: "Ce cookie utilise des sites Web!",
        contentList:
          "<p>Une miette.</p> <p>Deux miettes.</p> <p>Trois miettes.</p> <p>Quatre!</p>",
        contentTag: "<p>Combien voulez-vous en partager?</p>",
        functional: "fonctionnel",
        analytics: "statistiques",
        selection: "Accepter la sélection",
      },
    };

    const browserlanguage = computed(() => {
      if (navigator.language.includes("fr")) {
        return bannerContent.fr;
      } else if (navigator.language.includes("de")) {
        return bannerContent.de;
      } else {
        return bannerContent.en;
      }
    });

    // FUNCTIONS
    const setSelection = function () {
      console.log(`triggered SetSelection ${JSON.stringify(cookieSetting)}`);
      document.cookie = `cookiePreferences=${JSON.stringify(
        cookieSetting
      )}; Max-Age=7776000`;
      state.showCookieNotice = false;
      addTagmanager();
      tagManagerSettings();
    };

    const addTagmanager = function () {
      if (cookieSetting.analytics || ookieSetting.analytics) {
        let tagManager = document.createElement("script");
        tagManager.innerHTML =
          "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P56NJDW');";
        document.head.appendChild(tagManager);
      }
    };

    const tagManagerSettings = function () {
      if (cookieSetting.analytics) {
        dataLayer.push({ event: "analytics" });
      }
      if (cookieSetting.analytics) {
        dataLayer.push({ event: "marketing" });
      }
    };

    //Lifecycle Hooks
    onMounted(() => {
      let parseCookie = decodeURIComponent(document.cookie);
      if (!parseCookie.includes('cookiePreferences={"functional')) {
        state.showCookieNotice = true;
      } else {
        let cookie = parseCookie.split("cookiePreferences=")[1].split(";")[0];
        cookie = JSON.parse(cookie);
        cookieSetting.functional = cookie.functional;
        cookieSetting.analytics = cookie.analytics;
        // cookieSetting.marketing = cookie.marketing;
        addTagmanager();
        tagManagerSettings();
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(cookieSetting),
      setSelection,
      bannerContent,
      browserlanguage,
    };
  },
};
</script>
