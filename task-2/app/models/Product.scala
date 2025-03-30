package models
import play.api.libs.json.Json

case class Product(id: Long, price: Double, title: String, description: String)