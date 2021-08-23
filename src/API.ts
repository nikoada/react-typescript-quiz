
import { shuffleArray } from "./utils";


export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState = Question & { answers: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export enum TotalAmount {
    FIVE = 5,
    TEN = 10,
    TWENTY = 20,
}

export enum Caterogies {
    BOOKS = 10,
    FILM = 11,
    MUSIC = 12,
    MUSICALS_AND_THEATRES = 13,
    TELEVISION = 14,
    VIDEO_GAMES = 15,
    BOARD_GAMES = 16,
    NATURE = 17,
    COMPUTERS = 18,
    MATHEMATICS = 19,
    MYTHOLOGY = 20,
    SPORTS = 21,
    GEOGRAPHY = 22,
    HISTORY = 23,
    POLITICS = 24,
    ART = 25,
    ANIMALS = 27,
    VEHICLES = 28,
    COMICS = 29,
    GADGETS = 30,
    ANIME_MANGA = 31,
    CARTOON_ANIMATIONS = 32,
}

export const fetchQuizQuestions = async (category: Caterogies, amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer,]),
    }));
};