package repositories

import (
	"fmt"
	"task-4/models"
)

func (r *Repository) GetCartItems() ([]models.Cart, error) {
	var cartItems []models.Cart
	err := r.DB.Find(&cartItems).Error
	return cartItems, err
}

func (r *Repository) GetCartItemByID(id int) (*models.Cart, error) {
	var cartItem models.Cart

	if err := r.DB.First(&cartItem, id).Error; err != nil {
		return nil, fmt.Errorf("cart item not found")
	}

	return &cartItem, nil
}

func (r *Repository) CreateCartItem(p models.Cart) (*models.Cart, error) {
	if err := r.DB.Create(&p).Error; err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *Repository) UpdateCartItem(id int, c models.Cart) (*models.Cart, error) {
	cartItem, err := r.GetCartItemByID(id)
	if err != nil {
		return nil, err
	}

	cartItem.Quantity = c.Quantity
	cartItem.ProductID = c.ProductID

	if err := r.DB.Save(cartItem).Error; err != nil {
		return nil, err
	}

	return cartItem, nil
}

func (r *Repository) DeleteCartItem(id int) error {
	cartItem, err := r.GetCartItemByID(id)
	if err != nil {
		return err
	}
	return r.DB.Delete(cartItem).Error
}
