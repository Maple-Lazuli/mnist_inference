# Installation

## Existing Image

To pull and run the existing image on Dockerhub, execute the following in a termnial
```shell
sudo docker run -d -p 3003:3003 lovelylazuli/mnist-inference-frontend
```

## Rebuild

If there are issues with Dockerhub or the images are out of date. Rebuild the image with the following:
```shell
sudo docker build . -f Dockerfile -t lovelylazuli/mnist-inference-frontend
```
