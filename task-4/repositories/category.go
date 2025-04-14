package repositories

import (
	"fmt"
	"task-4/models"
)

func (r *Repository) GetCategories(withProductsOnly bool) ([]models.Category, error) {
	var categories []models.Category
	query := r.DB

	if withProductsOnly {
		query = query.Scopes(models.WithProducts)
	}

	err := query.Preload("Products").Find(&categories).Error
	return categories, err
}

func (r *Repository) GetCategoryByID(id int) (*models.Category, error) {
	var category models.Category

	if err := r.DB.Preload("Products").First(&category, id).Error; err != nil {
		return nil, fmt.Errorf("category item not found")
	}

	return &category, nil
}

func (r *Repository) CreateCategory(p models.Category) (*models.Category, error) {
	if err := r.DB.Create(&p).Error; err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *Repository) UpdateCategory(id int, c models.Category) (*models.Category, error) {
	category, err := r.GetCategoryByID(id)
	if err != nil {
		return nil, err
	}

	category.Title = c.Title

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
