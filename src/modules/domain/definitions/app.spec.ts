import { SpecDefinition } from "../specs/types/spec.types";

export const applicationSpec: SpecDefinition = {
  fields:{
    name: {
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Name",
        placeholder: "Application Name"
      }
    }
  }
};
