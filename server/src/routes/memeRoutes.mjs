import {check, validationResult} from 'express-validator';
import express from 'express';
import {isLoggedIn} from "./auth.mjs"
import { memeDAO } from '../dao/memeDAO.mjs';
import session from 'express-session';
/* ROUTE */
const memeRoutes = express.Router();
const memedao= new memeDAO()
//auth routes
const usedMeme = (req,res,next) =>{
    if (!req.session.usedmeme || req.session.usedmeme.length==3 || req.query.start=="true"){
        req.session.usedmeme= []
        console.log(req.session.usedmeme+ " aggiornato")
    }
    return next()
}

memeRoutes.get("/",
    async (req,res) =>{
        await memedao.getMeme()
        .then((meme)=>res.status(200).json({id:meme.id,path:`http://localhost:3001/${meme.path}`}))
        .catch(() => res.status(500).end());
    }
)

memeRoutes.get("/next",
    isLoggedIn,
    usedMeme,
    async (req,res) =>{
        try{
            const meme = await memedao.getNextMeme(req.session.usedmeme)
            req.session.usedmeme.push(meme.id);
            res.status(200).json({id:meme.id,path:`http://localhost:3001/${meme.path}`});
        }
        catch(err) {
            res.status(500).end()
        };
    }
)

memeRoutes.get("/:meme_id/captions",
    async (req,res) =>{
        const id = req.params.meme_id;
        try{
            const t_cap = await memedao.getMemeCaptions(id);
            const f_cap = await memedao.getRandCaptions(t_cap[0].text,t_cap[1].text,id);

            const captions = [...t_cap,...f_cap].sort(() => Math.random() - 0.5);
            res.status(200).json(captions)

        }catch(err){
            res.status(500).end()
        }
    }
)

memeRoutes.get("/:meme_id/captions/:cap_id",
    async (req,res) =>{
        const params = req.params;
        memedao.checkCaption(params.meme_id,params.cap_id)
        .then((c)=>res.status(200).json(c))
        .catch(()=>res.status(500).end())
    }
)

export default memeRoutes;