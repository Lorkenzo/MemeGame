
-- Create table for Users
CREATE TABLE users (
    uid INTEGER,
    username TEXT NOT NULL UNIQUE,
    tot_score INTEGER,
    password TEXT,
    salt TEXT,
    PRIMARY KEY(uid AUTOINCREMENT)
);
-- Create table for Memes
CREATE TABLE memes (
    mmid INTEGER,
    path TEXT NOT NULL,
    PRIMARY KEY(mmid AUTOINCREMENT)
);
-- Create table for Captions
CREATE TABLE captions (
    cid INTEGER,
    text TEXT NOT NULL,
    ref_meme INTEGER NOT NULL,
    PRIMARY KEY(cid AUTOINCREMENT),
    FOREIGN KEY (ref_meme) REFERENCES memes(mmid)
);
-- Create table for Matches
CREATE TABLE matchresults (
    mrid INTEGER,
    date TEXT,
    ref_user INTEGER,
    PRIMARY KEY(mrid AUTOINCREMENT),
    FOREIGN KEY (ref_user) REFERENCES users(id)
);

-- Create table for Matches
CREATE TABLE roundresults (
    rrid INTEGER,
    ref_match INTEGER,
    ref_meme INTEGER,
    ref_caption INTEGER,
    score INTEGER,
    PRIMARY KEY(rrid AUTOINCREMENT),
    FOREIGN KEY (ref_caption) REFERENCES captions(cid),
    FOREIGN KEY (ref_meme) REFERENCES memes(mmid),
    FOREIGN KEY (ref_match) REFERENCES matchresults(mrid)
);

