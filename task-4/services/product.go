package services

import (
	"fmt"
	"task-4/models"
)

var products = map[int]*models.Product{
	1: {ID: 1, Title: "iPhone 10", Price: 1200, Amount: 1},
	2: {ID: 2, Title: "iPhone 16", Price: 6000, Amount: 10},
}

var seq = 3

func GetProducts() map[int]*models.Product {
	return products
}

func GetProductByID(id int) (*models.Product, error) {
	product, exists := products[id]

	if !exists {
		return nil, fmt.Errorf("product not found")
	}

	return product, nil
}

func CreateProduct(product models.Product) *models.Product {
	product.ID = seq
	productPtr := &product

	products[seq] = productPtr
	seq++

	return productPtr
}

func UpdateProduct(id int, product models.Product) (*models.Product, error) {
	_, exists := products[id]

	if !exists {
		return nil, fmt.Errorf("product not found")
	}

	product.ID = id
	products[id] = &product
	seq++

	return &product, nil
}

func DeleteProduct(id int) error {
	_, exists := products[id]

	if !exists {
		return fmt.Errorf("product not found")
	}

	delete(products, id)

	return nil
}
