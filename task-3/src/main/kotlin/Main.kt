import kotlinx.coroutines.*
import services.ChatBotFactory
import entities.seeds.SeedRunner
import types.BotType

suspend fun main() {
    SeedRunner.run()

    coroutineScope {
        val discordBot = ChatBotFactory.createChatBot(BotType.DISCORD)
        val slackBot = ChatBotFactory.createChatBot(BotType.SLACK)

        launch { discordBot.run() }
        launch { slackBot.run() }
    }
}