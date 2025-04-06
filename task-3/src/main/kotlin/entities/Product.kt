package entities

import kotlinx.serialization.Serializable
import entities.Category

@Serializable
data class Product (
    val title: String,
    val price: Double,
    val amount: Int,
    val category: Category
)
val productStorage = mutableListOf<Product>()