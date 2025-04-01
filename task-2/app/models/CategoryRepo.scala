package models

import javax.inject.{Inject, Singleton}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.H2Profile.api._
import scala.concurrent.{ExecutionContext, Future}

@Singleton
class CategoryRepo @Inject() (
    protected val dbConfigProvider: DatabaseConfigProvider
)(implicit ec: ExecutionContext)
    extends HasDatabaseConfigProvider[JdbcProfile] {

  class CategoriesTable(tag: Tag) extends Table[Category](tag, "CATEGORY") {
    def id = column[Long]("ID", O.AutoInc, O.PrimaryKey)
    def title = column[String]("TITLE")

    def * = (
      id,
      title
    ) <> (Product.tupled, Product.unapply)
  }

  private val categories = TableQuery[CategoriesTable]

  def all: Future[Seq[Category]] = db.run {
    categories.result
  }

  def findById(id: Long): Future[Option[Category]] = db.run {
    categories.filter(_.id === id).result.headOption
  }

  def create(title: String): Future[Long] = {
    val category = Category(0L, title)
    db.run(products returning products.map(_.id) += product)
  }

  def update(
      id: Long,
      title: String
  ): Future[Option[Long]] = {

    val category = Category(id, title)

    db.run(categories.filter(_.id === id).update(category).map { affectedRows =>
      if (affectedRows > 0) Some(id) else None
    })
  }

  def delete(id: Long): Future[Boolean] = db.run {
    categories.filter(_.id === id).delete.map(_ > 0)
  }
}
