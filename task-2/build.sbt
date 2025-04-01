name := """task-2"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.13.16"


resolvers += "Play Releases" at "https://repo.playframework.com"

libraryDependencies ++= Seq(
  guice,
  "com.h2database" % "h2" % "2.2.224",
  "org.playframework" %% "play-slick" % "6.1.0",
  "org.playframework" %% "play-slick-evolutions" % "6.1.0",
  "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test,
  "mysql" % "mysql-connector-java" % "8.0.33"
)

// libraryDependencies += guice
// libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "7.0.1" % Test
// libraryDependencies += "com.h2database" % "h2" % "2.3.232"
// libraryDependencies += "com.typesafe.play" %% "play-slick" % "6.1.0"
// libraryDependencies += "com.typesafe.play" %% "play-slick-evolutions" % "6.1.0"
// libraryDependencies += "mysql" % "mysql-connector-java" % "8.0.33"

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
