import QuizGameCreator from "./QuizGameCreator";
import PuzzleGameCreator from "./PuzzleGameCreator";
import MatchingGameCreator from "./MatchingGameCreator";
import SortingGameCreator from "./SortingGameCreator";
import SliderGameCreator from "./SliderGameCreator";

export const gameCreatorComponents = {
  quiz: QuizGameCreator,
  puzzle: PuzzleGameCreator,
  matching: MatchingGameCreator,
  sorting: SortingGameCreator,
  slider: SliderGameCreator
};