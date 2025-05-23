package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"task-4/models"
)

func InitDB() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&models.Product{}, &models.Cart{}, &models.Category{}, &models.Merchant{}, &models.Customer{})

	return db
}
