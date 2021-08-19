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
                  placeholder="First Name"
                  v-model="form.fname"
                />
              </p>
              <p v-if="formValidation.fname" class="help is-danger">Required</p>
            </div>
            <div class="field">
              <p class="control is-expanded">
                <input
                  class="input"
                  v-bind:class="{ 'is-danger': formValidation.lname }"
                  type="text"
                  placeholder="Last Name"
                  v-model="form.lname"
                />
              </p>
              <p v-if="formValidation.lname" class="help is-danger">Required</p>
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
                  placeholder="E-mail"
                  v-model="form.email"
                />
              </p>
              <p v-if="formValidation.email" class="help is-danger">Required</p>
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
                  placeholder="Subject"
                  v-model="form.subject"
                />
              </div>
              <p v-if="formValidation.subject" class="help is-danger">
                Required
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
                  placeholder="How may I help you…?"
                  v-bind:class="{ 'is-danger': formValidation.message }"
                  v-model="form.message"
                ></textarea>
              </div>
              <p v-if="formValidation.message" class="help is-danger">
                Required
              </p>
            </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button
                  class="g-recaptcha button is-info is-small"
                  :class="{ 'is-loading': formStatus.disabled }"
                  data-sitekey="6LfeXgccAAAAAPeC-YrfS3bGHOgIMoYzROdNJ8Ur"
                  data-callback="validateForm"
                  data-action="submit"
                  @click="loading()"
                >
                  Send
                </button>
                <p v-if="formStatus.error" class="help is-danger">
                  Something went wrong, please try sending the form again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
  <div v-if="formStatus.success">
    <p>WOW THE FORM WAS SENT LMAO</p>
  </div>
  <!-- endNew -->

  <div class="children">
    <slot />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
export default {
  props: {
    slot: String,
    lang: String,
  },
  setup() {
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
        mode: 'cors',
        header: {
          'Accept': "application/json",
          'Content-Type': "application/json",
        },
          body: JSON.stringify({"username": "xyz"}),

      };
      try {
        console.log(postReqSettings);
        const response = await fetch(
          "http://localhost:5000/test",
          postReqSettings
        );
        console.log(response.status);
        if (response.status == 200) {
          formStatus.success = true;
        } else {
          throw "Form sending failed";
        }
      } catch (error){
        formStatus.disabled = false;
        formStatus.sending = false;
        formStatus.error = true;
        console.log("Post failed. Reason:"+error);
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
      formStatus,
    };
  },
};
</script>
