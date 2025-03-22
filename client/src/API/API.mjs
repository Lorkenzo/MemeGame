import { captions ,meme } from "../classes/meme.mjs";
const SERVER_URL = 'http://localhost:3001';

//User Access API

const logIn = async (credentials) => {
    const response = await fetch(`${SERVER_URL}/api/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    if(response.ok) {
      const user = await response.json();
      return user;
    }
    else {
      const errDetails = await response.text();
      throw errDetails;
    }
};
  
  
const getUserInfo = async () => {
    const response = await fetch(`${SERVER_URL}/api/sessions/current`, {
      credentials: 'include',
    });
    const user = await response.json();
    if (response.ok) {
      return user;
    } else {
      throw user;  // an object with the error coming from the server
    }
};
  
  
const logOut = async() => {
    const response = await fetch(`${SERVER_URL}/api/sessions/current`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.ok)
      return null;
}

//Memes API

const getMeme = async () =>{
    const response = await fetch(`${SERVER_URL}/api/memes`);
    if(response.ok) {
        const mem = await response.json();
        return new meme(mem.id,mem.path);
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getNextMeme = async (start) =>{
    const response = await fetch(`${SERVER_URL}/api/memes/next?start=${start}`, {
        credentials: 'include',
    });
    if(response.ok) {
        const mem = await response.json();
        return new meme(mem.id,mem.path);
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getCaptions = async (meme) =>{
    const response = await fetch(`${SERVER_URL}/api/memes/${meme.id}/captions`);
    if(response.ok) {
        const cap = await response.json();
        
        return cap.map(c=>new captions(c.id,c.text,c.memeid))
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const checkCaption = async (meme,idcap) =>{
    const response = await fetch(`${SERVER_URL}/api/memes/${meme.id}/captions/${idcap}`);
    if(response.ok) {
        const cap = await response.json();
        return cap
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

//Matches API

const newMatch = async (date) =>{
    const response = await fetch(`${SERVER_URL}/api/matches`,{
        credentials:'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({date: date})
      })
    if(response.ok) {
        const match = await response.json();
        return match;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const newRound = async (match_id,round) =>{
    
    const response = await fetch(`${SERVER_URL}/api/matches/${match_id}/round`,{
        credentials:'include',
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({img_id:round.img.id, cap_id:round.cap.id, score:round.score})
      })
    if(response.ok) {
        const round = await response.json();
        return round;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getMatches = async () =>{
    const response = await fetch(`${SERVER_URL}/api/matches`,{
        credentials:'include'
      })
    if(response.ok) {
        const match = await response.json();
        return match;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getRounds = async (match_id) =>{
    const response = await fetch(`${SERVER_URL}/api/matches/${match_id}/round`,{
        credentials:'include'
      })
    if(response.ok) {
        const round = await response.json();
        return round;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const updateScore = async (score) =>{
    const response = await fetch(`${SERVER_URL}/api/matches/score`,{
        credentials:'include',
        method: 'PUT',
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({score: score})
      })
    if(response.ok) {
        const changes = await response.json();
        return changes;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}

const getUpdatedScore = async () =>{
    const response = await fetch(`${SERVER_URL}/api/matches/score`,{
        credentials:'include'
      })
    if(response.ok) {
        const score = await response.json();
        return score;
    }
    else {
    const errDetail = await response.json();
    if (errDetail.error)
        throw errDetail.error
    if (errDetail.message)
        throw errDetail.message
    throw "Something went wrong"
    }
}


const API ={logIn,getUserInfo,logOut,getMeme,getNextMeme,getCaptions,checkCaption,getMatches,newMatch,newRound,getRounds,updateScore,getUpdatedScore}

export default API;

