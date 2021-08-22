
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
    FIFTHEEN = 15,
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
    
        //   <option value="21">Sports</option>
        //   <option value="22">Geography</option>
        //   <option value="23">History</option>
        //   <option value="24">Politics</option>
        //   <option value="25">Art</option>
        //   <option value="26">Celebrities</option>
        //   <option value="27">Animals</option>
        //   <option value="28">Vehicles</option>
        //   <option value="29">Entertainment: Comics</option>
        //   <option value="30">Science: Gadgets</option>
        //   <option value="31">Entertainment: Japanese Anime &amp; Manga</option>
        //   <option value="32">Entertainment: Cartoon &amp; Animations</option>
}

export const fetchQuizQuestions = async (category: Caterogies, amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json();
    return data.results.map((question: Question) => ({
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer,]),
    }));
};