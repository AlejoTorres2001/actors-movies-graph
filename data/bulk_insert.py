import os
import requests

DATA_DIR='./data/small'
DEPLOY_URL='https://movies-actors-graph.herokuapp.com'
dataset_db_actors_id_map={}
dataset_db_movies_id_map={}

def load_actors():
  actors_dataset_path=os.path.join(DATA_DIR,'people.csv')
  print(f"inserting actors from {actors_dataset_path} through API...")
  with open(actors_dataset_path, 'r') as f:
    count=0
    next(f)
    for line in f:
      try:
        id,name,year=line.strip().split(',')
        name=name.removeprefix('"').removesuffix('"')
        res = requests.post(f'{DEPLOY_URL}/actors', json={'name':name,'birthYear':int(year)})
        dataset_db_actors_id_map[id]=res.json()['id']
        count+=1
      except Exception as e:
        print(f"error inserting actor {line}: {e}")
  print(f"inserted {count} actors!")

def load_movies():
  movies_dataset_path=os.path.join(DATA_DIR,'movies.csv')
  print(f"inserting movies from {movies_dataset_path} through API...")
  with open(movies_dataset_path, 'r') as f:
    next(f)
    count=0
    for line in f:
      try:
        id,title,year=line.strip().split(',')
        title=title.removeprefix('"').removesuffix('"')
        res = requests.post(f'{DEPLOY_URL}/movies', json={'title':title,'year':int(year)})
        dataset_db_movies_id_map[id]=res.json()['id']
        count+=1
      except Exception as e:
        print(f"error inserting movie ${line}: ${e}")
  print(f"inserted {count} movies!")
def load_appearances():
  appearances_dataset_path=os.path.join(DATA_DIR,'appearances.csv')
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
        print(f"error inserting appearance ${line}: ${e}")
  print(f"inserted {count} appearances!")

if __name__ == '__main__':
  load_actors()
  load_movies()
  load_appearances()