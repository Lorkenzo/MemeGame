import {check, validationResult} from 'express-validator';
import express from 'express';
import {isLoggedIn} from "./auth.mjs"
import {matchDAO} from "../dao/matchDAO.mjs"
/* ROUTE */
const matchRoutes = express.Router();
const matchdao = new matchDAO();
//auth routes

matchRoutes.post("/",
    isLoggedIn,
    [
        check("date").isDate({format: 'YYYY-MM-DD', strictMode: true}),
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        
        const match = req.body;
        matchdao.recordMatch(match.date,req.user.id)
        .then((m)=>res.status(200).json(m))
        .catch(()=>res.status(500).end());
    }

)

matchRoutes.post("/:match_id/round",
    isLoggedIn,
    [
        check("img_id").isNumeric(),
        check("cap_id").isNumeric(),
        check("score").isNumeric(),
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const mid = req.params.match_id;
        const round = req.body;
        matchdao.recordRound(mid,round.img_id,round.cap_id,round.score)
        .then((t)=>res.status(200).json(t))
        .catch(()=>{res.status(500).end()});
    }
)

matchRoutes.put("/score",
    isLoggedIn,
    [
        check("score").isNumeric(),
    ],
    async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        }
        const score = req.body.score;
        matchdao.updateUserScore(score,req.user.id)
        .then((t)=>res.status(200).json(t))
        .catch(()=>{res.status(500).end()});
    }
)

matchRoutes.get("/",
    isLoggedIn,
    async (req,res) =>{
        matchdao.getMatches(req.user.id)
        .then((matches)=>res.status(200).json(matches))
        .catch(() => res.status(500).end());
    }
)

matchRoutes.get("/:match_id/round",
    isLoggedIn,
    async (req,res) =>{
        
            const mid = req.params.match_id;
            matchdao.getRounds(mid)
            .then((r)=>{
                const rd = r.map((r)=>{return {cap:r.cap,img:`http://localhost:3001/${r.img}`,score:r.score}});
                res.status(200).json(rd);
            })
            .catch(()=>res.status(500).end())
            
        }
)

matchRoutes.get("/score",
    isLoggedIn,
    async (req,res) =>{
        matchdao.getTotalScore(req.user.id)
        .then((score)=>res.status(200).json(score))
        .catch(() => res.status(500).end());
    }
)

export default matchRoutes;