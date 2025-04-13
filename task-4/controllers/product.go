package controllers

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"

	"task-4/models"
	"task-4/services"
)

func GetProducts(c echo.Context) error {
	products := services.GetProducts()
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product, err := services.GetProductByID(id)

	if err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, product)
}

func CreateProduct(c echo.Context) error {
	var product models.Product

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Wrong data"})
	}

	newProduct := services.CreateProduct(product)

	return c.JSON(http.StatusCreated, newProduct)
}

func UpdateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product models.Product

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Wrong data"})
	}

	updatedProduct, err := services.UpdateProduct(id, product)

	if err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, updatedProduct)
}

func DeleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	err := services.DeleteProduct(id)

	if err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": err.Error()})
	}

	return c.NoContent(http.StatusNoContent)
}
