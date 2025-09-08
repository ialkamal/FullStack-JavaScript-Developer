const { Router } = require("express");
import type { Request, Response } from "express";

const charactersRoute = Router();

interface CHARACTER {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

const characters: CHARACTER[] = [
  {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth (C-137)",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/37",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  },
  {
    id: 2,
    name: "Morty Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "unknown",
      url: "",
    },
    location: {
      name: "Citadel of Ricks",
      url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      "https://rickandmortyapi.com/api/episode/3",
      "https://rickandmortyapi.com/api/episode/4",
      "https://rickandmortyapi.com/api/episode/5",
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/13",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/28",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/37",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/50",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/2",
    created: "2017-11-04T18:50:21.651Z",
  },
  {
    id: 3,
    name: "Summer Smith",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Female",
    origin: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    location: {
      name: "Earth (Replacement Dimension)",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/6",
      "https://rickandmortyapi.com/api/episode/7",
      "https://rickandmortyapi.com/api/episode/8",
      "https://rickandmortyapi.com/api/episode/9",
      "https://rickandmortyapi.com/api/episode/10",
      "https://rickandmortyapi.com/api/episode/11",
      "https://rickandmortyapi.com/api/episode/12",
      "https://rickandmortyapi.com/api/episode/14",
      "https://rickandmortyapi.com/api/episode/15",
      "https://rickandmortyapi.com/api/episode/16",
      "https://rickandmortyapi.com/api/episode/17",
      "https://rickandmortyapi.com/api/episode/18",
      "https://rickandmortyapi.com/api/episode/19",
      "https://rickandmortyapi.com/api/episode/20",
      "https://rickandmortyapi.com/api/episode/21",
      "https://rickandmortyapi.com/api/episode/22",
      "https://rickandmortyapi.com/api/episode/23",
      "https://rickandmortyapi.com/api/episode/24",
      "https://rickandmortyapi.com/api/episode/25",
      "https://rickandmortyapi.com/api/episode/26",
      "https://rickandmortyapi.com/api/episode/27",
      "https://rickandmortyapi.com/api/episode/29",
      "https://rickandmortyapi.com/api/episode/30",
      "https://rickandmortyapi.com/api/episode/31",
      "https://rickandmortyapi.com/api/episode/32",
      "https://rickandmortyapi.com/api/episode/33",
      "https://rickandmortyapi.com/api/episode/34",
      "https://rickandmortyapi.com/api/episode/35",
      "https://rickandmortyapi.com/api/episode/36",
      "https://rickandmortyapi.com/api/episode/38",
      "https://rickandmortyapi.com/api/episode/39",
      "https://rickandmortyapi.com/api/episode/40",
      "https://rickandmortyapi.com/api/episode/41",
      "https://rickandmortyapi.com/api/episode/42",
      "https://rickandmortyapi.com/api/episode/43",
      "https://rickandmortyapi.com/api/episode/44",
      "https://rickandmortyapi.com/api/episode/45",
      "https://rickandmortyapi.com/api/episode/46",
      "https://rickandmortyapi.com/api/episode/47",
      "https://rickandmortyapi.com/api/episode/48",
      "https://rickandmortyapi.com/api/episode/49",
      "https://rickandmortyapi.com/api/episode/51",
    ],
    url: "https://rickandmortyapi.com/api/character/3",
    created: "2017-11-04T19:09:56.428Z",
  },
];

charactersRoute.get("/", (req: Request, res: Response) => {
  if (Array.isArray(characters) && characters.length > 0)
    res.status(200).json(characters);
  else {
    res.status(404).json({ message: "No characters found" });
  }
});

charactersRoute.get("/:id", (req: Request, res: Response) => {
  const id = req.params?.id;

  if (id) {
    const foundCharacter = characters.find((character) => {
      return character.id === Number(id);
    });

    if (foundCharacter) res.status(200).json(foundCharacter);
    else res.status(404).json({ error: "character not found!" });
  } else {
    res.status(400).json({ error: "Malformed URL" });
  }
});

module.exports = { charactersRoute };
