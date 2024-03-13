
import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Modal from "./Modal";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import ErrorBoundary from "./errirBoundary";
import Carousel from "./Carousel";
import AdoptedPetContext from "./AdoptedPetContext";

const Details = () => {
  const [showModal,setshowModal]=useState(false)
  const navigate=useNavigate()
  // eslint-disable-next-line no-unused-vars
  const [_,setAdoptedPet]=useContext(AdoptedPetContext)

  const {id}=useParams()
  const results=useQuery(['details',id], fetchPet)
  

  if(results.isLoading){
    return(
    <div className="loading-pane">
      <h2 className="loader">🔃</h2>
    </div>)
  }

  const pet=results.data.pets[0]

  return(
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={setshowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p> 

        {showModal ? (
          <Modal>
            <div>
              <h1>Do you want to adopt {pet.name}?</h1>
              <div className="buttons">
              <button onClick={()=>{
                setAdoptedPet(pet)
                navigate("/")
              }}>Yes</button>
              <button onClick={setshowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ): null}
      </div>

    </div>
  )
}; 
function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}


export default DetailsErrorBoundary;