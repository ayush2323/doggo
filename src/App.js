import react, {useState, useEffect} from 'react'
import '../src/CSS/index.css'
export default function App() {

  const [breeds, setBreeds] = useState([]);
  const [currentBreed, setCurrentBreed] = useState('affenpinscher')
  const [showImage, setShowImage] = useState('');

  const callApi = async () => {
    try {
        const response = await fetch(`https://dog.ceo/api/breeds/list/all`);
        const dogBreed = await response.json();
        setBreeds(dogBreed.message);
    } catch (error) {
        console.error(error);
    }
  }

  const getImage = async () => {
    try {
        const res = await fetch(`https://dog.ceo/api/breed/${currentBreed}/images/random`);
        const image = await res.json();
        console.log(image);
        setShowImage(image);
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(() => {
    callApi()
  }, [])

  useEffect(()=> {
    getImage()
  }, [currentBreed])

  const changeHandler = (e) => {
    console.log(currentBreed)
    setCurrentBreed(e.target.value)
  }

  return (
    <div className="App">
      <div className="container">
        <h1> Paw Select</h1>
        <div className="dropdown-div">
          <select onChange={changeHandler}>
              {Object.keys(breeds).map(breed => (
                <option>{breed}</option>
              ))}
          </select>
          
        </div>
        <div className="img-div">
          <img src={showImage.message}></img>
        </div>
      </div>
    </div>
  );
}
