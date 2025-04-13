package models

type Product struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Price  int    `json:"price"`
	Amount int    `json:"amount"`
}
