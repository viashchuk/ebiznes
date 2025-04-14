package repositories

import (
	"fmt"
	"task-4/models"
)

func (r *Repository) GetProducts() ([]models.Product, error) {
	var products []models.Product
	err := r.DB.Find(&products).Error
	return products, err
}

func (r *Repository) GetProductByID(id int) (*models.Product, error) {
	var product models.Product

	if err := r.DB.First(&product, id).Error; err != nil {
		return nil, fmt.Errorf("product not found")
	}

	return &product, nil
}

func (r *Repository) CreateProduct(p models.Product) (*models.Product, error) {
	if err := r.DB.Create(&p).Error; err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *Repository) UpdateProduct(id int, p models.Product) (*models.Product, error) {
	product, err := r.GetProductByID(id)
	if err != nil {
		return nil, err
	}

	product.Title = p.Title
	product.Price = p.Price
	product.Amount = p.Amount

	if err := r.DB.Save(product).Error; err != nil {
		return nil, err
	}

	return product, nil
}

func (r *Repository) DeleteProduct(id int) error {
	product, err := r.GetProductByID(id)
	if err != nil {
		return err
	}
	return r.DB.Delete(product).Error
}

func (r *Repository) GetProductsByCategoryID(c_id int) ([]models.Product, error) {
	var products []models.Product

	r.DB.Where("category_id = ?", c_id).Preload("Category").Find(&products)

	return products, nil
}
