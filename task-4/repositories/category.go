package repositories

import (
	"fmt"
	"task-4/models"
)

func (r *Repository) GetCategories() ([]models.Cart, error) {
	var categories []models.Cart
	err := r.DB.Find(&categories).Error
	return categories, err
}

func (r *Repository) GetCategoryByID(id int) (*models.Cart, error) {
	var category models.Cart

	if err := r.DB.First(&category, id).Error; err != nil {
		return nil, fmt.Errorf("cart item not found")
	}

	return &category, nil
}

func (r *Repository) CreateCategory(p models.Cart) (*models.Cart, error) {
	if err := r.DB.Create(&p).Error; err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *Repository) UpdateCategory(id int, c models.Cart) (*models.Cart, error) {
	category, err := r.GetCategoryByID(id)
	if err != nil {
		return nil, err
	}

	category.Quantity = c.Quantity
	category.ProductID = c.ProductID

	if err := r.DB.Save(category).Error; err != nil {
		return nil, err
	}

	return category, nil
}

func (r *Repository) DeleteCategory(id int) error {
	category, err := r.GetCategoryByID(id)
	if err != nil {
		return err
	}
	return r.DB.Delete(category).Error
}
