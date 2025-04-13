package main

import (
	"task-4/controllers"
	"task-4/db"
	"task-4/repositories"
	"task-4/routes"
	"task-4/seeds"

	"github.com/labstack/echo/v4"
)

func main() {
	db := db.InitDB()

	s := seeds.Seed{DB: db}
	s.SeedProducts()

	e := echo.New()

	repo := &repositories.Repository{DB: db}
	c := controllers.NewController(repo)

	routes.SetupRoutes(e, c)

	e.Logger.Fatal(e.Start(":1323"))
}
