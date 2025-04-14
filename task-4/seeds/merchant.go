package seeds

import "task-4/models"

func (s *Seed) SeedMerchants() {
	merchants := []models.Merchant{
		{Name: "Tech Store", Email: "tech@example.com"},
		{Name: "RTV", Email: "rtv@example.com"},
	}

	for _, merchant := range merchants {
		s.DB.Create(&merchant)
	}
}
