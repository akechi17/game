import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "../components/SingleCard";
import { Link } from "react-router-dom";

const cardImages = [
  { src: "/img/childe.jpg", matched: false }, 
  { src: "/img/hutao.jpg", matched: false }, 
  { src: "/img/keqing.jpg", matched: false }, 
  { src: "/img/mona.jpg", matched: false }, 
  { src: "/img/venti.jpg", matched: false }, 
  { src: "/img/zhongli.jpg", matched: false },
  { src: "/img/azhdaha.jpg", matched: false },
  { src: "/img/hutao2.jpg", matched: false },
];

const LevelTwo = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(20);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [levelDone, setLevelDone] = useState(false);
    const [matched, setMatched] = useState(0);
    const [levelFailed, setLevelFailed] = useState(false);
  
    //untuk mengacak kartu
    const shuffleCards = () => {
      const shuffleCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: Math.random() }));
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards);
      setTurns(20);
      setMatched(0);
      setLevelDone(false)
      setLevelFailed(false);
    };
  
    // Menghandle function
    const handleChoice = (card) => {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
      if ( matched === 8 ) {
        setLevelDone(true)
      }
    }, [matched])

    useEffect(() => {
      if (turns === 0) {
        setLevelFailed(true)
      }
    }, [turns])
  
    // Membandingkan 2 kartu yang telah dipilih
    useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return {...card, matched: true }
              } else {
                return card
              }
            })
          })
          resetTurn()
          countMatched()
        } else {
          setTimeout(() => resetTurn(), 1000)
        }
      }
    }, [choiceOne, choiceTwo]);
  
    console.log(cards)
  
    // Reset pilihan & tambah giliran
    const resetTurn = () => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTurns(prevTurns => prevTurns - 1);
      setDisabled(false);
    };

    // Menghitung kartu yang cocok
    const countMatched = () => {
      setMatched(prevMatched => prevMatched + 1)
    }
  
    // Mulai game secara otomatis
    useEffect(() => {
      shuffleCards()
    }, [])

  return (
    <>
    <div className="App">
        <h1 className="text-5xl pb-5">Akechi's Memory</h1>
        <p>Level 2</p>
        <div className="flex justify-center w-full py-2.5 px-5 ">
            {/* <Link to="/LevelThree" className="link">
              Level 3
            </Link> */}
            <button className="link" onClick={shuffleCards}>Reset</button>
        </div>

        <div className="flex w-full justify-center py-5">
            <div className="grid grid-cols-4 grid-rows-4 gap-5 lg:grid-cols-4">
                {cards.map((card) => (
                <SingleCard
                    key={card.id}
                    card={card}
                    handleChoice={handleChoice}
                    flipped={card === choiceOne || card === choiceTwo || card.matched}
                    disabled={disabled}
                />
                ))}
            </div>
        </div>
        <p>Turns: {turns}</p>
  </div>
  <div className={levelDone ? "flex items-center justify-center fixed top-0 z-50 h-full w-full bg-white bg-opacity-90" : "hidden"}>
    <div className="bg-white w-[40rem] p-8 m-8 rounded-lg border-2 border-solid border-black border-opacity-10">
      <h3 className="text-4xl uppercase text-black text-center">You Won!</h3>
      <p className="text-2xl text-black text-center">Score : {turns}</p>
      <Link to="/">
        <button className="text-center w-full my-6 hover:bg-[#c23866] mt-4 inline-block py-3 px-12 rounded-lg text-white text-2xl bg-[#1b1523]" onClick={shuffleCards}>
          Start Over
        </button>
      </Link>
    </div>
  </div>
  <div className={levelFailed ? "flex items-center justify-center fixed top-0 z-50 h-full w-full bg-white bg-opacity-90" : "hidden"}>
    <div className="bg-white w-[40rem] p-8 m-8 rounded-lg border-2 border-solid border-black border-opacity-10">
      <h3 className="text-4xl uppercase text-black text-center">You Failed</h3>
      <button className="text-center w-full my-6 hover:bg-[#c23866] mt-4 inline-block py-3 px-12 rounded-lg text-white text-2xl bg-[#1b1523]" onClick={shuffleCards}>
        Try Again
      </button>
    </div>
  </div>
  </>
  )
}

export default LevelTwo