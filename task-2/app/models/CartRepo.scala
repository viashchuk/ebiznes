package models

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class CartRepo @Inject() () {

  private val carts = ListBuffer(
    Cart(1, 1, 10)
  )

  def all: Seq[Cart] = carts.toSeq

  def findById(id: Long): Option[Cart] = carts.find(_.id == id)

  def create(product_id: Long, amount: Int): Cart = {
    val newId = if (carts.nonEmpty) carts.map(_.id).max + 1 else 1L

    val newCart = Cart(
      newId,
      product_id,
      amount
    )
    carts += newCart
    newCart
  }

  def update(
      id: Long,
      product_id: Long,
      amount: Int
  ): Option[Cart] = {

    if (carts.exists(_.id == id)) {

      val currentCart = carts.indexWhere(_.id == id)
      val updatedCart = Cart(
        id,
        product_id,
        amount
      )
      carts.update(currentCart, updatedCart)

      Some(updatedCart)
    } else {
      None
    }
  }

  def delete(id: Long): Boolean = {
    carts.find(_.id == id).fold(false) { cart =>
      carts -= cart
      !carts.exists(_.id == id)
    }
  }
  
  def _removeProductFromAllCarts(productId: Long): Unit = {
    carts --= carts.filter(_.product_id == productId)
  }
}
