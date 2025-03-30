package models

import javax.inject.{Inject, Singleton}
import scala.collection.mutable.ListBuffer

@Singleton
class CategoryRepo @Inject() () {

  private val categories = ListBuffer(
    Category(1, "phones"),
  )

  def all: Seq[Category] = categories.toSeq

  def findById(id: Long): Option[Category] = categories.find(_.id == id)

  def create(title: String) : Category = {
    val newId = if (categories.nonEmpty) categories.map(_.id).max + 1 else 1L

    val newCategory = Category(
      newId,
      title
    )
    categories += newCategory
    newCategory
  }

  def update(
      id: Long,
      title: String
  ): Option[Category] = {

    if (categories.exists(_.id == id)) {

      val currentCategory = categories.indexWhere(_.id == id)
      val updatedCategory = Category(
        id,
        title
      )
      categories.update(currentCategory, updatedCategory)

      Some(updatedCategory)
    } else {
      None
    }
  }

  def delete(id: Long): Boolean = {
    categories.find(_.id == id).fold(false) { category =>
      // productRepo.resetCategoryForProducts(id)
      categories -= category
      !categories.exists(_.id == id)
    }
  }
}
