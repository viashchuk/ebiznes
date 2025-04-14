package seeds

import (
	"task-4/models"
)

func (s *Seed) SeedCartItems() {
	cartItems := []models.Cart{
		{ProductID: 1, Quantity: 2},
		{ProductID: 2, Quantity: 1},
	}

	for _, cartItem := range cartItems {
		s.DB.Save(&cartItem)
	}
}
