package entities

import kotlinx.serialization.Serializable

@Serializable
data class Category (
    val title: String
)
val categoryStorage = mutableListOf<Category>()