package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.H2Profile.api._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProductRepo @Inject() (
    protected val dbConfigProvider: DatabaseConfigProvider
)(implicit ec: ExecutionContext) extends HasDatabaseConfigProvider[JdbcProfile] {

  class ProductsTable(tag: Tag) extends Table[Product](tag, "PRODUCT") {
    def id = column[Long]("ID", O.AutoInc, O.PrimaryKey)
    def price = column[Double]("PRICE")
    def title = column[String]("TITLE")
    def description = column[String]("DESCRIPTION")
    def category_id = column[Option[Long]]("CATEGORY_ID")

    // def categoryFk =
    //   foreignKey("category_fk", category_id, TableQuery[CategoryTable])(_.id.?)

    def * = (
      id,
      price,
      title,
      description,
      category_id
    ) <> (Product.tupled, Product.unapply)
  }

  // private class CategoriesTable(tag: Tag) extends Table[Category](tag, "CATEGORY") {
  //   def id = column[Long]("ID", O.PrimaryKey, O.AutoInc)
  //   def title = column[String]("TITLE")
    
  //   def * = (id, title) <> (Category.tupled, Category.unapply)
  // }

  private val products = TableQuery[ProductsTable]
  // private val categories = TableQuery[CategoriesTable]

  def all: Future[Seq[Product]] = db.run {
    products.result
  }

  def findById(id: Long): Future[Option[Product]] = db.run {
    products.filter(_.id === id).result.headOption
  }

  def create(
      price: Double,
      title: String,
      description: String,
      category_id: Option[Long]
  ): Future[Long] = {
    val product = Product(0L, price, title, description, category_id)
    db.run(products returning products.map(_.id) += product)
  }

  def update(
      id: Long,
      price: Double,
      title: String,
      description: String,
      category_id: Option[Long]
  ): Future[Option[Long]] = {

    val product = Product(id, price, title, description, category_id)
    
    db.run(products.filter(_.id === id).update(product).map { affectedRows =>
      if (affectedRows > 0) Some(id) else None
    })
  }

  def delete(id: Long): Future[Boolean] = db.run {
    products.filter(_.id === id).delete.map(_ > 0)
  }
}
