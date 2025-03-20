FROM ubuntu:24.04

RUN apt-get update && apt-get install -y wget curl software-properties-common unzip zip

RUN add-apt-repository ppa:deadsnakes/ppa 
RUN apt-get update && apt-get install -y python3.10

RUN apt-get install -y openjdk-8-jdk
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"