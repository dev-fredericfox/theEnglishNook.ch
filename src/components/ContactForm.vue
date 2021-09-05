<template>
  <div v-if="!formStatus.success">
    <form id="contact" action="/">
      <fieldset :disabled="formStatus.disabled">
        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-danger': formValidation.fname }"
                  type="text"
                  v-bind:placeholder="translatedContent[lang].fname"
                  v-model="form.fname"
                />
              </p>
              <p v-if="formValidation.fname" class="help is-danger">
                {{ translatedContent[lang].required }}
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-danger': formValidation.lname }"
                  type="text"
                  v-bind:placeholder="translatedContent[lang].lname"
                  v-model="form.lname"
                />
              </p>
              <p v-if="formValidation.lname" class="help is-danger">
                {{ translatedContent[lang].required }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field is-expanded">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-danger': formValidation.email }"
                  type="tel"
                  v-bind:placeholder="translatedContent[lang].email"
                  v-model="form.email"
                />
              </p>
              <p v-if="formValidation.email" class="help is-danger">
                {{ translatedContent[lang].required }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <input
                  class="input"
                  v-bind:class="{ 'is-danger': formValidation.subject }"
                  type="text"
                  v-bind:placeholder="translatedContent[lang].subj"
                  v-model="form.subject"
                />
              </div>
              <p v-if="formValidation.subject" class="help is-danger">
                {{ translatedContent[lang].required }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea"
                  v-bind:placeholder="translatedContent[lang].body"
                  v-bind:class="{ 'is-danger': formValidation.message }"
                  v-model="form.message"
                ></textarea>
              </div>
              <p v-if="formValidation.message" class="help is-danger">
                {{ translatedContent[lang].required }}
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button
                  class="g-recaptcha button is-info has-text-black-bis"
                  :class="{ 'is-loading': formStatus.disabled }"
                  data-sitekey="6LfeXgccAAAAAPeC-YrfS3bGHOgIMoYzROdNJ8Ur"
                  data-callback="validateForm"
                  data-action="submit"
                  @click="loading()"
                >
                  {{ translatedContent[lang].button }}
                </button>
                <p v-if="formStatus.error" class="help is-danger mt-2">
                  {{ translatedContent[lang].error }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div v-if="formStatus.success">
    <div class="box ml-6 mr-6">
      <p>{{ translatedContent[lang].success }}</p>
    </div>
  </div>
  <!-- endNew -->
</template>

<script>
import { ref, reactive, onMounted } from "vue";
export default {
  props: {
    lang: String,
  },
  setup() {
    //LANGUAGE SUPPORT
    const translatedContent = {
      en: {
        fname: "First Name",
        lname: "Last Name",
        email: "E-Mail",
        subj: "Subject",
        body: "How may I help you…?",
        required: "Required",
        error: "Oh no! Please try again.",
        success: "Your message was successfully sent!",
        button: "Send"
      },
      de: {
        fname: "Vorname",
        lname: "Nachname",
        email: "E-Mail",
        subj: "Betreff",
        body: "Wie kann ich Ihnen helfen…?",
        required: "Bitte füllen Sie dieses Feld aus",
        error: "Oh nein! Bitte, versuchen Sie es noch mal.",
        success: "Ihre Nachricht wurde erfolgreich abgeschickt!",
        button: "Abschicken"
      },
      fr: {
        fname: "Prénom",
        lname: "Nom",
        email: "E-Mail",
        subj: "Sujet",
        body: "Comment puis-je vous aider…?",
        required: "Veuillez remplir ce champ",
        error: "Oh non! Réessayez, s'il vous plaît.",
        success: "Votre message a été envoyé avec succès!",
        button: "Envoyer"
      },
    };
    //VARIABLES
    ////form data
    const form = ref({
      fname: "",
      lname: "",
      subject: "",
      email: "",
      message: "",
    });
    ////form validation
    const formValidation = reactive({
      fname: false,
      lname: false,
      subject: false,
      email: false,
      message: false,
    });
    ////form send status
    const formStatus = reactive({
      disabled: false,
      sending: false,
      error: false,
      success: false,
    });

    //FUNCTIONS
    ////Submission to the backend
    const postForm = async () => {
      const postReqSettings = {
        method: "POST",
        mode: "cors",
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "xyz" }),
      };
      try {
        console.log(postReqSettings);
        const response = await fetch(
          "https://us-central1-form-forwarder-v1.cloudfunctions.net/app/infoattheenglishnookch",
          postReqSettings
        );
        console.dir(response);
        console.dir(response.body);
        if (response.status == 200) {
          formStatus.success = true;
        } else {
          throw "Form sending failed";
        }
      } catch (error) {
        formStatus.disabled = false;
        formStatus.sending = false;
        formStatus.error = true;
        console.log("Post failed. Reason:" + error);
      }
    };
    ////Validation handler
    const validateForm = function () {
      Object.keys(form.value).forEach((el) => {
        if (form.value[el].length < 1) {
          formValidation[el] = true;
          console.log("true", formValidation[el]);
          formStatus.disabled = false;
        } else {
          formValidation[el] = false;
          console.log("false", formValidation[el]);
        }
      });
      if (Object.values(formValidation).every(isTrue) === true) {
        postForm();
      }
    };

    const loading = function () {
      formStatus.disabled = true;
    };

    const isTrue = (currentBool) => currentBool === false;

    //LIFECYCLE HOOKS
    onMounted(() => {
      //reCAPTCHA settings after Mount outisde of Vue because of Astro compatibility.
      let recaptchaScript = document.createElement("script");
      recaptchaScript.setAttribute(
        "src",
        "https://www.google.com/recaptcha/api.js"
      );
      document.head.appendChild(recaptchaScript);
      window.validateForm = validateForm;
    });

    return {
      form,
      formValidation,
      validateForm,
      loading,
      translatedContent,
      formStatus,
    };
  },
};
</script>
