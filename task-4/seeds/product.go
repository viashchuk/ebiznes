package seeds

import (
	"task-4/models"
)

func (s *Seed) SeedProducts() {
	products := []models.Product{
		{Title: "MacBook Air", Price: 7000, Amount: 1, CategoryID: 2, MerchantID: 1},
		{Title: "MacBook Pro", Price: 9000, Amount: 10, CategoryID: 2, MerchantID: 1},
		{Title: "iPhone 15", Price: 3000, Amount: 2, CategoryID: 1, MerchantID: 2},
	}

	for _, product := range products {
		s.DB.Save(&product)
	}
}
