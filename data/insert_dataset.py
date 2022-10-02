import os
from dotenv import dotenv_values
import requests
import threading
import time
config = dotenv_values(".env")
DATA_DIR='./data/small'
DEPLOY_URL= config['DEV_URL']
dataset_db_actors_id_map={}
dataset_db_movies_id_map={}
def load_actors():
  actors_rows=[]
  dataset_id_name_holder={}
  actors_dataset_path=os.path.join(DATA_DIR,'people.csv')
  print(f"inserting complete actors dataset from {actors_dataset_path} through API...")
  try:
    with open(actors_dataset_path, 'r') as f:
      count=0
      next(f)
      for line in f:
        line=line.strip().split(',')
        id = line[0]
        name = line[1]
        name=name.removeprefix('"').removesuffix('"')
        year = line[2] if (len(line) == 3 and line[2] != '') else 0
        actors_rows.append({'name':name,'birthYear':int(year
        )})
        dataset_id_name_holder[name]=id
    res = requests.post(f'{DEPLOY_URL}/actors/many', json=actors_rows)
    res_data = res.json()
    for actor in res_data:
      dataset_id=dataset_id_name_holder[actor['name']]
      dataset_db_actors_id_map[dataset_id]=actor['id']
      count+=1
    print(f"inserted {count} actors!")
  except Exception as e:
    print(f"error inserting actors: {e}")
    print(actor)

def load_actors_sequentially():
  actors_dataset_path=os.path.join(DATA_DIR,'people.csv')
  print(f"inserting actors sequentially from {actors_dataset_path} through API...")
  with open(actors_dataset_path, 'r') as f:
    count=0
    next(f)
    for line in f:
      try:
        line=line.strip().split(',')
        id = line[0]
        name = line[1]
        name=name.removeprefix('"').removesuffix('"')
        year = line[2] if (len(line) == 3 and line[2] != '') else 0
        res = requests.post(f'{DEPLOY_URL}/actors', json={'name':name,'birthYear':int(year)})
        dataset_db_actors_id_map[id]=res.json()['id']
        count+=1
      except Exception as e:
        print(f"error inserting actor {line}: {e}")
  print(f"inserted {count} actors!")
def load_movies():
  movies_rows=[]
  dataset_id_title_holder={}
  movies_dataset_path=os.path.join(DATA_DIR,'movies.csv')
  print(f"inserting complete movies dataset from {movies_dataset_path} through API...")
  try:
    with open(movies_dataset_path, 'r') as f:
      next(f)
      count=0
      for line in f:
        line=line.strip().split(',')
        id = line[0]
        title = line[1]
        title=title.removeprefix('"').removesuffix('"')
        year = line[2] if (len(line) == 3 and line[2] != '') else 0
        movies_rows.append({'title':title,'year':int(year)})
        dataset_id_title_holder[title]=id
      res = requests.post(f'{DEPLOY_URL}/movies/many', json=movies_rows)
      res_data = res.json()
      for movie in res_data:
        count+=1
        dataset_id=dataset_id_title_holder[movie['title']]
        dataset_db_movies_id_map[dataset_id]=movie['id']
      print(f"inserted {count} movies!")
  except Exception as e:
    print(f"error inserting movies: {e}")

def load_movies_sequentially():
  movies_dataset_path=os.path.join(DATA_DIR,'movies.csv')
  print(f"inserting movies from {movies_dataset_path} through API...")
  with open(movies_dataset_path, 'r') as f:
    next(f)
    count=0
    for line in f:
      try:
        line=line.strip().split(',')
        id = line[0]
        title = line[1]
        title=title.removeprefix('"').removesuffix('"')
        year = line[2] if (len(line) == 3 and line[2] != '') else 0
        res = requests.post(f'{DEPLOY_URL}/movies', json={'title':title,'year':int(year)})
        dataset_db_movies_id_map[id]=res.json()['id']
        count+=1
      except Exception as e:
        print(f"error inserting movie {line}: {e}")
  print(f"inserted {count} movies!")

def load_appearances():
  appearances_rows=[]
  appearances_dataset_path=os.path.join(DATA_DIR,'stars.csv')
  print(f"inserting complete appearances dataset from {appearances_dataset_path} through API...")
  try:
    with open(appearances_dataset_path, 'r') as f:
      next(f)
      count=0
      for line in f:
        actor_dataset_id,movie_dataset_id=line.strip().split(',')
        actor_db_id=dataset_db_actors_id_map[actor_dataset_id]
        movie_db_id=dataset_db_movies_id_map[movie_dataset_id]
        appearances_rows.append({'actorId':int(actor_db_id),'movieId':int(movie_db_id)})
        count+=1
    res = requests.post(f'{DEPLOY_URL}/appearances/many', json=appearances_rows)
    print(f"inserted {count} appearances!")
  except Exception as e:
    print(f"error inserting appearances: {e}")
def load_appearances_sequentially():
  appearances_dataset_path=os.path.join(DATA_DIR,'stars.csv')
  print(f"inserting appearances from {appearances_dataset_path} through API...")
  with open(appearances_dataset_path, 'r') as f:
    next(f)
    count=0
    for line in f:
      try:
        actor_dataset_id,movie_dataset_id=line.strip().split(',')
        actor_db_id=dataset_db_actors_id_map[actor_dataset_id]
        movie_db_id=dataset_db_movies_id_map[movie_dataset_id]
        res = requests.post(f'{DEPLOY_URL}/appearances', json={'actorId':int(actor_db_id),'movieId':int(movie_db_id)})
        count+=1
      except Exception as e:
        print(f"error inserting appearance {line}: {e}")
  print(f"inserted {count} appearances!")


def load_data(threaded:bool):
  start_time = time.time()
  if threaded:
    t1 = threading.Thread(target=load_actors)
    t2 = threading.Thread(target=load_movies)
    t3 = threading.Thread(target=load_appearances)
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    t3.start()
    t3.join()
  else:
    load_actors()
    load_movies()
    load_appearances()
  end_time = time.time()
  total_time = end_time - start_time
  print("Total Time Elapsed: ", total_time)

if __name__ == '__main__':
  load_data(threaded=True)
