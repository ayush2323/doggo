import react, {useState, useEffect} from 'react'
import './CSS/index.css'
export default function App() {

  const [breeds, setBreeds] = useState([]);
  const [currentBreed, setCurrentBreed] = useState('affenpinscher')
  const [showImage, setShowImage] = useState('');
  const [error, checkError] = useState(false)
  const [loading, setLoading] = useState(true);

  const callApi = async () => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
        const dogBreed = await response.json();
        let dog = [];
        for(let i in dogBreed.message) {
          if(dogBreed.message[i].length != 0) {
            for(let a of dogBreed.message[i]) {
              dog.push(i + "/" + a)
              console.log(i + "/" + a)
            }
          } else {
            dog.push(i)
          }
        }
        setBreeds(dog);
      } catch (error) {
          checkError(true)
          console.error(error);
      } 
  }

  const getImage = async () => {
    try {
      setLoading(true)
        const res = await fetch(`https://dog.ceo/api/breed/${currentBreed}/images/random`);
        const image = await res.json();
        setShowImage(image);
    } catch (error) {
        checkError(true)
        console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  useEffect(()=> {
    getImage()
  }, [currentBreed])

  const changeHandler = (e) => {
    let clicked = e.target.value;
    setCurrentBreed(clicked)
    checkError(false)
  }

  const showResult = () => {
    if(loading) return <h1 id="loading">Loading...</h1>
    if(!error) return <img src={showImage.message}></img>
    else return <h2>No image for {currentBreed}</h2>
  }

  return (
    <div className="App">
      <div className="container">
        <h1> Paw Select</h1>
        <div className="dropdown-div">
          <select onChange={changeHandler}>
              {breeds.map((breed, index) => (
                <option key={index}>{breed}</option>
              ))}
          </select>
        </div>
        <div className="img-div">
          {showResult()}
        </div>
      </div>
    </div>
  );
}
