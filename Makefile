SHELL := /bin/bash

GIT_TAG := $(shell git rev-parse --short HEAD 2> /dev/null)
BUILD_TAG := $(if $(BUILD_TAG),$(BUILD_TAG),tutord/tutord-react-bp:$(GIT_TAG))

# Arguments
env ?= dev

init: deps

deps:
	@echo "*** Installing Deps ***"
	npm install

test:
	@echo "*** CI Tests Running ***"
	npm run format:dry
	npm run flow
	npm run test:ci

build-staging:
	@echo "*** Build Staging ***"
	GIT_TAG=$(GIT_TAG) \
	REACT_APP_BUILD_ENV=staging \
	REACT_APP_TUTORD_API_ORIGIN=http://localhost:3001 \
	BUILD_ENV=staging \
	npm run build

deploy-staging: build-staging
	@echo "*** Deploy Staging ***"
	GIT_TAG=$(GIT_TAG) \
	NODE_ENV="staging" \
	npm run build

build-prod:
	@echo "*** Build Production ***"
	GIT_TAG=$(GIT_TAG) \
	BUILD_ENV=production \
	npm run build

deploy-prod: build-prod
	@echo "*** Deploy Production ***"
	NODE_ENV="production" \

ci: deps test deploy-staging

.PHONY: deploy-staging deploy-prod ci
