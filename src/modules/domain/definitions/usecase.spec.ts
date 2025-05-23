import { SpecDefinition } from "../specs/types/spec.types";

export const usecaseSpec: SpecDefinition = {
  fields:{
    applicationId: {
      type: "string",
      required: true,
    },
    requirementId: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Usecase",
        placeholder: "Usecase Description"
      }
    }
  }
};
