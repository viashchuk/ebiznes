package main

import (
	"task-4/controllers"

	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	e.GET("/products", controllers.GetProducts)
	e.GET("/products/:id", controllers.GetProduct)
	e.POST("/products", controllers.CreateProduct)
	e.PUT("/products/:id", controllers.UpdateProduct)
	e.DELETE("/products/:id", controllers.DeleteProduct)

	e.Logger.Fatal(e.Start(":1323"))
}
