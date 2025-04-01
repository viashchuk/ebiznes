package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.data.validation.Constraints._
import play.api.libs.json.Json
import play.api.libs.json._
import models.{ProductRepo, Product}
import scala.concurrent.{ExecutionContext, Future}

case class ProductFormInput(price: Double, title: String, description: String, category_id: Option[Long])

@Singleton
class ProductController @Inject() (
    val controllerComponents: ControllerComponents,
    productRepo: ProductRepo
)(implicit ec: ExecutionContext) extends BaseController {

  implicit val productFormat: OFormat[Product] = Json.format[Product]
  implicit val productFormInputFormat: OFormat[ProductFormInput] = Json.format[ProductFormInput]

  private val productForm: Form[ProductFormInput] = Form(
    mapping(
      "price" -> of[Double].verifying("error.price.positive", _ > 0),
      "title" -> nonEmptyText.verifying(maxLength(100)),
      "description" -> text,
      "category_id" -> optional(longNumber)
    )(ProductFormInput.apply)(ProductFormInput.unapply)
  )

  // GET /products
  def index: Action[AnyContent] = Action.async {
    productRepo.all.map(products => Ok(Json.toJson(products)))
  }

  // GET /products/:id
def show(id: Long): Action[AnyContent] = Action.async {
    productRepo.findById(id).map {
      case Some(product) => Ok(Json.toJson(product))
      case None => NotFound("Product not found")
    }
  }

  // POST /products
  def create: Action[JsValue] = Action.async(parse.json) { implicit request =>
    request.body.validate[ProductFormInput].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("errors" -> JsError.toJson(errors))))
      },
      product => {
        productRepo.create(
          product.price,
          product.title,
          product.description,
          product.category_id
        ).map { id =>
            Ok(Json.obj("message" -> "Product added successfully"))
        }
      }
    )
  }

  // PUT /products/:id
  def update(id: Long): Action[JsValue] = Action.async(parse.json) { implicit request =>
    request.body.validate[ProductFormInput].fold(
      errors => {
        Future.successful(BadRequest(Json.obj("errors" -> JsError.toJson(errors))))
      },
      product => {
        productRepo.update(
            id, 
            product.price,
            product.title, 
            product.description,
            product.category_id
          ).map {
          case Some(updatedId) => Ok(Json.obj("message" -> "Product updated successfully"))
          case None => NotFound("Product not found")
        }
      }
    )
  }

  // DELETE /products/:id
  def delete(id: Long): Action[AnyContent] = Action.async {
    productRepo.delete(id).map { success =>
      if (success) {
        Ok(Json.obj("message" -> "Product deleted successfully"))
      } else {
        NotFound("Product not found")
      }
    }
  }
}
