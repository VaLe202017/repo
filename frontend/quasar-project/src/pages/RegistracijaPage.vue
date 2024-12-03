<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="max-width-400 q-mx-auto">
      <q-card-section>
        <div class="text-h6 text-center">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="submitForm"
          @reset="resetForm"
          ref="form"
          class="q-gutter-md"
        >
          <q-input
            v-model="form.email"
            label="Email"
            type="email"
            required
            outlined
            hint="Enter a valid email"
            :rules="[(val) => !!val || 'Email is required']"
          />
          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            required
            outlined
            hint="Choose a strong password"
            :rules="[(val) => !!val || 'Password is required']"
          />
          <q-input
            v-model="form.username"
            label="Username"
            required
            outlined
            :rules="[(val) => !!val || 'Username is required']"
          />
          <q-input
            v-model="form.name"
            label="First Name"
            required
            outlined
            :rules="[(val) => !!val || 'First name is required']"
          />
          <q-input
            v-model="form.surname"
            label="Last Name"
            required
            outlined
            :rules="[(val) => !!val || 'Last name is required']"
          />

          <div class="q-mt-md">
            <q-btn
              label="Submit"
              type="submit"
              color="primary"
              class="full-width"
            />
            <q-btn
              label="Reset"
              type="reset"
              flat
              color="secondary"
              class="full-width q-mt-sm"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        username: "",
        name: "",
        surname: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        this.$q.notify({
          type: "negative",
          message: "Please fill out all required fields correctly.",
        });
        return;
      }

      try {
        const formData = {
          email: this.form.email,
          password: this.form.password,
          username: this.form.username,
          name: this.form.name,
          surname: this.form.surname,
        };

        await this.$q.loading.show();
        const response = await fetch("placeholder api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        this.$q.loading.hide();

        if (response.ok) {
          this.$q.notify({
            type: "positive",
            message: "Registration successful!",
          });
          this.resetForm();
        } else {
          this.$q.notify({
            type: "negative",
            message: result.message || "Registration failed.",
          });
        }
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          type: "negative",
          message: "An error occurred while submitting the form.",
        });
      }
    },
    resetForm() {
      this.form = {
        email: "",
        password: "",
        username: "",
        name: "",
        surname: "",
      };
    },
  },
};
</script>

<style>
.max-width-400 {
  max-width: 400px;
}
.full-width {
  width: 100%;
}
</style>
