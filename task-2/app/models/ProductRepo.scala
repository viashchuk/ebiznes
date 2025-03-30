package models

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class ProductRepo @Inject() () {

  private val products = ListBuffer(
    Product(1, 5000.0, "iPhone 16", "Smartfon APPLE iPhone 16 5G 256GB 6.1 Czarny"),
    Product(2, 3000.0, "iPhone 12", "Smartfon APPLE iPhone 12 5G 128GB 6.1 Czarny MGJA3PM/A")
  )

  def all: Seq[Product] = products.toSeq

  def findById(id: Long): Option[Product] = products.find(_.id == id)

  def create(price: Double, title: String, description: String): Product = {
    val newId = if (products.nonEmpty) products.map(_.id).max + 1 else 1L

    val newProduct = Product(
      newId,
      price,
      title,
      description
    )
    products += newProduct
    newProduct
  }

  def update(
      id: Long,
      price: Double,
      title: String,
      description: String
  ): Option[Product] = {

    if (products.exists(_.id == id)) {

      val currentProduct = products.indexWhere(_.id == id)
      val updatedProduct = Product(
        id,
        price,
        title,
        description
      )
      products.update(currentProduct, updatedProduct)

      Some(updatedProduct)
    } else {
      None
    }
  }

  def delete(id: Long): Boolean = {
    products.find(_.id == id).fold(false) { product =>
      products -= product
      !products.exists(_.id == id)
    }
  }
}
