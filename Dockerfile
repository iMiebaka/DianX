FROM python:3.9-alpine
RUN apk update && apk add --no-cache git && rm -rf /var/cache/apk/*

WORKDIR /src
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

EXPOSE 1221

CMD ["python", "wsgi.py"]