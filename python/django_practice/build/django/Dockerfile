FROM python:3.9-buster
ENV PYTHONBUFFERED 1
RUN mkdir /django_practice
WORKDIR /django_practice
COPY ./requirements.txt ../requirements.txt
RUN pip install --upgrade pip
RUN pip install -r ../requirements.txt
EXPOSE 8000