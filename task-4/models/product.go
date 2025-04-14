package models

import (
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Title      string   `json:"title" gorm:"not null" validate:"required"`
	Price      int      `json:"price" gorm:"not null" validate:"required"`
	Amount     int      `json:"amount" gorm:"not null" validate:"required"`
	CategoryID uint     `json:"category_id"`
	Category   Category `json:"-"`
}

func InStock(db *gorm.DB) *gorm.DB {
	return db.Where("amount > ?", 0)
}
