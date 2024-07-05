IMAGE_NAME := sentiment-backend
TAG := latest

login:
	@aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}

build:
	@aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${DOCKER_REGISTRY}
	@docker build --platform=linux/amd64 -t ${IMAGE_NAME} .
	@docker tag ${IMAGE_NAME} ${DOCKER_REGISTRY}/${IMAGE_NAME}:${TAG}
	@docker push ${DOCKER_REGISTRY}/${IMAGE_NAME}:${TAG}