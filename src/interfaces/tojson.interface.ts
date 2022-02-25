export interface IJsonData {
  modules: {
    id: string;
    type: string;
    nextStep: string;
  }[];
  conditions: {
    id: string;
    rules: [];
    if: string;
    else: string;
  }[];
}
