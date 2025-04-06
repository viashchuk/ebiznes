package services.bots

import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.request.headers
import io.ktor.client.statement.*
import io.ktor.http.*
import services.IChatBot
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import dev.kord.core.entity.channel.TextChannel
import dev.kord.common.entity.Snowflake

class DiscordBot(private val botToken: String, private val channelId: String) : IChatBot {
    private lateinit var kord: Kord

    override suspend fun run() {
        kord = Kord("$botToken")

        sendMessage("hello", channelId)

        kord.on<MessageCreateEvent> {
            if (message.author?.isBot != false) return@on

            if (message.content.startsWith('!')) {
                println(message.content)
            }
        }

        kord.login {
            @OptIn(PrivilegedIntent::class)
            intents += Intent.MessageContent
        }
    }

    override suspend fun sendMessage(message: String, channelId: String) {
        val channel = kord.getChannelOf<TextChannel>(Snowflake(channelId))
        channel?.createMessage(message)
            ?: println("Channel $channelId not found")
    }
}