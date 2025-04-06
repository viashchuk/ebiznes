package services

interface IChatBot {
    suspend fun sendMessage(message: String, channelId: String)
    suspend fun run()
}