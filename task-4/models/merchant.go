package models

import "gorm.io/gorm"

type Merchant struct {
	gorm.Model
	Name  string `json:"name" gorm:"not null"`
	Email string `json:"email" gorm:"not null;unique"`

	Products []Product `json:"products" gorm:"foreignKey:MerchantID"`
}
