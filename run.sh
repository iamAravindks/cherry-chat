#!/bin/bash

echo -e "\033[34mCreating .env file and copying contents of .env.example...\033[0m"
cp .env.example .env

echo -e "\033[34mRunning npm install...\033[0m"
npm install

echo -e "\033[34mChanging to frontend directory and running npm install...\033[0m"
cd frontend
npm install
cd ..

echo -e "\033[34mRunning the dev and client:dev scripts...\033[0m"
npm run dev & npm run client:dev
