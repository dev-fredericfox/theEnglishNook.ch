<template>
  <h2>HTML Forms</h2>
  <form
    id="contact"
    action="/"
  >
    <fieldset :disabled="formStatus.disabled">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">From</label>
        </div>
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
            <p v-if="formValidation.fname" class="help is-danger">
              This field is required
            </p>
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
            <p v-if="formValidation.lname" class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field is-expanded">
            <p class="control is-expanded">
              <input
                class="input"
                v-bind:class="{ 'is-danger': formValidation.email }"
                type="tel"
                placeholder="Your Email"
                v-model="form.email"
              />
            </p>
            <p v-if="formValidation.email" class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Subject</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input
                class="input"
                v-bind:class="{ 'is-danger': formValidation.subject }"
                type="text"
                placeholder="e.g. English Lessons"
                v-model="form.subject"
              />
            </div>
            <p v-if="formValidation.subject" class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Message</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Explain how we can help you"
                v-bind:class="{ 'is-danger': formValidation.message }"
                v-model="form.message"
              ></textarea>
            </div>
            <p v-if="formValidation.message" class="help is-danger">
              This field is required
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label">
          <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <button
                class="g-recaptcha button is-primary"
                :class="{'is-loading' : formStatus.disabled}"
                data-sitekey="6LfeXgccAAAAAPeC-YrfS3bGHOgIMoYzROdNJ8Ur"
                data-callback="validateForm"
                data-action="submit"
              >
                Validate Form
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
      sent: false
    })

    //FUNCTIONS
    ////Submission to the backend
    const postForm = async () => {
      const postReqSettings = {
        method: "POST",
        header: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      };
      console.log(postReqSettings);
      // fetch("http://localhost:5000/test", postReqSettings)
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
      try {
        const response = await fetch("http://localhost:5000/test", postReqSettings)
        console.log(response)
      } catch {
        formStatus.disabled = false
        formStatus.sending = false
        formStatus.error = true
        console.log("oops error lol")
      }
    };
    ////Validation handler
    const validateForm = function () {
      Object.keys(form.value).forEach((el) => {
        if (form.value[el].length < 1) {
          formValidation[el] = true;
          console.log("true", formValidation[el]);
        } else {
          formValidation[el] = false;
          console.log("false", formValidation[el]);
        }
      })
      if (Object.values(formValidation).every(isTrue) === true) {
          formStatus.disabled = true
          postForm()
      }
    }

      const isTrue = (currentBool) => currentBool === false



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
      formStatus
    };
  },
};
</script>
