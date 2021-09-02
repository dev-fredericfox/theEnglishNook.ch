<template>
  <div>
    test
    <div class="mb-5">
      {{ showCookieNotice }}
    </div>
    <div v-if="showCookieNotice" class="content">
      <div class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <h2 class="modal-card-title">Cookie Notice</h2>
          </header>
          <section class="modal-card-body">
            <div>
              <p>This cookie uses websites!</p>
              <p>
                Who dosen't like tasty litttle crumbly juicy chocolate filled
                cookies? Just don't get any in your keyboard!
              </p>
              <p>{{ showCookieNotice }}</p>
            </div>
            <div class="mt-2 mb-2">
              <label class="checkbox mr-2" disabled>
                <input type="checkbox" disabled v-model="functional" />
                Functional
              </label>
              <label class="checkbox mr-2">
                <input type="checkbox" v-model="analytics" />
                Analytics
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="marketing" />
                Marketing
              </label>
            </div>
          </section>
          <footer class="modal-card-foot is-justify-content-center">
            <button class="button is-danger" @click="setSelection">
              Accept Selection
            </button>
            <button class="button is-info" @click="setAll">Accept All</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";

export default {
  setup() {
    const state = reactive({
      showCookieNotice: false,
    });
    const cookieSetting = reactive({
      functional: true,
      analytics: false,
      marketing: false,
    });
    // FUNCTIONS
    const setAll = function () {
      cookieSetting.functional = true;
      cookieSetting.analytics = true;
      cookieSetting.marketing = true;
      setSelection();
    };

    const setSelection = function () {
      console.log(`triggered SetSelection ${JSON.stringify(cookieSetting)}`);
      document.cookie = `cookiePreferences=${JSON.stringify(
        cookieSetting
      )}; Max-Age=7776000`;
      state.showCookieNotice = false;
      addTagmanager()
      tagManagerSettings()
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
        cookieSetting.marketing = cookie.marketing;
        addTagmanager()
        tagManagerSettings()
      }
    });

    return {
      ...toRefs(state),
      ...toRefs(cookieSetting),
      setAll,
      setSelection,
    };
  },
};
</script>
