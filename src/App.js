import { BsFillVolumeUpFill } from 'react-icons/bs';
import Result from './Result';
import { useCallback, useEffect, useMemo, useState } from 'react';

const synth = window.speechSynthesis
function App() {

  const voices = useMemo(()=>synth.getVoices(),[]);
  const [voiceSelected,setVoiceSelected] = useState("Google US English");
  const [text,setText] = useState();
  const [isSpeaking,setIsSpeaking] = useState("");
  const [meanings,setMeanings] = useState([]);
  const [phonetics,setPhonetics] = useState([]);
  const [word,setWord] = useState("");
  const [error,setError] = useState("");

  const dictionaryApi = useCallback(()=>{
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
    .then(res=>res.json())
    .then(result=>{
      setMeanings(result[0].meanings)
      setPhonetics(result[0].phonetics)
      setWord(word[0].word);
      setError("");
    })
    .catch(err=>setError(err))
  },[text,word]);


  useEffect(()=>{
    if(!text?.trim()) return;
   
    let debounce;
    clearTimeout(debounce);
    debounce = setTimeout(()=>{
      dictionaryApi(text);
    },1000)
    return ()=>clearTimeout(debounce);
  },[text,dictionaryApi])

 
  function startspeech(txt){
    const utterance = new SpeechSynthesisUtterance(txt);
    const voice = voices.find(voice=>voice.name===voiceSelected);
    utterance.voice = voice;
    synth.speak(utterance);

}

  function handlespeech(){
    if(!text.trim()) return;
    if(!synth.speaking){
     startspeech(text);
     setIsSpeaking("speak")
    }else{
      synth.cancel()
    }
    setInterval(()=>{
       if(!synth.speaking){
        setIsSpeaking("")
       }
    },100)
  }

  return (
    <div className="container">
      <h1 style={{}}>English Dictionary</h1>
      <section className="form">
        <form>
          <div className="row">
            <textarea cols="30" rows="4"
            onChange={e=>setText(e.target.value)}
            value={text?.trim()}
            placeholder='Enter text' />
            <div className="voices-icons">
              <div className="select-voices">
                <select name="" id=""
                 value={voiceSelected}
                 onChange={e=>setVoiceSelected(e.target.value)}
                 >
                  {
                    voices.map(voice=>(
                      <option key={voice.name} value={voice.name}>{voice.name}</option>
                    ))
                  }
                </select>
              </div>
              <BsFillVolumeUpFill onClick={handlespeech}
               className={`icon ${isSpeaking}`} />
            </div>
          </div>
        </form>
       
          <Result
        word={word}
        phonetics={phonetics}
        meanings={meanings}
        setText={setText}
        />
        
      </section>
    </div>
  );
}

export default App;
