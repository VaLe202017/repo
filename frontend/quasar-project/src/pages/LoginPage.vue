<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="max-width-400 q-mx-auto">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form
          @submit="submitForm"
          @reset="resetForm"
          ref="form"
          class="q-gutter-md"
        >
          <q-input
            v-model="form.username"
            label="Username"
            required
            outlined
            :rules="[(val) => !!val || 'Username is required']"
          />
          <q-input
            v-model="form.password"
            label="Password"
            type="password"
            required
            outlined
            :rules="[(val) => !!val || 'Password is required']"
          />

          <div class="q-mt-md">
            <q-btn
              label="Login"
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
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submitForm() {
      const valid = this.$refs.form.validate();
      if (!valid) {
        this.$q.notify({
          type: "negative",
          message: "Please fill out all required fields.",
        });
        return;
      }

      try {
        const loginData = {
          username: this.form.username,
          password: this.form.password,
        };

        this.$q.loading.show();
        const response = await fetch("placeholder api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();
        this.$q.loading.hide();

        if (response.ok) {
          this.$q.notify({
            type: "positive",
            message: "Login successful!",
          });
          this.$router.push("/dashboard");
        } else {
          this.$q.notify({
            type: "negative",
            message: result.message || "Invalid username or password.",
          });
        }
      } catch (error) {
        this.$q.loading.hide();
        this.$q.notify({
          type: "negative",
          message: "An error occurred during login.",
        });
      }
    },
    resetForm() {
      this.form = {
        username: "",
        password: "",
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
