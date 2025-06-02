<template>
  <form class="flex items-center justify-center w-full space-x-2 p-6 border-t border-gray-200"
    @submit.prevent="handleSubmit">
    <input type="text" v-model="message"
      class="flex h-10 w-full rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-50 text-[#030712] focus-visible:ring-offset-2"
      placeholder="Type your message" required />
    <button
      class="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb] disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-[#111827E6] h-10 px-4 py-2"
      type="submit">
      Send
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits(['send'])

const handleSubmit = () => {
  if (message.value.trim()) {
    emit('send', message.value)
    message.value = ''
  }
}
</script>