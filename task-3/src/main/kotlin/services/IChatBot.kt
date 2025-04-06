package services

import entities.categoryStorage
import entities.productStorage

interface IChatBot {
    suspend fun run()

    fun getProductsByCategory(requestedCategory: String): String {
        val category = categoryStorage.firstOrNull { it.id.equals(requestedCategory) }
        val products = productStorage.filter { it.category == category }

        val message =
            if (products.isEmpty()) {
                "Not found products for this category"
            } else {
                "Products:\n" + products.joinToString("\n") { "- ${it.title}: ${it.price}zł (x${it.amount})" }
            }

        return message
    }

    fun getCategories(): String {
        return "Categories:\n" + categoryStorage.joinToString("\n") { "- ${it.title}" }
    }
}