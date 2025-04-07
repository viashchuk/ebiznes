val ktor_version: String by project
val logback_version: String by project
val typesafe_version: String by project
val kord_version: String by project
val bolt_socket_mode: String by project
val websocket_api: String by project
val tyrus_standalone_client: String by project
val coroutines: String by project


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
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:$coroutines")

    implementation("dev.kord:kord-core:$kord_version")

    implementation("com.slack.api:bolt-socket-mode:$bolt_socket_mode")
    implementation("javax.websocket:javax.websocket-api:$websocket_api")
    implementation("org.glassfish.tyrus.bundles:tyrus-standalone-client:$tyrus_standalone_client")
}

application {
    mainClass.set("MainKt")
}