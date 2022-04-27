FROM ubuntu

COPY evaluation /opt/app/evaluation

COPY images /opt/app/images

COPY model /opt/app/model

COPY app.py /opt/app/

COPY requirements.txt /opt/app/

RUN apt update

RUN apt upgrade -y

RUN apt install python3 -y

RUN apt install python3-pip -y

RUN apt install python3.10-venv -y

RUN pip install -r opt/app/requirements.txt

WORKDIR /opt/app/

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=3033"]
