package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"task-4/models"
	"task-4/utils"
)

func (c *Controller) GetProducts(ctx echo.Context) error {
	products, err := c.repo.GetProducts()
	if err != nil {
		return ctx.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, products)
}

func (c *Controller) GetProduct(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	product, err := c.repo.GetProductByID(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, product)
}

func (c *Controller) CreateProduct(ctx echo.Context) error {
	var product models.Product

	if err := ctx.Bind(&product); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	newProduct, err := c.repo.CreateProduct(product)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusInternalServerError, err)
	}

	return ctx.JSON(http.StatusCreated, newProduct)
}

func (c *Controller) UpdateProduct(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	var product models.Product

	if err := ctx.Bind(&product); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	updatedProduct, err := c.repo.UpdateProduct(id, product)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.JSON(http.StatusOK, updatedProduct)
}

func (c *Controller) DeleteProduct(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)

	err := c.repo.DeleteProduct(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.NoContent(http.StatusNoContent)
}
