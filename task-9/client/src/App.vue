<template>
    <div class="w-screen h-screen bg-white flex items-center justify-center">
        <div class="bg-white overflow-hidden rounded-lg border border-[#e5e7eb] w-[440px] h-[634px] shadow-sm">

            <div class="flex flex-col space-y-1.5 pb-6 bg-gray-900 p-6">
                <h2 class="font-semibold text-lg tracking-tight text-white">Chatbot</h2>
                <p class="text-sm text-gray-200 leading-3">Powered by Llama 3.2</p>
            </div>

            <div class="p-6 h-[474px] overflow-y-auto" ref="chatWindow">
                  <Message
                        v-for="(msg, index) in messages"
                        :key="index"
                        :role="msg.role"
                        :content="msg.message"
                    />
                    <div v-if="isTyping" class="flex gap-3 my-4 text-gray-400 text-sm animate-pulse">
                        <div class="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full border border-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4">
                                <path fill-rule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clip-rule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <strong class="font-bold">AI Bot:</strong>
                            <p>Typing<span class="dots">...</span></p>
                        </div>
                    </div>
            </div>

            <ChatForm @send="sendMessage" />
        </div>
    </div>
</template>

<script setup>
import Message from './components/Message.vue'
import ChatForm from './components/ChatForm.vue'

import { ref, nextTick } from 'vue'
import axios from 'axios'

const messages = ref([])
const chatWindow = ref(null)
let isTyping = false

const sendMessage = async (message) => {
    messages.value.push({ role: 'user', message })
    isTyping = true

    try {
        const res = await axios.post('/chat', {
            message: message
        })

        messages.value.push({
            role: 'assistant',
            message: res.data.response
        })

        nextTick(() => {
            chatWindow.value.scrollTop = chatWindow.value.scrollHeight
        })
    } catch (err) {
        messages.value.push({
            role: 'assistant',
            message: 'Error'
        })
    } finally {
        isTyping = false

        nextTick(() => {
            chatWindow.value.scrollTop = chatWindow.value.scrollHeight
        })
    }
}
</script>