import io.ktor.client.*
import io.ktor.client.engine.cio.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import com.typesafe.config.ConfigFactory

suspend fun main() {
    val config = ConfigFactory.load()
    val bot_token:String = config.getString("discord.botToken")
    val channel_id:String = config.getString("discord.channelID")

    val client = HttpClient(CIO)
    val response: HttpResponse = client.post("https://discord.com/api/v10/channels/$channel_id/messages") {
        contentType(ContentType.Application.Json)
        headers {
            append(HttpHeaders.Authorization, "Bot $bot_token")
        }
        setBody("""{"content": "Hello, World!"}""")
    }
    println(response.status)
    client.close()
}
