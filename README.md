docker build -t prog5client .

docker run --name cl -e PROG5_BACKEND_URL=http://tester:80 -p 9000:9000 --network prog5_default prog5client
