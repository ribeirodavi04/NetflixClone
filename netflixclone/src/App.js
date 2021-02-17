import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';
import Header from './components/Header/Header';

function App() {
  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

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
      console.log(movieList);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener);
    return ()=>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData && 
        < FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>
      <footer>
        Direitos de imagem para Netflix<br/>
        Dados pegos do site TheMoviedb.org
      </footer>
    </div>
  );
}

export default App;
