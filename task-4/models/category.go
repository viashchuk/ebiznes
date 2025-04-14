package models

import (
	"gorm.io/gorm"
)

type Category struct {
	gorm.Model
	Title    string    `json:"title"`
	Products []Product `json:"products"`
}

func WithProducts(db *gorm.DB) *gorm.DB {
	return db.
		Joins("JOIN products ON products.category_id = categories.id").
		Group("categories.id")
}
