package models

case class Product(id: Long, price: Double, title: String, description: String, category_id: Option[Long])