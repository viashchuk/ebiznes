package seeds

import (
	"task-4/models"
)

func (s *Seed) SeedCategories() {
	categories := []models.Category{
		{Name: "Phones"},
		{Name: "Laptops"},
	}

	for _, category := range categories {
		s.DB.Create(&category)
	}
}
