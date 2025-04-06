import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import com.typesafe.config.ConfigFactory
import services.ChatBotFactory
import entities.categoryStorage
import entities.Category

suspend fun main() {
    val config = ConfigFactory.load()
    val botType: String = "discord"
    val botToken: String = config.getString("$botType.botToken")
    val channelId: String = config.getString("$botType.channelID")

    categoryStorage.addAll(
        listOf(
            Category("Laptopy"),
            Category("MacBooki"),
            Category("Tablety"),
            Category("Komputery gamingowe")
        )
    )

    val bot = ChatBotFactory.createChatBot(botType, botToken, channelId)
    bot.run()
}
