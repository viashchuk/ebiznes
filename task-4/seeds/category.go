package seeds

import (
	"task-4/models"
)

func (s *Seed) SeedCategories() {
	categories := []models.Category{
		{Title: "Phones"},
		{Title: "Laptops"},
	}

	for _, category := range categories {
		s.DB.Create(&category)
	}
}
