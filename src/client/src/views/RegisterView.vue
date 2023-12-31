<script setup lang="ts">
import { useRouter } from "vue-router";
import { inject, ref } from "vue";
import type { AxiosInstance } from "axios";

const router = useRouter();
const api = inject("api") as AxiosInstance;
const emit = defineEmits(["registered"]);

async function register(handle: string, key: string) {
  const response = await api
    .post("/register", { handle, key })
    .catch((error) => {
      console.error("Error registering user:", error.message, error.code);
      registerError.value = true;
      errorMessage.value = error.response.data.message;
      console.log("error", error.response.data.message);
    });
  if (response) {
    console.log("Registered the user and got a response of", response);
    sessionStorage.setItem("handle", handle);
    emit("registered");
    router.push({ name: "home" });
  }
}

const handle = ref("");
const key = ref("");
const registerError = ref(false);
const errorMessage = ref("");
</script>

<template>
  <main class="flex items-center justify-center m-auto">
    <form
      @submit.prevent="register(handle, key)"
      class="flex flex-col gap-6 w-full"
    >
      <div class="flex items-center gap-6">
        <h1 class="text-5xl">Welcome to Aleph</h1>
        <img src="../assets/aleph.svg" />
      </div>
      <div class="flex w-3/4 h-11 bg-lightdark rounded-full shadow-none">
        <div class="flex flex-1 pt-1 pr-2 pb-0 pl-3">
          <div class="flex items-center pr-3">
            <div class="m-auto pb-5 h-5 w-5 leading-5">
              <img src="../assets/user.svg" />
            </div>
          </div>
          <div class="flex flex-1 flex-wrap">
            <input
              type="text"
              placeholder="Please enter your username"
              class="bg-transparent border-0 mb-1 p-0 w-full focus:outline-none"
              v-model="handle"
            />
          </div>
        </div>
      </div>
      <div class="flex w-3/4 h-11 bg-lightdark rounded-full shadow-none">
        <div class="flex flex-1 pt-1 pr-2 pb-0 pl-3">
          <div class="flex items-center pr-3">
            <div class="m-auto pb-5 h-5 w-5 leading-5">
              <img src="../assets/key.svg" />
            </div>
          </div>
          <div class="flex flex-1 flex-wrap">
            <input
              type="text"
              placeholder="Please enter your public key"
              class="bg-transparent border-0 mb-1 p-0 w-full focus:outline-none"
              v-model="key"
            />
          </div>
        </div>
      </div>
      <p v-if="registerError" class="text-red-500">
        {{ errorMessage }}
      </p>
      <button
        class="self-start bg-light rounded-xl text-superdark text-lg mt-5 py-3 px-1 w-1/5"
        type="submit"
      >
        Register
      </button>
    </form>
  </main>
</template>
