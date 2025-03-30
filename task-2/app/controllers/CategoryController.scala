package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.format.Formats._
import play.api.data.validation.Constraints._
import play.api.libs.json.Json
import models.{Category, CategoryRepo}

case class CategoryFormInput(title: String)

@Singleton
class CategoryController @Inject() (
    val controllerComponents: ControllerComponents,
    categoryRepo: CategoryRepo
) extends BaseController {

  implicit val categoryFormat = Json.format[Category]

  private val categoryForm: Form[CategoryFormInput] = Form(
    mapping(
      "title" -> nonEmptyText
    )(CategoryFormInput.apply)(CategoryFormInput.unapply)
  )

  // GET /categories
  def index: Action[AnyContent] = Action {
    Ok(Json.toJson(categoryRepo.all))
  }

  // GET /categories/:id
  def show(id: Long): Action[AnyContent] = Action {
    categoryRepo.findById(id)
                .fold(
                    NotFound(s"Category not found")
                )(category => Ok(Json.toJson(category)))
  }

  // POST /categories
  def create: Action[AnyContent] = Action { implicit request =>
    categoryForm.bindFromRequest.fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      category => {
        val newCategory = categoryRepo.create(
          category.title
        )

        Ok(Json.toJson(newCategory))
      }
    )
  }

  // PUT /categories/:id
  def update(id: Long): Action[AnyContent] = Action { implicit request =>
    categoryForm.bindFromRequest.fold(
      formWithErrors => handleValidationErrors(formWithErrors),
      category => {
        categoryRepo.update(id, category.title) match {
          case Some(updatedCategory) => Ok(Json.toJson(updatedCategory))
          case None => NotFound(s"Category not found")
        }
      }
    )
  }

  // DELETE /categories/:id
  def delete(id: Long): Action[AnyContent] = Action {
    if (categoryRepo.delete(id)) {
        Ok
    } else {
        NotFound(s"Category not found")
    }
  }

  private def handleValidationErrors(formWithErrors: Form[_]): Result = {
    val errors = formWithErrors.errors.map(error => 
      s"${error.key}: ${error.message}"
    )
    BadRequest(Json.obj("errors" -> errors))
  }
}
