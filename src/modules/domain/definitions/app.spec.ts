import { SpecDefinition } from "../specs/types/spec.types";

export const applicationSpec: SpecDefinition = {
  fields:{
    reference: {
      type: "string"
    },
    name: {
      type: "string",
      required: true,
      displayOptions:{
        type: "text",
        label: "Name",
        placeholder: "Application Name"
      }
    }
  },
  meta:{
    children: [
      {
        domain: "requirement",
        field: {
          parent: "reference",
          child: "application"
        },
        cascadeDelete: true
      }
    ]
  }
};
