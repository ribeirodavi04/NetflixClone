import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);

  useEffect(()=>{
    const loadAll = async()=>{
      //Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    
      //Pegando o fetaure data(filme em destaque)
      let orgNetflix = list.filter(i=>i.slug === 'originals');
      let numRdm = Math.floor(Math.random()*(orgNetflix[0].items.results.length - 1));
      let chosen = orgNetflix[0].items.results[numRdm];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      
      setFeaturedData(chosenInfo);
      console.log(featuredData);
    }

    loadAll();
  }, []);

  return (
    <div className="page">

      {featuredData && 
        < FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
    </div>
  );
}

export default App;
