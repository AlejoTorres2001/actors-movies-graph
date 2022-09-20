import os
from decouple import config
import psycopg2

DB_HOST=config('DB_HOST')
DB_NAME=config('DB_NAME')
DB_PASSWORD=config('DB_PASSWORD')
DB_USERNAME=config('DB_USERNAME')
DB_PORT=config('DB_PORT')

conn = psycopg2.connect(
  host=DB_HOST,
  database=DB_NAME,
  user=DB_USERNAME,
  password=DB_PASSWORD,
  port=DB_PORT
)
cursor=conn.cursor()

DATA_DIR='./data/small'

def load_actors():
  with open(os.path.join(DATA_DIR,'people.csv'), 'r') as f:
    next(f)
    for line in f:
      id,name,year=line.strip().split(',')
      name=name.removeprefix('"').removesuffix('"')
      cursor.execute("INSERT INTO actors VALUES (%s, %s, %s)", (id,name, year))
      conn.commit()
def load_movies():
  with open(os.path.join(DATA_DIR,'movies.csv'), 'r') as f:
    next(f)
    for line in f:
      id,title,year=line.strip().split(',')
      title=title.removeprefix('"').removesuffix('"')
      cursor.execute("INSERT INTO movies VALUES (%s, %s, %s)", (id,title, year))
      conn.commit()
def load_appearances():
  with open(os.path.join(DATA_DIR,'stars.csv'), 'r') as f:
    id=0
    next(f)
    for line in f:
      actor_id,movie_id=line.strip().split(',')
      cursor.execute("INSERT INTO appearances(id,actor_id,movie_id) VALUES (%s,%s, %s)", (id,actor_id,movie_id))
      conn.commit()
      id+=1
if __name__ == '__main__':
  load_actors()
  load_movies()
  load_appearances()