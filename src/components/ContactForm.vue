<template>
<h2>HTML Forms</h2>
<div class="form">

<!-- <form action="/" @submit.prevent="onSubmit(form)"> -->
<form action="http://localhost:5000/v1/forward/blog@gmail.com" METHOD="POST">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="" v-model="form.fname"><br>
  
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="" v-model="form.lname"><br><br>
  
  <label for="email">E-Mail:</label><br>
  <input type="text" id="email" name="email" value="" v-model="form.email"><br>
  
  <label for="subject">Subject:</label><br>
  <input type="text" id="message" name="message" value="" v-model="form.subject"><br>
  
  <label for="message">Message:</label><br>
  <input type="text" id="message" name="message" value="" v-model="form.email"><br>
  
  <input type="submit" value="Submit">
</form> 
</div>
  
  <div class="children">
    <slot />
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const form = ref({
        fname   : "bob",
        lname   : "peter",
        subject : "subj",
        email   : "email",
        message : "nothing..."
    })
    const fname = ref("bob");
    const lname = ref("bob");
    const email = ref("bob");
    const message = ref("message");
    const onSubmit = (formContent) => {
        const postReqSettings = {
            method  : 'GET',
            header  : { "Content-Type": "application/json" },
            body    : "abc"
        };
        console.log(postReqSettings)
        fetch('http://localhost:5000/test', postReqSettings)
        .then(response => response.json())
        .then(data => console.log(data));
        };
    const add = () => (count.value = count.value + 1);
    const subtract = () => (count.value = count.value - 1);
    return {
      form,
      fname,
      lname,
      email,
      message,
      onSubmit,
      add,
      subtract,
    };
  },
};
</script>