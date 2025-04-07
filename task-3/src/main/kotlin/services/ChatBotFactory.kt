package services

import services.bots.DiscordBot
import services.bots.SlackBot
import config.BotConfig
import types.BotType

object ChatBotFactory {
    fun createChatBot(type: BotType) =
        when (type) {
            BotType.DISCORD -> DiscordBot(BotConfig.discordBotToken)
            BotType.SLACK -> SlackBot(BotConfig.slackBotToken, BotConfig.slackAppToken)
        }
}