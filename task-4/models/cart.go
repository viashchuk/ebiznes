package models

import (
	"gorm.io/gorm"
)

type Cart struct {
	gorm.Model
	Quantity   int      `json:"quantity"`
	ProductID  int      `json:"product_id"`
	Product    Product  `gorm:"foreignKey:ProductID" json:"product"`
	CustomerID uint     `json:"customer_id"`
	Customer   Customer `gorm:"foreignKey:CustomerID" json:"-"`
}
