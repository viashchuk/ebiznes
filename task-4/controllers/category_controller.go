package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"task-4/models"
	"task-4/utils"
)

func (c *Controller) GetCategories(ctx echo.Context) error {
	categories, err := c.repo.GetCategories()
	if err != nil {
		return ctx.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, categories)
}

func (c *Controller) GetCategory(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	category, err := c.repo.GetCategoryByID(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, category)
}

func (c *Controller) CreateCategory(ctx echo.Context) error {
	var category models.Cart

	if err := ctx.Bind(&category); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	newCategory, err := c.repo.CreateCategory(category)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusInternalServerError, err)
	}

	return ctx.JSON(http.StatusCreated, newCategory)
}

func (c *Controller) UpdateCategory(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	var category models.Cart

	if err := ctx.Bind(&category); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	updatedCategory, err := c.repo.UpdateCategory(id, category)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.JSON(http.StatusOK, updatedCategory)
}

func (c *Controller) DeleteCategory(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)

	err := c.repo.DeleteCategory(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.NoContent(http.StatusNoContent)
}
