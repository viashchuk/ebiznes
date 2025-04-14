package seeds

import "task-4/models"

func (s *Seed) SeedCustomers() {
	customers := []models.Customer{
		{Name: "Viki", Email: "viki@example.com"},
		{Name: "Kuba", Email: "kuba@example.com"},
	}

	for _, customer := range customers {
		s.DB.Create(&customer)
	}
}
