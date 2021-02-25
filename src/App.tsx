import {useState} from 'react';
import './App.css';
import episodes from './episodes.json';
import './App.css';

interface EpisodeTypes {
    id: number;
    url: string; 
    name: string;
    season: number;
    number: number;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: {
      medium:
        string;
      original:
        string;
    },
    summary: string;
    _links: {
      self: {
        href: string
      }
    }
  };

//Function pads Episode number and season with 0s
function padEpisode(unpadded: number) {
    return (unpadded < 10 ? `0${unpadded}` : unpadded);
}

//Function for main bulk of text
function EpisodeBulk(props: EpisodeTypes) {
  return (
    <div className="Episodes">
      <h1>{props.name} - S{padEpisode(props.season)} E{padEpisode(props.number)}</h1>
      <img src = {props.image.medium} alt = "Episode"/>
      <p>{props.summary.replace(/<p>|<\/p>/g, '')}</p>
    </div>
  );
}

//Function which maps main bulk of text for each episode
function mappedEpisodes(props: EpisodeTypes[]) {
    return (props.map(EpisodeBulk))
  };
  
//Function creating SearchBar functionality
function SearchBar() {
  const [input, setInput] = useState("")
  const [episodeList, setEpisodeList] = useState(episodes)

  return (
    <div className= "App">
      <div className="searchBar">
        <input 
          // key="searchElement"
          value={input}
          placeholder={"search episode"}
          onChange= {(event) => {
              setInput(event.target.value);
              let hi: string = event.target.value;
              setEpisodeList(episodes.filter((episode)=> {
                return (
                  episode.name.toLowerCase().includes(hi.toLowerCase()) ||
                  episode.summary.toLowerCase().includes(hi.toLowerCase())
              
              )}))
          }}></input></div>
      
      <div className= "mappedEpisodes"> {mappedEpisodes(episodeList)} </div>
      

    </div>
  );
};

export default SearchBar;
