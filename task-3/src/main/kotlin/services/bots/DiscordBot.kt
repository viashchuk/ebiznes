package services.bots

import services.IChatBot
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent

class DiscordBot(private val botToken: String) : IChatBot {

    override suspend fun run() {
        val kord = Kord("$botToken")

        kord.on<MessageCreateEvent> {
            if (message.author?.isBot != false) return@on

            val content = message.content

            when {
                content.startsWith("!bot") -> message.channel.createMessage("Hi!")
                content.startsWith("!categories") -> message.channel.createMessage(getCategories())
                content.startsWith("!category") -> {
                    val requestedCategory = content.split(" ").drop(1).joinToString("_").lowercase()
                    message.channel.createMessage(getProductsByCategory(requestedCategory))
                }

                content.startsWith("!") -> message.channel.createMessage("Unknown command")
            }
        }

        kord.login {
            @OptIn(PrivilegedIntent::class)
            intents += Intent.MessageContent
        }
    }
}