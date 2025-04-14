package controllers

import (
	"net/http"

	"github.com/labstack/echo/v4"

	"task-4/models"
	"task-4/utils"
)

func (c *Controller) GetCartItems(ctx echo.Context) error {
	cartItems, err := c.repo.GetCartItems()
	if err != nil {
		return ctx.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return ctx.JSON(http.StatusOK, cartItems)
}

func (c *Controller) GetCartItem(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	cartItem, err := c.repo.GetCartItemByID(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	return ctx.JSON(http.StatusOK, cartItem)
}

func (c *Controller) CreateCartItem(ctx echo.Context) error {
	var cartItem models.Cart

	if err := ctx.Bind(&cartItem); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	newCartItem, err := c.repo.CreateCartItem(cartItem)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusInternalServerError, err)
	}

	return ctx.JSON(http.StatusCreated, newCartItem)
}

func (c *Controller) UpdateCartItem(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)
	var cartItem models.Cart

	if err := ctx.Bind(&cartItem); err != nil {
		return utils.ErrorResponse(ctx, http.StatusBadRequest, err)
	}

	updatedCartItem, err := c.repo.UpdateCartItem(id, cartItem)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.JSON(http.StatusOK, updatedCartItem)
}

func (c *Controller) DeleteCartItem(ctx echo.Context) error {
	id, _ := utils.ParseID(ctx)

	err := c.repo.DeleteCartItem(id)

	if err != nil {
		return utils.ErrorResponse(ctx, http.StatusNotFound, err)
	}

	return ctx.NoContent(http.StatusNoContent)
}
