package services.bots

import com.slack.api.bolt.App
import com.slack.api.bolt.AppConfig
import com.slack.api.bolt.socket_mode.SocketModeApp
import services.IChatBot

class SlackBot(private val botToken: String, private val appToken: String) : IChatBot {

    override suspend fun run() {
        val appConfig = AppConfig.builder().singleTeamBotToken(botToken).build()
        val app = App(appConfig)

        app.command("/bot") { req, ctx -> ctx.ack(":wave: Hi!") }
        app.command("/categories") { req, ctx -> ctx.ack(getCategories()) }
        app.command("/category") { req, ctx ->
            val requestedCategory = req.getPayload().getText().replace(" ", "_").lowercase()
            ctx.ack(getProductsByCategory(requestedCategory))
        }

        SocketModeApp(app).start()
    }
}