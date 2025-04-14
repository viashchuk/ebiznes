package models

import "gorm.io/gorm"

type Customer struct {
	gorm.Model
	Name  string `json:"name" gorm:"not null"`
	Email string `json:"email" gorm:"not null;unique"`

	Carts []Cart `json:"carts" gorm:"foreignKey:CustomerID"`
}
