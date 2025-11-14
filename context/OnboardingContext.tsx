import React, { createContext, useContext, useReducer, ReactNode } from "react";

type State = {
  fullName: string;
  dateOfBirth: string;
  gender: "Female" | "Male" | "Other" | null;
  height: string;
  weight: string;
  goals: string[];
};

type Action =
  | { type: "SET_FULL_NAME"; payload: string }
  | { type: "SET_DATE_OF_BIRTH"; payload: string }
  | { type: "SET_GENDER"; payload: "Female" | "Male" | "Other" | null }
  | { type: "SET_HEIGHT"; payload: string }
  | { type: "SET_WEIGHT"; payload: string }
  | { type: "TOGGLE_GOAL"; payload: string };

const initialState: State = {
  fullName: "",
  dateOfBirth: "",
  gender: null,
  height: "",
  weight: "",
  goals: [],
};

const OnboardingContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

const onboardingReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FULL_NAME":
      return { ...state, fullName: action.payload };
    case "SET_DATE_OF_BIRTH":
      return { ...state, dateOfBirth: action.payload };
    case "SET_GENDER":
      return { ...state, gender: action.payload };
    case "SET_HEIGHT":
        return { ...state, height: action.payload };
    case "SET_WEIGHT":
        return { ...state, weight: action.payload };
    case "TOGGLE_GOAL":
      const goals = state.goals.includes(action.payload)
        ? state.goals.filter((g) => g !== action.payload)
        : [...state.goals, action.payload];
      return { ...state, goals };
    default:
      return state;
  }
};

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState);

  return (
    <OnboardingContext.Provider value={{ state, dispatch }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
