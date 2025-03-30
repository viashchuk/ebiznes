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
import models.{Cart, CartRepo}

case class CartFormInput(product_id: Long, amount: Int)

@Singleton
class CartController @Inject() (
    val controllerComponents: ControllerComponents,
    cartRepo: CartRepo
) extends BaseController {

  implicit val cartFormat: OFormat[Cart] = Json.format[Cart]

  private val cartForm: Form[CartFormInput] = Form(
    mapping(
        "product_id" -> longNumber.verifying("error.product.required", _ > 0),
        "amount" -> number.verifying("error.amount.positive", _ > 0)
    )(CartFormInput.apply)(CartFormInput.unapply)
  )

  // GET /carts
  def index: Action[AnyContent] = Action {
    Ok(Json.toJson(cartRepo.all))
  }

  // GET /carts/:id
  def show(id: Long): Action[AnyContent] = Action {
    cartRepo
      .findById(id)
      .fold(
        NotFound(s"Cart not found")
      )(cart => Ok(Json.toJson(cart)))
  }

  // POST /carts
  def create: Action[AnyContent] = Action { implicit request =>
    cartForm.bindFromRequest().fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      cart => {
        val newCart = cartRepo.create(
          cart.product_id,
          cart.amount
        )

        Ok(Json.toJson(newCart))
      }
    )
  }

  // PUT /carts/:id
  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    cartForm.bindFromRequest().fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      cart => {
        cartRepo.update(id, cart.product_id, cart.amount: Int) match {
          case Some(updatedCart) => Ok(Json.toJson(updatedCart))
          case None              => NotFound(s"Cart not found")
        }
      }
    )
  }

  // DELETE /carts/:id
  def delete(id: Long): Action[AnyContent] = Action {
    if (cartRepo.delete(id)) {
      Ok
    } else {
      NotFound(s"Cart not found")
    }
  }

  private def handleValidationErrors(formWithErrors: Form[_]): Result = {
    val errors =
      formWithErrors.errors.map(error => s"${error.key}: ${error.message}")
    BadRequest(Json.obj("errors" -> errors))
  }
}
