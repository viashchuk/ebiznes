package entities.seeds

object SeedRunner {
    fun run() {
        val categoryById = CategorySeeder.seed()
        ProductSeeder.seed(categoryById)
    }
}