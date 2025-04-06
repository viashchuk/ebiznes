import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import com.typesafe.config.ConfigFactory
import services.ChatBotFactory
import entities.categoryStorage
import entities.Category
import entities.Product
import entities.productStorage

suspend fun main() {
    val config = ConfigFactory.load()
    val botType: String = "discord"
    val botToken: String = config.getString("$botType.botToken")
    val channelId: String = config.getString("$botType.channelID")

    categoryStorage.addAll(
        listOf(
            Category("laptopy", "Laptopy"),
            Category("mac_booki", "MacBooki"),
            Category("tablety", "Tablety"),
            Category("komputery_gamingowe", "Komputery gamingowe")
        )
    )

    val categoryById = categoryStorage.associateBy { it.id }

    productStorage.addAll(
        listOf(
            Product("LENOVO IdeaPad Slim 3 15IRH10 15.3", 2699.00, 10, categoryById["laptopy"]!!),
            Product("HP ProBook 450 G10 15.6", 2799.00, 1, categoryById["laptopy"]!!),
            Product("ASUS Vivobook A1504VA-BQ940W 15.6", 2999.00, 2, categoryById["laptopy"]!!),
            Product("ASUS Vivobook A1504VA-BQ940W 15.6", 2999.00, 2, categoryById["laptopy"]!!),

            Product("APPLE MacBook Air 13.3", 3299.00, 1, categoryById["mac_booki"]!!),
            Product("APPLE MacBook Pro 2024 14", 9148.00, 2, categoryById["mac_booki"]!!),

            Product("Tablet SAMSUNG Galaxy Tab S10 FE 10.9", 2399.00, 2, categoryById["tablety"]!!),
            Product("Tablet APPLE iPad Air 11", 2999.00, 2, categoryById["tablety"]!!),

            Product("MAD DOG ENDORFY300ARGB-A07WR16 R5-5600 16GB", 4249.00, 2, categoryById["komputery_gamingowe"]!!),
            Product("MAD DOG GeForce RTX4060 PurePC Edition 2", 4199.00, 2, categoryById["komputery_gamingowe"]!!)
        )
    )

    val bot = ChatBotFactory.createChatBot(botType, botToken, channelId)
    bot.run()
}
