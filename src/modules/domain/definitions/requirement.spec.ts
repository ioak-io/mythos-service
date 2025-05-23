import { SpecDefinition } from "../specs/types/spec.types";

export const requirementSpec: SpecDefinition = {
  fields:{
    applicationId:{
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Description",
        placeholder: "Requirement Description"
      }
    }
  }
};
