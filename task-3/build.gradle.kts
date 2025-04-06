val ktor_version: String by project
val logback_version: String by project
val typesafe_version: String by project
val kord_version: String by project


plugins {
    kotlin("jvm") version "2.1.10"
    application
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-client-core:$ktor_version")
    implementation("io.ktor:ktor-client-cio:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("com.typesafe:config:$typesafe_version")
    implementation("dev.kord:kord-core:$kord_version")
}

application {
    mainClass.set("MainKt")
}