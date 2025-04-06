package services

import services.bots.DiscordBot

object ChatBotFactory {
    fun createChatBot(botType: String, botToken: String, channelId: String) =
        when (botType) {
            "discord" -> DiscordBot(botToken, channelId)
            else -> throw Exception("I don't support botType: $botType.")
        }
}