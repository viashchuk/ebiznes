plugins {
    kotlin("jvm") version "2.1.10"
    application 
}

group = "org.viki"
version = "1.0"

repositories {
    mavenCentral()
}

dependencies { 
    implementation("org.xerial:sqlite-jdbc:3.49.1.0")
}

application {
    mainClass = "AppKt" 
}