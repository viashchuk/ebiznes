package config

import com.typesafe.config.ConfigFactory

object BotConfig {
    private val config = ConfigFactory.load()

    val discordBotToken: String = config.getString("discord.botToken")
    val discordChannelId: String = config.getString("discord.channelID")

    val slackAppToken: String = config.getString("slack.appToken")
    val slackBotToken: String = config.getString("slack.botToken")
}