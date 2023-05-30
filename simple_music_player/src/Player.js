import { useEffect, useState } from "react"; 
import useSound from "use-sound";  
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; 
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; 
import { IconContext } from "react-icons"; 
import MusicObject from "./MusicObject";
import sound1 from "../src/assets/song1.mp3";
import sound2 from "../src/assets/song2.mp3";
import sound3 from "../src/assets/song3.mp3";

import sound1Img from "../src/assets/song1.jpg";
import sound2Img from "../src/assets/song2.jpg";
import sound3Img from "../src/assets/song3.jpg";

export default function Player(){
    const [selectedImg, setSelectedImg] = useState(sound1Img);
    const [title, setTitle] = useState("This game");
    const [author, setauthor] = useState("Konomi Suzuki");

    const [currentMusic, setCurrentMusic] = useState(sound1);
    const [isPlaying,setIsPlaying] = useState(false);
    let [play, { pause, duration, sound }]=useSound(currentMusic);

    const data =[
        {
            title: "This game",
            author:"Konomi Suzuki",
            link: sound1,
            img: sound1Img,
        },
        {
            title: "Hikarunara",
            author: "Goose house",
            link: sound2,
            img: sound2Img,
        },
        {
            title: "RADWIMPS",
            author: "Yume Tourou",
            link: sound3,
            img: sound3Img,
        }
    ]


    



    const [currTime, setCurrTime] = useState({
        min: "",
        sec: "",
      });

      const [time, setTime] = useState({
        min: "",
        sec: "",
      });  
    const [seconds, setSeconds] = useState();
    useEffect(() => {
        const interval = setInterval(() => {
          if (sound) {
            setSeconds(sound.seek([])); // setting the seconds state with the current state
            const min = Math.floor(sound.seek([]) / 60);
            const sec = Math.floor(sound.seek([]) % 60);
            setCurrTime({
              min,
              sec,
            });
          }
        }, 1000);
        return () => clearInterval(interval);
      }, [sound]); 

      useEffect(() => {
        const sec = duration / 1000;
        const min = Math.floor(sec / 60);
        const secRemain = Math.floor(sec % 60);
        setTime({
          min: min,
          sec: secRemain
        })},[currentMusic]);
    
    const playingButton = () =>{
        if(isPlaying)
        {
            pause();
            setIsPlaying(false);
        }else{
            play();
            setIsPlaying(true);
        }
    };

    const test =()=>{
        console.log("test");

    }

    const selectSong = (link,img,title,author) =>{
        setTitle(title);
        setauthor(author);
        setSelectedImg(img);
        pause();
        setIsPlaying(false)
        setCurrentMusic(link);
    }
    return(
        <div style={{display:"flex",gap:"2rem"}}>
        
            <div className="component">
                

             
                        <h2>Odtwarzana Teraz</h2>
                <img
                    style={{
                        width:"300px",
                        height: "300px",
                        objectFit:"cover"
                    }}
                    className="musicCover"
                    src={selectedImg}
                />


                <div>
                    <div className="time">
                    <p>
                        {currTime.min}:{currTime.sec}
                    </p>
                    <p>
                        {time.min}:{time.sec}
                    </p>
                    </div>
                    <input
                    type="range"
                    min="0"
                    max={duration / 1000}
                    default="0"
                    value={seconds}
                    className="timeline"
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                    />
                </div>


                        <div>
                            <h3 className="title">{title}</h3>
                            <p className="subTitle">{author}</p>
                        </div>
                        <div>
                            
                           
                            {!isPlaying ? (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "12em", color: "#27AE60" }}>
                                <AiFillPlayCircle />
                                </IconContext.Provider>
                            </button>
                            ) : (
                            <button className="playButton" onClick={playingButton}>
                                <IconContext.Provider value={{ size: "12em", color: "#27AE60" }}>
                                <AiFillPauseCircle />
                                </IconContext.Provider>
                            </button>
                            )}
           
                        </div>

                
                
                </div>
                 <div className="component" style={{
                    padding:"0 3rem 0 3rem"
                 }}>
                    <h2>Dostępne Piosenki</h2>
                        {
                            data.map((val,key)=>{
                                return(
                                    <div style={{
                                        display:"flex",
                                        width:"100%",
                                        alignItems:"center",
                                        marginBottom:"1rem"
                                    }}>
                                         <div >{val.title}</div>
                                         <button className="chooseMusicButton"
                                            style={{
                                                marginLeft:"auto",
                                                marginRight:"0"
                                            }}
                                            onClick={()=>selectSong(val.link,val.img,val.title,val.author)}
                                         >Odtwórz</button>
                                    </div>
                                   
                                )
                            })
                        }
                 </div>
                 </div>
    )
}