package routes

import (
	"task-4/controllers"

	"github.com/labstack/echo/v4"
)

func SetupRoutes(e *echo.Echo, c *controllers.Controller) {
	e.GET("/products", c.GetProducts)
	e.GET("/products/:id", c.GetProduct)
	e.POST("/products", c.CreateProduct)
	e.PUT("/products/:id", c.UpdateProduct)
	e.DELETE("/products/:id", c.DeleteProduct)
}
