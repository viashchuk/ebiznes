package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.data.validation.Constraints._
import play.api.libs.json.Json
import models.{ProductRepo, Product, CartRepo}

case class ProductFormInput(price: Double, title: String, description: String, category_id: Option[Long])

@Singleton
class ProductController @Inject() (
    val controllerComponents: ControllerComponents,
    productRepo: ProductRepo,
    cartRepo: CartRepo
) extends BaseController {

  implicit val productFormat = Json.format[Product]

  private val productForm: Form[ProductFormInput] = Form(
    mapping(
      "price" -> of[Double].verifying("error.price.positive", _ > 0),
      "title" -> nonEmptyText.verifying(maxLength(100)),
      "description" -> text,
      "category_id" -> optional(longNumber)
    )(ProductFormInput.apply)(ProductFormInput.unapply)
  )

  // GET /products
  def index: Action[AnyContent] = Action {
    Ok(Json.toJson(productRepo.all))
  }

  // GET /products/:id
  def show(id: Long): Action[AnyContent] = Action {
    productRepo.findById(id)
                .fold(
                    NotFound(s"Product not found")
                )(product => Ok(Json.toJson(product)))
  }

  // POST /products
  def create: Action[AnyContent] = Action { implicit request =>
    productForm.bindFromRequest.fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      product => {
        val newProduct = productRepo.create(
          product.price,
          product.title,
          product.description,
          product.category_id
        )

        Ok(Json.toJson(newProduct))
      }
    )
  }

  // PUT /products/:id
  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    productForm.bindFromRequest.fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      product => {
        productRepo.update(
            id, 
            product.price,
            product.title, 
            product.description,
            product.category_id
          ) match {
          case Some(updatedProduct) => Ok(Json.toJson(updatedProduct))
          case None => NotFound(s"Product not found")
        }
      }
    )
  }

  // DELETE /products/:id
  def delete(id: Long): Action[AnyContent] = Action {
    cartRepo._removeProductFromAllCarts(id)

    if (productRepo.delete(id)) {
        Ok
    } else {
        NotFound(s"Product not found")
    }
  }

  private def handleValidationErrors(formWithErrors: Form[_]): Result = {
    val errors = formWithErrors.errors.map(error => 
      s"${error.key}: ${error.message}"
    )
    BadRequest(Json.obj("errors" -> errors))
  }
}
